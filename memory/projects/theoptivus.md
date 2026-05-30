# Project The Optivus

**Status:** Active Development
**Stack:** Next.js (App Router), Tailwind CSS, GSAP, WebGL (React Three Fiber)

## Design System & Theme
- **Color Palette:** The site uses a "Cream White" light theme natively. The primary background (`bg-background`) is a light cream color, and text (`text-foreground`) is dark. 
- **Typography:** Uses Inter, JetBrains Mono, Space Grotesk, and Playfair Display (italic highlights). 
- **Layout:** Editorial brutalist grid. We use explicit borders (`border-foreground`), high contrast boxes (`bg-accent text-background`), and overlapping elements.
- **Visuals:** Vector/PNG imagery like gears and calipers are heavily scaled (`md:scale-150`) within `overflow-visible` containers to intentionally break structural grid lines.

## Technical Context
- **Large Assets:** The site uses very large PNG files (e.g., `caliper.png` is 4.3MB). In Next.js dev mode, the `<Image>` optimizer hangs on these files. They must be rendered with `unoptimized` and `priority` flags.
- **WebGL Performance:** The `DitherBackground` is a heavy WebGL canvas. Currently, it is mounted individually on every page route (`/work`, `/skills`, etc.). Navigating between pages drops and re-initializes the WebGL context, causing severe navigation lag.
- **Next Steps:** Refactor the codebase to mount `DitherBackground` strictly inside `layout.tsx` at `z-0` and make all page sections transparent (`bg-transparent`) so the background shines through without re-rendering.

## Recent Updates
- Standardized all auxiliary pages (`/about`, `/work`, `/skills`, `/contact`) to use the core layout structure.
- Swapped `select.png` for `caliper.png` and scaled it massively (`max-w-[600px] scale-150`).
