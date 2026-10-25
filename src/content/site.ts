/**
 * ALL page copy lives in this file. Components only read from it. The one exception is
 * the founder section, whose name, years and signature line sit at the top of About.tsx.
 *
 * To re-skin the site for another business, edit the `site` object at the
 * bottom. The interfaces above it describe the shape each section expects.
 * Anything in [square brackets] is a placeholder that still needs real content.
 */

import type { StaticImageData } from "next/image";
import bookingPhoto from "@/assets/cta-section.jpg";
import heroPhoto from "@/assets/hero.jpg";
import heroPhoto2 from "@/assets/hero2.jpg";
import heroPhoto3 from "@/assets/hero3.jpg";
import heroPhoto4 from "@/assets/hero4.jpg";
import heroPhoto5 from "@/assets/hero5.jpg";
import unwindPhoto from "@/assets/light-hero.jpg";
// light-hero.jpg, pre-blurred by scripts/blur-backdrop.mjs.
import backdropPhoto from "@/assets/backdrop-blurred.jpg";
import bookPhoto from "@/assets/pouring-oil.jpg";
import glowPhoto from "@/assets/shoulder-exfol2.jpg";

/* ------------------------------------------------------------------ */
/* Shared shapes                                                       */
/* ------------------------------------------------------------------ */

/** A real image. Leave it out and the placeholder box is shown instead. */
export interface ImageAsset {
  /** An imported file from src/assets, or a path under /public such as "/images/hero.jpg". */
  src: StaticImageData | string;
  /** Describe the moment, not the skin color. */
  alt: string;
  /** CSS object-position, used when the frame crops the photo. For example "85% center". */
  position?: string;
}

/** An image slot: a placeholder label, plus the real image once there is one. */
export interface ImageSlot {
  label: string;
  image?: ImageAsset;
}

export interface LinkItem {
  label: string;
  href: string;
}

/* ------------------------------------------------------------------ */
/* Section shapes                                                      */
/* ------------------------------------------------------------------ */

export interface BrandContent {
  /** Wordmark text. Always capitals, always with the accent. */
  name: string;
  /** Small line beneath the wordmark. */
  descriptor: string;
  tagline: string;
}

export interface SeoContent {
  title: string;
  description: string;
}

export interface BookingContent {
  /** Label of the general booking buttons. They open the Cal.com popup (see src/config/cal.ts). */
  label: string;
}

export interface NavigationContent {
  /** Up to four anchor links. */
  links: LinkItem[];
}

export interface HeroContent {
  eyebrow: string;
  headline: string;
  /** A word within the headline to set in champagne italic. */
  headlineAccent?: string;
  subhead: string;
  primaryCtaLabel: string;
  secondaryCta: LinkItem;
  /** Full-bleed background photo. Decorative, so it has no alt text. */
  photo: StaticImageData;
  /** More photos. Each page load shows one of them or `photo`, picked at random. */
  photoAlternates?: StaticImageData[];
}

export interface IntroPillar {
  title: string;
  description: string;
}

export interface IntroContent {
  heading: string;
  body: string;
  pillars: IntroPillar[];
}

export interface ServicesContent {
  heading: string;
  intro: string;
  /** Names the row of jump links for screen readers. */
  jumpLabel: string;
  /** The link on each bookable service. */
  bookLabel: string;
  idealForLabel: string;
  comingSoonBadge: string;
  waitlist: LinkItem;
  /** Shown when no category has anything to list. */
  emptyMessage: string;
}

export interface ExperienceStep {
  number: string;
  title: string;
  description: string;
  image: ImageSlot;
}

export interface ExperienceContent {
  heading: string;
  steps: ExperienceStep[];
}

export interface FreebieContent {
  heading: string;
  description: string;
  firstNameLabel: string;
  emailLabel: string;
  submitLabel: string;
  /** How the email is used and how to unsubscribe. The form never shows without it. */
  consent: string;
  /** The n8n webhook URL (https) the form posts to. Empty keeps the whole section hidden. */
  endpoint: string;
  successMessage: string;
  errorMessage: string;
}

