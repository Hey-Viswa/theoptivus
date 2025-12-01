'use client';

import { useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/dist/ScrollSmoother';
import { usePathname } from 'next/navigation';

export default function SmoothScroller() {
    const pathname = usePathname();

    useLayoutEffect(() => {
        // Register plugins inside the effect to ensure window is defined
        gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

        const ctx = gsap.context(() => {
            ScrollSmoother.create({
                wrapper: '#smooth-wrapper',
                content: '#smooth-content',
                smooth: 1.5,
                effects: true,
                smoothTouch: 0.1,
            });
        });

        return () => ctx.revert();
    }, [pathname]); // Re-create smoother on route change to handle height changes and reset scroll

    return null;
}
