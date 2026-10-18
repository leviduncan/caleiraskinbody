"use client";

import type { ReactNode } from "react";
import type { Service } from "@/content/site";
import { buttonClasses, type ButtonVariant } from "@/components/ui/Button";
import { CAL_NAMESPACE, CAL_USERNAME, getCalLink } from "@/config/cal";

export interface BookButtonProps {
  /** Leave out for the general booking button, which opens the whole Cal.com page. */
  service?: Pick<Service, "name" | "bookable" | "calSlug">;
  variant?: ButtonVariant;
  className?: string;
  children: ReactNode;
}

const calConfig = JSON.stringify({ layout: "month_view", theme: "dark" });

/**
 * Opens the Cal.com popup. Renders nothing for a service that cannot be booked,
 * so a coming-soon service never gets a booking button.
 */
export function BookButton({ service, variant = "primary", className = "", children }: BookButtonProps) {
  const calLink = service ? getCalLink(service) : CAL_USERNAME;
  if (!calLink) return null;

  return (
    <button
      type="button"
      aria-haspopup="dialog"
      data-cal-namespace={CAL_NAMESPACE}
      data-cal-link={calLink}
      data-cal-config={calConfig}
      className={`${buttonClasses(variant)} cursor-pointer ${className}`}
    >
      {children}
      {service ? <span className="sr-only"> {service.name}</span> : null}
    </button>
  );
}
