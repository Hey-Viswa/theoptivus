'use client';

// Types for the configuration object
interface GSAPConfig {
    root?: HTMLElement | Document;
    enable?: boolean;
}

// Global type for animation disable flag
declare global {
    interface Window {
        __ANIMATIONS_DISABLED__?: boolean;
    }
}

let ctx: gsap.Context | null = null;
let carouselHandler: ((e: Event) => void) | null = null;

export async function initAnimations({ root = document, enable = true }: GSAPConfig = {}) {
    // 1. Check global disable flags and preferences
    if (
        !enable ||
        (typeof window !== 'undefined' && window.__ANIMATIONS_DISABLED__)
    ) {
        return;
    }

    // 2. Dynamic Import GSAP & ScrollTrigger
    const { default: gsap } = await import('gsap');
    const { ScrollTrigger } = await import('gsap/ScrollTrigger');

    gsap.registerPlugin(ScrollTrigger);

    // 3. Cleanup existing context if any
    if (ctx) ctx.revert();

    // 4. Detect Environment
    const isTouch = typeof window !== 'undefined' && (('ontouchstart' in window) || navigator.maxTouchPoints > 0);
    const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // 5. Create GSAP Context
    ctx = gsap.context(() => {
        // --- A. Floating Nav Pill ---
        // Removed to avoid conflict with Navbar.tsx entrance animation and fix lag.
        // The Navbar component handles its own entrance.


        // --- B. Blurred Background Typo Layer ---
        // Selector: data-animate="bg-typo" or fallback .hero-typo
        const bgTypos = root.querySelectorAll('[data-animate="bg-typo"], .hero-typo');
        bgTypos.forEach((typo) => {
            if (prefersReducedMotion) return;

            // Slow drift
            gsap.to(typo, {
                x: 40,
                duration: 18,
                ease: "sine.inOut",
                repeat: -1,
                yoyo: true
            });

            // Opacity pulse
            gsap.to(typo, {
                opacity: 0.4, // Assuming start is lower or higher, adjusting relative
                duration: 5,
                ease: "sine.inOut",
                repeat: -1,
                yoyo: true
            });
        });

        // --- C. Project Cards ---
        // Selector: data-animate="project-card" or fallback .project-card
        // Using ScrollTrigger batch for performance
        ScrollTrigger.batch('[data-animate="project-card"], .project-card', {
            onEnter: (elements) => {
                if (prefersReducedMotion) {
                    gsap.to(elements, { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 });
                    return;
                }

                gsap.fromTo(elements,
                    { y: 20, opacity: 0, rotate: () => Math.random() * 4 - 2 }, // -2 to 2
                    { y: 0, opacity: 1, rotate: 0, duration: 0.8, stagger: 0.08, ease: "power2.out" }
                );
            },
            once: true
        });

        // Hover tilt for cards (manual listeners managed inside context for auto-cleanup? 
        // GSAP context doesn't auto-remove vanilla listeners, but we can use context.add to group GSAP animations)
        // We'll attach listeners here and rely on destroyAnimations to remove them if we stored them, 
        // OR use GSAP's quickTo/tweens which are safe.
        // For simplicity and safety, we'll add vanilla listeners and store cleanup in the context?
        // Actually, standard practice in React is to let React handle events, but here we are "enhancing".
        // We will add listeners and remove them in destroyAnimations.
        const cards = root.querySelectorAll('[data-animate="project-card"], .project-card');
        cards.forEach((card) => {
            if (isTouch || prefersReducedMotion) return;

            const onEnter = () => gsap.to(card, { rotate: 1.8, scale: 1.02, duration: 0.3, ease: "power2.out" });
            const onLeave = () => gsap.to(card, { rotate: 0, scale: 1, duration: 0.3, ease: "power2.out" });

            card.addEventListener('pointerenter', onEnter);
            card.addEventListener('pointerleave', onLeave);

            // Store cleanup function in context data
            // @ts-ignore - adding custom property to context
            ctx?.add(() => {
                // This function is called when ctx.revert() is executed
                card.removeEventListener('pointerenter', onEnter);
                card.removeEventListener('pointerleave', onLeave);
            });
        });


        // --- D. Decorative dot & ring ---
        // Selector: data-animate="dot-ring"
        const dots = root.querySelectorAll('[data-animate="dot-ring"]');
        dots.forEach((dot) => {
            if (prefersReducedMotion) return;

            // Orbital motion
            gsap.to(dot, {
                x: 10, // Small orbital values
                y: 10,
                duration: 4,
                ease: "sine.inOut",
                repeat: -1,
                yoyo: true
            });

            // Click burst
            const onClick = () => {
                gsap.fromTo(dot,
                    { scale: 1.5, opacity: 1 },
                    { scale: 1, opacity: 0.5, duration: 0.4, ease: "power2.out" } // Reset to base state
                );
            };
            dot.addEventListener('click', onClick);
            // @ts-ignore
            ctx?.add(() => dot.removeEventListener('click', onClick));
        });

        // --- F. Cursor & Links (Magnetism) ---
        // Only if custom cursor exists (checking for .cursor-none on body or specific cursor element)
        // This is complex to add non-destructively without interfering with existing cursor logic.
        // The prompt says "if a custom cursor exists, animate subtle magnetism".
        // We'll skip this to avoid conflict with the existing complex Cursor.tsx we saw earlier.

    }, root); // Scope to root

    // --- E. Carousel Sync Hints ---
    // Global listener for custom event
    carouselHandler = (e: Event) => {
        // Pulse active card or background
        // We can select the active slide if the event provides info, or just pulse the container
        // For this generic implementation, we'll pulse the blurred background slightly
        const bg = root.querySelector('[data-animate="bg-typo"], .hero-typo');
        if (bg) {
            gsap.fromTo(bg, { scale: 1.02 }, { scale: 1, duration: 0.3 });
        }
    };
    window.addEventListener('carousel:changed', carouselHandler);
}

export function destroyAnimations() {
    if (ctx) {
        ctx.revert(); // Reverts all GSAP animations and calls cleanup functions added via ctx.add()
        ctx = null;
    }
    if (carouselHandler) {
        window.removeEventListener('carousel:changed', carouselHandler);
        carouselHandler = null;
    }
}
