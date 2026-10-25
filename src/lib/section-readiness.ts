import { site } from "@/content/site";

/** Text counts as filled when it is not blank and still has no [placeholder] in it. */
function filled(text: string | undefined): text is string {
  return typeof text === "string" && text.trim() !== "" && !/\[[^\]]*\]/.test(text);
}

function isHttpsUrl(value: string | undefined): value is string {
  if (!filled(value)) return false;
  try {
    return new URL(value).protocol === "https:";
  } catch {
    return false;
  }
}

/**
 * The guest quote shows only with the quote, the attribution (first name, last initial, city)
 * and a signed model release (F.S. 540.08). The Google link is its own check, and never
 * shows without a ready quote.
 */
export function getTestimonialState() {
  const { testimonial } = site;
  const ready =
    filled(testimonial.quote) &&
    filled(testimonial.attribution) &&
    testimonial.modelReleaseSigned === true;
  const linkReady = ready && filled(testimonial.moreCta.label) && isHttpsUrl(testimonial.moreCta.href);
  return { ready, linkReady };
}

/**
 * The freebie shows only with a title, a one-line description, a consent line and a working
 * form endpoint. A form with no consent line or nowhere to send is never rendered.
 */
export function getFreebieState() {
  const { freebie } = site;
  const ready =
    filled(freebie.heading) &&
    filled(freebie.description) &&
    filled(freebie.consent) &&
    isHttpsUrl(freebie.endpoint);
  return { ready };
}

/** False while text still holds a [placeholder], so it is left off the page. */
export function isReady(text: string | undefined): boolean {
  return filled(text);
}

/** Anchors for pages and forms that are not built yet. Remove one when it exists. */
const UNBUILT_ANCHORS = ["#privacy", "#terms", "#waitlist-todo"];

/** In-page anchors that currently point at nothing, so links to them are dropped. */
export function getHiddenAnchors(): string[] {
  const hidden: string[] = [...UNBUILT_ANCHORS];
  if (!getTestimonialState().ready) hidden.push("#reviews");
  if (!getFreebieState().ready) hidden.push("#freebie");
  return hidden;
}

/** False for a link to a hidden section, an unbuilt page, or a URL with a [placeholder]. */
export function isLinkLive(href: string): boolean {
  return filled(href) && !getHiddenAnchors().includes(href);
}
