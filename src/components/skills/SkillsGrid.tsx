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
        <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 ${className}`}>
            {skills.map((skill) => (
                <SkillBadge key={skill.$id} skill={skill} />
            ))}
        </div>
    );
};

export default SkillsGrid;
