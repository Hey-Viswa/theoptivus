'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import gsap from 'gsap';

interface CarouselProps {
    images: string[];
    title: string;
}

export default function Carousel({ images, title }: CarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const slideRef = useRef<HTMLDivElement>(null);
    const [isAnimating, setIsAnimating] = useState(false);

    const nextSlide = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        const nextIndex = (currentIndex + 1) % images.length;

        gsap.to(slideRef.current, {
            opacity: 0,
            x: -20,
            duration: 0.3,
            onComplete: () => {
                setCurrentIndex(nextIndex);
                gsap.fromTo(slideRef.current,
                    { opacity: 0, x: 20 },
                    {
                        opacity: 1,
                        x: 0,
                        duration: 0.3,
                        onComplete: () => setIsAnimating(false)
                    }
                );
            }
        });
    };

    const prevSlide = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        const prevIndex = (currentIndex - 1 + images.length) % images.length;

        gsap.to(slideRef.current, {
            opacity: 0,
            x: 20,
            duration: 0.3,
            onComplete: () => {
                setCurrentIndex(prevIndex);
                gsap.fromTo(slideRef.current,
                    { opacity: 0, x: -20 },
                    {
                        opacity: 1,
                        x: 0,
                        duration: 0.3,
                        onComplete: () => setIsAnimating(false)
                    }
                );
            }
        });
    };

    const goToSlide = (index: number) => {
        if (isAnimating || index === currentIndex) return;
        setIsAnimating(true);
        const direction = index > currentIndex ? -20 : 20;
        const enterDirection = index > currentIndex ? 20 : -20;

        gsap.to(slideRef.current, {
            opacity: 0,
            x: direction,
            duration: 0.3,
            onComplete: () => {
                setCurrentIndex(index);
                gsap.fromTo(slideRef.current,
                    { opacity: 0, x: enterDirection },
                    {
                        opacity: 1,
                        x: 0,
                        duration: 0.3,
                        onComplete: () => setIsAnimating(false)
                    }
                );
            }
        });
    };

    return (
        <div className="relative w-full group">
            {/* Main Image Container */}
            <div className="relative aspect-video overflow-hidden rounded-2xl border border-white/10 bg-neutral-900">
                <div ref={slideRef} className="relative w-full h-full">
                    <Image
                        src={images[currentIndex]}
                        alt={`${title} screenshot ${currentIndex + 1}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1200px) 100vw, 1200px"
                        priority
                    />
                </div>

                {/* Navigation Arrows */}
                <button
                    onClick={prevSlide}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-white hover:bg-white hover:text-black transition-all duration-300 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0"
                    aria-label="Previous slide"
                >
                    ←
                </button>
                <button
                    onClick={nextSlide}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-white hover:bg-white hover:text-black transition-all duration-300 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0"
                    aria-label="Next slide"
                >
                    →
                </button>

                {/* Image Counter Badge */}
                <div className="absolute top-4 right-4 px-3 py-1 bg-black/60 backdrop-blur-md rounded-full border border-white/10 text-xs font-mono text-white/80">
                    {currentIndex + 1} / {images.length}
                </div>
            </div>

            {/* Thumbnails / Indicators */}
            <div className="flex justify-center gap-2 mt-6">
                {images.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`h-1.5 rounded-full transition-all duration-300 ${index === currentIndex
                                ? 'w-8 bg-white'
                                : 'w-2 bg-white/20 hover:bg-white/40'
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}
