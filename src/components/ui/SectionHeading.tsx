import type { ReactNode } from "react";

interface SectionHeadingProps {
  id: string;
  className?: string;
  children: ReactNode;
}

export function SectionHeading({ id, className = "", children }: SectionHeadingProps) {
  return (
    <h2 id={id} className={`heading-1 text-balance ${className}`}>
      {children}
    </h2>
  );
}
