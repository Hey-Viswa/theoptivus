import React from 'react';
import { Metadata } from 'next';
import { getSkills } from '@/lib/skills';
import SkillsGrid from '@/components/skills/SkillsGrid';
import DitherBackground from '@/components/ui/DitherBackground';

export const metadata: Metadata = {
    title: 'Skills & Tech Stack | StudioFlow',
    description: 'A comprehensive list of the technologies and tools I use.',
};

export const revalidate = 60;

export default async function SkillsPage() {
    const { skills } = await getSkills({});

    return (
        <div className="relative min-h-screen bg-background flex flex-col">
            <div className="fixed inset-0 z-0 opacity-100 pointer-events-none">
                <DitherBackground className="w-full h-full" />
            </div>
            <div className="relative z-10 pt-32 pb-20 px-6 md:px-12 flex-1">
                <div className="max-w-7xl mx-auto border border-foreground p-8 md:p-12 bg-background/80 backdrop-blur-sm">
                    <h1 className="text-5xl md:text-7xl font-display font-black uppercase mb-12 text-center text-foreground border-b border-foreground/20 pb-12">
                        Tech <span className="highlight-yellow text-foreground px-4 py-2">Stack</span>
                    </h1>
                    <div className="py-12">
                        <SkillsGrid skills={skills} />
                    </div>
                </div>
            </div>
        </div>
    );
}
