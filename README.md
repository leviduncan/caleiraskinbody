# CALÉIRA Skin & Body: website

A one-page site built with Next.js (App Router), TypeScript (strict) and Tailwind CSS, styled from the CALÉIRA design system (v1, proposed). It exports to plain static files for shared hosting.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
```

If a change to `src/app/globals.css` does not show up, stop the dev server, delete the `.next/dev` folder and start it again. The dev cache can hold on to an old stylesheet.

## Edit the copy

Every word on the page lives in **`src/content/site.ts`**. Components only read from it.

- The interfaces at the top of the file describe the shape each section expects.
- The `site` object at the bottom holds the actual copy.
- The founder section is not in `site.ts` either. Its name, years in practice, signature line and portrait slot sit in the `founder` object at the top of `src/components/sections/About.tsx`. Keep its photo slot empty until the model release is signed.
- The Services menu is not in `site.ts`. It is built from Cal.com plus `services.config.json` (see **Services menu** below).
- Every "Book" button opens the Cal.com popup. The account name comes from `CAL_USERNAME` at build time; the embed namespace lives in `src/config/cal.ts`.
- Photos live in `src/assets/` and are imported at the top of `site.ts`. To change one, import the new file and set it on the slot: `image: { src: newPhoto, alt: "...", position: "60% center" }`. `position` controls the crop inside arch frames. A slot with no `image` shows a warm placeholder block.

## Brand

Colors, fonts, radii and type styles come from the design system and are defined once, at the top of `src/app/globals.css`. Components contain no hex values. To re-skin the site, change the primitives and fonts there.

- Display type is Bodoni Moda, pinned to its small-size cut. Text is Jost. Both load in `src/app/layout.tsx`.
- Logos come from the kit in `src/assets/caleira-logos/` (see its README for the rules). The header uses the horizontal lockup and the footer the stacked one, both from the light set, through `src/components/ui/Logo.tsx`. The favicons in `src/app/` are the kit's light icon.
- Only the light (Coquina) theme is built. The Evening theme in the design system is not.

## Services menu (Cal.com)

The menu is built at build time from two sources, then merged:

1. **Cal.com** supplies name, duration, booking link and price for every public event type. `scripts/fetch-services.mjs` calls `GET https://api.cal.com/v2/event-types` and writes `src/data/services.json` (committed, so it is the "last good" copy).
2. **`services.config.json`** supplies what Cal.com cannot: category order and intro, the category photo and its alt text, approved description copy, "Ideal for" line, optional price text, optional tag, and `status`. The order of slugs in each category is the order on the page.

`scripts/build-services.mjs` merges them into `src/data/services.merged.json` and `src/data/service-images.ts` (both generated, committed). `npm run dev` and `npm run build` run both steps first. Run them alone with `npm run services`.

**Setup:** copy `.env.example` to `.env.local` and set `CAL_API_KEY` (Cal.com, Settings, Developer, API keys) and `CAL_USERNAME` (the name in `cal.com/<username>`, not an email). The key is read only by the build scripts and never reaches the browser. In CI, add `CAL_API_KEY` and `CAL_USERNAME` to the build step's environment, otherwise CI uses the committed `services.json`.

**Add a service:** create a public event type in Cal.com, title it `Name - $150` (the price suffix is read as the price, since Cal.com's own price field is 0 without Stripe), then add its slug to a category's `services` list and an entry under `services` in `services.config.json`. Write the description there. Run `npm run services` and check the warnings.

**Refresh:** `npm run services`, then commit `src/data/`.

**What never renders, by design**
- Hidden Cal.com event types, and event types not listed in the config. The build prints which ones were left off.
- A Cal.com description that contains outcome, medical or dash wording, unless the config supplies approved copy. The build warns when it holds one back.
- Any price, link or Book button on a `coming-soon` service or inside a `comingSoon` category. These entries are local only and ignore Cal.com. `guard.neverBookable` stops the build if a massage-like service is not coming soon.
- `dormant` in `services.config.json` parks services and categories that should not render (massage, body, facial sculpt, executive grooming). Move an entry back into `categories` and `services` to restore it. Each service carries its own `image`; cards alternate photo left and right by position down the page.
- If the API fails while `CAL_API_KEY` is set, the fetch prints a loud "SERVICES MAY BE STALE" banner (with the age of the cached file) and exits 1, so `dev` and `build` stop. With no key set (CI, a fresh clone) it warns and keeps the last good `services.json`.

**Reuse for another client:** new Cal.com username and key, then rewrite `services.config.json` (categories, services, photos under `src/assets/`, `guard.neverBookable`) and the copy in `site.ts`.

## Static export

`next.config.ts` sets `output: "export"`. Next's image optimizer needs a server, so instead `src/lib/image-loader.ts` points every photo at resized WebP files, and `npm run build` writes them with `scripts/optimize-images.mjs` after the export. In `npm run dev` the original photos are served.

The page backdrop is a pre-blurred, 160px copy of `light-hero.jpg` (`src/assets/backdrop-blurred.jpg`). After changing the backdrop photo, remake it with `node scripts/blur-backdrop.mjs src/assets/<photo>.jpg src/assets/backdrop-blurred.jpg`.

```bash
npm run build
```

This writes the finished site to the **`out/`** folder. Upload the contents of `out/` to your host's web root. To preview it locally:

```bash
npx serve out
```

## Still to wire up

- **Freebie form:** it does not submit. See the `TODO` in `src/components/sections/FreebieForm.tsx` for where to call the n8n webhook.
- **Voice assistant:** an empty `<div id="sonika-widget">` sits in the booking band. Add the Sonika script to load into it.
- **Waitlist button:** it points to `#waitlist-todo`. Replace `ctaHref` (and the FAQ link) in `site.ts` with a real form or page.

## Open placeholders

Everything in `[square brackets]` in `src/content/site.ts` still needs real content.

**Links**
- Cal.com account: `caleira` (set `CAL_USERNAME` in `.env.local`)
- Google reviews URL: `https://g.page/[google-business-id]`
- Instagram URL: `https://instagram.com/[handle]`
- Facebook URL: `https://facebook.com/[page]`
- Privacy page (`#privacy`) and Terms page (`#terms`)
- Waitlist link (`#waitlist-todo`)
- "Site by GrowClientsAI" has no link yet (plain text)

**Business details**
- `[Phone number]`, `[Email address]` (Visit section). The phone must match the one registered with the Florida Department of Health.
- `[Licensed [type], license # [number]]` (Kim's credentials)
- `footer.licenses` is empty. Florida law requires the MA and MM license numbers there the day massage goes live.

**Section copy**
- The service menu: names, durations and `[Price]` are placeholders until Kim confirms the final menu.
- `[Kim's bio ...]` (About)
- `[Freebie title]`, its one-line description and the consent line
- The testimonial quote and attribution. Use only a real, unedited quote with written permission.
- Three FAQ answers: first visit, cancelling, and parking directions

**Photos**
- The About arch shows a stand-in until there is a real portrait of Kim.
- The current photos are stand-ins, not CALÉIRA guests. Replace them after the first shoot.

## Copy rules this site follows

- No em-dashes.
- No medical claims, outcome promises, or diagnosis language.
- "Guests", never "patients".
- Massage is waitlist only: no price, no booking link.
- Nothing implies a license, signature, or live service that does not exist yet.
- Always CALÉIRA, in capitals with the accent.
