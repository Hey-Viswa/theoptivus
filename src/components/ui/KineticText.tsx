'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface KineticTextProps {
    children: React.ReactNode;
    className?: string;
    /** How hard the text reacts to scroll velocity. 1 = default. */
    intensity?: number;
}

/**
 * Wraps a heading and makes it react to scroll velocity — skews + nudges on the
 * Y axis proportional to how fast you scroll, then eases back to rest. Gives type
 * an intentional, kinetic character without changing the layout when static.
 */
export default function KineticText({ children, className, intensity = 1 }: KineticTextProps) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        // Respect reduced-motion preferences
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        const skewTo = gsap.quickTo(el, 'skewY', { duration: 0.6, ease: 'power3' });
        const yTo = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'power3' });

        let idle: ReturnType<typeof setTimeout>;
        const rest = () => {
            skewTo(0);
            yTo(0);
        };

        const st = ScrollTrigger.create({
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            onUpdate: (self) => {
                const v = self.getVelocity();
                skewTo(gsap.utils.clamp(-7, 7, (v / 260) * intensity));
                yTo(gsap.utils.clamp(-24, 24, (v / 90) * intensity));
                clearTimeout(idle);
                idle = setTimeout(rest, 120);
            },
        });

        return () => {
            st.kill();
            clearTimeout(idle);
            gsap.set(el, { skewY: 0, y: 0 });
        };
    }, [intensity]);

    return (
        <div ref={ref} className={className} style={{ willChange: 'transform', transformOrigin: 'left center' }}>
            {children}
        </div>
    );
}
