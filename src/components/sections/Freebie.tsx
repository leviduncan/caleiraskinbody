import { site } from "@/content/site";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FreebieForm } from "./FreebieForm";

export function Freebie() {
  const { freebie } = site;
  return (
    <Section id="freebie" tone="sunk" labelledBy="freebie-heading">
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
        />
      </div>
    </Section>
  );
}
