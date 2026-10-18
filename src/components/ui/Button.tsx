import type { ReactNode } from "react";

/**
 * primary: the booking action, one per view.
 * secondary: outlined supporting action.
 * quiet: underlined inline link.
 * champagne and quiet-on-deep: only on the deep sections.
 */
export type ButtonVariant =
  | "primary"
  | "secondary"
  | "quiet"
  | "champagne"
  | "quiet-on-deep";

interface ButtonLinkProps {
  href: string;
  variant?: ButtonVariant;
  /** Opens in a new tab with safe rel attributes. */
  external?: boolean;
  className?: string;
  children: ReactNode;
}

const label =
  "inline-flex items-center justify-center text-center text-[13px] leading-4 font-medium uppercase tracking-[0.18em] transition-colors duration-400";

const boxed = "min-h-12 rounded-sm border px-7";
const underlined = "min-h-11 border-b";

const variants: Record<ButtonVariant, string> = {
  primary: `${boxed} border-transparent bg-brand text-on-brand hover:bg-brand-hover`,
  secondary: `${boxed} border-line-strong bg-transparent text-ink hover:border-ink`,
  quiet: `${underlined} border-champagne-ink text-ink hover:text-champagne-ink`,
  champagne: `${boxed} border-transparent bg-champagne text-cocoa hover:bg-ink-on-deep`,
  "quiet-on-deep": `${underlined} border-champagne text-ink-on-deep hover:text-champagne`,
};

/** Shared classes, for the rare real <button> (the freebie form). */
export function buttonClasses(variant: ButtonVariant = "primary") {
  return `${label} ${variants[variant]}`;
}

/** A real anchor styled as a button. */
export function ButtonLink({
  href,
  variant = "primary",
  external = false,
  className = "",
  children,
}: ButtonLinkProps) {
  return (
    <a
      href={href}
      className={`${buttonClasses(variant)} ${className}`}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
      {external ? <span className="sr-only"> (opens in a new tab)</span> : null}
    </a>
  );
}
