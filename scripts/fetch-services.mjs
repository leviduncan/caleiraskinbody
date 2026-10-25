// Runs before `npm run dev` and `npm run build`. Reads the public event types from Cal.com
// and writes src/data/services.json. The API key stays in this Node process: it is read from
// the environment, never written to a file, and never reaches the browser bundle.
//
// Failures are loud. The last good src/data/services.json stays in place, but a banner says how
// old it is. When credentials ARE set and Cal.com still cannot be read, the script exits 1 so
// `npm run dev` and `npm run build` stop instead of quietly showing stale services. With no
// credentials at all (CI, a fresh clone) it warns and carries on, as there is nothing to fetch.
import { existsSync, readFileSync, renameSync, writeFileSync, mkdirSync } from "node:fs";
import path from "node:path";
import { normalizeEvent } from "./lib/services-core.mjs";

const OUT_FILE = path.join("src", "data", "services.json");
// Verified against the live API; the response shape was identical for 2024-06-14 and 2026-06-12.
const API_VERSION = "2026-06-12";
const ENDPOINT = "https://api.cal.com/v2/event-types";

for (const file of [".env.local", ".env"]) {
  try {
    process.loadEnvFile(file); // Does not override variables already set (CI, the shell).
  } catch {
    // No such file. Fine.
  }
}

let failed = false;

function keepLastGood(reason, { fatal = true } = {}) {
  let state = "NO cached file exists yet";
  if (existsSync(OUT_FILE)) {
    const { fetchedAt } = JSON.parse(readFileSync(OUT_FILE, "utf8"));
    const days = Math.floor((Date.now() - Date.parse(fetchedAt)) / 86_400_000);
    state = `keeping the last good src/data/services.json (fetched ${fetchedAt}, ${Number.isFinite(days) ? days : "?"} day(s) old)`;
  }
  const bar = "!".repeat(72);
  console.error(`
${bar}
[fetch-services] SERVICES MAY BE STALE: ${reason}; ${state}.
${bar}
`);
  if (fatal) failed = true;
}

function sameServices(a, b) {
  return JSON.stringify(a.services) === JSON.stringify(b.services) && a.username === b.username;
}

async function main() {
  const key = process.env.CAL_API_KEY?.trim();
  const username = process.env.CAL_USERNAME?.trim();
  if (!key || !username) {
    keepLastGood("CAL_API_KEY or CAL_USERNAME is not set", { fatal: false });
    return;
  }
  if (username.includes("@")) {
    console.warn("[fetch-services] CAL_USERNAME looks like an email. Use the Cal.com username from cal.com/<username>.");
  }

  const url = `${ENDPOINT}?${new URLSearchParams({ username })}`;
  let response;
  try {
    response = await fetch(url, {
      headers: { Authorization: `Bearer ${key}`, "cal-api-version": API_VERSION },
      signal: AbortSignal.timeout(15_000),
    });
  } catch (error) {
    keepLastGood(`Cal.com request failed (${error instanceof Error ? error.name : "network error"})`);
    return;
  }

  if (!response.ok) {
    keepLastGood(`Cal.com answered HTTP ${response.status}`);
    return;
  }

  let body;
  try {
    body = await response.json();
  } catch {
    keepLastGood("Cal.com sent a reply that is not JSON");
    return;
  }
  if (body?.status !== "success" || !Array.isArray(body.data)) {
    keepLastGood("Cal.com reply did not have the expected shape");
    return;
  }
  if (body.data.length === 0) {
    keepLastGood(`Cal.com returned zero event types for "${username}" (wrong username?)`);
    return;
  }

  const services = body.data.map(normalizeEvent).filter(Boolean);
  const previous = existsSync(OUT_FILE) ? JSON.parse(readFileSync(OUT_FILE, "utf8")) : null;
  const next = { fetchedAt: new Date().toISOString(), apiVersion: API_VERSION, username, services };

  // Leave the file alone when nothing changed, so a build does not dirty the git tree.
  if (previous && sameServices(previous, next)) {
    console.info(`[fetch-services] ${services.length} public event types, unchanged.`);
    return;
  }

  mkdirSync(path.dirname(OUT_FILE), { recursive: true });
  const temp = `${OUT_FILE}.tmp`;
  writeFileSync(temp, `${JSON.stringify(next, null, 2)}\n`);
  renameSync(temp, OUT_FILE);
  console.info(`[fetch-services] wrote ${services.length} public event types (of ${body.data.length} returned).`);
}

try {
  await main();
} catch (error) {
  keepLastGood(`unexpected error (${error instanceof Error ? error.message : "unknown"})`);
}
process.exitCode = failed ? 1 : 0;
