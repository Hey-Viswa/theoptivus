# Patch Instructions: Responsive & Aesthetic Fixes

This patch introduces a responsive Hero component, a robust typography system, and mobile-friendly footer/image helpers.

## 1. Import Typography
Add the typography styles to your global layout or main CSS file.
In `src/app/layout.tsx` or `src/app/globals.css`:

```css
/* In src/app/globals.css */
@import './styles/typography.css';
```
*Note: Ensure `src/styles/typography.css` is imported BEFORE Tailwind if you want to override defaults, or just import it in `layout.tsx`.*

## 2. Update Tailwind Configuration
Since this project uses Tailwind v4, add the following to your `src/app/globals.css` inside the `@theme` block (or create a `tailwind.config.js` using the provided snippet if you prefer legacy config):

```css
@theme {
  /* ... existing theme vars ... */
  
  /* Add these font mappings */
  --font-heading: var(--font-heading);
  --font-body: var(--font-body);
  --font-script: var(--font-script);
}
```
*The actual font families are defined in `src/styles/typography.css`.*

## 3. Replace Hero Component
In `src/app/page.tsx` (or wherever `Hero` is used), replace the import:

```tsx
// import Hero from '@/components/features/hero/Hero';
import Hero from '@/components/HeroResponsive';

export default function Home() {
  return (
    <main>
      <Hero />
      {/* ... */}
    </main>
  );
}
```

## 4. Use Footer Fix
In your Footer component (`src/components/layout/Footer.tsx`), replace the social links section with:

```tsx
import FooterFix from '@/components/FooterFix';

// ... inside Footer component
<FooterFix links={[
  { name: 'GITHUB', href: '...', label: 'GitHub Profile' },
  { name: 'LINKEDIN', href: '...', label: 'LinkedIn Profile' },
  // ...
]} />
```

## Acceptance Checklist

- [ ] **Hero Name Scaling**: Resize browser from 320px to 1440px. Name should scale smoothly without clipping or overflowing.
- [ ] **Hero Image CLS**: Refresh the page. The hero image should reserve space immediately (no layout shift).
- [ ] **Quote Font**: Verify the quote uses the "Handlee" (or "Caveat" if fallback) script font.
- [ ] **Footer Mobile**: On mobile (<768px), social icons should be horizontally scrollable or wrapped, and fully visible above the bottom edge.
- [ ] **Nav Pill**: Ensure the sticky nav pill allows clicking/tapping on content underneath it (pointer-events check).
- [ ] **Reduced Motion**: Enable "Prefers Reduced Motion" in OS settings. Animations should be disabled or instant.
- [ ] **Console Errors**: Check DevTools console for any React hydration or unique key errors.
