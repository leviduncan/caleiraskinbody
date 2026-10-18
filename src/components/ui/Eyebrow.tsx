import type { ReactNode } from "react";

interface EyebrowProps {
  /** Color class. Champagne-ink on light surfaces, champagne on deep ones. */
  className?: string;
  children: ReactNode;
}

export function Eyebrow({ className = "text-champagne-ink", children }: EyebrowProps) {
  return <p className={`eyebrow ${className}`}>{children}</p>;
}
