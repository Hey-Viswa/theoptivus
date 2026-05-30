'use client';
import { useEffect, useRef, useCallback } from 'react';

/* ────────────────────────────────────────────
 *  AntigravityField — Google Antigravity-style
 *  floating image physics for the hero section
 * ──────────────────────────────────────────── */

interface FloatingBody {
    x: number;
    y: number;
    vx: number;
    vy: number;
    rotation: number;    // current angle in radians
    angularVel: number;  // rotational velocity
    width: number;
    height: number;
    scale: number;       // render scale
    image: HTMLImageElement;
    tint: string;        // CSS color for overlay tint
    tintAlpha: number;   // tint opacity (0-1)
    mass: number;        // for collision physics
    loaded: boolean;
    opacity: number;     // for fade-in
    driftPhase: number;  // unique offset for organic drift
}

// Brand-aligned tint palette
const TINT_PALETTE = [
    { color: '#2F52E0', alpha: 0.35 },  // Accent blue
    { color: '#FFE600', alpha: 0.25 },  // Yellow highlight
    { color: '#1E6FFF', alpha: 0.30 },  // Electric blue
    { color: '#E04F2F', alpha: 0.22 },  // Warm coral
    { color: '#2FE0A8', alpha: 0.22 },  // Mint green
    { color: '#A855F7', alpha: 0.28 },  // Purple
    { color: '#F97316', alpha: 0.22 },  // Orange
    { color: '#06B6D4', alpha: 0.28 },  // Cyan
];

const IMAGE_CONFIGS = [
    { src: '/images/atom.png',    baseW: 220, baseH: 150, label: 'Architecture' },
    { src: '/images/gears.png',   baseW: 180, baseH: 130, label: 'Engineering' },
    { src: '/images/server.png',  baseW: 210, baseH: 140, label: 'Infrastructure' },
    { src: '/images/stack.png',   baseW: 200, baseH: 200, label: 'Full-Stack' },
    { src: '/images/block.png',   baseW: 200, baseH: 140, label: 'Modular' },
    { src: '/images/caliper.png', baseW: 150, baseH: 210, label: 'Precision' },
    { src: '/images/pilar.png',   baseW: 150, baseH: 200, label: 'Foundation' },
    { src: '/images/select.png',  baseW: 190, baseH: 140, label: 'Selection' },
];

// Physics constants
const MOUSE_RADIUS = 220;
const MOUSE_FORCE = 3.5;
const FRICTION = 0.985;
const ANGULAR_FRICTION = 0.97;
const WALL_BOUNCE = 0.6;
const DRIFT_AMPLITUDE = 0.15;
const DRIFT_SPEED = 0.4;
const GRAVITY = 0; // zero gravity!
const BODY_BOUNCE = 0.5;
const MIN_VELOCITY = 0.01;

