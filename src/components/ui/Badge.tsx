import type { ReactNode } from "react";

interface BadgeProps {
  /** Adds the tidewater ground and dot. The word still carries the status. */
  available?: boolean;
  children: ReactNode;
}

/** Small uppercase status label: Available, Coming soon. Never used for urgency. */
export function Badge({ available = false, children }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-2 self-start rounded-sm border px-3 py-1.5 text-[11px] leading-[14px] font-medium tracking-[0.22em] uppercase ${
        available
          ? "border-transparent bg-tidewater-soft text-tidewater"
          : "border-champagne-ink text-champagne-ink"
      }`}
    >
      {available ? (
        <span aria-hidden="true" className="size-1.5 rounded-full bg-current" />
      ) : null}
      {children}
    </span>
  );
}
