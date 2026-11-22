# Project: TheOptivus — Complete Portfolio Redesign

**Repository:** `/home/antigravity/Hey-Viswa/theoptivus` (`Hey-Viswa/theoptivus`, branch `feat/portfolio-redesign`)  
**Stack:** Next.js `16.0.7` (App Router), React `19.2.0`, Tailwind CSS v4 (`@tailwindcss/postcss`), TypeScript `5`, `react-hook-form`, `zod`, `react-markdown`  
**Original Request:** `/home/antigravity/Hey-Viswa/theoptivus/.agents/teamwork/ORIGINAL_REQUEST.md`  
**Survey Reports:**
- `.agents/teamwork/explorer_survey_1/handoff.md` (Codebase, visual audit, `viswa.jpg` colorimetry, git hygiene)
- `.agents/teamwork/spec_miner_survey_2/handoff.md` (Harsh Savale live site & 8-module Admin CMS Studio read-only spec + screenshot capture plan)
- `.agents/teamwork/spec_miner_survey_3/handoff.md` (Viswa GitHub & repo authoritative Fact Ledger + 6-page content inventory)

---

## Architecture

### Design Direction: "Architectural Editorial Monograph"
Replaces the failing neo-brutalist/WebGL theme (broken font scoping on child `<div>`, undefined `--muted`/`--accent-light` tokens, missing `@tailwindcss/typography`, clashing `#FFE600`/`#2F52E0`/`#0a0a0a` slabs, 6-route WebGL `DitherBackground`, 12k-dot `ParticleText`, grayscale/RGB-smear `DistortionImage`, 15%-opacity featured cards, 2.1s blocking `PageLoader`, stuck mobile cursor dot, missing subpage footers) with a calm, gallery-grade **light editorial design system** harmonizing with `public/viswa.jpg` (`1024×1024`, cool slate-grey backdrop `#ACB0B6`–`#BABFC6`, matte obsidian attire `#28272C`, warm skin `#D7936D`) and all four full-color project showcases:

- **Palette Tokens (`src/app/globals.css`):**
  - `--bg-canvas`: `#F6F5F0` (warm architectural paper)
  - `--bg-surface`: `#FFFFFF` (crisp gallery plate for cards, forms, and UI showcase frames)
  - `--bg-subtle`: `#ECEAE3` (warm limestone band / pill surface)
  - `--bg-portrait-mat`: `#E4E6E9` (cool studio stone mat matching `viswa.jpg`)
  - `--bg-inverse`: `#141517` (refined soft obsidian for primary CTAs & editorial contrast)
  - `--fg-primary`: `#141517` (WCAG AAA ~16.5:1 on canvas)
  - `--fg-secondary`: `#4B4B48` (WCAG AAA ~7.9:1 on canvas)
  - `--fg-muted`: `#6E6D68` (WCAG AA ~4.7:1 on canvas)
  - `--border-subtle`: `rgba(20, 21, 23, 0.10)` (architectural hairlines)
  - `--border-strong`: `rgba(20, 21, 23, 0.22)` (interactive & focus borders)
  - `--accent`: `#B84A27` (Architectural Terracotta / Burnt Copper, hover `#993A1D`, soft tint `rgba(184, 74, 39, 0.08)`, WCAG AA ≥ 4.8:1 on `#F6F5F0` & `#FFFFFF`)
- **Typography (Variables attached to `<html>`, NEVER inner `<div>`):**
  - Display / Headings: `Space Grotesk` (`--font-display`, weights 500/600/700, tight negative tracking `-0.03em`)
  - Editorial Serif Accent: `Playfair Display` (`--font-serif`, italic accent used sparingly — NEVER inside neon highlighter rectangles)
  - Body: `Inter` (`--font-sans`, weights 400/500/600, `leading-[1.65]`, measure `60–68ch`)
  - Technical / Metadata: `JetBrains Mono` (`--font-mono`, weights 400/500, section indices `01`–`04`, years, roles, stack tags)
- **Strict Aesthetic Guardrails (Locked with User):**
  - **Radical Minimalism & Intentionality:** Keep every layout as minimal, simple, and refined as possible. Every element must earn its place and purposefully showcase real engineering skill and shipped work — zero flashy gimmicks, zero decorative fluff, zero sloppy alignment, zero kinetic/skew/scroll-hijack/WebGL/particle/marquee/preloader tricks that distract from the work.
  - Zero AI clichés: NO purple-on-dark, NO glowing colored borders, NO grid/particle meshes, NO pulsing biscuit status badges above headlines, NO gradient keyword text fills, NO over-nested bento cards, NO grayscale/distortion shaders over real product UIs or Viswa's portrait.
  - Zero generated images: ONLY real screenshots and existing `public/viswa.jpg`.
  - Server-first Next.js App Router rendering (no client `useEffect` flashes over static data); crisp, understated micro-interactions and `prefers-reduced-motion`-respectful CSS transitions only; native scroll with clean typography and generous whitespace.
