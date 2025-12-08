import React from 'react';
import { Metadata } from 'next';
import { getAllSkills } from '@/lib/skills';
import SkillCategorySection from '@/components/skills/SkillCategorySection';
import { Skill, SkillCategory } from '@/types/skill';

export const metadata: Metadata = {
    title: 'Skills & Tech Stack | StudioFlow',
    description: 'A comprehensive list of the technologies and tools I use.',
};

// Revalidate every 60 seconds
export const revalidate = 60;

export default async function SkillsPage() {
    const { skills } = await getAllSkills();

    // Group skills by category
    const categories: SkillCategory[] = ['Frontend', 'Backend', 'Database', 'DevOps', 'Mobile', 'Tools'];
    const groupedSkills = categories.reduce((acc, category) => {
        acc[category] = skills.filter(skill => skill.category === category);
        return acc;
    }, {} as Record<SkillCategory, Skill[]>);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black pt-24 pb-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                        Tech Stack & Skills
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        The tools and technologies I use to build digital experiences.
                    </p>
                </div>

                <div className="max-w-5xl mx-auto">
                    {categories.map(category => (
                        <SkillCategorySection
                            key={category}
                            title={category}
                            skills={groupedSkills[category]}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