export interface TestimonialContent {
  /** Names the section for screen readers. Not shown. */
  label: string;
  /** A real guest's words, unedited, used with written permission. */
  quote: string;
  /** First name, last initial and city. Empty hides the section. */
  attribution: string;
  /** Set true only once the signed model release is on file (F.S. 540.08). */
  modelReleaseSigned: boolean;
  /**
   * How this review was gathered. FTC 2024 rule: ask every guest the same way, and never
   * reward a positive review. A record for the owner; not shown and not checked.
   */
  collectionNote: string;
  /** Must sit directly under any quote about how skin or body looks. */
  disclaimer: string;
  moreCta: LinkItem;
}

export interface FaqItem {
  question: string;
  answer: string;
  link?: LinkItem;
}

export interface FaqContent {
  heading: string;
  intro: string;
  items: FaqItem[];
}

export interface FinalCtaContent {
  eyebrow: string;
  heading: string;
  subline: string;
  address: string;
  /** Background photo. No faces behind this band. */
  photo: StaticImageData;
  assistant: {
    title: string;
    description: string;
    /** Accessible name of the floating assistant button shown on phones. */
    buttonLabel: string;
    /** Where that button goes: the assistant's phone link ("tel:+1...") once there is one. */
    href: string;
    /** id of the empty div the voice widget script mounts into. */
    mountId: string;
  };
}

export interface VisitDetail {
  label: string;
  /** One entry per line. A link item makes the line tappable, for a phone number or email. */
  lines: (string | LinkItem)[];
}

export interface VisitContent {
  heading: string;
  details: VisitDetail[];
  map: {
    /** Accessible name of the embedded map. */
    title: string;
    embedUrl: string;
    directions: LinkItem;
  };
}

export interface FooterColumn {
  title: string;
  /** Leave `href` out to show a line as plain text. */
  lines: { label: string; href?: string }[];
}

export interface FooterContent {
  columns: FooterColumn[];
  /** The non-medical statement. Always shown. */
  compliance: string;
  /** Florida MA and MM license numbers. Fill in the day massage launches. */
  licenses: string;
  copyright: string;
  legalLinks: LinkItem[];
  /** Leave `href` out to show the credit as plain text. */
  credit: { label: string; href?: string };
}

export interface SiteContent {
  /** Blurred photo pinned behind the whole page. */
  backdrop: StaticImageData;
  brand: BrandContent;
  seo: SeoContent;
  booking: BookingContent;
  navigation: NavigationContent;
  hero: HeroContent;
  intro: IntroContent;
  services: ServicesContent;
  experience: ExperienceContent;
  freebie: FreebieContent;
  testimonial: TestimonialContent;
  faq: FaqContent;
  finalCta: FinalCtaContent;
  visit: VisitContent;
  footer: FooterContent;
}

/* ------------------------------------------------------------------ */
/* The copy                                                            */
/* ------------------------------------------------------------------ */

const address = {
  street: "104 Seacrest Dr, Suite 1",
  cityLine: "Largo, Florida 33771",
  mapsQuery: "104%20Seacrest%20Dr%20Suite%201%2C%20Largo%2C%20FL%2033771",
};

const hours = ["Tuesday and Thursday, 6:30 to 8:30 pm", "Saturday, 10 am to 3 pm"];

