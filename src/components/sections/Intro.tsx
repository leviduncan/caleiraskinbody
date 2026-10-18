import { site } from "@/content/site";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Intro() {
  const { intro } = site;
  return (
    <Section id="intro" labelledBy="intro-heading">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-24">
        <div>
          <SectionHeading id="intro-heading">{intro.heading}</SectionHeading>
          <p className="body-lg mt-6 max-w-[30em] text-ink-muted">{intro.body}</p>
        </div>

        <ul className="border-t border-line">
          {intro.pillars.map((pillar) => (
            <li key={pillar.title} className="border-b border-line py-6">
              <h3 className="heading-3">{pillar.title}</h3>
              <p className="mt-2 text-ink-muted">{pillar.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
