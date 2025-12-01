'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLayoutEffect, useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Work', path: '/#works' },
    { name: 'Skills', path: '/#featured-skills' },
    { name: 'About', path: '/#about' },
    { name: 'Contact', path: '/contact' },
];

export default function Navbar() {
    const pathname = usePathname();
    const navRef = useRef<HTMLDivElement>(null);
    const mobileMenuRef = useRef<HTMLDivElement>(null);
    const [activeSection, setActiveSection] = useState('');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Close mobile menu on path change
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [pathname, activeSection]);

    // Prevent scrolling when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }, [isMobileMenuOpen]);

    useLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        // Check hash on mount
        if (typeof window !== 'undefined' && window.location.hash) {
            setActiveSection('/' + window.location.hash);
        }

        const ctx = gsap.context(() => {
            // Entrance Animation - Optimized
            gsap.set(navRef.current, { willChange: 'transform, opacity' });
            gsap.fromTo(navRef.current,
                { y: -30, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: 'power3.out',
                    delay: 0.2,
                    force3D: true,
                    onComplete: () => {
                        gsap.set(navRef.current, { willChange: 'auto' });
                    }
                }
            );

            // Animate links individually
            const links = navRef.current?.querySelectorAll('a');
            if (links) {
                gsap.fromTo(links,
                    { y: -15, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.8,
                        stagger: 0.1,
                        ease: 'power2.out',
                        delay: 0.4
                    }
                );
            }

            // Active Section Logic with ScrollTrigger (ScrollSpy)
            if (pathname === '/') {
                // Define sections in order
                const sections = [
                    { id: 'hero', selector: '#hero', navPath: '/' },
                    { id: 'works', selector: '#works', navPath: '/#works' },
                    { id: 'featured-skills', selector: '#featured-skills', navPath: '/#featured-skills' },
                    { id: 'about', selector: '#about', navPath: '/#about' },
                    { id: 'skills', selector: '#skills', navPath: '/#featured-skills' },
                    { id: 'about-more', selector: '#about-more', navPath: '/#about' }
                ];

                // Create triggers for each section
                sections.forEach((section, index) => {
                    const element = document.querySelector(section.selector);
                    if (element) {
                        ScrollTrigger.create({
                            trigger: element,
                            start: "top 80%", // Trigger when top of section hits 80% of viewport height
                            end: "bottom center",
                            onEnter: () => setActiveSection(section.navPath),
                            onEnterBack: () => setActiveSection(section.navPath),
                            // Fallback for Hero to ensure it catches top-of-page
                            ...(index === 0 && {
                                start: "top top",
                                onLeave: () => { /* let next section take over */ },
                                onEnterBack: () => setActiveSection(section.navPath)
                            })
                        });
                    }
                });
            } else {
                setActiveSection('');
            }

            // Refresh ScrollTrigger to ensure positions are correct after layout settles
            setTimeout(() => {
                ScrollTrigger.refresh();
            }, 1000);

        }, navRef);

        return () => ctx.revert();
    }, [pathname]);

    // Mobile Menu Animation
    useEffect(() => {
        if (isMobileMenuOpen) {
            gsap.to(mobileMenuRef.current, {
                x: '0%',
                duration: 0.5,
                ease: 'power3.out',
                display: 'flex'
            });
            gsap.fromTo('.mobile-link',
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.4, stagger: 0.1, delay: 0.2 }
            );
        } else {
            gsap.to(mobileMenuRef.current, {
                x: '100%',
                duration: 0.5,
                ease: 'power3.in',
                onComplete: () => {
                    if (mobileMenuRef.current) mobileMenuRef.current.style.display = 'none';
                }
            });
        }
    }, [isMobileMenuOpen]);

    return (
        <>
            {/* Desktop Navbar */}
            <nav ref={navRef} data-animate="nav-pill" className="fixed top-6 left-1/2 -translate-x-1/2 z-[10000] w-[90%] max-w-fit hidden md:block">
                <div className="flex items-center justify-center gap-1 px-2 py-2 bg-neutral-900/80 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl hover:border-white/20 transition-colors duration-300">
                    {navItems.map((item) => {
                        // Determine if item is active
                        let isActive = false;

                        if (item.name === 'Work' && pathname.startsWith('/projects/')) {
                            isActive = true;
                        } else if (item.path === '/') {
                            isActive = pathname === '/' && (activeSection === '/' || activeSection === '');
                        } else if (item.path.includes('#')) {
                            isActive = pathname === '/' && activeSection === item.path;
                        } else {
                            isActive = pathname === item.path;
                        }

                        return (
                            <Link
                                key={item.path}
                                href={item.path}
                                className={`relative px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap ${isActive
                                    ? 'text-black bg-white shadow-[0_0_20px_rgba(255,255,255,0.3)]'
                                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                                    }`}
                                data-cursor={isActive ? '' : 'Pointer'}
                            >
                                {item.name}
                            </Link>
                        );
                    })}
                </div>
            </nav>

            {/* Mobile Hamburger Button */}
            <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="fixed top-6 right-6 z-[10001] md:hidden w-12 h-12 flex flex-col justify-center items-center gap-1.5 bg-neutral-900/80 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl"
            >
                <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
                <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </button>

            {/* Mobile Fullscreen Menu */}
            <div
                ref={mobileMenuRef}
                className="fixed inset-0 z-[10000] bg-black/95 backdrop-blur-3xl hidden flex-col items-center justify-center translate-x-full"
            >
                <div className="flex flex-col items-center gap-8">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            href={item.path}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="mobile-link text-4xl font-display font-bold text-white hover:text-accent transition-colors"
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
}
