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
        <div className={`flex items-center gap-3 px-4 py-3 rounded-xl bg-surface border border-border hover:border-accent-light hover:shadow-[0_4px_12px_rgba(30,111,255,0.08)] transition-all duration-200 group ${className}`}>
            {iconUrl ? (
                <div className="relative w-6 h-6 flex-shrink-0 opacity-70 group-hover:opacity-100 transition-opacity">
                    <Image
                        src={iconUrl}
                        alt={skill.name}
                        fill
                        className="object-contain"
                    />
                </div>
            ) : (
                <div className="w-6 h-6 flex-shrink-0 rounded-md bg-accent/10 flex items-center justify-center text-[10px] font-bold text-accent">
                    {skill.name.substring(0, 2).toUpperCase()}
                </div>
            )}
            <div>
                <h4 className="text-sm font-semibold text-foreground">{skill.name}</h4>
                <p className="text-[10px] text-muted font-mono">
                    {skill.level}
                </p>
            </div>
        </div>
    );
};

export default SkillBadge;
