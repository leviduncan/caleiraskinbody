import { site } from "@/content/site";
import { ButtonLink } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Visit() {
  const { visit } = site;
  return (
    <Section id="visit" labelledBy="visit-heading">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionHeading id="visit-heading">{visit.heading}</SectionHeading>
          <dl className="mt-10 space-y-8">
            {visit.details.map((detail) => (
              <div key={detail.label}>
                <dt className="eyebrow text-champagne-ink">{detail.label}</dt>
                <dd className="body-lg mt-2">
                  {detail.lines.map((line) =>
                    typeof line === "string" ? (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ) : (
                      <span key={line.href} className="block">
                        <a
                          href={line.href}
                          className="underline decoration-champagne-ink underline-offset-4 transition-colors duration-400 hover:text-champagne-ink"
                        >
                          {line.label}
                        </a>
                      </span>
                    ),
                  )}
                </dd>
              </div>
            ))}
          </dl>
          <ButtonLink href={visit.map.directions.href} variant="quiet" external className="mt-8">
            {visit.map.directions.label}
          </ButtonLink>
        </div>

        <div className="h-[360px] w-full overflow-hidden rounded-md border border-line bg-surface-sunk lg:h-full lg:min-h-[440px]">
          <iframe
            title={visit.map.title}
            src={visit.map.embedUrl}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="size-full border-0"
          />
        </div>
      </div>
    </Section>
  );
}
