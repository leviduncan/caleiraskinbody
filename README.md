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
- Services are an array (`site.services.items`). A service is either `kind: "bookable"` (has a duration and price and uses the Cal.com link) or `kind: "waitlist"` (no price, no booking link).
- Every "Book" button reads one field: `site.booking.url`.
- Photos live in `src/assets/` and are imported at the top of `site.ts`. To change one, import the new file and set it on the slot: `image: { src: newPhoto, alt: "...", position: "60% center" }`. `position` controls the crop inside arch frames. A slot with no `image` shows a warm placeholder block.

## Brand

Colors, fonts, radii and type styles come from the design system and are defined once, at the top of `src/app/globals.css`. Components contain no hex values. To re-skin the site, change the primitives and fonts there.

- Display type is Bodoni Moda, pinned to its small-size cut. Text is Jost. Both load in `src/app/layout.tsx`.
- Logos come from the kit in `src/assets/caleira-logos/` (see its README for the rules). The header uses the horizontal lockup and the footer the stacked one, both from the light set, through `src/components/ui/Logo.tsx`. The favicons in `src/app/` are the kit's light icon.
- Only the light (Coquina) theme is built. The Evening theme in the design system is not.

## Static export

`next.config.ts` sets `output: "export"` and `images.unoptimized: true` (the image optimizer needs a server).

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
- Cal.com booking URL: `https://cal.com/[username]/[event]`
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
