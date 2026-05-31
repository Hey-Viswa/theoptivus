import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import DitherBackground from '@/components/ui/DitherBackground';

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
            
            <div className="relative z-10 px-6 md:px-12 max-w-[1600px] mx-auto w-full">
                
                {/* Header */}
                <div className="mb-20">
                    <span className="font-mono text-xs uppercase tracking-widest text-foreground/50 mb-6 block">01 // IDENTITY</span>
                    <h1 className="text-6xl md:text-[8rem] font-display font-black uppercase tracking-tight leading-[0.9]">
                        Biswaranjan <span className="font-serif italic normal-case font-normal text-[1.1em]">Giri</span>
                    </h1>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 border border-foreground mb-20">
                    {/* Left: Image */}
                    <div className="lg:col-span-5 border-b lg:border-b-0 lg:border-r border-foreground p-8 md:p-12 bg-surface-alt/10 flex items-center justify-center">
                        <div className="relative w-full aspect-[3/4] max-w-md filter grayscale hover:grayscale-0 transition-all duration-700">
                            <Image 
                                src="/viswa.png" 
                                alt="Biswaranjan Giri" 
                                fill
                                className="object-cover border border-foreground/20"
                                priority
                            />
                        </div>
                    </div>

                    {/* Right: Bio */}
                    <div className="lg:col-span-7 p-8 md:p-12 flex flex-col justify-center bg-background">
                        <h2 className="text-4xl md:text-5xl font-display font-bold uppercase mb-8">
                            I build <span className="font-serif italic normal-case text-accent">systems</span> that don't break.
                        </h2>
                        
                        <div className="space-y-6 text-lg md:text-xl font-sans text-foreground/80 leading-relaxed max-w-3xl">
                            <p>
                                Based in India, I am a Full-Stack Developer specializing in robust web architecture and systems engineering. My approach is simple: write code that scales, design interfaces that impress, and solve problems from the root up.
                            </p>
                            <p>
                                I have spent the last few years mastering the MERN stack, Next.js, and Android development. Whether it is building an enterprise feedback management system for <strong className="text-foreground">JSW</strong> or designing complex distributed systems, I focus on precision.
                            </p>
                            <p>
                                I don't just build MVPs. I build products ready for production, complete with CI/CD pipelines, optimized databases, and seamless user experiences. 
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
                        <div className="md:col-span-4 p-8 md:p-12 md:border-r border-foreground bg-[#FFE600] text-foreground flex flex-col justify-center">
                            <span className="font-mono text-xs uppercase tracking-widest text-foreground/70 mb-4 block">02 // CAREER</span>
                            <h2 className="text-5xl md:text-7xl font-display font-black tracking-tight uppercase">
                                <span className="font-serif italic normal-case font-normal text-[1.1em]">Experience</span>
                            </h2>
                        </div>
                        <div className="md:col-span-8 bg-background">
                            <div className="p-8 md:p-12 hover:bg-surface-alt transition-colors">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
                                    <h3 className="text-2xl md:text-3xl font-display font-bold text-foreground"><span className="italic font-serif">Software Developer</span> Intern</h3>
                                    <span className="text-xs font-mono uppercase font-bold tracking-widest text-foreground/50 whitespace-nowrap">July 2023 - Present</span>
                                </div>
                                <p className="text-lg italic text-foreground/70 mb-6">JSW, Dolvi</p>
                                <ul className="space-y-4 text-foreground/80 font-sans text-base md:text-lg leading-relaxed max-w-3xl">
                                    <li className="flex items-start gap-4">
                                        <div className="w-1.5 h-1.5 bg-foreground mt-2.5 shrink-0 rounded-full"></div>
                                        <span>Built and delivered an <span className="font-bold text-foreground">Android Feedback Management System</span> for internal use.</span>
                                    </li>
                                    <li className="flex items-start gap-4">
                                        <div className="w-1.5 h-1.5 bg-foreground mt-2.5 shrink-0 rounded-full"></div>
                                        <span>Integrated <em className="font-serif text-lg text-foreground">REST APIs</em> and applied modern Android architecture patterns.</span>
                                    </li>
                                    <li className="flex items-start gap-4">
                                        <div className="w-1.5 h-1.5 bg-foreground mt-2.5 shrink-0 rounded-full"></div>
                                        <span>Worked in an enterprise environment with exposure to <span className="font-bold text-foreground">SAP-based workflows</span>.</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Education Section */}
                    <div className="grid grid-cols-1 md:grid-cols-12 text-foreground">
                        <div className="md:col-span-4 p-8 md:p-12 md:border-r border-foreground bg-accent text-background flex flex-col justify-center">
                            <span className="font-mono text-xs uppercase tracking-widest text-background/70 mb-4 block">03 // ACADEMICS</span>
                            <h2 className="text-5xl md:text-7xl font-display font-black tracking-tight uppercase">
                                <span className="font-serif italic normal-case font-normal text-[1.1em]">Education</span>
                            </h2>
                        </div>
                        <div className="md:col-span-8 flex flex-col md:flex-row bg-background">
                            <div className="flex-1 p-8 md:p-12 hover:bg-surface-alt transition-colors">
                                <span className="text-[10px] font-mono font-bold uppercase tracking-widest block mb-4 text-foreground/50">Expected 2027</span>
                                <h3 className="text-xl md:text-2xl font-display font-bold mb-2 text-foreground leading-tight">Bachelor of Technology in <span className="italic font-serif">Computer Engineering</span></h3>
                                <p className="text-foreground/70 font-sans text-sm md:text-base">Pillai HOC College of Engineering and Technology</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
