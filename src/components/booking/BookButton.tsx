"use client";

import type { ReactNode } from "react";
import type { MenuService } from "@/lib/services";
import { buttonClasses, type ButtonVariant } from "@/components/ui/Button";
import { CAL_NAMESPACE, CAL_USERNAME } from "@/config/cal";

export interface BookButtonProps {
  /** Leave out for the general booking button, which opens the whole Cal.com page. */
  service?: Pick<MenuService, "name" | "bookable" | "calLink">;
  /** Open one specific Cal.com event, such as "caleira/15min". Wins over the general link. */
  calLink?: string;
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
  // A service that is not bookable never gets a link, so it can never open a popup.
  const calLink = service ? (service.bookable ? service.calLink : null) : CAL_USERNAME;
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
