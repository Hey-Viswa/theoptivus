'use client';

import { useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/dist/ScrollSmoother';

export default function SmoothScroller() {
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
    }, []);

    return null;
}
