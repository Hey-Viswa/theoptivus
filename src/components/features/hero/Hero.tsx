'use client';
import CanvasText from '@/components/ui/CanvasText';
import Image from 'next/image';

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
                <div className="grid-border-b p-8 flex flex-col md:flex-row justify-between items-start md:items-center relative z-20 animate-gentle-in bg-[#FFE600] text-foreground">
                    <p className="text-xl md:text-2xl font-mono uppercase tracking-widest font-bold">
                        Full-Stack Developer
                    </p>
                    <div className="flex items-center gap-4 mt-4 md:mt-0 font-mono text-sm md:text-base uppercase text-foreground">
                        <span>Systems Builder</span>
                        <span className="w-2 h-2 bg-foreground" />
                        <span>Creator</span>
                    </div>
                </div>

                {/* Main Content Grid - Full Screen Center Typography */}
                <div className="flex-1 w-full flex flex-col relative z-10 min-h-[30vh] md:min-h-[40vh] lg:min-h-[60vh] bg-background overflow-hidden border-b border-foreground">
                    {/* Background glow for the blue aesthetic */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/10 blur-[150px] rounded-full pointer-events-none z-0" />

                    {/* Canvas Background - Absolute */}
                    <div className="absolute inset-0 z-0 flex items-center justify-center p-8 md:p-12">
                        <CanvasText text="BISWARANJAN" className="w-full h-full" />
                    </div>
                </div>

                {/* Summary & Core Expertise (Matching About Section Aesthetic) */}
                <div className="grid grid-cols-1 md:grid-cols-12 bg-background">
                    <div className="md:col-span-8 p-8 md:p-12 md:border-r border-foreground bg-background text-foreground">
                        <span className="font-mono text-xs uppercase tracking-widest text-foreground/50 mb-8 block">01 // SUMMARY</span>
                        <h2 className="text-4xl md:text-[4rem] font-display font-black mb-8 leading-[1.05] tracking-tight text-foreground uppercase">
                            Building <span className="highlight-blue">production-grade</span> SaaS <br className="hidden xl:block" />
                            and modern web apps.
                        </h2>
                        <div className="text-xl md:text-2xl text-foreground font-sans leading-relaxed max-w-4xl">
                            <span>Strong engineering foundation in <span className="highlight-yellow">Android Development</span> and the <span className="highlight-yellow">MERN Stack</span>. I build full-stack architectures that are <span className="highlight-blue">compliant, bug-proof, and instant</span>.</span>
                        </div>
                    </div>
                    <div className="md:col-span-4 p-8 md:p-12 bg-accent text-background flex flex-col justify-center">
                        <span className="font-mono text-xs uppercase tracking-widest text-background/70 mb-8 block">CORE EXPERTISE</span>
                        <div className="text-2xl md:text-4xl font-display font-black flex flex-col gap-4">
                            <span className="border-b border-background/20 pb-4">Android</span>
                            <span className="italic font-serif border-b border-background/20 pb-4">MERN Stack</span>
                            <span className="border-b border-background/20 pb-4">System Design</span>
                            <span className="font-mono text-lg bg-background text-foreground px-4 py-2 w-fit mt-2 uppercase font-bold tracking-widest">Full-Stack SaaS</span>
                        </div>
                    </div>
                </div>

                {/* Availability Bar (Bottom of grid) */}
                <div className="border-t border-foreground flex items-stretch relative z-10 bg-background text-foreground h-16 md:h-20 group cursor-pointer hover:bg-foreground hover:text-background transition-colors duration-300">
                    <div className="flex-1 border-r border-foreground group-hover:border-background/20 flex items-center justify-center">
                         <div className="w-3 h-3 rounded-full bg-accent group-hover:bg-[#FFE600] animate-pulse" />
                    </div>
                    <div className="flex-[4] flex items-center justify-start px-6 md:px-12">
                        <span className="text-sm md:text-xl font-display font-black uppercase tracking-[0.2em] md:tracking-[0.3em]">
                            Available for Freelance
                        </span>
                    </div>
                    <div className="flex-1 border-l border-foreground group-hover:border-background/20 flex items-center justify-center bg-[#FFE600] text-foreground group-hover:bg-accent group-hover:text-background transition-colors duration-300">
                         <span className="text-xs md:text-sm font-mono uppercase tracking-widest font-bold">Contact</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
