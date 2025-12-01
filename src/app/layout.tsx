import type { Metadata } from "next";
import { Montserrat, Open_Sans, Nunito, Caveat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
});

const openSans = Open_Sans({
  variable: "--font-opensans",
  subsets: ["latin"],
  display: "swap",
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  display: "swap",
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Biswaranjan | Full-Stack Developer",
  description: "Portfolio of Biswaranjan, a Full-Stack Developer building fast, reliable web apps.",
};

import Cursor from "@/components/ui/Cursor";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// ... existing imports

import SmoothScroller from "@/components/utils/SmoothScroller";
import GSAPEnhancer from "@/components/utils/GSAPEnhancer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body suppressHydrationWarning className="antialiased bg-background text-foreground cursor-none">
        <div className={`${montserrat.variable} ${openSans.variable} ${nunito.variable} ${caveat.variable}`}>
          <GSAPEnhancer />
          <SmoothScroller />
          <Cursor />
          <Navbar />
          <div className="grain-overlay" />

          <div id="smooth-wrapper">
            <div id="smooth-content">
              <main className="relative z-10 min-h-screen">
                {children}
              </main>
              <Footer />
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
