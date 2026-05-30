'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function HorizontalScrollText() {
    const sectionRef = useRef<HTMLElement>(null);
    const textRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        
        const section = sectionRef.current;
        const text = textRef.current;
        if (!section || !text) return;

        // Calculate how far to move to the left
        function getScrollAmount() {
            let textWidth = text!.scrollWidth;
            return -(textWidth - window.innerWidth);
        }

        // 1. The main horizontal scrolling tween that pins the section
        const scrollTween = gsap.to(text, {
            x: getScrollAmount,
            ease: "none",
            scrollTrigger: {
                trigger: section,
                pin: true,
                scrub: 1, // smooth scrubbing
                end: () => `+=${getScrollAmount() * -1}`, 
                invalidateOnRefresh: true
            }
        });

        // 2. The nested "containerAnimation" using the scrollTween above
        // This animates each split word individually AS it enters the screen horizontally!
        const words = text.querySelectorAll('.word');
        words.forEach((word) => {
            gsap.fromTo(word,
                { opacity: 0.1, scale: 0.8, y: 50 },
                {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    duration: 0.8,
                    ease: "back.out(1.7)",
                    scrollTrigger: {
                        trigger: word,
                        containerAnimation: scrollTween, // Connects to the horizontal movement!
                        start: "left 80%", // Trigger when the left side of the word hits 80% of the screen width
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });

        return () => {
            scrollTween.kill();
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);

    // The text to split (No premium SplitText plugin needed, we do it manually in React)
    const rawText = "The containerAnimation property allows us to create ScrollTriggered animations within a container that's animated horizontally. It's like having nested ScrollTriggers!";
    
    // Split into words, wrapped in spans
    const wordElements = rawText.split(' ').map((word, i) => (
        <span key={i} className="word inline-block mr-[2vw] text-primary">
            {word}
        </span>
    ));

    return (
        <section 
            ref={sectionRef}
            className="overflow-hidden h-screen flex items-center bg-foreground text-background relative z-10"
        >
            <h3 
                ref={textRef}
                className="flex w-max whitespace-nowrap pl-[100vw] pr-[20vw] text-[clamp(2rem,10vw,12rem)] font-display font-semibold leading-[1.1]"
            >
                {wordElements}
            </h3>
        </section>
    );
}
