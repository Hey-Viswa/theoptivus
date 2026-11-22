import Link from 'next/link';
import { SITE_CONFIG, SOCIAL_LINKS } from '@/data/site';

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-width site-footer-inner">
        <div>
          <Link href="/about" className="text-link">About Viswa</Link>
          <p>{SITE_CONFIG.location}</p>
        </div>
        <ul aria-label="Social links">
          {SOCIAL_LINKS.map(({ name, href }) => (
            <li key={name}><a className="text-link" href={href}>{name}</a></li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
