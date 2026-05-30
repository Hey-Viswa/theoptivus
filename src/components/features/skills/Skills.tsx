'use client';
import { useEffect, useState } from 'react';
import { databases, COLLECTIONS, DATABASE_ID } from '@/lib/appwrite';
import Image from 'next/image';
import { Query } from 'appwrite';

interface Skill {
    $id: string;
    name: string;
    category: string;
    iconFileId?: string;
    level: string;
}

export default function Skills() {
    const [skills, setSkills] = useState<Skill[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSkills = async () => {
            try {
                const res = await databases.listDocuments(
                    DATABASE_ID,
                    COLLECTIONS.SKILLS,
                    [Query.limit(100), Query.orderAsc('order')]
                );
                setSkills(res.documents as unknown as Skill[]);
            } catch (error) {
                console.error('Error fetching skills:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchSkills();
    }, []);

    if (loading) return <div className="py-20 text-center text-muted animate-pulse text-sm">Loading skills...</div>;
    if (skills.length === 0) return null;

    const categoryOrder = ['Frontend', 'Backend', 'Database', 'DevOps', 'Mobile', 'Tools'];
    const groupedSkills = skills.reduce((acc, skill) => {
        const cat = skill.category || 'Other';
        if (!acc[cat]) {
            acc[cat] = [];
        }
        acc[cat].push(skill);
        return acc;
    }, {} as Record<string, Skill[]>);

    const sortedCategories = Object.keys(groupedSkills).sort((a, b) => {
        const indexA = categoryOrder.indexOf(a);
        const indexB = categoryOrder.indexOf(b);
        return (indexA === -1 ? 999 : indexA) - (indexB === -1 ? 999 : indexB);
    });

    return (
        <section id="skills" className="py-20 relative">
            <div className="w-full bg-[#FFE600] text-foreground grid-border-b grid-border-x mb-12">
                <div className="max-w-6xl mx-auto px-6 md:px-12 py-12 md:py-20">
                    <span className="font-mono text-xs uppercase tracking-widest text-foreground/70 mb-4 block">03 // EXPERTISE</span>
                    <h2 className="text-7xl md:text-[8rem] font-display font-black tracking-tight leading-none uppercase">
                        Tech <span className="font-serif italic normal-case font-normal text-[1.1em]">stack</span>
                    </h2>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {sortedCategories.map((category, index) => {
                        const dotColors = [
                            'bg-accent', 
                            'bg-[#FFE600]'
                        ];
                        const dotColor = dotColors[index % dotColors.length];
                        
                        return (
                        <div
                            key={category}
                            className={`border border-foreground p-6 bg-background`}
                        >
                            {/* Category Header */}
                            <div className="flex items-center gap-2.5 mb-6">
                                <div className={`w-2 h-2 rounded-full ${dotColor}`} />
                                <h3 className="text-sm font-display font-bold tracking-wide uppercase text-foreground">
                                    {category}
                                </h3>
                            </div>

                            {/* Skills Grid */}
                            <div className="flex flex-wrap gap-2">
                                {groupedSkills[category].map((skill) => {
                                    const iconUrl = skill.iconFileId
                                        ? `${process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT}/storage/buckets/project-assets/files/${skill.iconFileId}/view?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID}`
                                        : null;

                                    return (
                                        <div
                                            key={skill.$id}
                                            className="flex items-center gap-2 px-3 py-2 bg-surface-alt border border-foreground hover:bg-foreground hover:text-background transition-all duration-200 group"
                                        >
                                            {iconUrl ? (
                                                <div className="relative w-4 h-4 flex-shrink-0 opacity-80 group-hover:opacity-100 transition-opacity">
                                                    <Image
                                                        src={iconUrl}
                                                        alt={skill.name}
                                                        fill
                                                        className="object-contain"
                                                    />
                                                </div>
                                            ) : (
                                                <div className="w-4 h-4 flex-shrink-0 bg-foreground/10 flex items-center justify-center text-[8px] font-bold group-hover:bg-background/20">
                                                    {skill.name.substring(0, 2).toUpperCase()}
                                                </div>
                                            )}
                                            <span className="text-xs font-medium font-mono transition-colors">
                                                {skill.name}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
