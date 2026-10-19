import { site } from "@/content/site";
import { BookButton } from "@/components/booking/BookButton";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PhotoBackdrop } from "@/components/ui/PhotoBackdrop";
import { Section } from "@/components/ui/Section";

export function Hero() {
  const { hero } = site;
  const accentAt = hero.headlineAccent ? hero.headline.indexOf(hero.headlineAccent) : -1;
  const accentEnd = accentAt + (hero.headlineAccent?.length ?? 0);
  return (
    <Section
      id="hero"
      tone="deep"
      labelledBy="hero-heading"
      // The hero has its own entrance (settle-in) and is on screen at load.
      reveal={false}
      background={
        <PhotoBackdrop
          photo={hero.photo}
          alternates={hero.photoAlternates}
          position="object-[100%_30%]"
          bandHeight="h-[48svh] min-h-72 md:h-[62svh]"
          // Strong drift, with the photo zoomed about 20%. On desktop nearly all the extra
          // height hangs below the frame, which sets the guest's face lower on the screen.
          parallax={{
            strength: 0.3,
            overhang: "-top-[10%] -bottom-[12%] lg:-top-[2%] lg:-bottom-[18%]",
          }}
          priority
        />
      }
      padding="pt-64 pb-20 md:pb-24 lg:py-32"
      // Fills the screen. On phones the copy sits at the bottom, under the photo band.
      className="flex min-h-svh flex-col justify-end lg:justify-center"
    >
      <div className="settle-in max-w-2xl">
        <Eyebrow className="text-champagne">{hero.eyebrow}</Eyebrow>
        <h1 id="hero-heading" className="display-xl mt-6 text-ink-on-deep text-balance">
          {accentAt < 0 ? (
            hero.headline
          ) : (
            <>
              {hero.headline.slice(0, accentAt)}
              <em className="text-champagne italic">{hero.headlineAccent}</em>
              {hero.headline.slice(accentEnd)}
            </>
          )}
        </h1>
        <p className="body-lg mt-8 max-w-[30em] text-ink-on-deep">{hero.subhead}</p>

        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
          <BookButton variant="champagne">
            {hero.primaryCtaLabel}
          </BookButton>
          <ButtonLink href={hero.secondaryCta.href} variant="quiet-on-deep">
            {hero.secondaryCta.label}
          </ButtonLink>
        </div>
      </div>
    </Section>
  );
}
