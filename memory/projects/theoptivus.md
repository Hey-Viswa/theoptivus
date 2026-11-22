# Project TheOptivus

**Status:** Production-Ready Architectural Editorial Monograph
**Stack:** Next.js 16 (App Router), React 19, TypeScript 5, Tailwind CSS 4, React Hook Form + Zod

## Design System & Theme
- **Aesthetic Direction:** Warm, calm **Architectural Editorial Monograph** inspired by print monographs and modern design-engineering studios.
- **Color Tokens (`src/app/globals.css`):**
  - `--bg-canvas`: `#F6F5F0` (Warm Alabaster Paper)
  - `--bg-surface`: `#FFFFFF` (Crisp Elevated Card Surface)
  - `--bg-subtle`: `#ECEAE3` (Stone Pill / Well Surface)
  - `--bg-portrait-mat`: `#E4E6E9` (Cool Stone Frame Mat for `/viswa.jpg`)
  - `--bg-inverse`: `#141517` (Deep Carbon Ink)
  - `--fg-primary`: `#141517`, `--fg-secondary`: `#4B4B48`, `--fg-muted`: `#6E6D68`
  - `--border-subtle`: `rgba(20, 21, 23, 0.10)`, `--border-strong`: `rgba(20, 21, 23, 0.22)`
  - `--accent`: `#B84A27` (Oxidized Terracotta), `--accent-hover`: `#993A1D`, `--accent-soft`: `rgba(184, 74, 39, 0.08)`
- **Typography:** Space Grotesk (`--font-display`), Inter (`--font-sans`), JetBrains Mono (`--font-mono`), Playfair Display (`--font-serif` for selective italic headline accents).
- **Container Standard:** All public views share `max-w-[1200px] mx-auto px-6 md:px-10` inside `PublicShell` (`SiteHeader` + `<main id="main-content">` + `SiteFooter`).

## Verified Content Architecture (`src/data/*`)
Public routes render deterministically at build/request time from pure static TypeScript modules with zero client-side database waterfalls or skeleton flashes:
- `src/data/site.ts`: `SITE_CONFIG`, `NAV_ITEMS`, and verified `SOCIAL_LINKS` (`GitHub`, `LinkedIn`, `X`, `Instagram`).
- `src/data/profile.ts`: `PROFILE` with authentic bio paragraphs, 4 verified facts, JSW Steel Dolvi internship (`Jun – Jul 2023`), B.E. Computer Engineering at PHCET (`Expected 2027`, `In Progress`), and 4 engineering principles.
- `src/data/projects.ts`: 4 verified case studies (`freshkatta`, `harsh-portfolio`, `studioflow`, `civiclens`) with full-color galleries, architecture breakdowns, and live/repo links.
- `src/data/skills.ts`: 6 structured `SKILL_DOMAINS` (`Languages`, `Frontend & Mobile`, `Backend & Real-time`, `Databases & Storage`, `Cloud & Platforms`, `Payments & Tooling`) cross-linked to project slugs without fake percentage or proficiency bars.

## Retired Legacy Bloat
- Removed all WebGL/Three.js (`DitherBackground`, `DistortionImage`, `ParticleField`, `ParticleText`, `AntigravityField`, `CanvasText`) and GSAP (`KineticText`, `PageLoader`, `Cursor`, `Marquee`, `GSAPEnhancer`, `SmoothScroller`) components.
- Deleted `public/images/` 3D clipart PNGs (`caliper.png`, `gears.png`, etc.) and unverified `PropChain` assets.
- Upgraded `/contact` (`ContactForm.tsx`) with graceful fallback to a pre-filled `mailto:` dispatch card and one-click message copy when `NEXT_PUBLIC_WEB3FORMS_KEY` is not set.
