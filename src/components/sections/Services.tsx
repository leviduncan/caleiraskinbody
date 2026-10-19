import { site, type Service, type ServiceCategory } from "@/content/site";
import { BookButton } from "@/components/booking/BookButton";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

function ServiceRow({ service, comingSoon }: { service: Service; comingSoon: boolean }) {
  const { services } = site;
  return (
    <li className="border-b border-line py-7">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
        <h4 className="text-[19px] leading-7 font-medium">{service.name}</h4>
        {/* A coming-soon service shows no price and no booking link. */}
        <p className="small flex gap-3 text-ink-muted">
          <span>{service.duration}</span>
          {comingSoon || !service.price ? null : (
            <span className="font-semibold text-clay">{service.price}</span>
          )}
        </p>
      </div>

      <p className="mt-2 max-w-[34em] text-ink-muted">{service.description}</p>

      {service.idealFor ? (
        <p className="small mt-3 max-w-[36em]">
          <span className="font-medium">{services.idealForLabel}:</span> {service.idealFor}
        </p>
      ) : null}

      {comingSoon ? null : (
        <>
          {service.note ? <p className="small mt-3 font-medium">{service.note}</p> : null}
          <BookButton service={service} variant="quiet" className="mt-2">
            {services.bookLabel}
          </BookButton>
        </>
      )}
    </li>
  );
}

function CategoryBlock({ category }: { category: ServiceCategory }) {
  const { services } = site;
  const comingSoon = category.comingSoon ?? false;
  const headingId = `menu-${category.id}-heading`;
  return (
    <section
      id={`menu-${category.id}`}
      aria-labelledby={headingId}
      data-reveal=""
      className="mt-16 grid gap-8 border-t border-line-strong pt-10 lg:mt-24 lg:grid-cols-[2fr_3fr] lg:gap-24 lg:pt-16"
    >
      {/* On desktop the category stays in view while its services scroll past. */}
      <div className="flex flex-col lg:sticky lg:top-28 lg:self-start">
        {comingSoon ? <Badge>{services.comingSoonBadge}</Badge> : null}
        <h3 id={headingId} className={`heading-2 ${comingSoon ? "mt-4" : ""}`}>
          {category.name}
        </h3>
        <p className="mt-3 max-w-[24em] text-ink-muted">{category.intro}</p>
        <MediaFrame
          slot={category.image}
          ratio="4 / 3"
          sizes="(min-width: 1024px) 440px, 100vw"
          className="mt-8 rounded-md"
        />
        {comingSoon ? (
          <ButtonLink href={services.waitlist.href} variant="secondary" className="mt-8 self-start">
            {services.waitlist.label}
          </ButtonLink>
        ) : null}
      </div>

      <div>
        <ul className="border-t border-line">
          {category.services.map((service) => (
            <ServiceRow key={service.name} service={service} comingSoon={comingSoon} />
          ))}
        </ul>
        {category.note ? <p className="caption mt-6 text-ink-muted">{category.note}</p> : null}
      </div>
    </section>
  );
}

export function Services() {
  const { services } = site;
  return (
    // The menu is far taller than a screen, so each part reveals on its own rather than
    // the section as a whole: one tall block would never be seen enough to trigger.
    <Section id="services" tone="sunk" labelledBy="services-heading" reveal={false}>
      <div data-reveal="">
        <SectionHeading id="services-heading">{services.heading}</SectionHeading>
        <p className="body-lg mt-4 max-w-[30em] text-ink-muted">{services.intro}</p>

        <nav aria-label={services.jumpLabel} className="mt-6">
          <ul className="flex flex-wrap gap-x-8 gap-y-1">
            {services.categories.map((category) => (
              <li key={category.id}>
                <ButtonLink href={`#menu-${category.id}`} variant="quiet">
                  {category.name}
                </ButtonLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {services.categories.map((category) => (
        <CategoryBlock key={category.id} category={category} />
      ))}
    </Section>
  );
}