- **Module & Data Flow:**
  - Pure static TypeScript source of truth in `src/data/*` (`site.ts`, `profile.ts`, `projects.ts`, `skills.ts`) decoupled from Appwrite SDK types.
  - Legacy adapters in `src/lib/projects.ts` and `src/lib/skills.ts` re-export/adapt `src/data/*` so legacy `/dashboard/*` routes continue compiling without errors.
  - Global public shell (`SiteHeader` + `SiteFooter`) mounted via `src/app/layout.tsx` (with pathname guard omitting public chrome on `/dashboard/*`), guaranteeing consistent header & footer across all 6 public routes.

---

## Feature Inventory

Every feature discovered in Step 0 Survey (`explorer_survey_1`, `spec_miner_survey_2`, `spec_miner_survey_3`) and `ORIGINAL_REQUEST.md` is assigned to a milestone (none unassigned):

| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| 1 | Git & Secret Hygiene | Exclude `.agents/` via `.git/info/exclude`; ensure zero Harsh credentials/PINs anywhere in repo or git history; replace raw Appwrite keys in `env.example` with safe placeholders; clean up committed Windows `desktop.ini` files. | M1 | ORIGINAL_REQUEST, survey_1, survey_3 |
| 2 | PropChain Removal | Completely remove `proj_propchain`, `public/projects/propchain/`, PropChain-only `BlockChain`/`Solidity`/`Hardhat`/`Polygon`/`MetaMask` skills, icon maps, and `/skills` marquee entry. | M1 | ORIGINAL_REQUEST, survey_1, survey_3 |
| 3 | Harsh Savale Live Screenshots (Real, Read-Only) | Capture 5–6 crisp real Playwright screenshots (1440×900) of Harsh Savale's live public site (`/work` with video seeked off black frame 0, `/projects/dakar-medal`) and authenticated read-only Admin CMS Studio (`Typography & Spacing` live preview, `Projects` 6 work icons + 5-tab editor, `Media Library`, optional privacy-masked above-the-fold `Security & DDoS`) into `public/projects/harsh-portfolio/`. Zero generated images, zero credentials/PII, zero live mutations. | M1 | ORIGINAL_REQUEST, survey_2 |
| 4 | Verified Static Data Layer (`src/data/*`) | Pure typed `site.ts`, `profile.ts`, `projects.ts` (FreshKatta, Harsh Savale Portfolio & CMS, StudioFlow, CivicLens), and `skills.ts` (6 verified domains). Fix 5 CivicLens stack/date errors (HackOverflow 2026 / SIH25031, Flask + CLIP, native `ws`, Azure Blob, Mapbox GL), fix StudioFlow (`Bull` v4, omit broken HTTP 503 `liveUrl`, clean `thumbnail.png`/`dashboard.png`), curate FreshKatta screenshots (omit PII `account.png` with phone number; clean `storefront.png`, `admin-dashboard.png`, and top-cropped Chrome-free `order-tracking.png`), fix JSW date (`Jun – Jul 2023`), remove broken 404 YouTube link, remove all fabricated metrics/claims. | M1 | ORIGINAL_REQUEST, survey_1, survey_2, survey_3 |
| 5 | Legacy Compatibility Adapters | Keep `src/lib/projects.ts`, `src/lib/skills.ts`, `src/types/project.ts`, `src/types/skill.ts`, and `src/components/admin/SkillForm.tsx` cleanly typed (removing `'BlockChain'`) so legacy `/dashboard/*` routes do not break `next build`. | M1 | survey_1 |
| 6 | Architectural Editorial Design System | Rewrite `src/app/globals.css` with complete palette/spacing/border tokens (fixing undefined `--muted`/`--accent-light`), attach Google Font CSS variables to `<html>`, add `.editorial-prose` markdown typography styles, refined visible scrollbars, focus-visible rings, and `prefers-reduced-motion` support. | M2 | ORIGINAL_REQUEST, survey_1 |
| 7 | Global Public Shell (`SiteHeader` & `SiteFooter`) | Replace broken `Navbar`/`Footer`/`FooterSection` and retire `PageLoader`, `Cursor`, `SmoothScroller`, `GSAPEnhancer`, `DitherBackground`, `ParticleText`, `DistortionImage`, `KineticText`. Sticky responsive header (brand visible on desktop AND mobile, active route state, accessible mobile drawer with Escape close) + consistent footer rendered across ALL 6 public routes. | M2 | survey_1, survey_3 |
| 8 | Shared Editorial UI Primitives & Special Routes | Build `SectionHeader`, `ProjectCard` (full-color `aspect-[16/10]` plates), `ProjectGallery` (thumbnails + captions + keyboard-accessible fullscreen lightbox), `RichTextRenderer` (styled markdown), `Reveal` (SSR-safe reduced-motion fade), inline `Icons` (replacing unconfigured `api.iconify.design`), plus `src/app/not-found.tsx`, `src/app/robots.ts`, `src/app/sitemap.ts`. | M2 | survey_1 |
| 9 | Home Page (`/`) Redesign | Asymmetric editorial Hero with crisp HTML `<h1>` and full-color `public/viswa.jpg` portrait in cool-stone mat, verified 4-item Fact Strip (replacing fake `StatsBand`), server-rendered Selected Work showcase (full-color UI screenshots), Background/Experience preview, Core Toolkit preview, and sequential numbering (`01`–`04`). | M3 | ORIGINAL_REQUEST, survey_1, survey_3 |
| 10 | Work Index (`/work`) Redesign | Editorial header, client-side category filter over server-passed static data (zero loading flash), featured showcase leads (FreshKatta & Harsh Savale CMS), full-color 2-column grid for all 4 verified projects. | M3 | ORIGINAL_REQUEST, survey_1, survey_3 |
| 11 | Case Study Detail (`/work/[slug]`) Redesign | Dynamic `generateStaticParams` & `generateMetadata`, metadata sidebar (Role, Year, Client/Context, Key Deliverables, Categorized Stack), `.editorial-prose` case study narrative, full-color hero + interactive `ProjectGallery` lightbox (showcasing both public & 8-module Admin CMS for Harsh Savale), verified Live/GitHub buttons, and prev/next project navigation. | M3 | ORIGINAL_REQUEST, survey_1, survey_2, survey_3 |
| 12 | About Page (`/about`) Redesign | Full-color `public/viswa.jpg` portrait (fixing broken `/viswa.png`), authentic grounded bio, calm architectural timeline for JSW Dolvi (`Jun – Jul 2023`, fixing `JUL 2023 — NOW`) & Pillai HOC (`Expected 2027`), engineering principles, verified external links. | M3 | ORIGINAL_REQUEST, survey_1, survey_3 |
| 13 | Skills Page (`/skills`) Redesign | Server-rendered 6-domain verified technical toolkit with interactive domain filtering and project cross-links; zero loading flash, zero PropChain/Blockchain/EC2, zero fake `Expert` ratings. | M3 | ORIGINAL_REQUEST, survey_1, survey_3 |
| 14 | Contact Page (`/contact`) Redesign | Server `page.tsx` exporting `metadata` + client `ContactForm` (`react-hook-form` + `zod`, comfortable input padding `px-4 py-3`, char counter, honeypot, Web3Forms with graceful `mailto:` fallback), one-click Copy Email (`viswaranjan.dev@gmail.com`), and verified socials (GitHub, LinkedIn, X, Instagram — no 404 YouTube). | M3 | ORIGINAL_REQUEST, survey_1, survey_3 |
| 15 | Dead Code & Asset Bloat Cleanup | Remove retired WebGL/legacy public components (`DitherBackground`, `ParticleText`, `DistortionImage`, `PageLoader`, `Cursor`, `SmoothScroller`, `GSAPEnhancer`, `MetaHead`, `HorizontalScrollText`, `AntigravityField`, `WorksSection`, etc.) and unused 20MB `public/images/*.png` bloat; verify `npm run build` and `npm run lint` pass with 0 errors. | M3 | survey_1, survey_3 |
| 16 | Opaque-Box E2E Test Suite (`TEST_INFRA.md` & `TEST_READY.md`) | Independent requirement-driven 4-tier Playwright + Node test harness verifying every route, asset, interaction, responsive viewport (desktop 1440×900, tablet 768×1024, mobile 390×844), zero console errors, zero broken images, zero PropChain/fake claims/secrets, SEO metadata, and screenshot capture for visual review. | E2E Track | ORIGINAL_REQUEST, survey_1, survey_2, survey_3 |
| 17 | Final Milestone — E2E Pass, Visual Audit, Tier 5 Hardening & Clean Commit | Pass 100% of E2E Tiers 1–4, inspect desktop & mobile screenshots of all 6 redesigned pages visually, run Tier 5 adversarial Challenger hardening loop + Whole-Project Forensic Audit, confirm `npm run build` & `npm run lint` clean, verify zero secrets/`.agents/` in git, and commit cleanly on `feat/portfolio-redesign`. | M4 | ORIGINAL_REQUEST |

