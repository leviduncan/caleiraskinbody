// Pure helpers shared by scripts/fetch-services.mjs and scripts/build-services.mjs.
// No file or network access here, so every function can be checked on its own.

/**
 * Words that read as a treatment outcome, diagnosis, or cure. CALÉIRA is a non-medical
 * wellness studio, so copy from Cal.com that contains any of these is held back, not rendered.
 */
const CLAIM_PATTERNS = [
  /\btreat(s|ed|ing|ment|ments)?\b/i,
  /\bcure[sd]?\b/i,
  /\bheal(s|ed|ing)?\b/i,
  /\bdiagnos\w*/i,
  /\btherap(y|ies|eutic)\b/i,
  /(?<!not an? )\bmedical\w*/i,
  /\bclinical\w*/i,
  /\b(reduc(e|es|ed|ing)|minimi[sz]\w*|eliminat\w*|erase[sd]?|remov(e|es|ed|ing) (wrinkles|scars|marks))\b/i,
  /\b(wrinkles?|acne|scars?|scarring|cellulite|inflammation|swelling|puffiness|pain|detox\w*)\b/i,
  /\b(relie(f|ve|ves|ved)|ease[sd]?|alleviat\w*|soothe[sd]? (pain|aches?))\b/i,
  /\blymph\w*/i,
  /\b(post-?operative|post-?surgical|recovery)\b/i,
  /\b(anti-?aging|rejuvenat\w*|permanent(ly)?|guarantee[sd]?|proven|results?)\b/i,
];

/**
 * @param {string} text
 * @returns {string[]} A short reason for each problem found, empty when the copy is clean.
 */
export function findCopyIssues(text) {
  const issues = [];
  if (/[–—]/.test(text)) issues.push("contains a dash character (em or en dash)");
  for (const pattern of CLAIM_PATTERNS) {
    const hit = text.match(pattern);
    if (hit) issues.push(`outcome or medical wording "${hit[0]}"`);
  }
  return issues;
}

