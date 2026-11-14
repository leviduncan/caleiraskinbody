/** Prefixes an in-page anchor (#services) with a base such as "/"; other links are unchanged. */
export function withBase(href: string, base: string): string {
  return base && href.startsWith("#") ? `${base}${href}` : href;
}
