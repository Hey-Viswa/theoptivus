'use client';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function Cursor() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const [cursorText, setCursorText] = useState('');

    useEffect(() => {
        const cursor = cursorRef.current;
        if (!cursor) return;

        const xTo = gsap.quickTo(cursor, "x", { duration: 0.01, ease: "none" });
        const yTo = gsap.quickTo(cursor, "y", { duration: 0.01, ease: "none" });

        gsap.set(cursor, { xPercent: -50, yPercent: -50 });

        const moveCursor = (e: MouseEvent) => {
            xTo(e.clientX);
            yTo(e.clientY);
        };

        window.addEventListener('mousemove', moveCursor);

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const isClickable = target.closest('a, button, [role="button"], input[type="submit"], input[type="button"]');
            const isText = target.closest('p, h1, h2, h3, h4, h5, h6, span, input[type="text"], textarea');
            const customCursor = target.getAttribute('data-cursor');

            if (customCursor && customCursor !== 'Pointer') {
                setCursorText(customCursor);
                gsap.to(cursor, {
                    height: '12px',
                    width: '12px',
                    borderRadius: '50%',
                    scale: 6,
                    backgroundColor: '#1A1A1A', // foreground
                    mixBlendMode: 'normal',
                    opacity: 1,
                    duration: 0.2
                });
            } else if (isClickable || customCursor === 'Pointer') {
                setCursorText('');
                gsap.to(cursor, {
                    height: '12px',
                    width: '12px',
                    borderRadius: '50%',
                    scale: 4,
                    backgroundColor: '#2F52E0', // accent
                    mixBlendMode: 'normal',
                    opacity: 0.15, // transparent aura
                    duration: 0.2
                });
            } else if (isText) {
                setCursorText('');
                gsap.to(cursor, {
                    height: '12px',
                    width: '12px',
                    borderRadius: '50%',
                    scale: 1, // subtle change for text
                    backgroundColor: '#2F52E0', // vibrant blue pointer
                    mixBlendMode: 'normal',
                    opacity: 0.5,
                    duration: 0.2
                });
            } else {
                setCursorText('');
                gsap.to(cursor, {
                    height: '12px',
                    width: '12px',
                    borderRadius: '50%',
                    scale: 1,
                    backgroundColor: '#1A1A1A', // solid foreground
                    mixBlendMode: 'normal',
                    opacity: 1,
                    duration: 0.2
                });
            }
        };

        const handleMouseOut = () => {
            setCursorText('');
            gsap.to(cursor, {
                height: '12px',
                width: '12px',
                borderRadius: '50%',
                scale: 1,
                backgroundColor: '#1A1A1A',
                mixBlendMode: 'normal',
                opacity: 1,
                duration: 0.2
            });
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
            className="hidden md:flex fixed top-0 left-0 w-3 h-3 rounded-full pointer-events-none z-[10001] items-center justify-center"
            style={{
                backgroundColor: '#0A1628',
                backfaceVisibility: 'hidden',
                WebkitFontSmoothing: 'antialiased',
                transform: 'translateZ(0)'
            }}
        >
            {cursorText && (
                <span className="text-[3px] font-bold uppercase tracking-widest text-white">
                    {cursorText}
                </span>
            )}
        </div>
    );
}
