"use client";

import { useState, type FormEvent } from "react";
import { buttonClasses } from "@/components/ui/Button";

interface FreebieFormProps {
  firstNameLabel: string;
  emailLabel: string;
  submitLabel: string;
  /** How the email is used and how to unsubscribe. Always shown with the form. */
  consent: string;
  /** The n8n webhook URL. The section only renders when this is a working https URL. */
  endpoint: string;
  successMessage: string;
  errorMessage: string;
}

type Status = "idle" | "sending" | "sent" | "failed";

const inputClass =
  "mt-2 block min-h-12 w-full rounded-sm border border-line-strong bg-surface px-4 text-[17px] text-ink";

export function FreebieForm({
  firstNameLabel,
  emailLabel,
  submitLabel,
  consent,
  endpoint,
  successMessage,
  errorMessage,
}: FreebieFormProps) {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;
    const data = new FormData(event.currentTarget);
    setStatus("sending");
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName: data.get("firstName"), email: data.get("email") }),
      });
      setStatus(response.ok ? "sent" : "failed");
    } catch {
      setStatus("failed");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="freebie-first-name" className="label">
          {firstNameLabel}
        </label>
        <input
          id="freebie-first-name"
          name="firstName"
          type="text"
          autoComplete="given-name"
          required
          className={inputClass}
        />
      </div>
      <div>
        <label htmlFor="freebie-email" className="label">
          {emailLabel}
        </label>
        <input
          id="freebie-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className={inputClass}
        />
      </div>
      <button
        type="submit"
        disabled={status === "sending" || status === "sent"}
        className={`${buttonClasses("secondary")} w-full cursor-pointer sm:w-auto`}
      >
        {submitLabel}
      </button>
      <p role="status" className="small min-h-7 text-ink-muted">
        {status === "sent" ? successMessage : status === "failed" ? errorMessage : ""}
      </p>
      <p className="caption text-ink-muted">{consent}</p>
    </form>
  );
}
