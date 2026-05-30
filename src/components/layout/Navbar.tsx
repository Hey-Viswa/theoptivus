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
            // Entrance Animation
            gsap.set(navRef.current, { willChange: 'transform, opacity' });
            gsap.fromTo(navRef.current,
                { y: -20, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: 'power3.out',
                    delay: 0.3,
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
                    { y: -10, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.6,
                        stagger: 0.08,
                        ease: 'power2.out',
                        delay: 0.5
                    }
                );
            }

            // Active Section Logic with ScrollTrigger (ScrollSpy)
            if (pathname === '/') {
                const sections = [
                    { id: 'hero', selector: '#hero', navPath: '/' },
                    { id: 'works', selector: '#works', navPath: '/#works' },
                    { id: 'featured-skills', selector: '#featured-skills', navPath: '/#featured-skills' },
                    { id: 'about', selector: '#about', navPath: '/#about' },
                    { id: 'skills', selector: '#skills', navPath: '/#featured-skills' },
                    { id: 'about-more', selector: '#about-more', navPath: '/#about' }
                ];

                sections.forEach((section, index) => {
                    const element = document.querySelector(section.selector);
                    if (element) {
                        ScrollTrigger.create({
                            trigger: element,
                            start: "top 80%",
                            end: "bottom center",
                            onEnter: () => setActiveSection(section.navPath),
                            onEnterBack: () => setActiveSection(section.navPath),
                            ...(index === 0 && {
                                start: "top top",
                                onLeave: () => { },
                                onEnterBack: () => setActiveSection(section.navPath)
                            })
                        });
                    }
                });
            } else {
                setActiveSection('');
            }

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
                opacity: 1,
                duration: 0.5,
                ease: 'power3.out'
            });
            gsap.fromTo('.mobile-link',
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.4, stagger: 0.1, delay: 0.2 }
            );
        } else {
            gsap.to(mobileMenuRef.current, {
                x: '100%',
                opacity: 0,
                duration: 0.5,
                ease: 'power3.in'
            });
        }
    }, [isMobileMenuOpen]);

    return (
        <>
            {/* Desktop Navbar */}
            <nav ref={navRef} data-animate="nav-pill" className="fixed top-0 left-0 w-full z-[10000] bg-surface grid-border-b hidden md:block">
                <div className="flex w-full items-center justify-between px-8 py-4">
                    {/* Brand or empty space */}
                    <div className="font-display font-bold text-xl tracking-tight text-foreground">
                        BISWARANJAN
                    </div>
                    
                    <div className="flex items-center gap-8">
                        {navItems.map((item) => {
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
                                    className={`relative text-sm font-medium tracking-wide transition-colors ${isActive
                                        ? 'text-accent'
                                        : 'text-foreground hover:text-accent'
                                        }`}
                                    data-cursor={isActive ? '' : 'Pointer'}
                                >
                                    {item.name}
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </nav>

            {/* Mobile Hamburger Button */}
            <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="fixed top-4 right-4 z-[10001] md:hidden w-12 h-12 flex flex-col justify-center items-center gap-1.5 bg-surface grid-border"
            >
                <span className={`w-6 h-0.5 bg-foreground transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                <span className={`w-6 h-0.5 bg-foreground transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
                <span className={`w-6 h-0.5 bg-foreground transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </button>

            {/* Mobile Fullscreen Menu */}
            <div
                ref={mobileMenuRef}
                className="fixed inset-0 z-[10000] bg-background flex flex-col items-center justify-center opacity-0"
                style={{
                    pointerEvents: isMobileMenuOpen ? 'auto' : 'none',
                    transform: 'translateX(100%)'
                }}
            >
                <div className="flex flex-col items-center gap-6 w-full px-6">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            href={item.path}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="mobile-link block w-full max-w-md text-center py-4 text-3xl font-display font-bold text-foreground grid-border bg-surface hover:bg-accent hover:text-surface transition-colors"
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
}
