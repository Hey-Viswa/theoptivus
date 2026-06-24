'use client';
import { useEffect, useState } from 'react';
import { getSkills } from '@/lib/skills';
import { Skill } from '@/types/skill';
import KineticText from '@/components/ui/KineticText';

export default function Skills() {
    const [skills, setSkills] = useState<Skill[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSkills = async () => {
            try {
                const res = await getSkills({ limit: 100 });
                setSkills(res.skills);
            } catch (error) {
                console.error('Error fetching skills:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchSkills();
    }, []);

    if (loading) return <div className="py-20 text-center text-foreground/50 animate-pulse text-sm font-mono">Loading skills...</div>;
    if (skills.length === 0) return null;

    const categoryOrder = ['Languages', 'Frameworks', 'BlockChain', 'Databases', 'Cloud', 'Tools', 'Concepts'];
    const groupedSkills = skills.reduce((acc, skill) => {
        const cat = skill.category || 'Other';
        if (!acc[cat]) acc[cat] = [];
        acc[cat].push(skill);
        return acc;
    }, {} as Record<string, Skill[]>);

    const sortedCategories = Object.keys(groupedSkills).sort((a, b) => {
        const indexA = categoryOrder.indexOf(a);
        const indexB = categoryOrder.indexOf(b);
        return (indexA === -1 ? 999 : indexA) - (indexB === -1 ? 999 : indexB);
    });

    return (
        <div className="grid grid-cols-1 md:grid-cols-12">
            {/* Left label — matches Career/Education pattern */}
            <div className="md:col-span-4 @container p-6 sm:p-8 md:p-12 md:border-r border-foreground bg-foreground text-background flex flex-col justify-between">
                <span className="font-mono text-xs uppercase tracking-widest text-background/70 mb-4 block">04 // EXPERTISE</span>
                <KineticText>
                    <h2 className="text-[clamp(1.5rem,15cqw,7rem)] font-display font-black tracking-tight uppercase leading-none break-words">
                        Tech <span className="font-serif italic normal-case font-normal text-[1.1em]">stack</span>
                    </h2>
                </KineticText>
                <div className="mt-10"><span aria-hidden className="block font-display font-black leading-none text-[clamp(3.5rem,55cqw,11rem)] tracking-tighter text-background/15 select-none">{String(skills.length).padStart(2, '0')}</span><span className="mt-2 block font-mono text-[10px] uppercase tracking-widest text-background/50">{sortedCategories.length} domains · {skills.length} tools</span></div>
            </div>

            {/* Right content — editorial list per category */}
            <div className="md:col-span-8 flex flex-col bg-background">
                {sortedCategories.map((category, index) => (
                    <div
                        key={category}
                        className={`p-6 sm:p-8 md:p-12 hover:bg-surface-alt transition-colors ${index !== sortedCategories.length - 1 ? 'border-b border-foreground' : ''}`}
                    >
                        <div className="flex items-baseline gap-4 mb-6"><span aria-hidden className="font-mono text-sm text-foreground/30 tabular-nums">{String(index + 1).padStart(2, '0')}</span><h3 className="text-2xl md:text-4xl font-display font-bold text-foreground"><span className="italic font-serif">{category}</span></h3><span className="ml-auto font-mono text-[10px] uppercase tracking-widest text-foreground/40">{groupedSkills[category].length} tools</span></div>
                        <p className="font-sans text-lg md:text-xl text-foreground/75 leading-relaxed max-w-3xl">
                            {groupedSkills[category].map((s, i) => (
                                <span key={s.slug}>
                                    {s.name}
                                    {i < groupedSkills[category].length - 1 && (
                                        <span className="text-accent mx-2.5 font-mono">/</span>
                                    )}
                                </span>
                            ))}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
