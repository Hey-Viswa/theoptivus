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

    const getLevelColor = (level: string) => {
        switch (level) {
            case 'Expert': return 'border-purple-500/30 hover:border-purple-500/60 hover:shadow-[0_0_20px_rgba(168,85,247,0.15)] bg-purple-500/5';
            case 'Advanced': return 'border-blue-500/30 hover:border-blue-500/60 hover:shadow-[0_0_20px_rgba(59,130,246,0.15)] bg-blue-500/5';
            case 'Intermediate': return 'border-emerald-500/30 hover:border-emerald-500/60 hover:shadow-[0_0_20px_rgba(16,185,129,0.15)] bg-emerald-500/5';
            default: return 'border-white/10 hover:border-white/30 bg-white/5';
        }
    };

    const getTextColor = (level: string) => {
        switch (level) {
            case 'Expert': return 'text-purple-400 group-hover:text-purple-300';
            case 'Advanced': return 'text-blue-400 group-hover:text-blue-300';
            case 'Intermediate': return 'text-emerald-400 group-hover:text-emerald-300';
            default: return 'text-gray-500 group-hover:text-gray-400';
        }
    };

    return (
        <div className={`flex items-center gap-4 p-4 backdrop-blur-sm rounded-xl border transition-all duration-300 group ${getLevelColor(skill.level)} ${className}`}>
            {iconUrl ? (
                <div className="relative w-10 h-10 flex-shrink-0 grayscale group-hover:grayscale-0 transition-all duration-300">
                    <Image
                        src={iconUrl}
                        alt={skill.name}
                        fill
                        className="object-contain"
                    />
                </div>
            ) : (
                <div className="w-10 h-10 flex-shrink-0 bg-white/5 rounded-lg flex items-center justify-center text-sm font-bold text-gray-400 group-hover:text-white transition-colors">
                    {skill.name.substring(0, 2).toUpperCase()}
                </div>
            )}
            <div>
                <h4 className="text-base font-medium text-gray-200 group-hover:text-white transition-colors">{skill.name}</h4>
                <p className={`text-xs transition-colors uppercase tracking-wider font-medium ${getTextColor(skill.level)}`}>{skill.level}</p>
            </div>
        </div>
    );
};

export default SkillBadge;
