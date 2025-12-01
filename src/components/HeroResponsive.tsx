'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function HeroResponsive() {
    const containerRef = useRef<HTMLDivElement>(null);
    const nameRef = useRef<HTMLHeadingElement>(null);
    const quoteRef = useRef<HTMLQuoteElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Initial states
            gsap.set([nameRef.current, quoteRef.current, imageRef.current], { opacity: 0, y: 30 });

            const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

            tl.to(imageRef.current, { opacity: 1, y: 0, duration: 1 })
                .to(nameRef.current, { opacity: 1, y: 0, duration: 1 }, '-=0.5')
                .to(quoteRef.current, { opacity: 1, y: 0, duration: 0.8 }, '-=0.6');

            // Parallax effect for hero image
            if (imageRef.current) {
                gsap.to(imageRef.current, {
                    y: 50,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: 'top top',
                        end: 'bottom top',
                        scrub: true,
                    },
                });
            }
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={containerRef}
            className="relative w-full flex flex-col justify-center items-center overflow-hidden bg-background"
            style={{ minHeight: 'clamp(60vh, 75vh, 92vh)' }}
        >
            <div className="w-full max-w-[min(1200px,92%)] grid grid-cols-1 md:grid-cols-2 gap-8 items-center py-12 md:py-0">

                {/* Text Content */}
                <div className="flex flex-col items-center md:items-start text-center md:text-left order-2 md:order-1 relative z-10">
                    <h1
                        ref={nameRef}
                        className="font-heading font-black tracking-tighter leading-none text-foreground mix-blend-difference"
                        style={{ fontSize: 'clamp(64px, 14vw, 220px)' }}
                        data-animate="hero-name"
                    >
                        BISWA
                        <br />
                        <span className="text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.8)] md:[-webkit-text-stroke:2px_rgba(255,255,255,0.8)]">
                            RANJAN
                        </span>
                    </h1>

                    <blockquote
                        ref={quoteRef}
                        className="mt-6 md:mt-8 relative max-w-md"
                        aria-label="Quote"
                    >
                        <p className="font-script text-2xl md:text-3xl text-gray-300 leading-relaxed">
                            "Building digital experiences that matter."
                        </p>
                        <div
                            className="absolute -top-4 -left-4 w-2 h-2 bg-accent rounded-full opacity-50 pointer-events-none"
                            aria-hidden="true"
                        />
                    </blockquote>
                </div>

                {/* Hero Image */}
                <div
                    ref={imageRef}
                    className="order-1 md:order-2 w-full flex justify-center md:justify-end relative z-0"
                >
                    <div className="relative w-full max-w-[400px] aspect-[4/5] md:aspect-square rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                        <Image
                            src="/viswa.png"
                            alt="Biswaranjan Giri"
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                            priority
                            quality={90}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
                    </div>
                </div>

            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 animate-bounce opacity-50 pointer-events-none">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
                </svg>
            </div>
        </section>
    );
}