const ENTITIES = { "&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"', "&#39;": "'", "&nbsp;": " " };

/** Cal.com descriptions are HTML-ish markdown. The page wants one plain paragraph. */
export function toPlainText(input) {
  if (typeof input !== "string") return "";
  return input
    .replace(/<[^>]*>/g, " ")
    .replace(/&(amp|lt|gt|quot|#39|nbsp);/g, (entity) => ENTITIES[entity])
    .replace(/[*_`#>]+/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

// Event titles on this account end with the price: "Caléira Signature Facial - $150".
const TITLE_PRICE = /\s+[-–—]\s+(\$[\d,]+(?:\.\d{1,2})?)\s*$/;

/**
 * Splits a Cal.com title into the display name and a price taken from its suffix.
 * Cal.com's own price field stays 0 unless Stripe is attached, so the suffix is the fallback.
 * @returns {{ name: string, priceCents: number | null }}
 */
export function splitTitle(title) {
  const raw = typeof title === "string" ? title.trim() : "";
  const match = raw.match(TITLE_PRICE);
  if (!match) return { name: raw, priceCents: null };
  const cents = Math.round(Number.parseFloat(match[1].replace(/[$,]/g, "")) * 100);
  return { name: raw.replace(TITLE_PRICE, "").trim(), priceCents: Number.isFinite(cents) ? cents : null };
}

/**
 * Reduces one Cal.com event type to the fields the site uses.
 * Returns null for an entry that cannot be used (no slug, no length, or hidden).
 * @param {Record<string, unknown>} event
 */
export function normalizeEvent(event) {
  if (!event || typeof event !== "object") return null;
  const { slug, title, lengthInMinutes, description, bookingUrl, price, hidden } = event;
  if (hidden === true) return null;
  if (typeof slug !== "string" || !slug) return null;
  if (typeof lengthInMinutes !== "number" || !(lengthInMinutes > 0)) return null;
  const fromTitle = splitTitle(title);
  const apiCents = typeof price === "number" && price > 0 ? Math.round(price) : null;
  return {
    title: fromTitle.name || slug,
    slug,
    durationMinutes: lengthInMinutes,
    description: toPlainText(description),
    bookingUrl: typeof bookingUrl === "string" ? bookingUrl : "",
    priceCents: apiCents ?? fromTitle.priceCents,
  };
}

/** "https://cal.com/caleira/60min" -> "caleira/60min", the form the Cal.com embed wants. */
export function calLinkFromUrl(bookingUrl) {
  try {
    const path = new URL(bookingUrl).pathname.replace(/^\/+|\/+$/g, "");
    return path || null;
  } catch {
    return null;
  }
}

export function formatPrice(cents) {
  if (typeof cents !== "number" || cents <= 0) return null;
  const dollars = cents / 100;
  return Number.isInteger(dollars) ? `$${dollars}` : `$${dollars.toFixed(2)}`;
}

/** Cal.com and old copy spell the brand several ways. The site always writes CALÉIRA. */
export function brandName(text) {
  return text.replace(/\bcal[eé]ira\b/gi, "CALÉIRA");
}

/**
 * Combines the Cal.com cache with the local config. Config order wins.
 *
 * Rules that cannot be overridden from Cal.com:
 *  - A "coming-soon" service, or any service in a coming-soon category, takes nothing from
 *    Cal.com: no price, no link, no description. Its text comes from the config only.
 *  - A service whose slug, name or title matches guard.neverBookable and is not coming soon
 *    stops the build.
 *  - Entries under config.dormant are ignored entirely.
 *  - An "available" service with no live Cal.com event is left off the page, so the page
 *    never shows something that cannot be booked.
 *
 * @param {{ username: string, services: ReturnType<typeof normalizeEvent>[] }} cache
 * @param {any} config
 * @returns {{ menu: any, warnings: string[] }}
 */
const imageOf = (image) => (image ? { path: image.path ?? null, alt: image.alt, position: image.position ?? null } : null);

export function mergeServices(cache, config) {
  const warnings = [];
  const events = new Map((cache.services ?? []).map((event) => [event.slug, event]));
  const overrides = config.services ?? {};
  const neverBookable = (config.guard?.neverBookable ?? []).map((word) => word.toLowerCase());
  const used = new Set();

  const categories = [];
  for (const category of config.categories ?? []) {
    const services = [];
    for (const slug of category.services ?? []) {
      const override = overrides[slug];
      if (!override) {
        warnings.push(`"${slug}" is listed in category "${category.id}" but has no entry in services.`);
        continue;
      }
      used.add(slug);
      const comingSoon = category.comingSoon === true || override.status === "coming-soon";
      const event = events.get(slug);

      const nameForGuard = [slug, override.name, event?.title].filter(Boolean).join(" ").toLowerCase();
      const blocked = neverBookable.find((word) => nameForGuard.includes(word));
      if (blocked && !comingSoon) {
        throw new Error(
          `Compliance guard: "${slug}" matches "${blocked}" but is not marked coming-soon. ` +
            `Set status "coming-soon" in services.config.json.`,
        );
      }

      if (comingSoon) {
        services.push({
          slug,
          name: brandName(override.name ?? slug),
          durationText: override.durationText ?? null,
          description: override.description ?? null,
          idealFor: null,
          note: null,
          priceText: null,
          tag: null,
          status: "coming-soon",
          bookable: false,
          calLink: null,
          image: imageOf(override.image ?? category.image),
        });
        continue;
      }

      if (!event) {
        warnings.push(`"${slug}" is not on the page: no public Cal.com event type with that slug (missing or hidden).`);
        continue;
      }

      let description = override.description ?? null;
      if (description === null && event.description) {
        const issues = findCopyIssues(event.description);
        if (issues.length > 0) {
          warnings.push(
            `Cal.com description for "${slug}" was NOT rendered (${issues.join("; ")}). ` +
              `Write approved copy in services.config.json to show a description.`,
          );
        } else {
          description = event.description;
        }
      }
      if (description) {
        const issues = findCopyIssues(description);
        if (issues.length > 0 && override.description) {
          warnings.push(`Config description for "${slug}" has wording to review (${issues.join("; ")}).`);
        }
      }

      services.push({
        slug,
        name: brandName(override.name ?? event.title),
        durationText: override.durationText ?? `${event.durationMinutes} min`,
        description,
        idealFor: override.idealFor ?? null,
        note: override.note ?? null,
        priceText: override.priceText ?? formatPrice(event.priceCents),
        tag: override.tag ?? null,
        status: "available",
        bookable: true,
        calLink: calLinkFromUrl(event.bookingUrl) ?? `${cache.username}/${slug}`,
        image: imageOf(override.image ?? category.image),
      });
    }

    const comingSoon = category.comingSoon === true;
    if (services.length === 0 && !comingSoon) {
      warnings.push(`Category "${category.id}" has no services to show and is hidden.`);
      continue;
    }
    categories.push({
      id: category.id,
      name: category.name,
      intro: category.intro,
      comingSoon,
      note: category.note ?? null,
      services,
    });
  }

  // Dormant entries are parked on purpose, so they never trigger the unplaced warning.
  const dormant = new Set(Object.keys(config.dormant?.services ?? {}));
  const unplaced = [...events.keys()].filter((slug) => !used.has(slug) && !dormant.has(slug));
  if (unplaced.length > 0) {
    warnings.push(`Cal.com event types not placed in any category (left off the page): ${unplaced.join(", ")}.`);
  }

  return { menu: { username: cache.username, categories }, warnings };
}
