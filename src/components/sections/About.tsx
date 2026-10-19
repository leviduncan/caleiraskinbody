import { site } from "@/content/site";
import { ArchFrame } from "@/components/ui/ArchFrame";
import { BookButton } from "@/components/booking/BookButton";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function About() {
  const { about } = site;
  return (
    <Section id="about" tone="sunk" labelledBy="about-heading">
      <div className="grid items-center gap-12 lg:grid-cols-[5fr_6fr] lg:gap-24">
        <ArchFrame
          slot={about.portrait}
          ratio="4 / 5"
          sizes="(min-width: 1024px) 480px, 100vw"
          className="w-full max-w-[420px] lg:max-w-none"
        />

        <div>
          <Eyebrow>{about.eyebrow}</Eyebrow>
          <SectionHeading id="about-heading" className="mt-4">
            {about.heading}
          </SectionHeading>
          <div className="mt-6 max-w-[32em] space-y-4">
            {about.bio.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <p className="caption mt-6 text-ink-muted">{about.credentials}</p>
          <BookButton variant="secondary" className="mt-8">
            {about.ctaLabel}
          </BookButton>
        </div>
      </div>
    </Section>
  );
}
