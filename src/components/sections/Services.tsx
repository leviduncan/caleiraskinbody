import { site } from "@/content/site";
import { getMenuCategories, type MenuService } from "@/lib/services";
import { BookButton } from "@/components/booking/BookButton";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

interface Card {
  service: MenuService;
  categoryName: string;
  /** Set on the first card of a category, so the jump links have somewhere to land. */
  anchorId?: string;
}

/**
 * One service with its own photo. The photo sits on the left for the first card, on the right
 * for the second, and so on down the whole section. Below lg it is always on top.
 */
function ServiceCard({ card, index }: { card: Card; index: number }) {
  const { services } = site;
  const { service } = card;
  const imageRight = index % 2 === 1;
  return (
    <li
      id={card.anchorId}
      data-reveal=""
      className="mt-16 grid scroll-mt-28 items-center gap-8 border-t border-line-strong pt-10 first:mt-12 lg:mt-24 lg:grid-cols-2 lg:gap-24 lg:pt-16 lg:first:mt-16"
    >
      <MediaFrame
        slot={service.image}
        ratio="4 / 3"
        sizes="(min-width: 1024px) 560px, 100vw"
        className={`rounded-md ${imageRight ? "lg:order-2" : ""}`}
      />

      <div>
        <p className="small font-semibold tracking-widest text-clay uppercase">{card.categoryName}</p>
        <div className="mt-3 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
          <h3 className="heading-2">{service.name}</h3>
          <p className="small flex gap-3 text-ink-muted">
            {service.durationText ? <span>{service.durationText}</span> : null}
            {service.priceText ? <span className="font-semibold text-clay">{service.priceText}</span> : null}
          </p>
        </div>

        {service.tag ? (
          <div className="mt-2">
            <Badge>{service.tag}</Badge>
          </div>
        ) : null}

        {service.description ? (
          <p className="mt-4 max-w-[34em] text-ink-muted">{service.description}</p>
        ) : null}

        {service.idealFor ? (
          <p className="small mt-3 max-w-[36em]">
            <span className="font-medium">{services.idealForLabel}:</span> {service.idealFor}
          </p>
        ) : null}

        {service.bookable ? (
          <>
            {service.note ? <p className="small mt-3 font-medium">{service.note}</p> : null}
            <BookButton service={service} variant="quiet" className="mt-4">
              {services.bookLabel}
            </BookButton>
          </>
        ) : null}
      </div>
    </li>
  );
}

export function Services() {
  const { services } = site;
  const categories = getMenuCategories();
  // One flat list, so the left/right rhythm runs across categories by card position.
  const cards: Card[] = categories.flatMap((category) =>
    category.services.map((service, i) => ({
      service,
      categoryName: category.name,
      anchorId: i === 0 ? `menu-${category.id}` : undefined,
    })),
  );
  return (
    // The menu is far taller than a screen, so each part reveals on its own rather than
    // the section as a whole: one tall block would never be seen enough to trigger.
    <Section id="services" tone="sunk" labelledBy="services-heading" reveal={false}>
      <div data-reveal="">
        <SectionHeading id="services-heading">{services.heading}</SectionHeading>
        <p className="body-lg mt-4 max-w-[30em] text-ink-muted">{services.intro}</p>

        <nav aria-label={services.jumpLabel} className="mt-6">
          <ul className="flex flex-wrap gap-x-8 gap-y-1">
            {categories.map((category) => (
              <li key={category.id}>
                <ButtonLink href={`#menu-${category.id}`} variant="quiet">
                  {category.name}
                </ButtonLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {cards.length === 0 ? (
        <p className="mt-16 max-w-[30em] text-ink-muted">{services.emptyMessage}</p>
      ) : (
        <ol>
          {cards.map((card, index) => (
            <ServiceCard key={card.service.slug} card={card} index={index} />
          ))}
        </ol>
      )}
    </Section>
  );
}