---

## Milestones

| # | Name | Scope | Dependencies | Status | Sub-Orch Conv ID |
|---|------|-------|--------------|--------|------------------|
| M1 | Foundation, Verified Data Layer, Harsh CMS Screenshots & Git Hygiene | Features #1–#5: `.git/info/exclude`, `env.example` scrub, remove PropChain, capture 5–6 real read-only Harsh screenshots, create `src/data/*` & clean adapters | none | IN_PROGRESS | `2ef2cd2f35c8ea722b3b4e4712c9ea73` |
| M2 | Design System, Global Shell & Editorial UI Primitives | Features #6–#8: `globals.css` tokens & prose styles, `layout.tsx` font fix, `SiteHeader`, `SiteFooter`, shared UI primitives, `not-found`/`robots`/`sitemap` | M1 | PLANNED | TBD |
| M3 | All 6 Public Pages Redesign & Dead Code Cleanup | Features #9–#15: `/`, `/work`, `/work/[slug]`, `/about`, `/skills`, `/contact`, remove retired WebGL/dead components & unused 20MB `public/images/*` | M1, M2 | PLANNED | TBD |
| E2E | E2E Testing Track (Parallel) | Feature #16: `TEST_INFRA.md`, 4-tier Playwright opaque-box E2E suite in `tests/e2e/`, `TEST_READY.md` | none | IN_PROGRESS | `10f23a834d2ff4b2e7cee7bc34b30966` |
| M4 | Final Milestone — E2E Tiers 1–4, Tier 5 Adversarial Hardening, Visual Audit & Git Commit | Feature #17: Pass 100% E2E Tiers 1–4, inspect desktop/mobile screenshots of all pages, Tier 5 Challenger hardening, Whole-Project Forensic Audit, clean commit on `feat/portfolio-redesign` | M1, M2, M3, E2E | PLANNED | TBD |

