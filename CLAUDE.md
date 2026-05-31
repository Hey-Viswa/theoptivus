# Memory

## Me
Viswa, building The Optivus portfolio site.

## Projects
| Name | What |
|------|------|
| **The Optivus** | Next.js portfolio with WebGL dithering and cream white brutalist aesthetic. |
→ Details: memory/projects/theoptivus.md

## Preferences & Aesthetics
- **Theme:** Cream white (`bg-background`) with dark text (`text-foreground`). Not a dark theme!
- **Style:** Brutalist editorial. Clean lines, large typography, structured grid layouts.
- **Images:** Big and overlapping. We use CSS `overflow-visible`, large max-widths (500px+), and `scale` utilities (e.g. `md:scale-150`) to let graphics intentionally break out of their grid containers.
- **Backgrounds:** Global WebGL `DitherBackground` component used across pages.
- **Dev Env:** Runs in WSL. Needs `WATCHPACK_POLLING=true CHOKIDAR_USEPOLLING=true npm run dev --webpack` for hot reload.

## Resolved Issues
- **Navigation Lag:** `DitherBackground` has been moved entirely out of pages and into `src/app/layout.tsx` so it loads once and persists globally.
