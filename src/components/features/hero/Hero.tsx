'use client';
import CanvasText from '@/components/ui/CanvasText';

export default function Hero() {
    return (
        <section
            id="hero"
            className="relative min-h-screen pt-20 flex flex-col px-6 md:px-12 bg-background"
        >
            {/* Grid structure wrapper */}
            <div className="flex-1 w-full grid-border-x grid-border-b flex flex-col relative overflow-hidden">
                {/* Subtle dot grid */}
                <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.05]"
                    style={{
                        backgroundImage: 'radial-gradient(circle, var(--foreground) 1px, transparent 1px)',
                        backgroundSize: '24px 24px',
                    }}
                />

                {/* Subtitle Section (Top of grid) */}
                <div className="grid-border-b p-8 flex flex-col md:flex-row justify-between items-start md:items-center relative z-20 animate-gentle-in bg-surface">
                    <p className="text-xl md:text-2xl text-foreground font-mono uppercase tracking-widest font-bold">
                        Full-Stack <span className="text-accent">Developer</span>
                    </p>
                    <div className="flex items-center gap-4 mt-4 md:mt-0 font-mono text-sm md:text-base uppercase text-foreground">
                        <span>Systems Builder</span>
                        <span className="w-2 h-2 bg-accent" />
                        <span>Creator</span>
                    </div>
                </div>

                {/* Main Content Grid - Full Screen Center Typography */}
                <div className="flex-1 w-full flex flex-col items-center justify-center relative z-10 py-20 bg-background">
                    {/* Background glow for the blue aesthetic */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/10 blur-[150px] rounded-full pointer-events-none -z-10" />

                    <div className="w-full flex items-center justify-center h-[50vh] md:h-[60vh]">
                        <CanvasText text="BISWARANJAN" className="w-full h-full" />
                    </div>

                    {/* Metadata overlays attached to corners of the grid */}
                    <div className="absolute top-16 left-16 hidden md:block max-w-[400px]">
                        <span className="font-mono text-sm uppercase tracking-widest text-foreground/50 mb-6 block">01 // INTRODUCTION</span>
                        <p className="text-lg md:text-xl text-foreground font-sans leading-relaxed">Specializing in digital experiences, interactive design, and robust full-stack architectures.</p>
                    </div>

                    <div className="absolute bottom-16 right-16 hidden md:block text-right">
                        <span className="font-mono text-sm uppercase tracking-widest text-foreground/50 mb-6 block">CORE EXPERTISE</span>
                        <p className="text-lg md:text-xl text-foreground font-sans leading-relaxed">React • Next.js • Node.js • GSAP</p>
                        <p className="text-sm font-mono font-bold mt-6 text-foreground border-2 border-foreground px-4 py-2 inline-block">EST. 2026</p>
                    </div>
                </div>

                {/* Scroll Indicator (Bottom of grid) */}
                <div className="grid-border-t p-6 flex justify-between items-center relative z-10 bg-surface">
                    <span className="text-sm md:text-base font-mono uppercase text-accent font-bold tracking-widest">Available for freelance</span>
                    <div className="w-6 h-10 grid-border flex justify-center pt-2 bg-background border-2 border-foreground">
                        <div className="w-1.5 h-3 bg-accent animate-bounce" />
                    </div>
                </div>
            </div>
        </section>
    );
}
