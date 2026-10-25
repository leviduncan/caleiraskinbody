import type { ImageSlot } from "@/content/site";
import cache from "@/data/services.json";
import merged from "@/data/services.merged.json";
import { serviceImages } from "@/data/service-images";

/**
 * The parts of a Cal.com event type that scripts/fetch-services.mjs keeps.
 * Source: GET https://api.cal.com/v2/event-types (see the README for the fields checked).
 */
export interface CalServiceRecord {
  /** The event title with any trailing " - $150" price removed. */
  title: string;
  slug: string;
  durationMinutes: number;
  /** Plain text. May be empty. */
  description: string;
  bookingUrl: string;
  /** Null when the event has no price. Cents. */
  priceCents: number | null;
}

/** src/data/services.json: the last good copy of the Cal.com event types. */
export interface CalServicesCache {
  fetchedAt: string;
  apiVersion: string;
  username: string;
  services: CalServiceRecord[];
}

export type ServiceStatus = "available" | "coming-soon";

/** One line on the menu, after Cal.com and services.config.json are combined. */
export interface MenuService {
  slug: string;
  name: string;
  /** For example "60 min". */
  durationText: string | null;
  description: string | null;
  idealFor: string | null;
  note: string | null;
  /** For example "$150". Always null for a coming-soon service. */
  priceText: string | null;
  /** Optional small label. */
  tag: string | null;
  status: ServiceStatus;
  /** False for every coming-soon service: no booking button is rendered. */
  bookable: boolean;
  /** The Cal.com embed link, for example "caleira/60min". Null when not bookable. */
  calLink: string | null;
  /** This card's own photo. */
  image: ImageSlot;
}

export interface MenuCategory {
  /** Used for the jump link and anchor: "face" gives #menu-face. */
  id: string;
  name: string;
  intro: string;
  comingSoon: boolean;
  note: string | null;
  services: MenuService[];
}

interface MergedImage {
  path: string | null;
  alt: string;
  position: string | null;
}

interface MergedService extends Omit<MenuService, "image"> {
  image: MergedImage | null;
}

interface MergedCategory extends Omit<MenuCategory, "services"> {
  services: MergedService[];
}

interface MergedMenu {
  username: string;
  categories: MergedCategory[];
}

const menu = merged as MergedMenu;

/** The Cal.com account name, as read at build time from CAL_USERNAME. */
export const CAL_ACCOUNT: string = (cache as CalServicesCache).username || menu.username;

function toSlot(image: MergedImage | null, label: string): ImageSlot {
  const src = image?.path ? serviceImages[image.path] : undefined;
  return {
    label,
    image: image && src ? { src, alt: image.alt, position: image.position ?? undefined } : undefined,
  };
}

/** Categories in config order, each service with its own photo attached. */
export function getMenuCategories(): MenuCategory[] {
  return menu.categories.map((category) => ({
    ...category,
    services: category.services.map((service) => ({
      ...service,
      image: toSlot(service.image, `[${service.name} photo]`),
    })),
  }));
}
