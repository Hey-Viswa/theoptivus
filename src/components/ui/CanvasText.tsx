'use client';
import { useEffect, useRef } from 'react';

interface CanvasTextProps {
    text: string;
    className?: string;
}

interface Particle {
    homeX: number;
    homeY: number;
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    alpha: number;
}

export default function CanvasText({ 
    text = "BISWARANJAN", 
    className = "" 
}: CanvasTextProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let W = 0;
        let H = 0;
        let dpr = 1;
        let particles: Particle[] = [];
        let mouse = { x: -9999, y: -9999 };
        let animId: number;

        const config = {
            radius: 100,
            force: 10,
            friction: 0.85,
            returnSpeed: 0.06,
            particleGap: 3,
        };

        function getFontFamily(): string {
            const computed = window.getComputedStyle(document.body);
            const displayFont = computed.getPropertyValue('--font-space-grotesk').replace(/['"]/g, '').trim();
            return displayFont || 'system-ui, sans-serif';
        }

        function buildParticles() {
            if (!canvasRef.current || !containerRef.current) return;

            const ctx = canvasRef.current.getContext('2d', { willReadFrequently: true });
            if (!ctx) return;

            const W = containerRef.current.clientWidth;
            const H = containerRef.current.clientHeight;

            // Measure text to pick font size that fills ~95% of container width
            const targetW = W * 0.95;
            let fontSize = 400;
            const fontFamily = getFontFamily();
            
            ctx.font = `900 ${fontSize}px ${fontFamily}`;
            let metrics = ctx.measureText(text);
            while (metrics.width > targetW && fontSize > 40) {
                fontSize -= 4;
                ctx.font = `900 ${fontSize}px ${fontFamily}`;
                metrics = ctx.measureText(text);
            }

            // Calculate dynamic vertical scale to fill 85% of container height (leaves tighter, punchy padding)
            const baseH = fontSize * 0.85; // exact visual height of Space Grotesk caps
            const targetH = H * 0.85; 
            const scaleY = Math.max(1, targetH / baseH); 

            // Draw text to offscreen canvas to sample pixels
            const offscreen = document.createElement('canvas');
            const octx = offscreen.getContext('2d');
            if (!octx) return;

            const ow = Math.ceil(metrics.width) + 20;
            const oh = Math.ceil(baseH * scaleY) + 50; // Enough height to not clip
            offscreen.width = ow;
            offscreen.height = oh;

            // Fill with the foreground color (Deep Blue)
            octx.fillStyle = '#0A1628';
            octx.font = `900 ${fontSize}px ${fontFamily}`;
            octx.textBaseline = 'top';
            octx.scale(1, scaleY); // Stretch the text vertically
            octx.fillText(text, 10, 0); // Draw EXACTLY at 0 so scaleY doesn't multiply the padding out of bounds!
            octx.setTransform(1, 0, 0, 1, 0, 0); // Reset transform before get data

            const imageData = octx.getImageData(0, 0, ow, oh);
            const data = imageData.data;
            const gap = config.particleGap;

            const rawParticles = [];
            let minX = ow, maxX = 0;
            let minY = oh, maxY = 0;

            for (let y = 0; y < oh; y += gap) {
                for (let x = 0; x < ow; x += gap) {
                    const i = (y * ow + x) * 4;
                    if (data[i + 3] > 128) {
                        rawParticles.push({ x, y });
                        if (x < minX) minX = x;
                        if (x > maxX) maxX = x;
                        if (y < minY) minY = y;
                        if (y > maxY) maxY = y;
                    }
                }
            }

            const actualW = maxX - minX;
            const actualH = maxY - minY;
            const offsetX = (W - actualW) / 2 - minX;
            const offsetY = (H - actualH) / 2 - minY;

            for (const rp of rawParticles) {
                particles.push({
                    homeX: offsetX + rp.x,
                    homeY: offsetY + rp.y,
                    x: offsetX + rp.x,
                    y: offsetY + rp.y,
                    vx: 0,
                    vy: 0,
                    size: gap * 0.8 + Math.random() * 0.4,
                    alpha: 0.85 + Math.random() * 0.15,
                });
            }
        }

        function resize() {
            dpr = window.devicePixelRatio || 1;
            const rect = container!.getBoundingClientRect();
            W = rect.width;
            H = rect.height;
            canvas!.width = W * dpr;
            canvas!.height = H * dpr;
            canvas!.style.width = W + 'px';
            canvas!.style.height = H + 'px';
            ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
            buildParticles();
        }

        function animate() {
            ctx!.clearRect(0, 0, W, H);

            const mx = mouse.x;
            const my = mouse.y;
            const radius = config.radius;
            const radiusSq = radius * radius;
            const strength = config.force;
            const friction = config.friction;
            const returnSpeed = config.returnSpeed;

            for (let i = 0, len = particles.length; i < len; i++) {
                const p = particles[i];
                const dx = p.x - mx;
                const dy = p.y - my;
                const distSq = dx * dx + dy * dy;

                if (distSq < radiusSq && mx > 0) {
                    const dist = Math.sqrt(distSq) || 1;
                    const factor = (1 - dist / radius) * strength;
                    // Repel effect
                    p.vx += (dx / dist) * factor;
                    p.vy += (dy / dist) * factor;
                }

                // Spring back to home
                p.vx += (p.homeX - p.x) * returnSpeed;
                p.vy += (p.homeY - p.y) * returnSpeed;

                // Friction
                p.vx *= friction;
                p.vy *= friction;

                // Integrate
                p.x += p.vx;
                p.y += p.vy;
            }

            // Draw particles
            for (let i = 0, len = particles.length; i < len; i++) {
                const p = particles[i];
                const distFromHome = Math.sqrt((p.x - p.homeX) ** 2 + (p.y - p.homeY) ** 2);

                // Color shifts: resting = Deep Blue, displaced = Electric Blue
                if (distFromHome > 3) {
                    const intensity = Math.min(1, distFromHome / 40);
                    const r = Math.round(10 + (30 - 10) * intensity);
                    const g = Math.round(22 + (111 - 22) * intensity);
                    const b = Math.round(40 + (255 - 40) * intensity);
                    ctx!.fillStyle = `rgba(${r}, ${g}, ${b}, ${p.alpha})`;
                } else {
                    ctx!.fillStyle = `rgba(10, 22, 40, ${p.alpha})`;
                }

                ctx!.fillRect(p.x, p.y, p.size, p.size);
            }

            // Draw cursor glow (subtle blue ring)
            if (mx > 0) {
                const grad = ctx!.createRadialGradient(mx, my, 0, mx, my, radius);
                grad.addColorStop(0, 'rgba(30, 111, 255, 0.06)');
                grad.addColorStop(0.6, 'rgba(30, 111, 255, 0.02)');
                grad.addColorStop(1, 'rgba(30, 111, 255, 0)');
                ctx!.fillStyle = grad;
                ctx!.beginPath();
                ctx!.arc(mx, my, radius, 0, Math.PI * 2);
                ctx!.fill();
            }

            animId = requestAnimationFrame(animate);
        }

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas!.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        };

        const handleMouseLeave = () => {
            mouse.x = -9999;
            mouse.y = -9999;
        };

        const handleTouchMove = (e: TouchEvent) => {
            const rect = canvas!.getBoundingClientRect();
            mouse.x = e.touches[0].clientX - rect.left;
            mouse.y = e.touches[0].clientY - rect.top;
        };

        const handleTouchEnd = () => {
            mouse.x = -9999;
            mouse.y = -9999;
        };

        window.addEventListener('resize', resize);
        canvas.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('mouseleave', handleMouseLeave);
        canvas.addEventListener('touchmove', handleTouchMove, { passive: true });
        canvas.addEventListener('touchend', handleTouchEnd);

        // Initial setup — slight delay for fonts to load
        setTimeout(() => {
            resize();
            animate();
        }, 150);

        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener('resize', resize);
            canvas.removeEventListener('mousemove', handleMouseMove);
            canvas.removeEventListener('mouseleave', handleMouseLeave);
            canvas.removeEventListener('touchmove', handleTouchMove);
            canvas.removeEventListener('touchend', handleTouchEnd);
        };
    }, [text]);

    return (
        <div ref={containerRef} className={`relative w-full flex items-center justify-center ${className}`}>
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-10" />
            <h1 className="sr-only">{text}</h1>
        </div>
    );
}
