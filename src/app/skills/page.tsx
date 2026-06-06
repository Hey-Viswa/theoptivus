import React from 'react';
import { Metadata } from 'next';
import Skills from '@/components/features/skills/Skills';
import DitherBackground from '@/components/ui/DitherBackground';
import KineticText from '@/components/ui/KineticText';

export const metadata: Metadata = {
    title: 'Skills & Expertise | Biswaranjan',
    description: 'Technical skills, programming languages, frameworks, and tools I use to build scalable applications.',
};

export const revalidate = 60;

export default function SkillsPage() {
    return (
        <div className="relative min-h-screen bg-background text-foreground flex flex-col pt-32 pb-20 overflow-hidden">
            {/* Dither Background */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <DitherBackground className="w-full h-full" />
            </div>
            
            <div className="relative z-10 px-6 md:px-12 max-w-[1600px] mx-auto w-full">
                {/* Editorial header — matches /work and /about */}
                <div className="mb-20">
                    <span className="font-mono text-xs uppercase tracking-widest text-foreground/50 mb-6 block">03 // CAPABILITIES</span>
                    <KineticText>
                        <h1 className="text-5xl sm:text-6xl md:text-[8rem] font-display font-black uppercase tracking-tight leading-[0.9]">
                            My <span className="font-serif italic normal-case font-normal text-[1.1em]">toolkit</span>
                        </h1>
                    </KineticText>
                </div>

                <div className="border border-foreground">
                    <Skills />
                </div>
            </div>
        </div>
    );
}
