# CALÉIRA: remaining work (instructions for Claude Code)

Read this whole file, then `AGENTS.md`, `README.md` and the memory notes before you change anything. The site is **live** at https://caleiraskinbody.com/ (launched 2026-10-25). Every push to `main` deploys it, so treat each commit as a production release.

## Ground rules

1. **Next.js here is not the one you know.** Read the relevant guide in `node_modules/next/dist/docs/` before writing Next code (see `AGENTS.md`). The site is a static export (`output: "export"`).
2. **All copy lives in `src/content/site.ts`**, except the founder block at the top of `src/components/sections/About.tsx` and the services menu (Cal.com plus `services.config.json`).
3. **Compliance rules override design and copy choices:**
   - No invented testimonials, names, reviews, licenses, prices or credentials. If a fact is not supplied, leave the placeholder and keep the section hidden.
   - Massage is waitlist only: no price, no booking link.
   - No medical claims, outcome promises or diagnosis language. Say "guests", never "patients".
   - No em-dashes. Always write CALÉIRA in capitals with the accent.
   - License wording is limited to the real numbers in `licenses` (`src/content/site.ts`): Florida Licensed Massage Therapist MA58353 and Massage Establishment MM48209. No other credential claims, such as "licensed esthetician", unless Kim supplies them.
4. **Never invent content for a `[bracketed]` placeholder.** Items marked **NEEDS KIM** below require facts only Kim or the owner can give. Do not fill them with plausible text. Ask the user, or skip them and say so.
5. Components hold no hex values; colors and fonts come from `src/app/globals.css`. Do not add a second theme.
6. Before every commit run `npm run lint` and `npm run build`. Do not commit if either fails. If `globals.css` edits do not show in dev, stop the server, delete `.next/dev`, restart.
7. Commit in small, logical steps. Push to `main` only when the user says to deploy. Do not touch the `FTP_*` secrets or `server-dir: ./` in `.github/workflows/deploy.yml`.

## What is already done (do not redo)

Full one-page site, Cal.com booking popup and services menu, static export with image optimization, FTP deploy workflow, coming-soon page, staging-to-live swap (`SWAP.md` is a historical record), phone `(727) 292-1807`, email `hello@caleiraskinbody.com`, address, hours, the voice assistant as a phone link (`tel:+17272921807`), Kim's portrait and bio text.

Sections that hide themselves until their content is real (`src/lib/section-readiness.ts`): Testimonial, Freebie, "Read more on Google" link, and any link to `#privacy`, `#terms`, `#waitlist-todo`.

## Tasks

Work top to bottom. Tasks 1 to 3 need no outside information; do them first.

### 1. Make the docs match reality (no input needed)

`README.md` is stale in places. Fix it:
- "Still to wire up" lists the voice assistant as an empty `sonika-widget` div. Check `src/components/sections/FinalCta.tsx` and `site.ts`: the assistant is currently a phone link, and `mountId: "sonika-widget"` is an unused mount point. Decide with the user whether to keep the empty mount `div` (and the `mountId` field) or remove them, then update the README to say what is true.
- "Open placeholders" still lists phone, email, the About bio as open. Remove anything now filled in. Re-run `grep -n "\[" src/content/site.ts` to get the true list of remaining brackets.
- The README says the Freebie form's `TODO` is in `FreebieForm.tsx`. That file no longer has one: the form already posts `{ firstName, email }` as JSON to `freebie.endpoint` and the section hides until the endpoint is a real https URL. Correct the README.
- `.github/workflows/deploy.yml` still carries the commented-out "STAGING ONLY" `SITE_ENV` / `SITE_URL` lines and a stale comment. Delete those lines and mention `SWAP.md` as done. Keep `server-dir: ./` and the sync-state file name exactly as they are.
- Add a short note to `SWAP.md` or the README that `FTP_SERVER_DIR` secret is unused and can be deleted by the user in GitHub (you cannot do this).

### 2. Privacy and Terms pages (build them, but copy needs review)

The footer links `#privacy` and `#terms` are hidden because the pages do not exist.
- Add `src/app/privacy/page.tsx` and `src/app/terms/page.tsx` (static export, so they must be statically renderable; use `trailingSlash` behaviour already set in `next.config.ts`). Reuse `Navigation`, `Footer`, `PageBackdrop` and the existing typography classes; no new colors.
- Content: write a plain-language draft covering what the site actually collects: the Cal.com booking popup (third party), the Freebie email form (once live), the Google Maps embed, and phone calls to the voice assistant. Do not claim practices you cannot verify from the code. Put a visible line at the top of each file's TODO comment that **the owner must have the text reviewed before relying on it**. Do not add that disclaimer to the rendered page.
- Point the footer `legalLinks` in `site.ts` at `/privacy/` and `/terms/`, and remove `#privacy` and `#terms` from `UNBUILT_ANCHORS` in `section-readiness.ts`.
- Make sure `robots.ts` and any metadata still work; add page-level `metadata` titles.

### 3. Waitlist for massage (build the mechanism, needs one decision)

Massage is waitlist-only and the "Join the waitlist" links (Services section, FAQ "Do you offer massage?") are hidden because they point at `#waitlist-todo`.
- Ask the user which they want: (a) a small email form posting to an n8n webhook, same shape as `FreebieForm`; (b) a Cal.com/other hosted form link; (c) a mailto link to `hello@caleiraskinbody.com`. Recommend (a) if the Freebie webhook is being built anyway, otherwise (c) as the zero-infrastructure option.
- Implement it, set `services.waitlist.href` and the FAQ `link.href` in `site.ts`, and remove `#waitlist-todo` from `UNBUILT_ANCHORS` once it works.
- A waitlist collects email only. No price, no booking link, no claim massage is available. If it collects a first name or phone number, add a consent line like the Freebie form has.

