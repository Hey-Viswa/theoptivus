import type { Metadata } from 'next';
import './globals.css';
import './portfolio.css';
import { getFeaturedProjects } from '@/data/projects';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { SITE_CONFIG } from '@/data/site';
import { PublicShell } from '@/components/layout/PublicShell';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: `${SITE_CONFIG.name} — ${SITE_CONFIG.role}`,
    template: `%s — ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  authors: [{ name: SITE_CONFIG.name, url: SITE_CONFIG.url }],
  creator: SITE_CONFIG.name,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    title: `${SITE_CONFIG.name} — ${SITE_CONFIG.role}`,
    description: SITE_CONFIG.description,
    images: [
      {
        url: SITE_CONFIG.avatar,
        width: 800,
        height: 800,
        alt: SITE_CONFIG.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_CONFIG.name} — ${SITE_CONFIG.role}`,
    description: SITE_CONFIG.description,
    images: [SITE_CONFIG.avatar],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className="antialiased bg-[var(--bg-canvas)] text-[var(--fg-primary)] font-sans selection:bg-[var(--accent-soft)] selection:text-[var(--fg-primary)]"
      >
        <PublicShell navigation={<SiteHeader projects={getFeaturedProjects().map(project => ({
          slug: project.slug, name: project.shortTitle ?? project.title, image: project.thumbnail, category: project.category,
        }))} />}>{children}</PublicShell>
      </body>
    </html>
  );
}
