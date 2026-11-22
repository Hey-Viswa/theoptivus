import type { Metadata } from 'next';
import {
  Space_Grotesk,
  Inter,
  JetBrains_Mono,
  Playfair_Display,
  Caveat,
} from 'next/font/google';
import './globals.css';
import { SITE_CONFIG } from '@/data/site';
import { PublicShell } from '@/components/layout/PublicShell';

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains',
  subsets: ['latin'],
  display: 'swap',
});

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  style: ['normal', 'italic'],
  display: 'swap',
});

const caveat = Caveat({
  variable: '--font-caveat',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

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
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} ${playfair.variable} ${caveat.variable}`}
    >
      <body
        suppressHydrationWarning
        className="antialiased bg-[var(--bg-canvas)] text-[var(--fg-primary)] font-sans selection:bg-[var(--accent-soft)] selection:text-[var(--fg-primary)]"
      >
        <PublicShell>{children}</PublicShell>
      </body>
    </html>
  );
}
