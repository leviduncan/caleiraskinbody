import type { ReactNode } from "react";

type Tone = "surface" | "sunk" | "deep";

interface SectionProps {
  id: string;
  tone?: Tone;
  /** id of the heading inside, used to name the landmark. */
  labelledBy?: string;
  /** Names the landmark when the section has no visible heading. */
  label?: string;
  /** Vertical padding classes. Sections breathe: 96px on phones, 160px on desktop. */
  padding?: string;
  className?: string;
  /** Fade the contents in when the section scrolls into view. On by default. */
  reveal?: boolean;
  /** Full-bleed layer rendered behind the container, for example a photo. */
  background?: ReactNode;
  children: ReactNode;
}

// The light tones are slightly see-through so the blurred page backdrop shows as warm color.
const tones: Record<Tone, string> = {
  surface: "bg-surface/75 text-ink",
  sunk: "bg-surface-sunk/75 text-ink",
  deep: "tone-deep bg-surface-deep text-ink-on-deep",
};

/** Full-width band with the shared 1200px container. */
export function Section({
  id,
  tone = "surface",
  labelledBy,
  label,
  padding = "py-24 lg:py-40",
  className = "",
  reveal = true,
  background,
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      aria-label={label}
      className={`${tones[tone]} ${background ? "relative isolate overflow-hidden" : ""}`}
    >
      {background ? (
        <div aria-hidden="true" className="absolute inset-0 -z-10">
          {background}
        </div>
      ) : null}
      <div
        className={`container-x ${padding} ${className}`}
        {...(reveal ? { "data-reveal": "" } : {})}
      >
        {children}
      </div>
    </section>
  );
}
