# Kinesis Réadaptation — site vitrine

Showcase website for **Kinesis Réadaptation**, a multidisciplinary medical
center in Dakar (opening June 2026). French-only (v1), mobile-first, premium
positioning — medical expertise & personalized care.

**Art direction:** editorial premium + the animated **"fil de soin"** — a
continuous violet→green thread (`FilDeSoin.tsx`) that draws itself down the left
gutter as you scroll and links the four care poles. Desktop animates it on scroll;
mobile shows static per-section accents; `prefers-reduced-motion` draws it at once.

> Project conventions, design tokens, and anti-patterns live in [`CLAUDE.md`](./CLAUDE.md).

## Stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** (brand tokens in `tailwind.config.ts`)
- **lucide-react** (icons), **framer-motion** (subtle animations)
- **zod** (form validation), **Resend** (contact email)

## Pages

`/` · `/le-centre` · `/specialites` (4 anchored pôles) · `/equipe` · `/contact`
\+ `/mentions-legales`, `/politique-confidentialite`. Plus `sitemap.xml`,
`robots.txt`, and a generated Open Graph image.

All site copy lives in `src/content/` (`site.ts`, `specialites.ts`, `equipe.ts`,
`centre.ts`) — i18n-ready, no hardcoded copy in components.

## Local development

```bash
npm install
cp .env.example .env.local   # then fill in values
npm run dev                  # http://localhost:3000
```

```bash
npm run build && npm start   # production build
npm run lint                 # eslint
```

## Environment variables

See [`.env.example`](./.env.example). Summary:

| Variable | Required | Description |
|---|---|---|
| `RESEND_API_KEY` | for email | Resend API key. Without it, the contact form still returns success but no email is sent (logged server-side). |
| `CONTACT_TO_EMAIL` | for email | Inbox receiving contact submissions. |
| `CONTACT_FROM_EMAIL` | for email | Verified Resend sender. |
| `NEXT_PUBLIC_WHATSAPP` | recommended | WhatsApp number, international format, no `+`/spaces (e.g. `221770000000`). |
| `NEXT_PUBLIC_SITE_URL` | recommended | Canonical URL, no trailing slash. Used for metadata, sitemap, JSON-LD. |

## Deploy on Vercel

1. Push this repo to GitHub and import it at [vercel.com/new](https://vercel.com/new).
2. Framework preset: **Next.js** (auto-detected). Build: `next build`.
3. Add the environment variables above in **Project → Settings → Environment
   Variables**.
4. Deploy. Vercel handles SSG/edge automatically.

Static export is also possible for any host (set `output: "export"` in
`next.config.mjs`), but note the `/api/contact` route requires a Node/edge
runtime — on a purely static host, wire the form to an external endpoint instead.

## Outstanding content (client to provide)

Search the codebase for `TODO`. Highlights: real logo SVG, exact brand green hex,
WhatsApp number, domain + public email, team names/photos, premises photos,
GPS coordinates, social links, exact opening hours.