---

## Interface Contracts

### `src/data/site.ts` ↔ Layout, Navigation, Footer, Contact, SEO
```ts
export interface NavItem {
  label: string;
  href: string;
}

export interface SocialLink {
  label: 'GitHub' | 'LinkedIn' | 'X' | 'Instagram';
  href: string;
  handle: string;
}

export interface SiteConfig {
  name: string;           // "Biswaranjan Giri"
  shortName: string;      // "Viswa"
  handle: string;         // "Hey-Viswa"
  role: string;           // "Full-Stack Developer"
  location: string;       // "Pen / Mumbai, India"
  domain: string;         // "https://viswaranjan.me"
  email: string;          // "viswaranjan.dev@gmail.com"
  avatarPath: string;     // "/viswa.jpg"
  availability: string;   // Honest availability string
  navItems: NavItem[];    // /work, /about, /skills, /contact
  socials: SocialLink[];  // GitHub, LinkedIn, X, Instagram (NO YouTube)
}
export const SITE_CONFIG: SiteConfig;
```

### `src/data/projects.ts` ↔ Home, `/work`, `/work/[slug]`, `/skills`, `sitemap.ts`
```ts
export type ProjectCategory = 'Live Product' | 'Client Work' | 'SaaS' | 'Hackathon AI';
export type ProjectStatus = 'Live' | 'Client Live' | 'Open Source' | 'Hackathon Build';

export interface ProjectGalleryItem {
  src: string;
  alt: string;
  caption: string;
  aspect?: '16/10' | '16/9';
}

export interface ProjectTechCategory {
  category: string;
  items: string[];
}

export interface PortfolioProject {
  id: string;
  slug: 'freshkatta' | 'harsh-portfolio' | 'studioflow' | 'civiclens';
  title: string;
  subtitle: string;
  summary: string;
  category: ProjectCategory;
  status: ProjectStatus;
  role: string;
  clientOrContext: string;
  year: string;
  featured: boolean;
  thumbnail: string;
  thumbnailAlt: string;
  gallery: ProjectGalleryItem[];
  highlights: string[];
  techStack: string[];
  techCategories: ProjectTechCategory[];
  content: string;        // Structured Markdown case study (rendered via RichTextRenderer)
  liveUrl?: string;       // ONLY live HTTP 200 URLs (FreshKatta, Harsh Savale)
  repoUrl?: string;       // ONLY verified public GitHub repos (StudioFlow, CivicLens — no .git suffix)
}

export const PORTFOLIO_PROJECTS: PortfolioProject[];
export function getPortfolioProjects(): PortfolioProject[];
export function getFeaturedPortfolioProjects(): PortfolioProject[];
export function getPortfolioProjectBySlug(slug: string): PortfolioProject | undefined;
export function getAdjacentProjects(slug: string): { prev: PortfolioProject | null; next: PortfolioProject | null };
```

