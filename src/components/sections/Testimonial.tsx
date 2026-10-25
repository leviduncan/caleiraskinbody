import { site } from "@/content/site";
import { ButtonLink } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { getTestimonialState } from "@/lib/section-readiness";

/** One real guest quote, with the disclaimer directly beneath it. No stars, no carousel. */
export function Testimonial() {
  const { testimonial } = site;
  const { ready, linkReady } = getTestimonialState();
  // Not ready: no wrapper, no band, no link. The page closes up around it.
  if (!ready) return null;
  return (
    <Section id="reviews" label={testimonial.label}>
      <figure className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <span
          aria-hidden="true"
          className="quote text-[64px] leading-[0.6] text-champagne-ink not-italic"
        >
          “
        </span>
        <blockquote className="quote mt-4 max-w-[28em] text-balance">
          {testimonial.quote}
        </blockquote>
        <figcaption className="eyebrow mt-6 text-ink-muted">{testimonial.attribution}</figcaption>
        <p className="caption mt-3 text-ink-muted">{testimonial.disclaimer}</p>
        {linkReady ? (
          <ButtonLink
            href={testimonial.moreCta.href}
            variant="quiet"
            external
            className="mt-8"
          >
            {testimonial.moreCta.label}
          </ButtonLink>
        ) : null}
      </figure>
    </Section>
  );
}
