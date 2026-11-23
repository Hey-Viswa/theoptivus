import type { Metadata } from 'next';
import Link from 'next/link';
import { PortraitPrint } from '@/components/ui/PortraitPrint';
import { PROFILE } from '@/data/profile';
import { SITE_CONFIG } from '@/data/site';

export const metadata: Metadata = {
  title: 'About',
  description: `About ${SITE_CONFIG.name}, a software engineer in Mumbai building web products, backend systems, and Android apps.`,
};

export default function AboutPage() {
  return (
    <div className="site-width editorial-page">
      <header className="editorial-page-head">
        <p className="editorial-label">
          {SITE_CONFIG.name} · {SITE_CONFIG.location}
        </p>
        <h1 className="editorial-title">About me</h1>
        <p className="editorial-intro">{PROFILE.headline}</p>
      </header>

      <div className="about-layout">
        <div className="pt-2 pb-4 sm:pb-0">
          <PortraitPrint preload />
        </div>

        <div className="about-copy">
          {PROFILE.bioParagraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}

          <section aria-labelledby="experience-title">
            <h2 className="editorial-heading" id="experience-title">
              Experience
            </h2>
            {PROFILE.experience.map((item) => (
              <article key={item.company}>
                <h3>
                  {item.role}, {item.company}
                </h3>
                <p className="editorial-label">
                  {item.period} · {item.location}
                </p>
                <p>{item.summary}</p>
              </article>
            ))}
          </section>

          <section aria-labelledby="education-title">
            <h2 className="editorial-heading" id="education-title">
              Education
            </h2>
            {PROFILE.education.map((item) => (
              <article key={item.institution}>
                <h3>{item.degree}</h3>
                <p>{item.institution}</p>
                <p className="editorial-label">
                  {item.period} · {item.location}
                </p>
              </article>
            ))}
          </section>

          <div className="editorial-actions text-[var(--accent)]">
            <Link
              href="/work"
              className="text-link inline-flex items-center gap-1 min-h-[44px] font-medium"
            >
              Selected work <span aria-hidden="true">→</span>
            </Link>
            <Link
              href="/contact"
              className="text-link inline-flex items-center gap-1 min-h-[44px] font-medium"
            >
              Get in touch <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
