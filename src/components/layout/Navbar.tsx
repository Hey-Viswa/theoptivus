'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Work', path: '#works' },
    { name: 'About', path: '#about' },
    { name: 'Contact', path: '/contact' },
];

export default function Navbar() {
    const pathname = usePathname();
    const navRef = useRef<HTMLDivElement>(null);
    const [activeSection, setActiveSection] = useState('');

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(navRef.current,
                { y: -100, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1.2,
                    ease: 'power4.out',
                    delay: 0.2
                }
            );

            // Animate links individually
            const links = navRef.current?.querySelectorAll('a');
            if (links) {
                gsap.fromTo(links,
                    { y: -20, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.8,
                        stagger: 0.1,
                        ease: 'power2.out',
                        delay: 0.5
                    }
                );
            }
        }, navRef);

        return () => ctx.revert();
    }, []);

    useEffect(() => {
        // Only run intersection observer on home page
        if (pathname !== '/') {
            setActiveSection('');
            return;
        }

        const observerOptions = {
            root: null,
            rootMargin: '-50% 0px -50% 0px', // Trigger when section is in middle of viewport
            threshold: 0
        };

        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    if (entry.target.id === 'about') setActiveSection('#about');
                    else if (entry.target.id === 'works') setActiveSection('#works');
                    else if (entry.target.tagName === 'SECTION' && !entry.target.id) setActiveSection('/'); // Hero section usually doesn't have ID but is first
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        // Observe sections
        const sections = document.querySelectorAll('section');
        sections.forEach((section) => observer.observe(section));

        return () => observer.disconnect();
    }, [pathname]);

    return (
        <nav ref={navRef} className="fixed top-6 left-1/2 -translate-x-1/2 z-[1000]">
            <div className="flex items-center gap-1 px-2 py-2 bg-neutral-900/80 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl hover:border-white/20 transition-colors duration-300">
                {navItems.map((item) => {
                    // Determine if item is active
                    let isActive = false;
                    if (item.path === '/') {
                        isActive = pathname === '/' && (activeSection === '/' || activeSection === '');
                    } else if (item.path.startsWith('#')) {
                        isActive = pathname === '/' && activeSection === item.path;
                    } else {
                        isActive = pathname === item.path;
                    }

                    return (
                        <Link
                            key={item.path}
                            href={item.path}
                            className={`relative px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${isActive
                                ? 'text-black bg-white shadow-[0_0_20px_rgba(255,255,255,0.3)]'
                                : 'text-gray-400 hover:text-white hover:bg-white/5'
                                }`}
                            data-cursor={isActive ? '' : 'Pointer'}
                            onClick={() => {
                                if (item.path.startsWith('#')) {
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
