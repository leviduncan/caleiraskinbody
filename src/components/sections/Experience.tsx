import type { CSSProperties } from "react";
import { site } from "@/content/site";
import { ArchFrame } from "@/components/ui/ArchFrame";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Experience() {
  const { experience } = site;
  return (
    <Section id="experience" labelledBy="experience-heading">
      <SectionHeading id="experience-heading">{experience.heading}</SectionHeading>

      <ol className="mt-12 grid gap-16 md:grid-cols-3 md:gap-8 lg:gap-16">
        {experience.steps.map((step, index) => (
          <li
            key={step.number}
            data-reveal=""
            style={{ "--reveal-delay": `${index * 120}ms` } as CSSProperties}
          >
            <ArchFrame
              slot={step.image}
              ratio="4 / 5"
              sizes="(min-width: 768px) 33vw, 320px"
              className="w-full max-w-[320px] md:max-w-none"
            />
            <p className="heading-3 mt-8 text-champagne-ink">{step.number}</p>
            <h3 className="heading-3 mt-1">{step.title}</h3>
            <p className="mt-2 text-ink-muted">{step.description}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
