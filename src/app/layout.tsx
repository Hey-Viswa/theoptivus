import type { Metadata } from "next";
import { Oswald, Inter, Caveat } from "next/font/google";
import "./globals.css";

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Biswaranjan | Full-Stack Developer",
  description: "Portfolio of Biswaranjan, a Full-Stack Developer building fast, reliable web apps.",
};

import Cursor from "@/components/ui/Cursor";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// ... existing imports

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${oswald.variable} ${inter.variable} ${caveat.variable} antialiased bg-background text-foreground cursor-none`}
      >
        <Cursor />
        <Navbar />
        <div className="grain-overlay" />
        <main className="relative z-10 min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
