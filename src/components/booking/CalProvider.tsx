"use client";

import { useEffect } from "react";
import { preconnect } from "react-dom";
import { getCalApi } from "@calcom/embed-react";
import { CAL_NAMESPACE } from "@/config/cal";

/** Champagne is a light color, so the text on it is dark cocoa. */
const brand = {
  "cal-brand": "#C8A675",
  "cal-brand-text": "#2A1A13",
};

const CAL_ORIGIN = "https://app.cal.com";

/** Events that show a guest is about to book, so the Cal.com script is worth loading. */
const INTENT_EVENTS = ["pointerover", "focusin", "touchstart"] as const;

const bookButtonFrom = (event: Event) =>
  (event.target as Element | null)?.closest?.<HTMLElement>("[data-cal-link]") ?? null;

/**
 * Sets up the Cal.com popup. Every BookButton opens it through data attributes.
 * The Cal.com script is heavy third-party code, so it loads only when a guest
 * reaches for a booking button, never while the page itself is loading.
 */
export function CalProvider() {
  useEffect(() => {
    let cancelled = false;
    let trigger: HTMLElement | null = null;
    let cal: ReturnType<typeof getCalApi> | null = null;
    let embedReady = false;

    const load = () => {
      if (cal) return cal;
      for (const type of INTENT_EVENTS) document.removeEventListener(type, onIntent, true);
      cal = getCalApi({ namespace: CAL_NAMESPACE });
      cal
        .then((api) => {
          if (cancelled) return;
          // Commands queue until embed.js runs; once it has, it opens the popup on its own.
          const script = document.querySelector(`script[src^="${CAL_ORIGIN}/embed/embed.js"]`);
          script?.addEventListener("load", () => (embedReady = true), { once: true });
          api("on", {
            action: "__closeIframe",
            callback: () => trigger?.focus(),
          });
          api("ui", {
            theme: "dark",
            hideEventTypeDetails: false,
            layout: "month_view",
            cssVarsPerTheme: { dark: brand, light: brand },
          });
        })
        .catch(() => {
          // If the script is blocked the buttons simply do nothing; the page still works.
        });
      return cal;
    };

    function onIntent(event: Event) {
      if (bookButtonFrom(event)) load();
    }

    // Cal closes the popup without moving focus, so remember the button and give focus back.
    // A click that lands before embed.js has run would be missed, so it is queued as a popup.
    const onClick = (event: Event) => {
      const button = bookButtonFrom(event);
      if (!button) return;
      trigger = button;
      const calLink = button.dataset.calLink;
      if (embedReady || !calLink) return;
      const config = JSON.parse(button.dataset.calConfig ?? "{}");
      load()
        .then((api) => {
          if (!cancelled) api("modal", { calLink, config });
        })
        .catch(() => {});
    };

    for (const type of INTENT_EVENTS) {
      document.addEventListener(type, onIntent, { capture: true, passive: true });
    }
    document.addEventListener("click", onClick, true);

    // Warm up the connection once the page has finished loading, so the popup opens quickly.
    const warmUp = () => preconnect(CAL_ORIGIN);
    if (document.readyState === "complete") warmUp();
    else window.addEventListener("load", warmUp, { once: true });

    return () => {
      cancelled = true;
      for (const type of INTENT_EVENTS) document.removeEventListener(type, onIntent, true);
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("load", warmUp);
    };
  }, []);

  return null;
}
