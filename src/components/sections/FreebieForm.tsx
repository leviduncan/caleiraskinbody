"use client";

import type { FormEvent } from "react";
import { buttonClasses } from "@/components/ui/Button";

interface FreebieFormProps {
  firstNameLabel: string;
  emailLabel: string;
  submitLabel: string;
  consent: string;
}

const inputClass =
  "mt-2 block min-h-12 w-full rounded-sm border border-line-strong bg-surface px-4 text-[17px] text-ink";

export function FreebieForm({
  firstNameLabel,
  emailLabel,
  submitLabel,
  consent,
}: FreebieFormProps) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    // TODO: send { firstName, email } to the n8n webhook here.
    // Until the webhook exists, the form intentionally does nothing.
    event.preventDefault();
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
        className={`${buttonClasses("secondary")} w-full cursor-pointer sm:w-auto`}
      >
        {submitLabel}
      </button>
      <p className="caption text-ink-muted">{consent}</p>
    </form>
  );
}
