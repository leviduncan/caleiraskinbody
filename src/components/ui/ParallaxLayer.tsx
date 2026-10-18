"use client";

import { useEffect, useRef, type ReactNode } from "react";

/** The shift never drops below this many pixels, so short frames (phone photo bands) still move. */
const MIN_SHIFT = 40;

export interface ParallaxOptions {
  /**
   * How far the layer shifts, as a fraction of its frame's height, in either direction.
   * 0.05 is barely there; 0.3 is strong.
   */
  strength?: number;
  /**
   * Classes that set how far the layer overhangs its frame at the top and bottom,
   * for example "-top-[3%] -bottom-[46%]". More overhang means more zoom, and the
   * split between top and bottom decides which part of the photo shows at rest.
   * Leave it out and the layer overhangs evenly by just enough to cover its shift.
   *
   * Only override this for a frame at the very top of the page: there the strip the
   * photo uncovers is always scrolled off screen, so no top overhang is needed.
   * Anywhere else an uneven overhang can show a gap.
   */
  overhang?: string;
}

/**
 * Drifts its contents slower than the page as its section scrolls past.
 * The frame around it must clip overflow.
 * Still for visitors who prefer reduced motion.
 */
export function ParallaxLayer({
  strength = 0.05,
  overhang,
  children,
}: ParallaxOptions & { children: ReactNode }) {
  const layer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = layer.current;
    const frame = element?.parentElement;
    if (!element || !frame) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let queued = 0;
    const update = () => {
      queued = 0;
      const rect = frame.getBoundingClientRect();
      // -1 when the frame is a screen above center, 0 when centered, 1 when a screen below.
      const offset = (rect.top + rect.height / 2 - window.innerHeight / 2) / window.innerHeight;
      const clamped = Math.max(-1, Math.min(1, offset));
      const shift = -clamped * Math.max(strength * rect.height, MIN_SHIFT);
      element.style.transform = `translate3d(0, ${shift.toFixed(1)}px, 0)`;
    };
    const requestUpdate = () => {
      if (!queued) queued = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    return () => {
      cancelAnimationFrame(queued);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, [strength]);

  // Default: whichever is larger, the proportional overhang or enough to cover the minimum shift.
  const even = `min(${-(strength + 0.01) * 100}%, ${-(MIN_SHIFT + 8)}px)`;
  return (
    <div
      ref={layer}
      className={`absolute inset-x-0 will-change-transform ${overhang ?? ""}`}
      style={overhang ? undefined : { top: even, bottom: even }}
    >
      {children}
    </div>
  );
}
