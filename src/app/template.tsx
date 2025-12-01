'use client';

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { usePathname } from 'next/navigation';

export default function Template({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const elementRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        if (!elementRef.current) return;

        const ctx = gsap.context(() => {
            // Animate in
            gsap.fromTo(elementRef.current,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', clearProps: 'all' }
            );
        }, elementRef);

        return () => ctx.revert();
    }, [pathname]);

    return (
        <div ref={elementRef} className="min-h-screen">
            {children}
        </div>
    );
}
