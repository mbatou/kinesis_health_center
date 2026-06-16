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
| `ADMIN_USERNAME` | back office | Admin login (default `drdiack`). |
| `ADMIN_PASSWORD` | back office | Admin password. Set in Vercel; required to log in. |
| `AUTH_SECRET` | back office | Secret to sign the session cookie (`openssl rand -base64 32`). |
| `POSTGRES_URL` (+ friends) | back office | Auto-injected by **Vercel Postgres**. Stores editable content + submissions. |
| `BLOB_READ_WRITE_TOKEN` | back office | Auto-injected by **Vercel Blob**. Stores uploaded images. |

## Back office (`/admin`)

A built-in CMS for the team to edit copy, view bookings/contacts, and swap images.

- **Login**: `/admin` → redirects to `/admin/login`. User `drdiack`, password = `ADMIN_PASSWORD`.
- **Contenu**: edit site copy (hero, pole index, "Pourquoi Kinesis", le mot du
  directeur, pôles & spécialités, coordonnées). Saving publishes immediately
  (the affected pages are revalidated).
- **Réservations & contacts**: every website form submission is saved and listed
  (status: nouveau / traité / archivé) — in addition to the Resend email.
- **Images**: replace the site photos (hero, accueil, réadaptation,
  balnéothérapie, directeur) via upload to Vercel Blob.

How it works: the public site renders **defaults from `src/content` ＋ overrides
from the database**. With no DB/Blob configured, the site behaves exactly as the
static version and the admin shows a "configure storage" notice.

### Enabling it on Vercel

1. **Storage → Create Database → Postgres**, link it to the project (injects
   `POSTGRES_URL` …). Tables are created automatically on first use.
2. **Storage → Create → Blob**, link it (injects `BLOB_READ_WRITE_TOKEN`).
3. Add `ADMIN_PASSWORD` and `AUTH_SECRET` (and optionally `ADMIN_USERNAME`) in
   **Settings → Environment Variables**.
4. Redeploy. Visit `/admin` and log in.

> Security note: this is a single shared login. For health-adjacent contact data,
> consider rotating the password, restricting who has it, and (later) per-user
> accounts if more team members need separate access.

## Deploy on Vercel

1. Push this repo to GitHub and import it at [vercel.com/new](https://vercel.com/new).
2. Framework preset: **Next.js** (auto-detected). Build: `next build`.
3. Add the environment variables above in **Project → Settings → Environment
   Variables**.
4. Deploy. Vercel handles SSG/edge automatically.

Note: the contact API and the `/admin` back office require a Node/serverless
runtime (Vercel), so a fully static export is no longer suitable.

## Outstanding content (client to provide)

Search the codebase for `TODO`. Highlights: real logo SVG, exact brand green hex,
WhatsApp number, domain + public email, team names/photos, premises photos,
GPS coordinates, social links, exact opening hours.
