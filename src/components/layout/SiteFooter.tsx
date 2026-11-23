import Link from 'next/link';
import { SITE_CONFIG, SOCIAL_LINKS } from '@/data/site';

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-width site-footer-inner">
        <div>
          <Link href="/about" className="text-link">
            {SITE_CONFIG.name}
          </Link>
          <p>
            {SITE_CONFIG.role} · {SITE_CONFIG.location} ·{' '}
            <a className="text-link" href={`mailto:${SITE_CONFIG.email}`}>
              {SITE_CONFIG.email}
            </a>
          </p>
        </div>
        <ul aria-label="Social links">
          {SOCIAL_LINKS.map(({ name, href }) => (
            <li key={name}>
              <a
                className="text-link inline-flex min-h-[44px] items-center"
                href={href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
