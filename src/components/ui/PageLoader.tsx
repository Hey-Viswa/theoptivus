'use client';

import { useEffect, useState } from 'react';

/**
 * Brutalist initial-load loader: a cream full-screen overlay with an oversized
 * count-up (000 → 100), a thin blue progress line, then a clip-style slide-up
 * reveal of the page. Mounts once in the root layout, so it only plays on the
 * first paint — client-side route changes don't retrigger it.
 *
 * SSR-safe: first render is count=0 / translate-y-0 on both server and client,
 * so there is no hydration mismatch.
 */
export default function PageLoader() {
    const [count, setCount] = useState(0);
    const [done, setDone] = useState(false);

    useEffect(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            setDone(true);
            return;
        }

        let raf = 0;
        let hideTimer: ReturnType<typeof setTimeout>;
        let start: number | null = null;
        const duration = 1100;

        const tick = (t: number) => {
            if (start === null) start = t;
            const p = Math.min((t - start) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
            setCount(Math.round(eased * 100));
            if (p < 1) {
                raf = requestAnimationFrame(tick);
            } else {
                hideTimer = setTimeout(() => setDone(true), 250);
            }
        };
        raf = requestAnimationFrame(tick);

        return () => {
            cancelAnimationFrame(raf);
            clearTimeout(hideTimer);
        };
    }, []);

    return (
        <div
            aria-hidden
            className={`fixed inset-0 z-[10050] flex flex-col items-center justify-center bg-background transition-transform duration-[800ms] ease-[cubic-bezier(0.76,0,0.24,1)] ${
                done ? '-translate-y-full pointer-events-none' : 'translate-y-0'
            }`}
        >
            <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] text-foreground/50 mb-6">
                Loading
            </span>
            <div className="font-display font-black text-foreground text-7xl md:text-[10rem] leading-none tabular-nums tracking-tighter">
                {String(count).padStart(3, '0')}
            </div>
            <div className="mt-8 h-[2px] w-44 md:w-72 bg-foreground/15 overflow-hidden">
                <div className="h-full bg-accent transition-[width] duration-100 ease-linear" style={{ width: `${count}%` }} />
            </div>
        </div>
    );
}
