import type { Service } from "@/content/site";

/** The Cal.com account every booking button points at. */
export const CAL_USERNAME = "caleira";

/** The one embed namespace. CalProvider and every BookButton must use this same value. */
export const CAL_NAMESPACE = "caleira";

/**
 * The Cal.com link for a service, or undefined when it cannot be booked.
 * A service that is not bookable never gets a link, so it can never open a popup.
 */
export function getCalLink(service: Pick<Service, "bookable" | "calSlug">): string | undefined {
  if (!service.bookable) return undefined;
  // Temporary: with no event type yet, send guests to the general page until Kim publishes one.
  return service.calSlug ? `${CAL_USERNAME}/${service.calSlug}` : CAL_USERNAME;
}
