import React from 'react';
import Image from 'next/image';
import { Skill } from '@/types/skill';

interface SkillBadgeProps {
    skill: Skill;
    className?: string;
}

const SkillBadge: React.FC<SkillBadgeProps> = ({ skill, className = '' }) => {
    const iconUrl = skill.iconFileId
        ? `${process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT}/storage/buckets/project-assets/files/${skill.iconFileId}/view?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID}`
        : null;

    return (
        <div className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-surface border border-border hover:border-accent-light hover:shadow-[0_4px_12px_rgba(30,111,255,0.08)] transition-all duration-200 group ${className}`}>
            {iconUrl ? (
                <div className="relative w-4 h-4 flex-shrink-0 opacity-70 group-hover:opacity-100 transition-opacity">
                    <Image
                        src={iconUrl}
                        alt={skill.name}
                        fill
                        className="object-contain"
                    />
                </div>
            ) : (
                <div className="w-5 h-5 flex-shrink-0 rounded bg-accent/10 flex items-center justify-center text-[9px] font-bold text-accent">
                    {skill.name.substring(0, 2).toUpperCase()}
                </div>
            )}
            <div>
                <h4 className="text-xs font-semibold text-foreground whitespace-nowrap">{skill.name}</h4>
            </div>
        </div>
    );
};

export default SkillBadge;
