# Portfolio — Next.js + Sanity

Editable portfolio site. Spanish at launch, Catalan and English already built and
waiting to be switched on.

## Setup

```bash
npm install
cp .env.local.example .env.local   # fill in the values below
npm run dev
```

Site: http://localhost:3000 · Studio: http://localhost:3000/studio

### Environment variables

| Variable | Where it comes from |
|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | sanity.io/manage, after creating a project |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` |
| `SANITY_REVALIDATE_SECRET` | any long random string; paste the same one into the Sanity webhook |
| `RESEND_API_KEY` | resend.com dashboard |
| `CONTACT_TO_EMAIL` | her inbox |
| `CONTACT_FROM_EMAIL` | an address on the verified sending domain |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` / `TURNSTILE_SECRET_KEY` | Cloudflare dashboard → Turnstile |

**Verify the Resend sending domain early.** It needs DNS records and propagation
is not something to discover on launch day.

## First content

In the Studio, create in this order:

1. **Ajustes** — site name, logo, default SEO
2. A **page** with `isHome` ticked — this becomes the home page
3. **Clases** — each one feeds both the Classes block and the contact dropdown
4. **Workshops** — dated events; they sort into upcoming/past on their own
5. **Menú** — add the pages that should appear in the header

The page-by-page plan is in `docs/ESTRUCTURA-INICIAL.md`.

## Publish webhook

Sanity → API → Webhooks → Create webhook

- URL: `https://yoursite.com/api/revalidate`
- Trigger on: Create, Update, Delete
- Filter: `_type in ["page","project","class","navigation","siteSettings"]`
- Secret: same as `SANITY_REVALIDATE_SECRET`

Without this, published edits won't appear until the next deploy.

## Adding a section type

Three steps, nothing else:

1. Schema in `sanity/schemas/objects/sections.ts`, and add its name to `SECTION_TYPES`
2. Component in `src/components/sections/`
3. One line in the `REGISTRY` map in `SectionRenderer.tsx`

The GROQ projection in `sanity/lib/queries.ts` also needs a `_type == "yourSection" => {...}`
clause, or the fields will come back empty.

## Turning on Catalan or English

Move the locale from `PLANNED_LOCALES` to `LOCALES` in `src/lib/i18n.ts`. That is
the whole change. Routing, the language switcher and hreflang tags are already built.

Untranslated fields fall back to Spanish rather than rendering blank, so a language
can be switched on and filled in gradually instead of all at once.

## Theme

The palette lives in one `@theme` block in `src/app/globals.css`, as semantic
roles (`--color-bg`, `--color-fg`, `--color-accent`) rather than colour names.
Components never reference a colour directly, so re-theming the site — including
back to dark — is that one block.

Current palette: chalk paper `#f5f4f1`, sumi ink `#1a1d24`, aizome indigo
`#2e3a5c`, hemp rules `#b9b3a5`. The paper is cool-grey rather than cream so
photographs of skin and rope don't pick up a yellow cast.

On a light ground the hero sets type on paper with the photograph full-bleed
below, rather than overlaying text on the image. A gradient over a photo can
darken convincingly; lightening one washes out exactly the images this site
exists to show.

## Hosting

Nothing here is Vercel-specific — Vercel and Cloudflare Pages both work, and moving
between them is a config change, not a rewrite. That portability is deliberate:

**Deploying to Vercel Pro** ($20/mo), which is the right call — Hobby is
non-commercial only, and this is commercial on two counts (paid classes, paid
developer). Pro also means a support conversation rather than a silent takedown.

Paying for Pro settles the *commercial* question. It does not settle the
*content-policy* question — Vercel's AUP language is broad enough that a
complaint could still go either way. So keep the deployment portable: standard
Next.js, no Vercel-only APIs, and Cloudflare Pages ready as a fallback. Moving
should be an afternoon, not a rebuild.

## Notes

- **Video: Vimeo by default.** YouTube routinely age-gates or removes rope content and
  its appeals process is not something to build a booking funnel on. Both providers
  work; the schema nudges toward Vimeo. Swapping to Mux later means editing one file
  (`src/components/ui/VideoEmbed.tsx`) — the schema and her workflow don't change.
- **Images** are constrained by `consentOnFile`: an image marked as showing identifiable
  people can't be published without ticking the consent box. Photographs of identifiable
  people are personal data under GDPR.
- **The rich text toolbar is deliberately small.** No font sizes, no colours, no
  alignment. She controls structure and content; the design system controls how it
  looks. Widening this is how a good-looking site becomes an ugly one.
