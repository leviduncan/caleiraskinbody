import { Fragment } from "react";
import kimPhoto from "@/assets/Kim01.jpg";
import { site, type ImageSlot } from "@/content/site";
import { ArchFrame } from "@/components/ui/ArchFrame";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * The founder. To reuse this section for another studio, change these values;
 * the copy below reads them. The studio name and closing line come from site.brand.
 */
const founder = {
  name: "Kim",
  years: 16,
  /** Shown as one line, joined by bullets. */
  signature: ["Skin", "Sculpt", "Wax", "Relax"],
  portrait: {
    label: "Portrait of Kim",
    image: {
      src: kimPhoto,
      alt: "Kim, smiling in a white CALÉIRA top with a pearl necklace, one hand on her hip",
      position: "50% 20%",
    },
  } satisfies ImageSlot,
};

/** Meet the founder: text left and the arch portrait right on desktop, portrait first on phones. */
export function About() {
  const { brand } = site;
  const { name, years, signature, portrait } = founder;
  return (
    <Section id="about" tone="sunk" labelledBy="about-heading">
      <div className="grid items-center gap-12 lg:grid-cols-[6fr_5fr] lg:gap-24">
        <ArchFrame
          slot={portrait}
          ratio="4 / 5"
          sizes="(min-width: 1024px) 480px, 100vw"
          showPlaceholderLabel={false}
          className="w-full max-w-[420px] lg:order-last lg:max-w-none"
        />

        <div>
          {/*
            Brand, not the usual champagne-ink: over this see-through band and the page backdrop,
            champagne-ink drops to about 3.6:1 behind the text. Brand holds 6.7:1 or better.
          */}
          <Eyebrow className="text-brand">Meet the founder</Eyebrow>
          <SectionHeading id="about-heading" className="mt-4">
            Meet {name}
          </SectionHeading>
          <div className="mt-6 max-w-[32em] space-y-4">
            <p>
              {name} has spent {years} years in massage, beauty, and wellness, and she built{" "}
              {brand.name} on one belief: taking care of yourself isn&apos;t an indulgence.
              It&apos;s how you show up.
            </p>
            <p>
              Every visit is unhurried, personal, and shaped around you. Whatever your skin
              tone, texture, or season of life, you&apos;re welcome here.
            </p>
          </div>

          {/*
            TODO(compliance): the bio mentions massage, so Florida F.S. 480.0465 applies here.
            Once issued, add Kim's MA license number, the MM establishment license number and
            the DOH-registered phone number. Until then, no license claim of any kind
            ("licensed", "LMT", "licensed esthetician") anywhere in this section.
          */}

          <div aria-hidden="true" className="mt-10 h-px w-16 bg-champagne" />
          <p className="label mt-6 tracking-[0.08em] text-brand">
            {signature.map((word, index) => (
              <Fragment key={word}>
                {index > 0 ? (
                  <>
                    {" "}
                    <span aria-hidden="true">•</span>{" "}
                  </>
                ) : null}
                {word}
              </Fragment>
            ))}
          </p>
          <p className="quote mt-3 text-brand">{brand.tagline}</p>
        </div>
      </div>
    </Section>
  );
}
