'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SignatureMark, ScribbleUnderline } from '@/components/ui/Scribbles';
import { NAV_ITEMS, SITE_CONFIG } from '@/data/site';

type IndexEntry = { slug: string; name: string; image: string; category: string };

export function SiteHeader({ projects }: { projects: IndexEntry[] }) {
  const path = usePathname();

  return (
    <>
      <header className="folio-mast">
        <Link href="/" className="folio-brand" aria-label={SITE_CONFIG.name + ' — Home'}>
          <SignatureMark className="rail-autograph" />
        </Link>
        <nav aria-label="Pages" className="folio-pages">
          {NAV_ITEMS.filter(item => item.href !== '/').map(({ href, label }) => {
            const current = path === href ? 'page' : path.startsWith(href + '/') ? 'location' : undefined;
            return (
              <Link key={href} href={href} aria-current={current}>
                {label}{current && <ScribbleUnderline className="rail-underline" />}
              </Link>
            );
          })}
        </nav>
      </header>
      <aside className="project-margin" aria-label="Selected work">
        <nav aria-labelledby="index-heading">
          <Link id="index-heading" href="/work">Selected work</Link>
          <ul>
            {projects.map(project => (
              <li key={project.slug}>
                <Link href={'/work/' + project.slug} aria-current={path === '/work/' + project.slug ? 'page' : undefined}>
                  <span className={'index-thumb thumb-' + project.slug}>
                    <Image src={project.image} alt="" fill sizes="52px" />
                  </span>
                  <span><strong>{project.name}</strong><small>{project.category}</small></span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
}
