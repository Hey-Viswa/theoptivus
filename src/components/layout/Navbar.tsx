'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Work', path: '/#works' },
    { name: 'About', path: '/#about' },
    { name: 'Contact', path: '/contact' },
];

export default function Navbar() {
    const pathname = usePathname();
    const navRef = useRef<HTMLDivElement>(null);
    const [activeSection, setActiveSection] = useState('');

    useLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

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
                    { id: 'about', selector: '#about', navPath: '/#about' }
                ];

                // Create triggers for each section
                sections.forEach((section, index) => {
                    const element = document.querySelector(section.selector);
                    if (element) {
                        ScrollTrigger.create({
                            trigger: element,
                            start: "top center", // Consistent trigger point
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

        }, navRef);

        return () => ctx.revert();
    }, [pathname]);

    return (
        <nav ref={navRef} data-animate="nav-pill" className="hidden md:block fixed top-6 left-1/2 -translate-x-1/2 z-[10000] w-[90%] max-w-fit">
            <div className="flex items-center justify-center gap-1 px-1.5 py-1.5 md:px-2 md:py-2 bg-neutral-900/80 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl hover:border-white/20 transition-colors duration-300">
                {navItems.map((item) => {
                    // Determine if item is active
                    let isActive = false;
                    if (item.path === '/') {
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
                            className={`relative px-4 py-2 md:px-6 md:py-2.5 rounded-full text-xs md:text-sm font-medium transition-all duration-300 whitespace-nowrap ${isActive
                                ? 'text-black bg-white shadow-[0_0_20px_rgba(255,255,255,0.3)]'
                                : 'text-gray-400 hover:text-white hover:bg-white/5'
                                }`}
                            data-cursor={isActive ? '' : 'Pointer'}
                            onClick={() => {
                                if (item.path.includes('#')) {
                                    setActiveSection(item.path);
                                }
                            }}
                        >
                            {item.name}
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
