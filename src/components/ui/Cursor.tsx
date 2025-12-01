'use client';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function Cursor() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const [isHovering, setIsHovering] = useState(false);
    const [cursorText, setCursorText] = useState('');

    useEffect(() => {
        const cursor = cursorRef.current;
        if (!cursor) return;

        // Use gsap.quickTo for high-performance mouse movement
        const xTo = gsap.quickTo(cursor, "x", { duration: 0.1, ease: "power3" });
        const yTo = gsap.quickTo(cursor, "y", { duration: 0.1, ease: "power3" });

        // Center the cursor initially
        gsap.set(cursor, { xPercent: -50, yPercent: -50 });

        const moveCursor = (e: MouseEvent) => {
            xTo(e.clientX);
            yTo(e.clientY);
        };

        window.addEventListener('mousemove', moveCursor);

        // Advanced hover effects
        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;

            // Check for clickable elements
            const isClickable = target.closest('a, button, [role="button"], input[type="submit"], input[type="button"]');

            // Check for text elements
            const isText = target.closest('p, h1, h2, h3, h4, h5, h6, span, input[type="text"], textarea');

            // Check for custom cursor attributes
            const customCursor = target.getAttribute('data-cursor');

            if (customCursor && customCursor !== 'Pointer') {
                setCursorText(customCursor);
                gsap.to(cursor, {
                    scale: 4,
                    backgroundColor: 'white',
                    mixBlendMode: 'difference',
                    duration: 0.2
                });
                setIsHovering(true);
            } else if (isClickable || customCursor === 'Pointer') {
                setCursorText('');
                gsap.to(cursor, {
                    scale: 2.5,
                    backgroundColor: 'white',
                    mixBlendMode: 'difference',
                    duration: 0.2
                });
                setIsHovering(true);
            } else if (isText) {
                setCursorText('');
                gsap.to(cursor, {
                    height: '24px',
                    width: '2px',
                    borderRadius: '0',
                    scale: 1,
                    backgroundColor: 'white',
                    mixBlendMode: 'difference',
                    duration: 0.2
                });
                setIsHovering(false);
            } else {
                setCursorText('');
                gsap.to(cursor, {
                    scale: 1,
                    height: '12px',
                    width: '12px',
                    borderRadius: '50%',
                    backgroundColor: 'white',
                    mixBlendMode: 'difference',
                    duration: 0.2
                });
                setIsHovering(false);
            }
        };

        const handleMouseOut = (e: MouseEvent) => {
            setCursorText('');
            gsap.to(cursor, {
                scale: 1,
                height: '12px',
                width: '12px',
                borderRadius: '50%',
                backgroundColor: 'white',
                mixBlendMode: 'difference',
                duration: 0.2
            });
            setIsHovering(false);
        };

        window.addEventListener('mouseover', handleMouseOver);
        window.addEventListener('mouseout', handleMouseOut);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mouseover', handleMouseOver);
            window.removeEventListener('mouseout', handleMouseOut);
        };
    }, []);

    return (
        <div
            ref={cursorRef}
            className="fixed top-0 left-0 w-3 h-3 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference flex items-center justify-center"
            style={{
                backfaceVisibility: 'hidden',
                WebkitFontSmoothing: 'antialiased',
                transform: 'translateZ(0)'
            }}
        >
            {cursorText && (
                <span className="text-[3px] font-bold uppercase tracking-widest text-black">
                    {cursorText}
                </span>
            )}
        </div>
    );
}
