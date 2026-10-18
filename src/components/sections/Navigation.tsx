"use client";

import { useSyncExternalStore } from "react";
import { site } from "@/content/site";
import { ButtonLink } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";

/** How far the page scrolls before the header turns from clear to glass. */
const SCROLL_THRESHOLD = 24;

function subscribeToScroll(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
}

function useScrolled() {
  return useSyncExternalStore(
    subscribeToScroll,
    () => window.scrollY > SCROLL_THRESHOLD,
    () => false,
  );
}

/**
 * Pinned header. Over the hero photo it is clear, with the ivory logo.
 * Once the page scrolls it becomes a frosted coquina bar with the mahogany logo.
 * Under 768px the links collapse; the logo and Book now stay.
 */
export function Navigation() {
  const { brand, booking, navigation } = site;
  const scrolled = useScrolled();

  return (
    // No element carries id="top": a "#top" link then scrolls to the very top of the page.
    <header
      className={`fixed inset-x-0 top-0 z-40 border-b transition-colors duration-400 ${
        scrolled
          ? "border-line bg-surface/80 backdrop-blur-md"
          : "tone-deep border-transparent bg-transparent"
      }`}
    >
      {/* A soft scrim so the ivory logo and links never sit on bare photo. */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-x-0 top-0 h-32 bg-linear-to-b from-scrim/70 to-transparent transition-opacity duration-400 ${
          scrolled ? "opacity-0" : "opacity-100"
        }`}
      />

      <div className="container-x relative flex items-center justify-between gap-4 py-1.5">
        {/* The negative margin offsets the logo's built-in clear space so the arch meets the gutter. */}
        <a
          href="#top"
          aria-label={`${brand.name} ${brand.descriptor}, back to top`}
          className="relative -ml-2.5 inline-flex shrink-0 items-center md:-ml-3.5 lg:-ml-4"
        >
          <Logo
            lockup="horizontal"
            priority
            className={`h-10 transition-opacity duration-400 min-[360px]:h-13 md:h-16 lg:h-20 ${
              scrolled ? "opacity-100" : "opacity-0"
            }`}
          />
          <Logo
            lockup="horizontal-on-dark"
            priority
            className={`absolute inset-0 h-10 transition-opacity duration-400 min-[360px]:h-13 md:h-16 lg:h-20 ${
              scrolled ? "opacity-0" : "opacity-100"
            }`}
          />
        </a>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex gap-5">
            {navigation.links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`inline-flex min-h-11 min-w-11 items-center justify-center px-1.5 text-xs font-medium tracking-[0.2em] uppercase transition-colors duration-400 ${
                    scrolled
                      ? "text-ink hover:text-champagne-ink"
                      : "text-ink-on-deep hover:text-champagne"
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <ButtonLink
          href={booking.url}
          variant={scrolled ? "primary" : "champagne"}
          // Slightly narrower on phones so the larger logo fits beside it.
          className="shrink-0 whitespace-nowrap max-[359px]:px-4 min-[360px]:max-sm:px-5"
        >
          {booking.label}
        </ButtonLink>
      </div>
    </header>
  );
}
