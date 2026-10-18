"use client";

import { useEffect } from "react";

/**
 * Fades in anything marked `data-reveal` the first time it scrolls into view.
 * The motion itself lives in globals.css, which also switches it off for
 * visitors who prefer reduced motion. Renders nothing.
 */
export function RevealOnScroll() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            observer.unobserve(entry.target);
          }
        }
      },
      // Start a little after the element enters, so the fade is seen rather than missed.
      { rootMargin: "0px 0px -12% 0px", threshold: 0.08 },
    );

    for (const element of document.querySelectorAll("[data-reveal]")) {
      observer.observe(element);
    }
    return () => observer.disconnect();
  }, []);

  return null;
}
