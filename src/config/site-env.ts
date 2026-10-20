/**
 * Which host this build is for. The deploy workflow sets SITE_ENV and SITE_URL;
 * with neither set (a local build, or production after launch) the site is treated as live.
 */
export const SITE_URL = process.env.SITE_URL ?? "https://caleiraskinbody.com";

/** True only for the staging build. Staging is kept out of search engines. */
export const IS_STAGING = process.env.SITE_ENV === "staging";
