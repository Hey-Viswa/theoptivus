import React from 'react';
import { Metadata } from 'next';
import Skills from '@/components/features/skills/Skills';
import DitherBackground from '@/components/ui/DitherBackground';
import KineticText from '@/components/ui/KineticText';
import Marquee from '@/components/ui/Marquee';

export const metadata: Metadata = {
    title: 'Skills & Expertise | Biswaranjan',
    description: 'Technical skills, programming languages, frameworks, and tools I use to build scalable applications.',
};

export const revalidate = 60;

export default function SkillsPage() {
    return (
        <div className="relative min-h-dvh bg-background text-foreground flex flex-col pt-32 pb-20 overflow-hidden">
            {/* Dither Background */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <DitherBackground className="w-full h-full" />
            </div>

            <div className="relative z-10 w-full">
                {/* Editorial header */}
                <div className="px-6 md:px-12 max-w-[1600px] mx-auto w-full">
                    <div className="mb-10 md:mb-14">
                        <span className="font-mono text-xs uppercase tracking-widest text-foreground/50 mb-6 block">03 // CAPABILITIES</span>
                        <KineticText>
                            <h1 className="text-5xl sm:text-6xl md:text-[8rem] font-display font-black uppercase tracking-tight leading-[0.85]">
                                My <span className="font-serif italic normal-case font-normal text-[1.1em]">toolkit</span>
                            </h1>
                        </KineticText>
                    </div>
                </div>

                {/* Skills marquee — full-bleed dark band */}
                <Marquee
                    className="mb-14 md:mb-20"
                    items={['React', 'Next.js', 'TypeScript', 'Node.js', 'Firebase', 'Flutter', 'Solidity', 'MongoDB', 'Tailwind CSS', 'AWS']}
                />

                {/* Structured stack */}
                <div className="px-6 md:px-12 max-w-[1600px] mx-auto w-full">
                    <div className="border border-foreground">
                        <Skills />
                    </div>
                </div>
            </div>
        </div>
    );
}
