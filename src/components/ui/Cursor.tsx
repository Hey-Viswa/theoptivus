'use client';
import { useEffect, useRef, useCallback } from 'react';

export default function Cursor() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLSpanElement>(null);
    const pos = useRef({ x: 0, y: 0 });
    const lastTarget = useRef<EventTarget | null>(null);
    const rafId = useRef<number>(0);

    // Direct transform — no GSAP, no interpolation, no lag
    const updatePosition = useCallback(() => {
        if (cursorRef.current) {
            cursorRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) translate(-50%, -50%)`;
        }
    }, []);

    useEffect(() => {
        const cursor = cursorRef.current;
        const textEl = textRef.current;
        if (!cursor || !textEl) return;

        // State classes for cursor modes
        const resetCursor = () => {
            cursor.className = 'cursor-dot cursor-default';
            textEl.textContent = '';
        };

        const handleMouseMove = (e: MouseEvent) => {
            pos.current.x = e.clientX;
            pos.current.y = e.clientY;

            // Only recompute cursor style if target element changed
            if (e.target !== lastTarget.current) {
                lastTarget.current = e.target;
                const target = e.target as HTMLElement;
                const customCursor = target.getAttribute?.('data-cursor');

                if (customCursor && customCursor !== 'Pointer') {
                    cursor.className = 'cursor-dot cursor-custom';
                    textEl.textContent = customCursor;
                } else if (customCursor === 'Pointer' || target.closest?.('a, button, [role="button"]')) {
                    cursor.className = 'cursor-dot cursor-clickable';
                    textEl.textContent = '';
                } else if (target.closest?.('p, h1, h2, h3, h4, h5, h6, span, textarea')) {
                    cursor.className = 'cursor-dot cursor-text-hover';
                    textEl.textContent = '';
                } else {
                    resetCursor();
                }
            }

            // Schedule position update on next frame
            cancelAnimationFrame(rafId.current);
            rafId.current = requestAnimationFrame(updatePosition);
        };

        const handleMouseLeave = () => {
            cursor.style.opacity = '0';
        };

        const handleMouseEnter = () => {
            cursor.style.opacity = '1';
        };

        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        document.documentElement.addEventListener('mouseleave', handleMouseLeave);
        document.documentElement.addEventListener('mouseenter', handleMouseEnter);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
            document.documentElement.removeEventListener('mouseenter', handleMouseEnter);
            cancelAnimationFrame(rafId.current);
        };
    }, [updatePosition]);

    return (
        <div
            ref={cursorRef}
            className="cursor-dot cursor-default"
            style={{ opacity: 1, display: 'flex' }}
        >
            <span ref={textRef} className="cursor-dot-text" />
        </div>
    );
}
