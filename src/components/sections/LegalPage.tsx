import type { LegalDocument } from "@/content/legal";
import { Footer } from "@/components/sections/Footer";
import { Navigation } from "@/components/sections/Navigation";
import { SkinToneBand } from "@/components/sections/SkinToneBand";
import { FloatingActions } from "@/components/ui/FloatingActions";
import { PageBackdrop } from "@/components/ui/PageBackdrop";
import { Section } from "@/components/ui/Section";

/**
 * A Privacy or Terms page: a deep title band (so the clear header reads over it),
 * then the numbered sections on a light band. Links in the header and footer point
 * back to the home page sections.
 */
export function LegalPage({ document }: { document: LegalDocument }) {
  return (
    <>
      <PageBackdrop />
      <Navigation linkBase="/" />
      <main>
        <Section
          id="legal-title"
          tone="deep"
          labelledBy="legal-heading"
          reveal={false}
          padding="pt-36 pb-16 lg:pt-48 lg:pb-24"
        >
          <p className="eyebrow text-champagne">{document.eyebrow}</p>
          <h1 id="legal-heading" className="display-lg mt-4 text-balance">
            {document.title}
          </h1>
          <p className="small mt-6 text-ink-on-deep-muted">{document.effective}</p>
        </Section>

        <Section id="legal-body" label={document.title} reveal={false} padding="py-16 lg:py-24">
          <ol className="max-w-[44em] space-y-12">
            {document.sections.map((section, index) => (
              <li key={section.heading}>
                <h2 className="heading-3 text-balance">
                  <span className="mr-3 text-champagne-ink">{index + 1}.</span>
                  {section.heading}
                </h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="mt-4 text-ink-muted">
                    {paragraph}
                  </p>
                ))}
              </li>
            ))}
          </ol>
        </Section>
      </main>
      <SkinToneBand />
      <Footer linkBase="/" />
      <FloatingActions />
    </>
  );
}
