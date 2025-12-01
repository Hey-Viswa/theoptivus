import React from 'react';
import { Skill } from '@/types/skill';
import SkillsGrid from './SkillsGrid';

interface SkillCategorySectionProps {
    title: string;
    skills: Skill[];
    className?: string;
}

const SkillCategorySection: React.FC<SkillCategorySectionProps> = ({ title, skills, className = '' }) => {
    if (!skills || skills.length === 0) return null;

    return (
        <div className={`mb-12 ${className}`}>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-200 dark:border-gray-800 pb-2">
                {title}
            </h3>
            <SkillsGrid skills={skills} />
        </div>
    );
};

export default SkillCategorySection;
