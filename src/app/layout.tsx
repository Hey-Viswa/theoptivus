import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Biswaranjan | Full-Stack Developer",
  description: "Portfolio of Biswaranjan — Full-Stack & Android Developer building fast, reliable systems.",
};

import Cursor from "@/components/ui/Cursor";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import SmoothScroller from "@/components/utils/SmoothScroller";
import GSAPEnhancer from "@/components/utils/GSAPEnhancer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body suppressHydrationWarning className="antialiased bg-background text-foreground cursor-none font-body">
        <div className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} ${playfair.variable}`}>
          <GSAPEnhancer />
          <SmoothScroller />
          <Cursor />
          <Navbar />

          <div id="smooth-wrapper">
            <div id="smooth-content">
              <main className="relative min-h-screen">
                {children}
              </main>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
