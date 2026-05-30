'use client';
import { useEffect, useRef } from 'react';

const COLORS = [
    '#4285F4', // blue
    '#EA4335', // red
    '#FBBC05', // yellow
    '#34A853', // green
    '#8B5CF6', // purple
];

const SHAPES = ['circle', 'dash', 'cross', 'triangle'];

class Particle {
    x: number;
    y: number;
    baseX: number;
    baseY: number;
    size: number;
    color: string;
    shape: string;
    density: number;
    angle: number;
    baseAngle: number;
    vx: number;
    vy: number;
    friction: number;
    ease: number;

    constructor(x: number, y: number) {
        this.x = x + (Math.random() - 0.5) * 20; // slight initial jitter
        this.y = y + (Math.random() - 0.5) * 20;
        this.baseX = this.x;
        this.baseY = this.y;
        this.size = Math.random() * 4 + 2;
        this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
        this.shape = SHAPES[Math.floor(Math.random() * SHAPES.length)];
        this.density = (Math.random() * 30) + 1;
        this.angle = Math.random() * Math.PI * 2;
        this.baseAngle = this.angle;
        this.vx = 0;
        this.vy = 0;
        this.friction = 0.85;
        this.ease = 0.05;
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.fillStyle = this.color;
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 2;

        ctx.beginPath();
        if (this.shape === 'circle') {
            ctx.arc(0, 0, this.size, 0, Math.PI * 2);
            ctx.fill();
        } else if (this.shape === 'dash') {
            ctx.roundRect(-this.size, -this.size/3, this.size * 2, this.size/1.5, this.size/3);
            ctx.fill();
        } else if (this.shape === 'cross') {
            ctx.roundRect(-this.size, -this.size/4, this.size * 2, this.size/2, this.size/4);
            ctx.roundRect(-this.size/4, -this.size, this.size/2, this.size * 2, this.size/4);
            ctx.fill();
        } else if (this.shape === 'triangle') {
            ctx.moveTo(0, -this.size);
            ctx.lineTo(this.size, this.size);
            ctx.lineTo(-this.size, this.size);
            ctx.closePath();
            ctx.fill();
        }
        ctx.restore();
    }

    update(mouse: {x: number, y: number, radius: number, active: boolean}) {
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        
        let forceDirectionX = dx / distance;
        let forceDirectionY = dy / distance;

        // Max distance, past that the force is 0
        let maxDistance = mouse.radius;
        let force = (maxDistance - distance) / maxDistance;
        let directionX = forceDirectionX * force * this.density;
        let directionY = forceDirectionY * force * this.density;

        if (distance < maxDistance && mouse.active) {
            this.vx -= directionX;
            this.vy -= directionY;
            
            // Spin when hit
            this.angle += force * 0.2;
        } else {
            // Return to base angle
            this.angle += (this.baseAngle - this.angle) * 0.05;
        }

        // Spring physics returning to base
        this.vx += (this.baseX - this.x) * this.ease;
        this.vy += (this.baseY - this.y) * this.ease;
        
        // Apply friction
        this.vx *= this.friction;
        this.vy *= this.friction;

        this.x += this.vx;
        this.y += this.vy;
    }
}

export default function ParticleField({ className = '' }: { className?: string }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let particlesArray: Particle[] = [];
        let animationFrameId: number;

        let mouse = {
            x: -9999,
            y: -9999,
            radius: 120, // size of hover area
            active: false
        };

        const init = () => {
            particlesArray = [];
            canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
            canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
            
            // Create a grid of particles
            const spacing = 40;
            const cols = Math.ceil(canvas.width / spacing);
            const rows = Math.ceil(canvas.height / spacing);

            for (let y = 0; y < rows; y++) {
                for (let x = 0; x < cols; x++) {
                    const px = x * spacing + (spacing / 2);
                    const py = y * spacing + (spacing / 2);
                    // 30% chance to not spawn a particle in a spot, making it organic
                    if (Math.random() > 0.3) {
                        particlesArray.push(new Particle(px, py));
                    }
                }
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < particlesArray.length; i++) {
                particlesArray[i].update(mouse);
                particlesArray[i].draw(ctx);
            }
            animationFrameId = requestAnimationFrame(animate);
        };

        const handleMouseMove = (event: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = event.clientX - rect.left;
            mouse.y = event.clientY - rect.top;
            mouse.active = true;
        };

        const handleMouseLeave = () => {
            mouse.active = false;
        };

        const handleResize = () => {
            init();
        };

        window.addEventListener('resize', handleResize);
        canvas.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('mouseleave', handleMouseLeave);

        init();
        animate();

        return () => {
            window.removeEventListener('resize', handleResize);
            canvas.removeEventListener('mousemove', handleMouseMove);
            canvas.removeEventListener('mouseleave', handleMouseLeave);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas 
            ref={canvasRef} 
            className={`block absolute inset-0 ${className}`} 
            style={{ pointerEvents: 'auto' }} // auto so it catches mouse events
        />
    );
}
