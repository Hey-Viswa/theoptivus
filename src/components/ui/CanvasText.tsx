'use client';
import { useEffect, useRef } from 'react';

interface CanvasTextProps {
    texts: string[];
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
    color: string;
    active: boolean;
}

const GOOGLE_COLORS = ['#4285F4', '#EA4335', '#FBBC05', '#34A853', '#8B5CF6'];

export default function CanvasText({ 
    texts = ["BISWARANJAN", "FULL-STACK", "DEVELOPER", "SHAPE SHIFTER"], 
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
        let currentTextIndex = 0;
        let morphTimeout: NodeJS.Timeout;

        const config = {
            radius: 120, // Mouse repulsion radius
            force: 15, // Repulsion force
            friction: 0.82,
            returnSpeed: 0.08,
            particleGap: 4, // Density
        };

        function getFontFamily(): string {
            const computed = window.getComputedStyle(document.body);
            const serifFont = computed.getPropertyValue('--font-playfair').replace(/['"]/g, '').trim();
            return serifFont || 'Georgia, serif';
        }

        // Extracts target positions from text
        function getTargetPositions(text: string): {x: number, y: number}[] {
            const offscreen = document.createElement('canvas');
            const octx = offscreen.getContext('2d', { willReadFrequently: true });
            if (!octx) return [];

            let fontSize = 400;
            const fontFamily = getFontFamily();
            const targetW = W * 0.95;
            
            octx.font = `900 ${fontSize}px ${fontFamily}`;
            let metrics = octx.measureText(text);
            
            // Shrink text until it fits width
            while (metrics.width > targetW && fontSize > 20) {
                fontSize -= 4;
                octx.font = `900 ${fontSize}px ${fontFamily}`;
                metrics = octx.measureText(text);
            }

            const baseH = fontSize * 0.85; 
            const targetH = H * 0.85; 
            const scaleY = targetH / baseH; 

            const ow = Math.ceil(metrics.width) + 20;
            const oh = Math.ceil(baseH * scaleY) + 50;
            offscreen.width = ow;
            offscreen.height = oh;

            octx.fillStyle = '#000';
            octx.font = `900 ${fontSize}px ${fontFamily}`;
            octx.textBaseline = 'top';
            octx.scale(1, scaleY);
            octx.fillText(text, 10, 0);
            octx.setTransform(1, 0, 0, 1, 0, 0);

            const imageData = octx.getImageData(0, 0, ow, oh);
            const data = imageData.data;
            const gap = config.particleGap;

            const targets = [];
            let minX = ow, maxX = 0;
            let minY = oh, maxY = 0;

            for (let y = 0; y < oh; y += gap) {
                for (let x = 0; x < ow; x += gap) {
                    const i = (y * ow + x) * 4;
                    if (data[i + 3] > 128) {
                        targets.push({ x, y });
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

            return targets.map(t => ({
                x: offsetX + t.x,
                y: offsetY + t.y
            }));
        }

        function morphToText(text: string) {
            const newTargets = getTargetPositions(text);
            
            // Shuffle targets to make morphing chaotic and cool like Shape Shifter
            newTargets.sort(() => Math.random() - 0.5);

            // Match particles to targets
            for (let i = 0; i < Math.max(particles.length, newTargets.length); i++) {
                if (i < newTargets.length) {
                    const target = newTargets[i];
                    
                    if (!particles[i]) {
                        // Create new particle if we don't have enough
                        particles[i] = {
                            homeX: target.x,
                            homeY: target.y,
                            x: Math.random() * W, // Fly in from random spots
                            y: Math.random() * H,
                            vx: 0,
                            vy: 0,
                            size: config.particleGap * 0.8 + Math.random() * 0.4,
                            alpha: 0.85 + Math.random() * 0.15,
                            color: GOOGLE_COLORS[Math.floor(Math.random() * GOOGLE_COLORS.length)],
                            active: true
                        };
                    } else {
                        // Update existing particle's home to morph
                        particles[i].homeX = target.x;
                        particles[i].homeY = target.y;
                        particles[i].active = true;
                    }
                } else {
                    // We have more old particles than new targets, hide them by sending offscreen
                    particles[i].active = false;
                    particles[i].homeX = W / 2;
                    particles[i].homeY = H + 200; // Drop out of bottom
                }
            }
        }

        function loopMorphs() {
            morphToText(texts[currentTextIndex]);
            currentTextIndex = (currentTextIndex + 1) % texts.length;
            
            // Schedule next morph
            morphTimeout = setTimeout(loopMorphs, 4000); // 4 seconds per word
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
            
            morphToText(texts[currentTextIndex === 0 ? texts.length - 1 : currentTextIndex - 1]);
        }

        function animate() {
            ctx!.clearRect(0, 0, W, H);

            const mx = mouse.x;
            const my = mouse.y;
            const radiusSq = config.radius * config.radius;
            const strength = config.force;
            const friction = config.friction;
            const returnSpeed = config.returnSpeed;

            for (let i = 0, len = particles.length; i < len; i++) {
                const p = particles[i];
                
                // If inactive and far away, don't draw or calc to save perf
                if (!p.active && p.y > H + 100) continue;

                const dx = p.x - mx;
                const dy = p.y - my;
                const distSq = dx * dx + dy * dy;

                if (distSq < radiusSq && mx > 0) {
                    const dist = Math.sqrt(distSq) || 1;
                    const factor = (1 - dist / config.radius) * strength;
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

                // Draw
                const distFromHome = Math.sqrt((p.x - p.homeX) ** 2 + (p.y - p.homeY) ** 2);
                
                ctx!.fillStyle = p.color;
                if (distFromHome > 10 && p.active) {
                    ctx!.shadowColor = p.color;
                    ctx!.shadowBlur = 15;
                } else {
                    ctx!.shadowBlur = 0;
                }

                ctx!.beginPath();
                ctx!.arc(p.x, p.y, p.size / 2, 0, Math.PI * 2);
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

        window.addEventListener('resize', resize);
        canvas.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('mouseleave', handleMouseLeave);

        // Initial setup
        setTimeout(() => {
            resize();
            loopMorphs();
            animate();
        }, 150);

        return () => {
            cancelAnimationFrame(animId);
            clearTimeout(morphTimeout);
            window.removeEventListener('resize', resize);
            canvas.removeEventListener('mousemove', handleMouseMove);
            canvas.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [texts]);

    return (
        <div ref={containerRef} className={`relative w-full flex items-center justify-center ${className}`}>
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-10" />
            <h1 className="sr-only">{texts.join(' ')}</h1>
        </div>
    );
}
