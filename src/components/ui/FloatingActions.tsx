"use client";

import { useSyncExternalStore, type ReactNode } from "react";
import { site } from "@/content/site";

/** How far the page scrolls before the back-to-top button appears. */
const SHOW_AFTER = 600;

function subscribeToScroll(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
}

const button =
  "inline-flex size-12 items-center justify-center rounded-sm border border-line-strong bg-surface-raised text-ink transition duration-400 hover:border-ink";

function Icon({ children }: { children: ReactNode }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="size-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  );
}

/**
 * The buttons pinned to the bottom-right corner.
 * Back to top: every screen size, once the page has scrolled.
 * Voice assistant: phones only, always there. It rests in the corner and
 * moves up to sit above the back-to-top button when that one appears.
 */
export function FloatingActions() {
  const { assistant } = site.finalCta;
  const scrolled = useSyncExternalStore(
    subscribeToScroll,
    () => window.scrollY > SHOW_AFTER,
    () => false,
  );

  return (
    <div className="fixed right-4 bottom-4 z-30 flex flex-col gap-3 md:right-8 md:bottom-8">
      <a
        href={assistant.href}
        aria-label={assistant.buttonLabel}
        className={`${button} md:hidden ${scrolled ? "" : "translate-y-15"}`}
      >
        <Icon>
          <rect x="9" y="3" width="6" height="11" rx="3" />
          <path d="M5 11a7 7 0 0 0 14 0" />
          <path d="M12 18v3" />
        </Icon>
      </a>

      <a
        href="#top"
        aria-label="Back to top"
        aria-hidden={!scrolled}
        tabIndex={scrolled ? undefined : -1}
        className={`${button} ${scrolled ? "opacity-100" : "pointer-events-none opacity-0"}`}
      >
        <Icon>
          <path d="M12 19V5M6 11l6-6 6 6" />
        </Icon>
      </a>
    </div>
  );
}
