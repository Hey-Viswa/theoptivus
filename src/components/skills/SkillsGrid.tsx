import React from 'react';
import { Skill } from '@/types/skill';
import SkillBadge from './SkillBadge';

interface SkillsGridProps {
    skills: Skill[];
    className?: string;
}

const SkillsGrid: React.FC<SkillsGridProps> = ({ skills, className = '' }) => {
    if (!skills || skills.length === 0) return null;

    return (
        <div className={`flex flex-wrap gap-3 md:gap-4 ${className}`}>
            {skills.map((skill) => (
                <SkillBadge key={skill.slug} skill={skill} />
            ))}
        </div>
    );
};

export default SkillsGrid;
