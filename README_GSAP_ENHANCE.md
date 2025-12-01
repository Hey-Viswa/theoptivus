# GSAP Enhancement Module

This module adds playful, non-destructive GSAP animations to the portfolio. It is designed as a progressive enhancement layer that can be easily toggled or removed.

## Features
- **Floating Nav Pill**: Bounces on load, parallax effect on scroll.
- **Blurred Background Typo**: Slow drift and opacity pulse.
- **Project Cards**: Staggered entrance with random rotation and hover tilt.
- **Decorative Dot/Ring**: Orbital motion and click burst.
- **Carousel Sync**: Reacts to `carousel:changed` events.

## Integration

### 1. Add the Hook
Add the `useGSAPEnhance` hook to your top-level client layout or component (e.g., `src/app/layout.tsx` or a `ClientLayout` component).

```tsx
// src/app/layout.tsx (or similar client component)
'use client';
import { useGSAPEnhance } from '@/hooks/useGSAPEnhance';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Initialize GSAP animations
  useGSAPEnhance({ enable: true });

  return (
    <html lang="en">
      {/* ... */}
    </html>
  );
}
```

### 2. Add Data Attributes
Add `data-animate` attributes to elements you want to animate. The module also attempts to target existing classes as fallbacks.

| Animation | Data Attribute | Fallback Class |
| :--- | :--- | :--- |
| **Nav Pill** | `data-animate="nav-pill"` | `.nav-pill` |
| **Background Typo** | `data-animate="bg-typo"` | `.hero-typo` |
| **Project Card** | `data-animate="project-card"` | `.project-card` |
| **Decorative Dot** | `data-animate="dot-ring"` | N/A |

### 3. Carousel Sync
To sync animations with a carousel, dispatch the custom event:
```javascript
window.dispatchEvent(new Event('carousel:changed'));
```

## Configuration & Testing

### Disable Animations
Set `window.__ANIMATIONS_DISABLED__ = true` in the console to instantly disable animations (requires reload/re-init).

### Reduced Motion
The module automatically respects `prefers-reduced-motion: reduce`.
- **Test**: Emulate `prefers-reduced-motion` in DevTools (Rendering tab). Animations should be disabled or simplified to simple fades.

### Mobile/Touch
Heavy animations (continuous loops, tilt effects) are disabled on touch devices to save battery and performance.
- **Test**: Toggle Device Toolbar in DevTools.

### Performance
- Uses `gsap.context()` for proper cleanup.
- Uses `ScrollTrigger.batch()` for efficient card entrances.
- Animates only `transform` and `opacity`.

## Acceptance Checklist
- [ ] Animations initialize without console errors.
- [ ] No layout shifts (CLS) are introduced.
- [ ] Navigating between pages correctly cleans up and re-initializes animations.
- [ ] `prefers-reduced-motion` disables movement.
- [ ] Touch devices receive a simplified experience.