### `src/data/profile.ts` ↔ Home, `/about`
```ts
export interface ProofPoint {
  tag: string;       // e.g., "LIVE", "CLIENT", "JSW · 2023", "B.E. ’27"
  title: string;
  detail: string;
  href?: string;
}

export interface ExperienceItem {
  role: string;
  organization: string;
  location: string;
  period: string;    // "Jun – Jul 2023" (VERIFIED — NEVER "NOW")
  summary: string;
  bullets: string[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  location: string;
  period: string;    // "Expected 2027"
  status: string;    // "In Progress"
}

export interface EngineeringPrinciple {
  index: string;
  title: string;
  description: string;
}

export interface ProfileData {
  headline: string;
  subheadline: string;
  bioParagraphs: string[];
  proofPoints: ProofPoint[];
  experience: ExperienceItem[];
  education: EducationItem[];
  principles: EngineeringPrinciple[];
}
export const PROFILE_DATA: ProfileData;
```

### `src/data/skills.ts` ↔ Home, `/skills`
```ts
export type SkillDomainId =
  | 'languages'
  | 'frontend-mobile'
  | 'backend-realtime'
  | 'databases-storage'
  | 'cloud-platforms'
  | 'payments-tooling';

export interface SkillDomain {
  id: SkillDomainId;
  index: string;           // "01" .. "06"
  title: string;
  summary: string;
  items: string[];         // Verified skills only — NO BlockChain/Solidity/EC2/ratings
  relatedSlugs: PortfolioProject['slug'][];
}
export const SKILL_DOMAINS: SkillDomain[];
```

### Public Entry Points ↔ E2E Testing Track (Opaque-Box Contract)
- Server command: `npm run build && PORT=<port> npm run start` (or `npx next start -p <port>`)
- Public routes returning HTTP 200:
  - `/`
  - `/work`
  - `/work/freshkatta`
  - `/work/harsh-portfolio`
  - `/work/studioflow`
  - `/work/civiclens`
  - `/about`
  - `/skills`
  - `/contact`
  - `/robots.txt`
  - `/sitemap.xml`
- Invalid routes returning HTTP 404:
  - `/work/propchain`
  - `/work/does-not-exist`
  - `/nonexistent-route-xyz`
- Accessible landmarks & interactive semantics:
  - Single visible `<header>` with brand link to `/` and `<nav>` containing links to `/work`, `/about`, `/skills`, `/contact` (plus mobile menu button with `aria-expanded` on mobile viewport `390×844`).
  - Single visible `<main>` containing exactly one visible `<h1>` per page.
  - Single visible `<footer>` present on ALL 6 public page templates (`/`, `/work`, `/work/[slug]`, `/about`, `/skills`, `/contact`).
  - `/about` and `/` render `/viswa.jpg` (`img[src*="viswa.jpg"]` or Next Image proxy for `viswa.jpg`, `naturalWidth > 0`).
  - `/work/harsh-portfolio` renders real captured screenshots from `/projects/harsh-portfolio/` (`naturalWidth > 0`) covering both the public site and Admin CMS Studio, with interactive gallery & lightbox controls.
  - `/work` provides category filter buttons (`All`, `Live Product`, `Client Work`, `SaaS`, `Hackathon AI`).
  - `/contact` provides accessible labeled inputs (`name`, `email`, `message`), client-side validation feedback, submit button, direct `mailto:viswaranjan.dev@gmail.com` link, and Copy Email button.

---

## Code Layout

