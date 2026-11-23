'use client';

import { usePathname } from 'next/navigation';
import { SiteHeader } from './SiteHeader';

export function PublicShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname === '/dashboard' || pathname?.startsWith('/dashboard/')) return children;

  return (
    <div className="public-site">
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <SiteHeader />
      <main id="main-content" tabIndex={-1}>{children}</main>
    </div>
  );
}
