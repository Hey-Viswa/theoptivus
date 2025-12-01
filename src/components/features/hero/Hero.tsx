'use client';
import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const biswaRef = useRef<HTMLHeadingElement>(null);
    const ranjanRef = useRef<HTMLHeadingElement>(null);
    const subRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                defaults: { ease: 'power3.out' },
                onComplete: () => ScrollTrigger.refresh() // Ensure scroll positions are recalculated
            });

            // Helper to get chars
            const getChars = (element: HTMLElement | null) => element?.querySelectorAll('.char') || [];

            // Entrance Animation using fromTo for robustness
            tl.fromTo(getChars(biswaRef.current),
                { y: 100, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    stagger: 0.05,
                    duration: 1,
                    ease: 'power4.out'
                }
            )
                .fromTo(getChars(ranjanRef.current),
                    { y: 100, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        stagger: 0.05,
                        duration: 1,
                        ease: 'power4.out'
                    }, '-=0.8')
                .fromTo(subRef.current,
                    { y: 20, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 1
                    }, '-=0.5');

            // Parallax
            gsap.to([biswaRef.current, ranjanRef.current], {
                y: -150,
                ease: 'none',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true
                }
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    const renderChars = (text: string) => {
        return text.split('').map((char, i) => (
            <span key={i} className="char inline-block">{char}</span>
        ));
    };

    return (
        <section
            id="hero"
            ref={containerRef}
            className="relative min-h-screen flex flex-col justify-center items-center px-6 overflow-hidden bg-background"
        >
            {/* Subtle Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[150px] pointer-events-none z-0" />

            {/* Main Content */}
            <div className="relative z-10 flex flex-col items-center text-center leading-[0.85]">
                {/* BISWA - Solid */}
                <h1 ref={biswaRef} className="font-display font-bold text-[clamp(50px,18vw,400px)] text-white tracking-tighter">
                    {renderChars('BISWA')}
                </h1>

                {/* RANJAN - Outline */}
                <h1 ref={ranjanRef} className="font-display font-bold text-[clamp(50px,18vw,400px)] text-transparent tracking-tighter [-webkit-text-stroke:1px_rgba(255,255,255,0.8)] md:[-webkit-text-stroke:2px_rgba(255,255,255,0.8)]">
                    {renderChars('RANJAN')}
                </h1>
            </div>

            {/* Subtitle */}
            <div ref={subRef} className="mt-8 md:mt-12 flex flex-col items-center gap-4 relative z-20">
                <p className="text-xs md:text-xl text-gray-400 tracking-[0.2em] uppercase font-light text-center px-4">
                    Full-Stack & Android Developer
                </p>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10 opacity-30 animate-pulse">
                <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-white to-transparent"></div>
            </div>
        </section>
    );
}
