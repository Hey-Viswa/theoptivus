'use client';
import { useEffect, useState } from 'react';
import { getSkills } from '@/lib/skills';
import { Skill } from '@/types/skill';

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
            <div className="md:col-span-4 p-8 md:p-12 md:border-r border-foreground bg-foreground text-background flex flex-col justify-center">
                <span className="font-mono text-xs uppercase tracking-widest text-background/70 mb-4 block">04 // EXPERTISE</span>
                <h2 className="text-5xl md:text-7xl font-display font-black tracking-tight uppercase leading-none">
                    Tech <span className="font-serif italic normal-case font-normal text-[1.1em]">stack</span>
                </h2>
            </div>

            {/* Right content — editorial list per category */}
            <div className="md:col-span-8 flex flex-col bg-background">
                {sortedCategories.map((category, index) => (
                    <div 
                        key={category} 
                        className={`p-8 md:p-12 hover:bg-surface-alt transition-colors ${index !== sortedCategories.length - 1 ? 'border-b border-foreground' : ''}`}
                    >
                        <h3 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-4">
                            <span className="italic font-serif">{category}</span>
                        </h3>
                        <p className="text-lg font-sans text-foreground/80 leading-relaxed max-w-3xl">
                            {groupedSkills[category].map(s => s.name).join('  ·  ')}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