```text
/home/antigravity/Hey-Viswa/theoptivus/
├── PROJECT.md                          # Living project architecture & milestone ledger (Project Orchestrator)
├── TEST_INFRA.md                       # E2E testing methodology & inventory (E2E Orchestrator)
├── TEST_READY.md                       # E2E suite readiness signal (E2E Orchestrator)
├── public/
│   ├── viswa.jpg                       # New 1024×1024 studio portrait (ACTIVE)
│   └── projects/
│       ├── freshkatta/                 # Verified storefront, admin-dashboard, clean order-tracking
│       ├── harsh-portfolio/            # 5–6 real Playwright screenshots (public + read-only Admin CMS)
│       ├── studioflow/                 # Verified thumbnail, dashboard
│       └── civiclens/                  # Verified civichome, civicdashboard, civicstatus, civicresolved, civiclogin
├── src/
│   ├── data/                           # M1: Pure static verified TypeScript data modules
│   │   ├── site.ts
│   │   ├── profile.ts
│   │   ├── projects.ts
│   │   └── skills.ts
│   ├── lib/                            # M1: Legacy adapters (projects.ts, skills.ts, utils.ts, appwrite*)
│   ├── types/                          # M1: Clean TypeScript definitions
│   ├── components/
│   │   ├── layout/                     # M2: SiteHeader.tsx, SiteFooter.tsx, PublicShell.tsx
│   │   ├── ui/                         # M2: SectionHeader.tsx, ProjectCard.tsx, ProjectGallery.tsx,
│   │   │                               #     RichTextRenderer.tsx, Reveal.tsx, Icons.tsx
│   │   ├── home/                       # M3: Home page editorial sections
│   │   ├── work/                       # M3: WorkGrid.tsx (filterable index)
│   │   ├── skills/                     # M3: SkillsExplorer.tsx
│   │   ├── contact/                    # M3: ContactForm.tsx
│   │   └── admin/                      # Legacy dashboard forms (maintained compiling)
│   └── app/
│       ├── globals.css                 # M2: Editorial design tokens, prose styles, reduced-motion
│       ├── layout.tsx                  # M2: Root layout (fonts on <html>, metadata, PublicShell)
│       ├── template.tsx                # M2: Subtle CSS route transition (reduced-motion safe)
│       ├── not-found.tsx               # M2: Custom 404 page
│       ├── robots.ts                   # M2: Robots metadata route
│       ├── sitemap.ts                  # M2: Sitemap metadata route
│       ├── page.tsx                    # M3: Home (/)
│       ├── work/
│       │   ├── page.tsx                # M3: Work Index (/work)
│       │   └── [slug]/page.tsx         # M3: Case Study (/work/[slug])
│       ├── about/page.tsx              # M3: About (/about)
│       ├── skills/page.tsx             # M3: Skills (/skills)
│       └── contact/page.tsx            # M3: Contact (/contact)
└── tests/
    └── e2e/                            # E2E Track: Opaque-box 4-tier Playwright + Node test runner
```

## File Ownership (Strict Non-Overlapping Writes)
- **M1:** `.git/info/exclude`, `env.example`, `public/projects/propchain/` (delete), `public/projects/harsh-portfolio/*` (new real captures), `public/projects/freshkatta/` (clean crop if needed), `desktop.ini` cleanup, `src/data/*`, `src/types/*`, `src/lib/projects.ts`, `src/lib/skills.ts`, `src/components/admin/SkillForm.tsx`.
- **M2:** `src/app/globals.css`, `src/app/layout.tsx`, `src/app/template.tsx`, `src/app/not-found.tsx`, `src/app/robots.ts`, `src/app/sitemap.ts`, `next.config.ts`, `src/components/layout/*`, `src/components/ui/*`.
- **M3:** `src/app/page.tsx`, `src/app/work/**`, `src/app/about/page.tsx`, `src/app/skills/page.tsx`, `src/app/contact/page.tsx`, `src/components/home/*`, `src/components/work/*`, `src/components/skills/*`, `src/components/contact/*`, plus removal of retired `src/components/features/*`, obsolete WebGL/unused `src/components/ui/*`, `src/components/utils/*`, `src/lib/gsapEnhance.ts`, `src/hooks/useGSAPEnhance.ts`, and unused `public/images/*.png`.
- **E2E Track:** `TEST_INFRA.md`, `TEST_READY.md`, `tests/e2e/**`.
- **M4:** Integration fixes across any file flagged by E2E Tiers 1–4 or Tier 5 Challengers + final clean git commit on `feat/portfolio-redesign`.
