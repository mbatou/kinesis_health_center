# CLAUDE.md — Kinesis Réadaptation (site vitrine)

Project rules and conventions. Read before working on this repo.

## What this is

Showcase website (site vitrine) for **Kinesis Réadaptation**, a multidisciplinary
medical center in Dakar opening June 2026. French-only for v1. Premium / VIP
positioning, mobile-first.

## Stack

- Next.js 14 (App Router) + TypeScript (strict)
- Tailwind CSS (design tokens in `tailwind.config.ts`)
- lucide-react (icons), framer-motion (subtle animations)
- zod (form validation), resend (contact email via Route Handler)
- Deploy target: Vercel (or static export)

## Conventions

- **Copy in French, code/comments/commits in English.**
- **No hardcoded site copy in components** — all content lives in `src/content/`
  (`site.ts`, `specialites.ts`, `equipe.ts`, `centre.ts`). This keeps the site
  i18n-ready (FR/EN later without a refactor).
- TypeScript strict; functional components only.
- Use the design tokens, never raw hex in components (except brand SVG gradients).
- Animations stay subtle: fade-up ~0.4s, `once: true` (see `Reveal.tsx`).
- Accessibility: semantic HTML, `alt` on images, labelled form fields, visible
  focus, AA contrast, keyboard nav.
- Images via `next/image`, lazy-loaded below the fold.

## Design tokens (charte)

Colors (Tailwind `kinesis.*`):

- violet `#5400AD` (primary — titles, CTA, accents), violet-light `#BFA0E8`,
  violet-pale `#E2A9F1`
- green `#3EA935` (accent — ECG line, hover, micro-details), green-soft `#7BC86C`
- grey `#4C5563`, grey-soft `#686867`, ink `#1E2230`
- neutrals: white, `surface #F7F6FB`, `line #ECEAF3`

Usage: violet dominates; green is an **accent** (never large flats except the CTA
band). Never skew/deform the logo.

Typography: headings `Source Sans 3` (≈ Myriad Pro), body `Inter` (fallback Segoe
UI / system). Set up in `src/app/fonts.ts`.

Brand motifs: `EcgDivider` (green ECG line separator), `SpinePattern`
(violet→green vertebrae column, corner decor on Hero / Contact). Keep discreet.

Rhythm: container `max-w-6xl`, padding `px-5 md:px-8`, sections `py-16 md:py-24`,
cards `rounded-2xl`, buttons `rounded-full`, soft low shadows.

## Pages (App Router)

`/` · `/le-centre` · `/specialites` (4 anchored pôles) · `/equipe` · `/contact`
plus `/mentions-legales` and `/politique-confidentialite`.

## Outstanding TODO content (client to provide)

- [ ] Logo SVG (charte versions) → `public/logo.svg`
- [ ] Exact brand green hex (from logo)
- [ ] Real WhatsApp number → `site.whatsapp` + `NEXT_PUBLIC_WHATSAPP`
- [ ] Validated domain + corrected public email (typo `kinesisreadaption`)
- [ ] Team: names, roles, bios, photos → `equipe.ts` + `public/team/`
- [ ] Photos of premises & equipment
- [ ] Enriched presentation copy + validated specialty descriptions
- [ ] Real social links (Facebook, Instagram)
- [ ] Exact GPS coordinates (map + JSON-LD)
- [ ] Exact opening days/hours

Search the codebase for `TODO` to find each spot.
