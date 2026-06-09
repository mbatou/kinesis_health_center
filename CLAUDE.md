# CLAUDE.md — Kinesis Réadaptation (site vitrine)

Project rules and conventions. Read before working on this repo.

## What this is

Showcase website (site vitrine) for **Kinesis Réadaptation**, a multidisciplinary
medical center in Dakar opening June 2026. French-only for v1. Premium
positioning — medical expertise & personalized care, sub-regional reach — mobile-first.

**Art direction (locked, v2): editorial premium + the animated "fil de soin"
signature.** Aim: the calmest, most expensive-feeling, most recognizable health
site in Senegal — not the busiest. We win through taste, authenticity, and ONE
ownable graphic signature, never gadgets.

## Stack

- Next.js 14 (App Router) + TypeScript (strict)
- Tailwind CSS (design tokens in `tailwind.config.ts`)
- lucide-react (icons), framer-motion (subtle animations)
- zod (form validation), resend (contact email via Route Handler)
- Deploy target: Vercel (or static export)

## Art direction — the "fil de soin" (core of the project)

The logo's ECG line + spine becomes a **continuous vertical thread** running down
the page, linking sections / the 4 poles. It symbolizes expertises gathered &
coordinated in one place — **not** a single care journey (patient journeys
differ). Violet melting into green. **Nodes** (small circles) mark the poles and
light up as their section enters the viewport. See `FilDeSoin.tsx` — treat it as
the flagship component.

- Desktop (≥ lg): SVG `<path>` in a left-gutter overlay, `pointer-events:none`,
  `aria-hidden`. Drawn on scroll via framer-motion `useScroll` + `pathLength`
  0 → 1. Nodes go grey → violet (green for 04) as you pass them.
- Mobile (< lg): no heavy scroll-math — static short violet→green accent per
  section + numbered nodes (01–04) in the index.
- `prefers-reduced-motion: reduce` → thread fully drawn at once, nodes pre-lit.
- Animate ONLY `pathLength` / `opacity` / `transform` (GPU-friendly). Overlay →
  zero layout shift.

Editorial layout: asymmetric hero (display title left, real-photo media right),
numbered pole index (01 → 04) like a magazine contents page, generous whitespace
(whitespace IS a component — don't fill the void), thin borders over elevation.

Photo strategy: real, local photos of the center & Senegalese practitioners.
Until they arrive, use `MediaFrame` — elegant `violet-wash` panels with a
"photographie réelle du centre" badge + green ECG accent. **Never** Western stock.

### Anti-patterns — forbidden

- ❌ Corporate blue / generic teal (outside the Kinesis palette).
- ❌ Western stock photos.
- ❌ Dashboards, fake metrics ("98%", "+2.4k") — the center opens at zero patients.
- ❌ Heavy gradients, parallax, 3D/WebGL, autoplay video (kill mobile perf in Dakar).
- ❌ "Health template" look: flat symmetric grids, generic aligned icon rows,
  text-stuffed heroes.
- ❌ Title Case everywhere — we write in **sentence case**.

## Conventions

- **Copy in French, code/comments/commits in English. Sentence case, not Title Case.**
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

- violet `#5400AD` (primary — titles, CTA, fil, accents), violet-light `#BFA0E8`,
  violet-pale `#E2A9F1`, violet-wash `#F2EEFA` (pale panels)
- green `#3EA935` (accent — fil, ECG line, hover, micro-details), green-soft `#7BC86C`
- grey `#4C5563`, grey-soft `#686867`, ink `#26215C` (very dark violet)
- neutrals: white, `surface #F7F6FB`, `line #ECEAF3`

Editorial type scale (Tailwind `text-*`): `display` (hero), `h2`, `pole`,
`kicker` (uppercase green, 0.18em tracking). Body ~0.95–1rem, line-height 1.65,
max line width ~60ch (`max-w-prose`).

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
- [ ] Director's word: final text (replace `[TEXTE PROVISOIRE]`) + real photo →
      `director.ts` + `public/images/dr_bouna_diack.png`
- [ ] Photos of premises & equipment
- [ ] Enriched presentation copy + validated specialty descriptions
- [ ] Real social links (Facebook, Instagram)
- [x] Exact GPS coordinates (map + JSON-LD) — 14.712650, -17.467148
- [ ] Exact opening days/hours

Search the codebase for `TODO` to find each spot.
