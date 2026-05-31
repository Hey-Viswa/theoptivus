import React from 'react';
import { Metadata } from 'next';
import Skills from '@/components/features/skills/Skills';
import DitherBackground from '@/components/ui/DitherBackground';

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
                <div className="border border-foreground">
                    <Skills />
                </div>
            </div>
        </div>
    );
}
