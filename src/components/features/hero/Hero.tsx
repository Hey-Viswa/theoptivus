'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const biswaRef = useRef<HTMLHeadingElement>(null);
    const ranjanRef = useRef<HTMLHeadingElement>(null);
    const subRef = useRef<HTMLParagraphElement>(null);
    const spotlightRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline();

            // Split text for animation (simple char staggering)
            const charsBiswa = biswaRef.current?.querySelectorAll('.char') ?? [];
            const charsRanjan = ranjanRef.current?.querySelectorAll('.char') ?? [];

            // Initial State
            gsap.set([charsBiswa, charsRanjan], { y: 100, opacity: 0 });
            gsap.set(subRef.current, { y: 20, opacity: 0 });

            // Entrance Animation
            tl.to(charsBiswa, {
                y: 0,
                opacity: 1,
                duration: 1,
                stagger: 0.05,
                ease: 'power4.out',
                delay: 0.2
            })
                .to(charsRanjan, {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    stagger: 0.05,
                    ease: 'power4.out'
                }, '-=0.8')
                .to(subRef.current, {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: 'power2.out'
                }, '-=0.5');

            // Spotlight Effect
            const handleMouseMove = (e: MouseEvent) => {
                if (!spotlightRef.current) return;
                const { clientX, clientY } = e;
                gsap.to(spotlightRef.current, {
                    x: clientX,
                    y: clientY,
                    duration: 0.5,
                    ease: 'power2.out'
                });
            };

            window.addEventListener('mousemove', handleMouseMove);

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

            return () => {
                window.removeEventListener('mousemove', handleMouseMove);
            };
        }, containerRef);

        return () => ctx.revert();
    }, []);

    const renderChars = (text: string) => {
        return text.split('').map((char, i) => (
            <span key={i} className="char inline-block">{char}</span>
        ));
    };

    return (
        <section id="hero" ref={containerRef} className="h-screen flex flex-col justify-center items-center px-4 relative overflow-hidden bg-background">
            {/* Interactive Spotlight */}
            <div
                ref={spotlightRef}
                className="absolute top-0 left-0 w-[800px] h-[800px] bg-white/5 rounded-full blur-[100px] pointer-events-none -translate-x-1/2 -translate-y-1/2 mix-blend-soft-light z-0"
            />

            <div className="relative z-10 flex flex-col items-center leading-[0.85]">
                <h1 ref={biswaRef} data-animate="bg-typo" className="font-display font-bold text-[clamp(60px,18vw,400px)] text-white tracking-tighter">
                    {renderChars('BISWA')}
                </h1>
                <h1 ref={ranjanRef} data-animate="bg-typo" className="font-display font-bold text-[clamp(60px,18vw,400px)] text-transparent tracking-tighter" style={{ WebkitTextStroke: '2px rgba(255,255,255,0.8)' }}>
                    {renderChars('RANJAN')}
                </h1>
            </div>

            <p ref={subRef} className="mt-12 text-sm md:text-xl text-gray-400 tracking-[0.2em] uppercase font-light z-10">
                ANDROID & FULL-STACK DEVELOPER
            </p>

            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce z-10">
                <span className="text-[10px] uppercase tracking-widest opacity-40">Scroll to Explore</span>
            </div>
        </section>
    );
}
