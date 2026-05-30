'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLayoutEffect, useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Work', path: '/work' },
    { name: 'Skills', path: '/skills' },
    { name: 'About', path: '/about' },
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
            <nav ref={navRef} data-animate="nav-pill" className="fixed top-0 left-0 w-full z-[10000] bg-surface/95 backdrop-blur-sm border-b-2 border-foreground hidden md:block shadow-[0_4px_0_rgba(10,22,40,1)]">
                <div className="flex w-full items-center justify-between px-8 py-4">
                    {/* Brand or empty space */}
                    <div className="font-display font-black text-2xl tracking-tight text-foreground uppercase border-2 border-foreground px-4 py-1 bg-[#FFE600] shadow-[4px_4px_0px_0px_rgba(10,22,40,1)]">
                        BISWARANJAN
                    </div>
                    
                    <div className="flex items-center gap-6">
                        {navItems.map((item) => {
                            let isActive = false;
                            if (item.path === '/') {
                                isActive = pathname === '/';
                            } else {
                                isActive = pathname.startsWith(item.path);
                            }

                            return (
                                <Link
                                    key={item.path}
                                    href={item.path}
                                    className={`px-5 py-2 text-sm font-display font-bold uppercase transition-all border-2 border-foreground ${
                                        isActive
                                        ? 'bg-foreground text-surface shadow-[0px_0px_0px_0px_rgba(10,22,40,1)] translate-y-[4px] translate-x-[4px]'
                                        : 'bg-surface text-foreground shadow-[4px_4px_0px_0px_rgba(10,22,40,1)] hover:bg-accent hover:text-surface hover:shadow-[0px_0px_0px_0px_rgba(10,22,40,1)] hover:translate-y-[4px] hover:translate-x-[4px]'
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
                className="fixed top-4 right-4 z-[10001] md:hidden w-14 h-14 flex flex-col justify-center items-center gap-1.5 bg-[#FFE600] border-2 border-foreground shadow-[4px_4px_0px_0px_rgba(10,22,40,1)] active:shadow-none active:translate-y-1 transition-all"
            >
                <span className={`w-7 h-1 bg-foreground transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2.5' : ''}`}></span>
                <span className={`w-7 h-1 bg-foreground transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
                <span className={`w-7 h-1 bg-foreground transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2.5' : ''}`}></span>
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
                <div className="flex flex-col items-center gap-6 w-full px-8">
                    {navItems.map((item) => {
                        let isActive = false;
                        if (item.path === '/') {
                            isActive = pathname === '/';
                        } else {
                            isActive = pathname.startsWith(item.path);
                        }
                        
                        return (
                            <Link
                                key={item.path}
                                href={item.path}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={`mobile-link block w-full max-w-sm text-center py-5 text-3xl font-display font-black uppercase border-4 border-foreground transition-all ${
                                    isActive
                                    ? 'bg-foreground text-surface shadow-none translate-y-2'
                                    : 'bg-surface text-foreground shadow-[8px_8px_0px_0px_rgba(10,22,40,1)] hover:bg-accent hover:text-surface hover:shadow-none hover:translate-y-2'
                                }`}
                            >
                                {item.name}
                            </Link>
                        );
                    })}
                </div>
            </div>
        </>
    );
}