### 4. Freebie lead magnet (NEEDS KIM, plus an n8n webhook)

The form is built; the content and endpoint are empty in `site.freebie`. To turn it on the user must supply: the freebie title, a one-line description, the consent line (how the email is used and how to unsubscribe), and a working https n8n webhook URL.
- Do not write the title or consent line yourself unless the user asks for a draft. If they do, keep to the copy rules above and make no outcome claims.
- If the user wants the n8n workflow built, use the n8n MCP tools (load their schemas with ToolSearch first; follow the n8n server instructions: SDK reference, node types, validate, then create). The webhook receives `{ "firstName": string, "email": string }` and must respond with a 2xx status on success, because the form treats any non-OK response as a failure. Mind CORS: the site is on `https://caleiraskinbody.com`.
- Test the real form end to end in `npm run dev` before shipping: success message, failure message, double-submit guard.

### 5. Real content that only Kim can supply (NEEDS KIM)

Do not fill these in. Collect them from the user, then enter them exactly as given:

| Item | Where |
|---|---|
| First-visit answer (arrival, studio, what to bring) | `faq.items[1]` in `site.ts` |
| Cancellation window and how to reschedule | `faq.items[3]` |
| Parking directions | `faq.items[4]` (the `TODO` comment) |
| Real Instagram and Facebook URLs | `footer.columns` "Follow"; both are hidden while they hold `[handle]` / `[page]` |
| Google Business Profile reviews URL | `experience.moreCta.href` |
| One real, unedited guest quote, attribution (first name, last initial, city), and a **signed model release** | `testimonial`; set `modelReleaseSigned: true` only when the release exists |
| DOH-registered phone (MA58353 and MM48209 are now in `footer.licenses`) | The compliance `TODO`s in `About.tsx` and `Footer.tsx`. Florida F.S. 480.0465 requires these on massage advertising the day massage goes live. Do not add any license wording before the numbers exist |
| Confirmed service menu: names, durations, prices | Cal.com event types (title format `Name - $150`) plus `services.config.json`; then `npm run services` and commit `src/data/` |
| Link for "Site by GrowClientsAI" (optional) | `footer.credit` |
| Real photos of guests/studio from the first shoot (current photos are stand-ins) | `src/assets/`, imported at the top of `site.ts`. Guest photos need model releases |

When a placeholder is filled, check the matching section appears and its links work. When it is not filled, confirm the section stays hidden rather than showing brackets.

### 6. Services pipeline in CI (small, optional)

CI builds from the committed `src/data/services.json` because `CAL_API_KEY` and `CAL_USERNAME` are not in the workflow's build env. That is safe but means the live menu only changes when someone runs `npm run services` locally and commits `src/data/`. Ask the user whether they want:
- to keep it that way (add one line to the README saying so), or
- to add `CAL_API_KEY` / `CAL_USERNAME` as GitHub secrets and pass them to the build step. The user must create the secrets; you only edit the workflow. Note a fetch failure with a key set stops the build, which is the intended behaviour.

### 7. Final quality pass before calling the project done

- `npm run lint` and `npm run build` clean; open `out/` with `npx serve out` and click through every section and link at phone, tablet and desktop widths.
- Run the `web-design-reviewer` or `design:accessibility-review` skill over the built page: keyboard focus, contrast (the About section is sensitive: see the comment in `About.tsx`), the Cal.com popup, reduced-motion behavior.
- Check no `[` placeholder text leaks into rendered HTML: `grep -o "\[[^]]*\]" out/index.html` should show nothing that reads as a placeholder.
- Search the rendered text for em-dashes, "patient", "licensed", "cure", "treat" and any outcome language.
- Add basic SEO checks: title, description, Open Graph image if the user supplies one, `robots.txt` allowing all, and (optional, ask first) a `sitemap.xml` once Privacy and Terms exist. Do not add `LocalBusiness` schema with license or review data you cannot source.

## Deploying and verifying

1. Only after the user says to ship: `git push origin main`. This runs lint, build and the FTPS upload (about 20 to 55 seconds).
2. `gh` is not installed. Check the run with the public API:
   `curl -s "https://api.github.com/repos/leviduncan/caleiraskinbody/actions/runs?head_sha=<sha>"` and `/actions/runs/<id>/jobs` for steps.
3. This machine cannot resolve the domain through DNS. Check the live site with
   `curl --resolve caleiraskinbody.com:443:190.92.171.214 -sI https://caleiraskinbody.com/`.
4. If the live site shows old files or 404s, the FTP root is `public_html/caleira` (the live docroot); never use an absolute `/public_html/` path. To force a full upload, rename `state-name` in the workflow (bump the number).
5. Screenshots: use headless Edge (the recipe in the memory note "Caleira headless screenshots"); Chrome, hashes and tall windows do not work.

## Definition of done

- Tasks 1 to 3 shipped; Privacy, Terms and Waitlist links are live and no longer in `UNBUILT_ANCHORS`.
- Every NEEDS KIM item is either entered exactly as supplied or still hidden with no placeholder text visible on the live page.
- Lint and build pass, live site verified after the last deploy, and `README.md` accurately lists whatever is still open.
- Report to the user, plainly, what was done, what was skipped, and which items are still waiting on Kim.
