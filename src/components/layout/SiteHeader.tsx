'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SignatureMark, ScribbleUnderline } from '@/components/ui/Scribbles';
import { NAV_ITEMS, SITE_CONFIG } from '@/data/site';

export function SiteHeader() {
  const path = usePathname();

  return (
    <header className="folio-mast">
      <div className="site-width folio-mast-inner flex-wrap py-1">
        <Link
          href="/"
          className="folio-brand min-w-[44px] min-h-[44px] shrink-0"
          aria-label={`${SITE_CONFIG.name} — Home`}
          aria-current={path === '/' ? 'page' : undefined}
        >
          <SignatureMark className="rail-autograph" />
        </Link>
        <nav aria-label="Pages" className="folio-pages flex-wrap items-center gap-y-0">
          {NAV_ITEMS.filter((item) => item.href !== '/').map(({ href, label }) => {
            const current =
              path === href ? 'page' : path.startsWith(`${href}/`) ? 'location' : undefined;
            return (
              <Link
                key={href}
                href={href}
                aria-current={current}
                className="group min-w-[44px] min-h-[44px] justify-center px-1.5"
              >
                <span>{label}</span>
                <ScribbleUnderline
                  className={
                    current
                      ? 'rail-underline text-[var(--accent)] pointer-events-none'
                      : 'rail-underline text-[var(--accent)] pointer-events-none opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100'
                  }
                />
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
