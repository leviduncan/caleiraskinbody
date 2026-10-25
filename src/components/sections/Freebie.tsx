import { site } from "@/content/site";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getFreebieState, getTestimonialState } from "@/lib/section-readiness";
import { FreebieForm } from "./FreebieForm";

export function Freebie() {
  const { freebie } = site;
  // Without a consent line and a working endpoint the whole section is left out.
  if (!getFreebieState().ready) return null;
  // The band before it is About (sunk), then the reviews (surface) when they show.
  // Keep the bands alternating so two of the same tone never sit side by side.
  const tone = getTestimonialState().ready ? "sunk" : "surface";
  return (
    <Section id="freebie" tone={tone} labelledBy="freebie-heading">
      <div className="grid items-center gap-10 rounded-md border border-line bg-surface-raised p-6 md:p-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionHeading id="freebie-heading">{freebie.heading}</SectionHeading>
          <p className="body-lg mt-4 text-ink-muted">{freebie.description}</p>
        </div>
        <FreebieForm
          firstNameLabel={freebie.firstNameLabel}
          emailLabel={freebie.emailLabel}
          submitLabel={freebie.submitLabel}
          consent={freebie.consent}
          endpoint={freebie.endpoint}
          successMessage={freebie.successMessage}
          errorMessage={freebie.errorMessage}
        />
      </div>
    </Section>
  );
}
