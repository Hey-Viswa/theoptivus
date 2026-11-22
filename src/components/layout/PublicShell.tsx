'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { SiteFooter } from '@/components/layout/SiteFooter';

export function PublicShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (pathname?.startsWith('/dashboard')) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-dvh flex flex-col bg-[var(--bg-canvas)] text-[var(--fg-primary)]">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-[var(--bg-inverse)] focus:text-[#F6F5F0] focus:font-mono focus:text-xs"
      >
        Skip to main content
      </a>
      <SiteHeader />
      <main id="main-content" className="flex-1 min-h-[calc(100dvh-4rem)]">
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}

export default PublicShell;
