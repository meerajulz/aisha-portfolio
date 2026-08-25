# Next steps — Aisha portfolio

_Last updated: 2026-08-25_

## Where we are ✅
- Root layout fixed — route groups `(site)` and `(studio)`, each with its own `<html>`.
- `npm install` + `npm run build` are **green**.
- Sanity connected: project `uukvw5t4`, dataset **`26production`** (public), CORS for `localhost:3000` added.
- Studio works at `/studio`; site renders content (`/`, `/sobre-mi`, `/classes`, `/test`).

## To do next
1. **Switch Sanity plan to Free** (sanity.io/manage → Aisha → Settings/Plan) — avoids charges after the 30-day Growth Trial.
2. **Step 3 — SEO files:** `app/sitemap.ts` + `app/robots.ts`, generated from Sanity page/project docs, respecting the `seo.noIndex` flag.
3. **Step 4 — Draft Mode:** let the client preview unpublished edits. Needs a **Viewer token** from Sanity (API → Tokens) → put in `SANITY_API_READ_TOKEN`.
4. **Deploy + revalidate webhook** so publish → live is automatic:
   - Deploy to any host (stay portable — no Vercel-only APIs).
   - Set `SANITY_REVALIDATE_SECRET` (random string) in the host env and in the Sanity webhook.
   - Sanity → API → Webhooks → URL `https://<domain>/api/revalidate`, triggers Create/Update/Delete, filter `_type in ["page","project","class","navigation","siteSettings"]`. Route already built at `src/app/api/revalidate/route.ts`.
5. **Content entry** via Studio, following `docs/ESTRUCTURA-INICIAL.md`.

## How to run it (dev)
```bash
cd ~/Documents/AishaApp/portfolio
npm run dev          # http://localhost:3000  (studio at /studio)
```
If a published change doesn't show locally: `rm -rf .next && npm run dev` (dev cache; production uses the webhook above).

## Machine notes / gotchas
- Dataset is named `26production`, **not** `production`.
- Don't use the Sanity **CLI** / `npm create sanity` on this machine — esbuild native-binary bug. Use the **web console** (sanity.io/manage).
- Empty content → routes 404 by design (they call `notFound()`), not a bug.

## Constraints — do not "improve" these away
- Rich-text toolbar in `sanity/schemas/objects/richText.ts` stays limited (no font size/colour/alignment).
- Colours are semantic tokens in `globals.css` — components never use hex/palette names directly.
- No Vercel-only APIs — deployment stays portable.
