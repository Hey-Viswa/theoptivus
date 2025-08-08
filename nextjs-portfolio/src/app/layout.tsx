import type { Metadata } from "next";
import { Poppins, Epilogue } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: 'swap',
});

const epilogue = Epilogue({
  variable: "--font-epilogue",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: 'swap',
});

const caveat = localFont({
  src: "../../public/fonts/Caveat-VariableFont_wght.ttf",
  variable: "--font-caveat",
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: "Optivus - Full Stack Developer Portfolio",
    template: "%s | Optivus Portfolio"
  },
  description: "Optivus is a passionate Full Stack Developer creating exceptional digital experiences through clean code and innovative solutions. Specializing in React, Next.js, and modern web technologies.",
  keywords: [
    "Full Stack Developer",
    "React Developer",
    "Next.js Developer",
    "Web Developer",
    "Frontend Developer",
    "Backend Developer",
    "JavaScript Developer",
    "TypeScript Developer",
    "Portfolio",
    "Optivus"
  ],
  authors: [{ name: "Optivus" }],
  creator: "Optivus",
  publisher: "Optivus",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://optivus-portfolio.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'Optivus Portfolio',
    title: 'Optivus - Full Stack Developer Portfolio',
    description: 'Optivus is a passionate Full Stack Developer creating exceptional digital experiences through clean code and innovative solutions.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Optivus - Full Stack Developer Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Optivus - Full Stack Developer Portfolio',
    description: 'Optivus is a passionate Full Stack Developer creating exceptional digital experiences through clean code and innovative solutions.',
    images: ['/og-image.png'],
    creator: '@optivus',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} ${epilogue.variable} ${caveat.variable}`}>
      <body className="font-poppins antialiased">
        {children}

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Optivus",
              "jobTitle": "Full Stack Developer",
              "description": "Passionate Full Stack Developer creating exceptional digital experiences through clean code and innovative solutions",
              "url": process.env.NEXT_PUBLIC_SITE_URL || "https://optivus-portfolio.vercel.app",
              "sameAs": [
                "https://github.com/optivus",
                "https://linkedin.com/in/optivus",
                "https://twitter.com/optivus"
              ],
              "knowsAbout": [
                "React",
                "Next.js",
                "JavaScript",
                "TypeScript",
                "Node.js",
                "Full Stack Development",
                "Frontend Development",
                "Backend Development"
              ],
              "alumniOf": {
                "@type": "Organization",
                "name": "Your University/Bootcamp"
              },
              "workLocation": {
                "@type": "Place",
                "name": "Remote/Your Location"
              }
            })
          }}
        />
      </body>
    </html>
  );
}
