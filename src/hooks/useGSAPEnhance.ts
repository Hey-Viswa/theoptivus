'use client';

import { useEffect } from 'react';
import { initAnimations, destroyAnimations } from '@/lib/gsapEnhance';
import { usePathname } from 'next/navigation';

interface UseGSAPEnhanceProps {
    enable?: boolean;
}

export function useGSAPEnhance({ enable = true }: UseGSAPEnhanceProps = {}) {
    const pathname = usePathname();

    useEffect(() => {
        // Initialize animations on mount
        initAnimations({ enable });

        // Cleanup on unmount
        return () => {
            destroyAnimations();
        };
    }, [enable]);

    // Re-initialize on route change (Next.js soft navigation)
    // We destroy and re-init to handle new DOM elements
    useEffect(() => {
        destroyAnimations();
        const timer = setTimeout(() => {
            initAnimations({ enable });
        }, 100); // Slight delay to ensure DOM is ready

        return () => clearTimeout(timer);
    }, [pathname, enable]);
}
