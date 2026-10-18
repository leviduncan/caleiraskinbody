import { site } from "@/content/site";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PhotoBackdrop } from "@/components/ui/PhotoBackdrop";
import { Section } from "@/components/ui/Section";

function MicIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="size-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="9" y="3" width="6" height="11" rx="3" />
      <path d="M5 11a7 7 0 0 0 14 0" />
      <path d="M12 18v3" />
    </svg>
  );
}

/** The booking band: the one bold, deep section. Used once, near the bottom. */
export function FinalCta() {
  const { finalCta, booking } = site;
  const { assistant } = finalCta;
  return (
    <Section
      id="book"
      tone="deep"
      labelledBy="book-heading"
      background={
        <PhotoBackdrop
          photo={finalCta.photo}
          position="object-[78%_70%] lg:object-center"
          parallax
        />
      }
      padding="pt-64 pb-24 md:pt-[22rem] lg:py-40"
    >
      <div className="max-w-xl">
        <Eyebrow className="text-champagne">{finalCta.eyebrow}</Eyebrow>
        <h2 id="book-heading" className="display-lg mt-6 max-w-[12em] text-balance">
          {finalCta.heading}
        </h2>
        <p className="body-lg mt-6 max-w-[30em] text-ink-on-deep-muted">{finalCta.subline}</p>

        <ButtonLink href={booking.url} variant="champagne" className="mt-10">
          {booking.label}
        </ButtonLink>
        <p className="small mt-6 text-ink-on-deep-muted">{finalCta.address}</p>

        <div
          id="assistant"
          className="mt-12 flex items-center gap-5 border-t border-champagne/40 pt-8"
        >
          <div className="flex size-14 shrink-0 items-center justify-center rounded-full border border-champagne text-champagne">
            <MicIcon />
          </div>
          <div className="min-w-0">
            <p className="font-medium">{assistant.title}</p>
            <p className="small mt-1 text-ink-on-deep-muted">{assistant.description}</p>
            {/* Mount point for the Sonika voice widget script. */}
            <div id={assistant.mountId} className="mt-3 empty:hidden" />
          </div>
        </div>
      </div>
    </Section>
  );
}
