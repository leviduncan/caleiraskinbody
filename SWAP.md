# Staging to launch swap

Docroot layout (swapped in cPanel):

| Domain | Docroot | Holds |
|---|---|---|
| caleiraskinbody.com (live) | `stage_caleira` | the hand-uploaded `coming-soon/index.html` |
| staging.caleiraskinbody.com | `public_html` | the full site, deployed by CI |

CI deploys to `public_html` only. It must never write to `stage_caleira`; a guard step in the workflow fails the run if it is ever pointed there.

## Staging changes

| # | File | Staging value | At launch |
|---|------|---------------|-----------|
| 1 | `.github/workflows/deploy.yml`, `server-dir` | `/public_html/` | stays `/public_html/` (the docroots are swapped instead) |
| 2 | `.github/workflows/deploy.yml`, build step `env` | `SITE_ENV: staging` and `SITE_URL: https://staging.caleiraskinbody.com` | delete both lines |
| 3 | `.github/workflows/deploy.yml`, "Guard deploy target" step | fails if `server-dir` is `/stage_caleira/` | leave in place until the swap is done, then optionally delete |
| 4 | `src/config/site-env.ts`, `src/app/robots.ts`, `src/app/layout.tsx` | read the flags above | leave as is. With no flags: `SITE_URL` is `https://caleiraskinbody.com`, no noindex meta, robots.txt allows all |
| 5 | GitHub secret `FTP_SERVER_DIR` | ignored by the workflow | delete it (optional) |

The live domain was not hardcoded anywhere else (no canonical, sitemap or Open Graph URLs). The `hello@caleiraskinbody.com` mailto links stay as they are.

## Launch steps

1. Edit `.github/workflows/deploy.yml`: delete the two staging env lines (`SITE_ENV`, `SITE_URL`) from the build step. Keep `server-dir: /public_html/`.
2. Commit and push to `main` (or run the workflow from the Actions tab). This rebuilds without the staging flags and deploys to `public_html`.
3. Check the build output at https://staging.caleiraskinbody.com: view source shows no `noindex`, and `/robots.txt` shows `Allow: /`.
4. In cPanel, swap the two docroots (do this yourself):
   - Domains, then find `caleiraskinbody.com`, Manage, set its document root to `public_html`.
   - Domains, then find `staging.caleiraskinbody.com`, Manage, set its document root to `stage_caleira`.
   - Between the two edits one domain briefly points at the wrong folder; do them back to back.
5. Load https://caleiraskinbody.com and confirm the full site. Staging now shows the coming-soon page.
6. Password-protect or remove staging: cPanel, then Directory Privacy on `stage_caleira`, or delete the subdomain and folder.
7. Optionally delete the "Guard deploy target" step, now that CI deploys to the live folder.

## Rollback (back to coming soon)

1. In cPanel, swap the docroots back: `caleiraskinbody.com` to `stage_caleira`, `staging.caleiraskinbody.com` to `public_html`.
2. Revert the launch commit (`git revert <sha>`) and push, so the staging flags return and the staging site is noindex again.
