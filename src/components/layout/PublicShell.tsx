'use client';

import { usePathname } from 'next/navigation';

export function PublicShell({ children, navigation }: { children: React.ReactNode; navigation: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname === '/dashboard' || pathname?.startsWith('/dashboard/')) return children;

  return (
    <div className="public-site">
      <a className="skip-link" href="#main-content">Skip to main content</a>
      {navigation}
      <main id="main-content" tabIndex={-1}>{children}</main>
    </div>
  );
}
