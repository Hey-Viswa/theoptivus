'use client';
import Link from 'next/link';
import FooterSection from './FooterSection';

export default function Footer() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="bg-background relative overflow-hidden mt-20 flex flex-col items-center w-full">
            <div className="w-full max-w-[1920px] grid-border-t">
                {/* Top Section */}
                <div className="grid grid-cols-1 md:grid-cols-12 w-full">
                    {/* Navigation */}
                    <nav className="md:col-span-6 flex flex-col md:border-r border-foreground">
                        <Link href="/projects" className="text-xl font-display font-bold uppercase text-foreground hover:bg-accent hover:text-surface transition-colors p-8 border-b border-foreground" data-cursor="Pointer">Portfolio</Link>
                        <Link href="/about" className="text-xl font-display font-bold uppercase text-foreground hover:bg-accent hover:text-surface transition-colors p-8 border-b border-foreground" data-cursor="Pointer">About</Link>
                        <Link href="/contact" className="text-xl font-display font-bold uppercase text-foreground hover:bg-accent hover:text-surface transition-colors p-8 md:border-b-0 border-foreground" data-cursor="Pointer">Contact</Link>
                    </nav>

                    {/* Scroll Top */}
                    <div className="md:col-span-6 flex items-center justify-center p-8 bg-surface">
                        <button
                            onClick={scrollToTop}
                            className="editorial-btn uppercase text-sm"
                            data-cursor="Top"
                        >
                            Back to top
                            <span className="group-hover:-translate-y-1 transition-transform">↑</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Bottom Section (Socials + Name) */}
            <FooterSection />
        </footer>
    );
}
