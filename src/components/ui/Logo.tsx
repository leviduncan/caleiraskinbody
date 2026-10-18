import Image from "next/image";
import horizontal from "@/assets/caleira-logos/svg/light/caleira-lockup-horizontal-light.svg";
import stacked from "@/assets/caleira-logos/svg/light/caleira-lockup-stacked-light.svg";
import horizontalOnDark from "@/assets/caleira-logos/svg/dark/caleira-lockup-horizontal-dark.svg";
import stackedOnDark from "@/assets/caleira-logos/svg/dark/caleira-lockup-stacked-dark.svg";

/**
 * Lockups from the logo kit.
 * horizontal: arch left, wordmark right, light set. The header once scrolled.
 * horizontal-on-dark: the same lockup from the dark set (ivory). The header over the hero photo.
 * stacked: arch above the wordmark and SKIN & BODY, light set.
 * stacked-on-dark: the same lockup from the dark set (ivory). The footer.
 */
const lockups = {
  horizontal,
  "horizontal-on-dark": horizontalOnDark,
  stacked,
  "stacked-on-dark": stackedOnDark,
};

interface LogoProps {
  lockup: keyof typeof lockups;
  /** Sizing classes. Set a height; the width follows. Lockups stay 120px wide or more. */
  className?: string;
  priority?: boolean;
}

/**
 * The artwork carries its own clear space, so no extra padding is needed around it.
 * Never recolor it, and never place it on a photo without a scrim.
 * Decorative here: the link or landmark around it supplies the name.
 */
export function Logo({ lockup, className = "", priority = false }: LogoProps) {
  return (
    <Image
      src={lockups[lockup]}
      alt=""
      priority={priority}
      className={`w-auto ${className}`}
    />
  );
}
