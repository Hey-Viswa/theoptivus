'use client';
import Link from 'next/link';
import FooterProjectCarousel from '../ui/FooterProjectCarousel';
import FooterSection from './FooterSection';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';

gsap.registerPlugin(TextPlugin);

export default function Footer() {
    const quoteRef = useRef<HTMLParagraphElement>(null);
    const cursorRef = useRef<HTMLSpanElement>(null);
    const signatureRef = useRef<HTMLParagraphElement>(null);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    useEffect(() => {
        if (quoteRef.current && cursorRef.current && signatureRef.current) {
            const tl = gsap.timeline({ delay: 0.5 }); // Play once
            const text = "I build myself the same way I build my projects — with patience, bugs, fixes, and relentless consistency.";

            // Set initial state for signature
            gsap.set(signatureRef.current, { opacity: 0, y: 10 });

            tl.to(quoteRef.current, {
                duration: 4,
                text: text,
                ease: "none",
            })
                .to(cursorRef.current, {
                    opacity: 0,
                    duration: 0.5,
                    repeat: 5,
                    yoyo: true,
                    ease: "power2.inOut",
                    onComplete: () => {
                        // Hide cursor after typing
                        if (cursorRef.current) cursorRef.current.style.display = 'none';
                    }
                })
                .to(signatureRef.current, {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: "power2.out"
                }, "-=0.5"); // Overlap slightly with cursor blinking
        }
    }, []);

    return (
        <footer className="bg-white text-black relative overflow-hidden rounded-t-[2.5rem] mt-20">
            {/* Project Carousel */}
            <FooterProjectCarousel />

            <div className="max-w-[1920px] mx-auto px-6 md:px-12 pt-20 pb-0">
                {/* Top Section */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-10 items-start">
                    {/* Navigation */}
                    <nav className="md:col-span-3 flex flex-col md:flex-row gap-6 md:gap-8">
                        <Link href="/projects" className="text-lg font-medium hover:opacity-60 transition-opacity" data-cursor="Pointer">Portfolio</Link>
                        <Link href="/about" className="text-lg font-medium hover:opacity-60 transition-opacity" data-cursor="Pointer">About</Link>
                        <Link href="/contact" className="text-lg font-medium hover:opacity-60 transition-opacity" data-cursor="Pointer">Contact</Link>
                    </nav>

                    {/* Quote */}
                    <div className="md:col-span-6 flex justify-center">
                        <div className="text-center max-w-lg">
                            <p className="font-['Caveat'] text-4xl leading-relaxed min-h-[140px] flex items-center justify-center text-gray-800" style={{ fontFamily: 'var(--font-caveat)' }}>
                                <span>"<span ref={quoteRef}></span><span ref={cursorRef} className="inline-block w-0.5 h-8 bg-black ml-1 align-middle"></span>"</span>
                            </p>
                            <p ref={signatureRef} className="mt-4 text-sm uppercase tracking-widest text-gray-500 font-sans whitespace-nowrap opacity-0">- Biswaranjan</p>
                        </div>
                    </div>

                    {/* Scroll Top */}
                    <div className="md:col-span-3 flex justify-end">
                        <button
                            onClick={scrollToTop}
                            className="flex items-center gap-2 text-lg font-medium hover:opacity-60 transition-opacity group"
                            data-cursor="Top"
                        >
                            Scroll to top
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
