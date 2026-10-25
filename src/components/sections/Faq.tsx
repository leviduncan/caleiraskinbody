import { site } from "@/content/site";
import { ButtonLink } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getFreebieState, getTestimonialState, isLinkLive, isReady } from "@/lib/section-readiness";

function PlusIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="size-5 shrink-0 text-champagne-ink transition-transform duration-400 group-open:rotate-45"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    >
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

export function Faq() {
  const { faq } = site;
  // Alternate with the band above it: About is sunk, the reviews are surface, and the
  // freebie is sunk after the reviews or surface without them.
  const freebie = getFreebieState().ready;
  const reviews = getTestimonialState().ready;
  const above = freebie ? (reviews ? "sunk" : "surface") : reviews ? "surface" : "sunk";
  return (
    <Section id="faq" tone={above === "sunk" ? "surface" : "sunk"} labelledBy="faq-heading">
      <div className="grid gap-10 lg:grid-cols-[2fr_3fr] lg:gap-24">
        <div>
          <SectionHeading id="faq-heading">{faq.heading}</SectionHeading>
          <p className="body-lg mt-4 max-w-[24em] text-ink-muted">{faq.intro}</p>
        </div>

        <div className="border-t border-line">
          {faq.items.filter((item) => isReady(item.answer)).map((item, index) => (
            <details
              key={item.question}
              open={index === 0}
              className="group border-b border-line"
            >
              <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 py-4 text-[19px] leading-7 font-medium [&::-webkit-details-marker]:hidden">
                {item.question}
                <PlusIcon />
              </summary>
              <div className="max-w-[34em] pb-6 pr-10">
                <p className="text-ink-muted">{item.answer}</p>
                {item.link && isLinkLive(item.link.href) ? (
                  <ButtonLink href={item.link.href} variant="quiet" className="mt-2">
                    {item.link.label}
                  </ButtonLink>
                ) : null}
              </div>
            </details>
          ))}
        </div>
      </div>
    </Section>
  );
}
