'use client';
import Link from 'next/link';
import FooterSection from './FooterSection';

export default function Footer() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="px-6 md:px-12 bg-background flex flex-col mt-0 w-full mb-12">
            <div className="flex-1 w-full grid-border-x grid-border-b grid-border-t relative">
                {/* Top Section */}
                <div className="grid grid-cols-1 md:grid-cols-12 w-full">
                    {/* Navigation */}
                    <nav className="md:col-span-6 flex flex-col md:border-r border-foreground bg-background">
                        <Link href="/work" className="text-xl font-display font-bold uppercase text-foreground hover:bg-foreground hover:text-background transition-colors p-8 border-b border-foreground" data-cursor="Pointer">Work</Link>
                        <Link href="/skills" className="text-xl font-display font-bold uppercase text-foreground hover:bg-foreground hover:text-background transition-colors p-8 border-b border-foreground" data-cursor="Pointer">Skills</Link>
                        <Link href="/about" className="text-xl font-display font-bold uppercase text-foreground hover:bg-foreground hover:text-background transition-colors p-8 border-b border-foreground" data-cursor="Pointer">About</Link>
                        <Link href="/contact" className="text-xl font-display font-bold uppercase text-foreground hover:bg-foreground hover:text-background transition-colors p-8 border-b md:border-b-0 border-foreground" data-cursor="Pointer">Contact</Link>
                    </nav>

                    {/* Scroll Top */}
                    <div className="md:col-span-6 flex items-center justify-center p-8 bg-background">
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
