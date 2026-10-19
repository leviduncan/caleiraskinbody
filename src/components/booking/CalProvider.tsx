"use client";

import { useEffect } from "react";
import { getCalApi } from "@calcom/embed-react";
import { CAL_NAMESPACE } from "@/config/cal";

/** Champagne is a light color, so the text on it is dark cocoa. */
const brand = {
  "cal-brand": "#C8A675",
  "cal-brand-text": "#2A1A13",
};

/** Sets up the Cal.com popup once. Every BookButton opens it through data attributes. */
export function CalProvider() {
  useEffect(() => {
    let cancelled = false;
    let trigger: HTMLElement | null = null;

    // Cal closes the popup without moving focus, so remember the button and give focus back.
    const rememberTrigger = (event: Event) => {
      trigger = (event.target as Element).closest<HTMLElement>("[data-cal-link]");
    };
    document.addEventListener("click", rememberTrigger, true);

    getCalApi({ namespace: CAL_NAMESPACE })
      .then((cal) => {
        if (cancelled) return;
        cal("on", {
          action: "__closeIframe",
          callback: () => trigger?.focus(),
        });
        cal("ui", {
          theme: "dark",
          hideEventTypeDetails: false,
          layout: "month_view",
          cssVarsPerTheme: { dark: brand, light: brand },
        });
      })
      .catch(() => {
        // If the script is blocked the buttons simply do nothing; the page still works.
      });
    return () => {
      cancelled = true;
      document.removeEventListener("click", rememberTrigger, true);
    };
  }, []);

  return null;
}
