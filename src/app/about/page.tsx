import React from 'react';
import Link from 'next/link';
import DitherBackground from '@/components/ui/DitherBackground';
import KineticText from '@/components/ui/KineticText';
import DistortionImage from '@/components/ui/DistortionImage';
import Marquee from '@/components/ui/Marquee';

export const metadata = {
    title: 'About | Biswaranjan',
    description: 'Full-stack developer and UI engineer based in India.',
};

export default function AboutPage() {
    return (
        <div className="relative min-h-screen bg-background text-foreground flex flex-col pt-32 pb-20 overflow-hidden">
            {/* Dither Background */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <DitherBackground className="w-full h-full" />
            </div>

            <div className="relative z-10 w-full">
                <div className="px-6 md:px-12 max-w-[1600px] mx-auto w-full">
                    {/* Header */}
                    <div className="mb-10 md:mb-14">
                        <span className="font-mono text-xs uppercase tracking-widest text-foreground/50 mb-6 block">01 // IDENTITY</span>
                        <KineticText>
                            <h1 className="text-4xl sm:text-5xl md:text-[8rem] font-display font-black uppercase tracking-tight leading-[0.85]">
                                Biswaranjan <span className="font-serif italic normal-case font-normal text-[1.1em]">Giri</span>
                            </h1>
                        </KineticText>
                    </div>
                </div>

                {/* Roles marquee — full-bleed dark band */}
                <Marquee
                    className="mb-14 md:mb-20"
                    items={[
                        'Full-Stack Engineer',
                        'Systems Thinker',
                        'Android Developer',
                        'Production-Ready',
                        'Solo Builder',
                        'Next.js · Firebase · Flutter',
                    ]}
                />

                <div className="px-6 md:px-12 max-w-[1600px] mx-auto w-full">
                    {/* Main Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 border border-foreground mb-20">
                        {/* Left: Image */}
                        <div className="lg:col-span-5 border-b lg:border-b-0 lg:border-r border-foreground p-5 sm:p-8 md:p-12 bg-surface-alt/10 flex items-center justify-center">
                            <div className="relative w-full aspect-[3/4] max-w-md border border-foreground/20 overflow-hidden">
                                <DistortionImage
                                    src="/viswa.png"
                                    alt="Biswaranjan Giri"
                                    className="absolute inset-0 w-full h-full"
                                />
                            </div>
                        </div>

                        {/* Right: Bio */}
                        <div className="lg:col-span-7 p-8 md:p-12 flex flex-col justify-center bg-background">
                            <KineticText className="mb-8">
                                <h2 className="text-3xl sm:text-4xl md:text-6xl font-display font-black uppercase leading-[0.95]">
                                    I build <span className="font-serif italic normal-case font-normal text-accent">systems</span><br className="hidden sm:block" /> that don&#39;t break.
                                </h2>
                            </KineticText>

                            <div className="space-y-6 text-lg md:text-xl font-sans text-foreground/80 leading-relaxed max-w-3xl">
                                <p>
                                    Based in India, I am a Full-Stack Developer specializing in robust web architecture and systems engineering. My approach is simple: write code that scales, design interfaces that impress, and solve problems from the root up.
                                </p>
                                <p>
                                    I have spent the last few years mastering the MERN stack, Next.js, and Android development. Whether it is building an enterprise feedback management system for <strong className="text-foreground">JSW</strong> or designing complex distributed systems, I focus on precision.
                                </p>
                                <p>
                                    I don&#39;t just build MVPs. I build products ready for production, complete with CI/CD pipelines, optimized databases, and seamless user experiences.
                                </p>
                            </div>

                            <div className="mt-12 flex flex-wrap gap-4">
                                <Link href="/contact" className="editorial-btn uppercase text-sm">
                                    Contact Me
                                </Link>
                                <a href="https://github.com/Hey-Viswa" target="_blank" rel="noopener noreferrer" className="editorial-btn uppercase text-sm bg-foreground text-background hover:bg-foreground/90">
                                    GitHub
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Experience & Education Section */}
                    <div className="border border-foreground">
                        {/* Experience Section */}
                        <div className="grid grid-cols-1 md:grid-cols-12 border-b border-foreground">
                            <div className="md:col-span-4 p-6 sm:p-8 md:p-12 md:border-r border-foreground bg-[#FFE600] text-foreground flex flex-col justify-between">
                                <span className="font-mono text-xs uppercase tracking-widest text-foreground/70 mb-4 block">02 // CAREER</span>
                                <KineticText intensity={1.2}>
                                    <h2 className="text-4xl sm:text-5xl md:text-7xl font-display font-black tracking-tight uppercase leading-none">
                                        <span className="font-serif italic normal-case font-normal text-[1.1em]">Experience</span>
                                    </h2>
                                </KineticText>
                                <span aria-hidden className="mt-10 block font-display font-black leading-none text-[7rem] md:text-[10rem] tracking-tighter text-foreground/10 select-none">01</span>
                            </div>
                            <div className="md:col-span-8 bg-background">
                                <div className="group relative p-8 md:p-12 transition-colors duration-300 hover:bg-surface-alt border-l-2 border-transparent hover:border-accent">
                                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-baseline mb-6">
                                        <div className="md:col-span-3">
                                            <span className="font-display font-black text-4xl md:text-5xl leading-none tracking-tighter text-foreground/30 group-hover:text-accent transition-colors duration-300">&#8217;23</span>
                                            <span className="mt-1 block font-mono text-[10px] uppercase tracking-widest text-foreground/40">JUL 2023 — NOW</span>
                                        </div>
                                        <div className="md:col-span-9">
                                            <h3 className="text-2xl md:text-4xl font-display font-bold text-foreground leading-tight"><span className="italic font-serif">Software Developer</span> Intern</h3>
                                            <p className="mt-1 text-base md:text-lg font-mono uppercase tracking-wide text-foreground/50">JSW · Dolvi</p>
                                        </div>
                                    </div>
                                    <ul className="space-y-4 text-foreground/80 font-sans text-base md:text-lg leading-relaxed md:ml-[25%] max-w-2xl">
                                        <li className="flex items-start gap-4">
                                            <div className="w-3 h-[2px] bg-foreground/40 mt-3 shrink-0 group-hover:bg-accent group-hover:w-5 transition-all duration-300"></div>
                                            <span>Built and delivered an <span className="font-bold text-foreground">Android Feedback Management System</span> for internal use.</span>
                                        </li>
                                        <li className="flex items-start gap-4">
                                            <div className="w-3 h-[2px] bg-foreground/40 mt-3 shrink-0 group-hover:bg-accent group-hover:w-5 transition-all duration-300"></div>
                                            <span>Integrated <em className="font-serif text-lg text-foreground">REST APIs</em> and applied modern Android architecture patterns.</span>
                                        </li>
                                        <li className="flex items-start gap-4">
                                            <div className="w-3 h-[2px] bg-foreground/40 mt-3 shrink-0 group-hover:bg-accent group-hover:w-5 transition-all duration-300"></div>
                                            <span>Worked in an enterprise environment with exposure to <span className="font-bold text-foreground">SAP-based workflows</span>.</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Education Section */}
                        <div className="grid grid-cols-1 md:grid-cols-12 text-foreground">
                            <div className="md:col-span-4 p-6 sm:p-8 md:p-12 md:border-r border-foreground bg-accent text-background flex flex-col justify-between">
                                <span className="font-mono text-xs uppercase tracking-widest text-background/70 mb-4 block">03 // ACADEMICS</span>
                                <KineticText intensity={1.2}>
                                    <h2 className="text-4xl sm:text-5xl md:text-7xl font-display font-black tracking-tight uppercase leading-none">
                                        <span className="font-serif italic normal-case font-normal text-[1.1em]">Education</span>
                                    </h2>
                                </KineticText>
                                <span aria-hidden className="mt-10 block font-display font-black leading-none text-[7rem] md:text-[10rem] tracking-tighter text-background/15 select-none">01</span>
                            </div>
                            <div className="md:col-span-8 flex flex-col md:flex-row bg-background">
                                <div className="group flex-1 p-8 md:p-12 transition-colors duration-300 hover:bg-surface-alt border-l-2 border-transparent hover:border-accent">
                                    <div className="flex items-baseline gap-4 mb-6">
                                        <span className="font-display font-black text-6xl md:text-7xl leading-none tracking-tighter text-foreground/20 group-hover:text-accent transition-colors duration-300">&#8217;27</span>
                                        <span className="neo-pill !text-[10px]">In Progress</span>
                                    </div>
                                    <h3 className="text-2xl md:text-3xl font-display font-bold mb-2 text-foreground leading-tight">Bachelor of Engineering in <span className="italic font-serif">Computer Engineering</span></h3>
                                    <p className="font-mono text-sm uppercase tracking-wide text-foreground/50">Pillai HOC College of Engineering &amp; Technology</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