export const site: SiteContent = {
  backdrop: backdropPhoto,

  brand: {
    name: "CALÉIRA",
    descriptor: "Skin & Body",
    tagline: "Designed to Be Noticed.",
  },

  seo: {
    title: "CALÉIRA Skin & Body | Largo, Florida",
    description:
      "A boutique skin and body studio in Largo, Florida. Unhurried skin rituals for every tone, every texture, every season of life.",
  },

  booking: {
    label: "Book now",
  },

  navigation: {
    links: [
      { label: "Menu", href: "#services" },
      { label: "Meet Kim", href: "#about" },
      { label: "Visit", href: "#visit" },
      { label: "FAQ", href: "#faq" },
    ],
  },

  hero: {
    eyebrow: "Skin & Body Studio · Largo, Florida",
    headline: "Designed to Be Noticed.",
    headlineAccent: "Noticed",
    subhead:
      "Unhurried skin rituals for every tone, every texture, every season of life. Settle in. The next hour belongs to you.",
    primaryCtaLabel: "Book your visit",
    secondaryCta: { label: "See the menu", href: "#services" },
    photo: heroPhoto,
    photoAlternates: [heroPhoto2, heroPhoto3, heroPhoto4, heroPhoto5],
  },

  intro: {
    heading: "Quiet confidence, full glow.",
    body: "CALÉIRA is a boutique skin and body studio in Largo where you slow down, feel cared for, and leave looking like the best-rested version of yourself.",
    pillars: [
      {
        title: "Bold, not loud",
        description: "Designed to Be Noticed. Starting with how you feel.",
      },
      {
        title: "Calm luxury",
        description: "Settle in. The next hour belongs to you.",
      },
      {
        title: "Sensory and natural",
        description: "Warm towels, slow hands, skin that feels like yours again.",
      },
      {
        title: "Warmly inclusive",
        description: "Every skin tone, every body, every season of life.",
      },
    ],
  },

  services: {
    heading: "The Menu",
    intro: "Skin and body rituals for every tone, every texture, every season of life.",
    jumpLabel: "Menu categories",
    bookLabel: "Book",
    idealForLabel: "Ideal for",
    comingSoonBadge: "Coming soon",
    // TODO: point this at the waitlist form or page once it exists.
    waitlist: { label: "Join the waitlist", href: "#waitlist-todo" },
    emptyMessage: "The menu is being updated. Please check back soon.",
    // The categories and services come from Cal.com plus services.config.json (see the README).
  },

  experience: {
    heading: "Simple from the first click.",
    steps: [
      {
        number: "01",
        title: "Book online",
        description: "Pick a time that works. It takes under a minute.",
        image: {
          label: "[Step photo]",
          image: {
            src: bookPhoto,
            alt: "Warm oil poured from a small white pitcher into an open palm.",
            position: "85% center",
          },
        },
      },
      {
        number: "02",
        title: "Arrive and unwind",
        description: "A calm, private space, ready for you.",
        image: {
          label: "[Step photo]",
          image: {
            src: unwindPhoto,
            alt: "A guest resting under a white towel, eyes closed, with candles glowing behind.",
            position: "92% center",
          },
        },
      },
      {
        number: "03",
        title: "Leave refreshed",
        description: "Rebook before you go, or anytime from your phone.",
        image: {
          label: "[Step photo]",
          image: {
            src: glowPhoto,
            alt: "A guest smiling softly, eyes closed, as cream is smoothed over her shoulder.",
            position: "28% center",
          },
        },
      },
    ],
  },

  freebie: {
    // The whole section stays hidden until heading, description, consent and endpoint are all
    // filled in (see src/lib/section-readiness.ts).
    heading: "",
    description: "",
    firstNameLabel: "First name",
    emailLabel: "Email",
    submitLabel: "Send it to me",
    consent: "",
    endpoint: "",
    successMessage: "Thank you. Check your inbox.",
    errorMessage: "Something went wrong. Please try again in a moment.",
  },

  // Compliance: only real, unedited quotes from guests who gave written permission.
  testimonial: {
    label: "What guests say",
    // The whole section stays hidden until quote, attribution and modelReleaseSigned are set.
    quote: "",
    attribution: "",
    modelReleaseSigned: false,
    collectionNote: "",
    disclaimer: "Individual experiences vary.",
    // Empty href hides just the link. Use the Google Business Profile reviews link.
    moreCta: {
      label: "Read more on Google",
      href: "",
    },
  },

  faq: {
    heading: "Good to know.",
    intro: "The short answers. Kim is happy to talk anything else through at your visit.",
    items: [
      {
        question: "How do I book?",
        answer:
          "Choose a time online with the Book now button. It takes under a minute. Prefer to talk? Our voice assistant can find you a time.",
      },
      {
        question: "What should I expect at my first visit?",
        answer:
          "[Answer: describe arrival, the studio space, and what to bring.]",
      },
      {
        question: "Do you offer massage?",
        answer:
          "Massage is coming soon. Join the waitlist from the menu to be among the first to hear when it opens.",
        link: { label: "Join the waitlist", href: "#waitlist-todo" },
      },
      {
        question: "How do I cancel or reschedule?",
        answer:
          "[Answer: explain the cancellation window and how to change a booking.]",
      },
      {
        question: "Where are you located and where do I park?",
        // TODO: add parking directions to this answer.
        answer: `You will find us at ${address.street}, ${address.cityLine}.`,
      },
    ],
  },

  finalCta: {
    eyebrow: "Tuesday and Thursday evenings · Saturdays",
    heading: "Your next hour belongs to you.",
    subline:
      "Book online in under a minute, or ask our assistant and it will find you a time.",
    address: `${address.street} · ${address.cityLine}`,
    photo: bookingPhoto,
    assistant: {
      title: "Questions? Ask our voice assistant",
      description:
        "It can share times and tell you about the studio. Kim will talk anything else through at your visit.",
      buttonLabel: "Ask our voice assistant",
      // TODO: replace with the assistant's phone link, for example "tel:+17275550100".
      // Until then the button scrolls to the assistant block in the booking band.
      href: "#assistant",
      // The Sonika voice widget script mounts into the div with this id.
      mountId: "sonika-widget",
    },
  },

  visit: {
    heading: "Visit the studio.",
    details: [
      { label: "Address", lines: [address.street, address.cityLine] },
      { label: "Hours", lines: hours },
      {
        label: "Contact",
        lines: [
          { label: "(727) 292-1807", href: "tel:+17272921807" },
          { label: "hello@caleiraskinbody.com", href: "mailto:hello@caleiraskinbody.com" },
        ],
      },
    ],
    map: {
      title: "Map showing CALÉIRA Skin & Body in Largo, Florida",
      embedUrl: `https://www.google.com/maps?q=${address.mapsQuery}&output=embed`,
      directions: {
        label: "Get directions",
        href: `https://www.google.com/maps/dir/?api=1&destination=${address.mapsQuery}`,
      },
    },
  },

  footer: {
    columns: [
      {
        title: "Explore",
        lines: [
          { label: "The menu", href: "#services" },
          { label: "About Kim", href: "#about" },
          { label: "Visit", href: "#visit" },
          { label: "FAQ", href: "#faq" },
        ],
      },
      {
        title: "Visit",
        lines: [{ label: address.street }, { label: address.cityLine }],
      },
      {
        title: "Hours",
        lines: hours.map((line) => ({ label: line })),
      },
      {
        title: "Follow",
        lines: [
          // TODO: replace with the real social profile links.
          { label: "Instagram", href: "https://instagram.com/[handle]" },
          { label: "Facebook", href: "https://facebook.com/[page]" },
        ],
      },
    ],
    compliance:
      "CALÉIRA is a non-medical wellness studio. Services are not intended to diagnose, treat, or cure any condition.",
    // Florida law requires the MA and MM numbers here the day massage goes live.
    licenses: "",
    copyright: "© 2026 CALÉIRA Skin & Body. All rights reserved.",
    legalLinks: [
      // TODO: replace with real Privacy and Terms pages.
      { label: "Privacy", href: "#privacy" },
      { label: "Terms", href: "#terms" },
    ],
    credit: { label: "Site by GrowClientsAI" },
  },
};