export default function AntigravityField({ className = '' }: { className?: string }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const bodiesRef = useRef<FloatingBody[]>([]);
    const mouseRef = useRef({ x: -9999, y: -9999, active: false, prevX: -9999, prevY: -9999 });
    const animRef = useRef<number>(0);
    const timeRef = useRef(0);
    const dimensionsRef = useRef({ W: 0, H: 0 });

    const initBodies = useCallback((W: number, H: number) => {
        const bodies: FloatingBody[] = [];
        const isMobile = W < 768;
        const scaleFactor = isMobile ? 0.55 : W < 1200 ? 0.75 : 1;
        const count = isMobile ? 5 : IMAGE_CONFIGS.length;

        // Pick items to show (on mobile, pick a subset)
        const configs = isMobile
            ? IMAGE_CONFIGS.sort(() => Math.random() - 0.5).slice(0, count)
            : [...IMAGE_CONFIGS];

        // Create a grid to spread items out evenly
        const cols = isMobile ? 2 : 4;
        const rows = Math.ceil(configs.length / cols);
        const cellW = W / cols;
        const cellH = H / rows;

        configs.forEach((cfg, idx) => {
            const img = new Image();
            img.crossOrigin = 'anonymous';

            const tintInfo = TINT_PALETTE[idx % TINT_PALETTE.length];
            const scale = scaleFactor * (0.8 + Math.random() * 0.5);
            const w = cfg.baseW * scale;
            const h = cfg.baseH * scale;

            // Grid-based initial placement with jitter
            const col = idx % cols;
            const row = Math.floor(idx / cols);
            const x = cellW * col + cellW * 0.5 + (Math.random() - 0.5) * cellW * 0.4;
            const y = cellH * row + cellH * 0.5 + (Math.random() - 0.5) * cellH * 0.4;

            const body: FloatingBody = {
                x: Math.max(w / 2, Math.min(W - w / 2, x)),
                y: Math.max(h / 2, Math.min(H - h / 2, y)),
                vx: (Math.random() - 0.5) * 2.5,
                vy: (Math.random() - 0.5) * 2.5,
                rotation: (Math.random() - 0.5) * 0.8,
                angularVel: (Math.random() - 0.5) * 0.015,
                width: w,
                height: h,
                scale,
                image: img,
                tint: tintInfo.color,
                tintAlpha: tintInfo.alpha,
                mass: w * h * 0.001,
                loaded: false,
                opacity: 0,
                driftPhase: Math.random() * Math.PI * 2,
            };

            img.onload = () => {
                body.loaded = true;
            };
            img.src = cfg.src;

            bodies.push(body);
        });

        bodiesRef.current = bodies;
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        const ctx = canvas.getContext('2d', { alpha: true });
        if (!ctx) return;

        let dpr = 1;

        function resize() {
            dpr = window.devicePixelRatio || 1;
            const rect = container!.getBoundingClientRect();
            const W = rect.width;
            const H = rect.height;
            dimensionsRef.current = { W, H };
            canvas!.width = W * dpr;
            canvas!.height = H * dpr;
            canvas!.style.width = W + 'px';
            canvas!.style.height = H + 'px';
            ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

            if (bodiesRef.current.length === 0) {
                initBodies(W, H);
            }
        }

        // ── Offscreen tinting ──
        // We pre-composite tinted versions once per image load
        const tintCache = new Map<string, HTMLCanvasElement>();

        function getTintedImage(body: FloatingBody): HTMLCanvasElement | null {
            if (!body.loaded) return null;

            const key = body.image.src + body.tint + body.tintAlpha;
            if (tintCache.has(key)) return tintCache.get(key)!;

            const off = document.createElement('canvas');
            off.width = body.image.naturalWidth;
            off.height = body.image.naturalHeight;
            const octx = off.getContext('2d');
            if (!octx) return null;

            // Draw original image
            octx.drawImage(body.image, 0, 0);

            // Apply color tint using multiply blend
            octx.globalCompositeOperation = 'multiply';
            octx.fillStyle = body.tint;
            octx.globalAlpha = body.tintAlpha;
            octx.fillRect(0, 0, off.width, off.height);

            // Restore alpha channel from original image
            octx.globalCompositeOperation = 'destination-in';
            octx.globalAlpha = 1;
            octx.drawImage(body.image, 0, 0);

            tintCache.set(key, off);
            return off;
        }

        // ── Body-to-body collision ──
        function resolveCollision(a: FloatingBody, b: FloatingBody) {
            const dx = b.x - a.x;
            const dy = b.y - a.y;
            const dist = Math.sqrt(dx * dx + dy * dy) || 1;

            // Average radius approximation for circular collision
            const rA = (a.width + a.height) * 0.22;
            const rB = (b.width + b.height) * 0.22;
            const minDist = rA + rB;

            if (dist < minDist) {
                const nx = dx / dist;
                const ny = dy / dist;

                // Separate
                const overlap = minDist - dist;
                const totalMass = a.mass + b.mass;
                a.x -= nx * overlap * (b.mass / totalMass);
                a.y -= ny * overlap * (b.mass / totalMass);
                b.x += nx * overlap * (a.mass / totalMass);
                b.y += ny * overlap * (a.mass / totalMass);

                // Relative velocity
                const dvx = a.vx - b.vx;
                const dvy = a.vy - b.vy;
                const dvDotN = dvx * nx + dvy * ny;

                // Don't resolve if separating
                if (dvDotN > 0) {
                    const impulse = (2 * dvDotN) / totalMass * BODY_BOUNCE;

                    a.vx -= impulse * b.mass * nx;
                    a.vy -= impulse * b.mass * ny;
                    b.vx += impulse * a.mass * nx;
                    b.vy += impulse * a.mass * ny;

                    // Add spin from collision
                    a.angularVel += (Math.random() - 0.5) * 0.02;
                    b.angularVel -= (Math.random() - 0.5) * 0.02;
                }
            }
        }

        function animate() {
            timeRef.current += 0.016;
            const t = timeRef.current;
            const { W, H } = dimensionsRef.current;

            ctx!.clearRect(0, 0, W, H);

            const bodies = bodiesRef.current;
            const mx = mouseRef.current.x;
            const my = mouseRef.current.y;
            const mouseActive = mouseRef.current.active;
            const mouseRadiusSq = MOUSE_RADIUS * MOUSE_RADIUS;

            // ── Update physics ──
            for (let i = 0; i < bodies.length; i++) {
                const b = bodies[i];

                // Fade in
                if (b.loaded && b.opacity < 1) {
                    b.opacity = Math.min(1, b.opacity + 0.05);
                }

                // Organic zero-g drift (gentle sine wave floatiness)
                const driftX = Math.sin(t * DRIFT_SPEED + b.driftPhase) * DRIFT_AMPLITUDE;
                const driftY = Math.cos(t * DRIFT_SPEED * 0.7 + b.driftPhase + 1.5) * DRIFT_AMPLITUDE * 0.8;
                b.vx += driftX * 0.01;
                b.vy += driftY * 0.01;

                // Gravity (zero in antigravity mode)
                b.vy += GRAVITY;

                // Mouse force — push away like antigravity
                if (mouseActive) {
                    const dx = b.x - mx;
                    const dy = b.y - my;
                    const distSq = dx * dx + dy * dy;

                    if (distSq < mouseRadiusSq && distSq > 0) {
                        const dist = Math.sqrt(distSq);
                        const force = (1 - dist / MOUSE_RADIUS) * MOUSE_FORCE;
                        const nx = dx / dist;
                        const ny = dy / dist;

                        b.vx += nx * force;
                        b.vy += ny * force;

                        // Add tumble from mouse push
                        b.angularVel += (nx * force * 0.01) * (Math.random() > 0.5 ? 1 : -1);
                    }
                }

                // Friction
                b.vx *= FRICTION;
                b.vy *= FRICTION;
                b.angularVel *= ANGULAR_FRICTION;

                // Clamp tiny velocities
                if (Math.abs(b.vx) < MIN_VELOCITY) b.vx = 0;
                if (Math.abs(b.vy) < MIN_VELOCITY) b.vy = 0;

                // Integrate
                b.x += b.vx;
                b.y += b.vy;
                b.rotation += b.angularVel;

                // Wall bouncing
                const halfW = b.width * 0.4;
                const halfH = b.height * 0.4;

                if (b.x - halfW < 0) {
                    b.x = halfW;
                    b.vx = Math.abs(b.vx) * WALL_BOUNCE;
                    b.angularVel += 0.02;
                } else if (b.x + halfW > W) {
                    b.x = W - halfW;
                    b.vx = -Math.abs(b.vx) * WALL_BOUNCE;
                    b.angularVel -= 0.02;
                }

                if (b.y - halfH < 0) {
                    b.y = halfH;
                    b.vy = Math.abs(b.vy) * WALL_BOUNCE;
                    b.angularVel += 0.01;
                } else if (b.y + halfH > H) {
                    b.y = H - halfH;
                    b.vy = -Math.abs(b.vy) * WALL_BOUNCE;
                    b.angularVel -= 0.01;
                }
            }

            // ── Body-to-body collisions ──
            for (let i = 0; i < bodies.length; i++) {
                for (let j = i + 1; j < bodies.length; j++) {
                    resolveCollision(bodies[i], bodies[j]);
                }
            }

            // ── Draw bodies ──
            for (let i = 0; i < bodies.length; i++) {
                const b = bodies[i];
                if (!b.loaded || b.opacity <= 0) continue;

                const tinted = getTintedImage(b);
                if (!tinted) continue;

                ctx!.save();
                ctx!.globalAlpha = b.opacity;
                ctx!.translate(b.x, b.y);
                ctx!.rotate(b.rotation);

                // Draw shadow
                ctx!.shadowColor = 'rgba(0, 0, 0, 0.08)';
                ctx!.shadowBlur = 20;
                ctx!.shadowOffsetX = 4;
                ctx!.shadowOffsetY = 4;

                ctx!.drawImage(
                    tinted,
                    -b.width / 2,
                    -b.height / 2,
                    b.width,
                    b.height
                );

                ctx!.restore();
            }

            // ── Mouse cursor glow ──
            if (mouseActive) {
                const grad = ctx!.createRadialGradient(mx, my, 0, mx, my, MOUSE_RADIUS);
                grad.addColorStop(0, 'rgba(47, 82, 224, 0.04)');
                grad.addColorStop(0.5, 'rgba(47, 82, 224, 0.015)');
                grad.addColorStop(1, 'rgba(47, 82, 224, 0)');
                ctx!.fillStyle = grad;
                ctx!.beginPath();
                ctx!.arc(mx, my, MOUSE_RADIUS, 0, Math.PI * 2);
                ctx!.fill();
            }

            animRef.current = requestAnimationFrame(animate);
        }

        // ── Event handlers ──
        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas!.getBoundingClientRect();
            mouseRef.current.prevX = mouseRef.current.x;
            mouseRef.current.prevY = mouseRef.current.y;
            mouseRef.current.x = e.clientX - rect.left;
            mouseRef.current.y = e.clientY - rect.top;
            mouseRef.current.active = true;
        };

        const handleMouseLeave = () => {
            mouseRef.current.active = false;
            mouseRef.current.x = -9999;
            mouseRef.current.y = -9999;
        };

        const handleTouchMove = (e: TouchEvent) => {
            const rect = canvas!.getBoundingClientRect();
            mouseRef.current.prevX = mouseRef.current.x;
            mouseRef.current.prevY = mouseRef.current.y;
            mouseRef.current.x = e.touches[0].clientX - rect.left;
            mouseRef.current.y = e.touches[0].clientY - rect.top;
            mouseRef.current.active = true;
        };

        const handleTouchEnd = () => {
            mouseRef.current.active = false;
        };

        // ── Click to flick ──
        const handleClick = (e: MouseEvent) => {
            const rect = canvas!.getBoundingClientRect();
            const cx = e.clientX - rect.left;
            const cy = e.clientY - rect.top;

            // Find closest body and give it a strong push
            let closest: FloatingBody | null = null;
            let closestDist = Infinity;

            for (const b of bodiesRef.current) {
                const dx = b.x - cx;
                const dy = b.y - cy;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < closestDist && dist < MOUSE_RADIUS) {
                    closest = b;
                    closestDist = dist;
                }
            }

            if (closest) {
                const dx = closest.x - cx;
                const dy = closest.y - cy;
                const dist = Math.sqrt(dx * dx + dy * dy) || 1;
                closest.vx += (dx / dist) * 12;
                closest.vy += (dy / dist) * 12;
                closest.angularVel += (Math.random() - 0.5) * 0.15;
            }
        };

        window.addEventListener('resize', resize);
        canvas.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('mouseleave', handleMouseLeave);
        canvas.addEventListener('touchmove', handleTouchMove, { passive: true });
        canvas.addEventListener('touchend', handleTouchEnd);
        canvas.addEventListener('click', handleClick);

        resize();
        animate();

        return () => {
            cancelAnimationFrame(animRef.current);
            window.removeEventListener('resize', resize);
            canvas.removeEventListener('mousemove', handleMouseMove);
            canvas.removeEventListener('mouseleave', handleMouseLeave);
            canvas.removeEventListener('touchmove', handleTouchMove);
            canvas.removeEventListener('touchend', handleTouchEnd);
            canvas.removeEventListener('click', handleClick);
        };
    }, [initBodies]);

    return (
        <div ref={containerRef} className={`relative w-full h-full ${className}`}>
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full"
            />
        </div>
    );
}
