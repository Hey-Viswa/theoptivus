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

    if (loading) return <div className="py-20 text-center text-gray-500 animate-pulse">Loading arsenal...</div>;
    if (skills.length === 0) return null;

    // Group skills by category with specific order
    const categoryOrder = ['Frontend', 'Backend', 'Database', 'DevOps', 'Mobile', 'Tools'];
    const groupedSkills = skills.reduce((acc, skill) => {
        const cat = skill.category || 'Other';
        if (!acc[cat]) {
            acc[cat] = [];
        }
        acc[cat].push(skill);
        return acc;
    }, {} as Record<string, Skill[]>);

    // Sort categories based on defined order
    const sortedCategories = Object.keys(groupedSkills).sort((a, b) => {
        const indexA = categoryOrder.indexOf(a);
        const indexB = categoryOrder.indexOf(b);
        return (indexA === -1 ? 999 : indexA) - (indexB === -1 ? 999 : indexB);
    });

    return (
        <section id="skills" className="py-32 relative">
            <div className="max-w-7xl mx-auto px-6">
                <h2 className="text-4xl md:text-8xl font-display font-bold uppercase mb-24 text-center">
                    Technical Arsenal
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
                    {sortedCategories.map((category, idx) => (
                        <div
                            key={category}
                            className="group relative bg-neutral-900/40 backdrop-blur-sm border border-white/5 rounded-3xl p-8 hover:border-white/10 transition-all duration-500 hover:-translate-y-1"
                            style={{ transitionDelay: `${idx * 100}ms` }}
                        >
                            {/* Category Header */}
                            <div className="flex items-center gap-4 mb-8">
                                <span className="w-2 h-8 bg-accent rounded-full"></span>
                                <h3 className="text-2xl font-bold uppercase tracking-widest text-white">
                                    {category}
                                </h3>
                            </div>

                            {/* Skills Grid */}
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                {groupedSkills[category].map((skill) => {
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
                                            case 'Expert': return 'text-purple-400 group-hover/skill:text-purple-300';
                                            case 'Advanced': return 'text-blue-400 group-hover/skill:text-blue-300';
                                            case 'Intermediate': return 'text-emerald-400 group-hover/skill:text-emerald-300';
                                            default: return 'text-gray-500 group-hover/skill:text-gray-400';
                                        }
                                    };

                                    return (
                                        <div
                                            key={skill.$id}
                                            className={`flex flex-col items-center justify-center gap-3 p-4 rounded-xl border transition-all duration-300 group/skill ${getLevelColor(skill.level)}`}
                                        >
                                            {iconUrl ? (
                                                <div className="relative w-10 h-10 grayscale group-hover/skill:grayscale-0 transition-all duration-300 transform group-hover/skill:scale-110">
                                                    <Image
                                                        src={iconUrl}
                                                        alt={skill.name}
                                                        fill
                                                        className="object-contain"
                                                    />
                                                </div>
                                            ) : (
                                                <div className="w-10 h-10 flex items-center justify-center bg-white/10 rounded-lg text-xs font-bold text-gray-400 group-hover/skill:text-white transition-colors">
                                                    {skill.name.substring(0, 2).toUpperCase()}
                                                </div>
                                            )}
                                            <span className="text-sm font-medium text-gray-400 group-hover/skill:text-white text-center transition-colors">
                                                {skill.name}
                                            </span>
                                            <span className={`text-[10px] uppercase tracking-wider font-bold ${getTextColor(skill.level)}`}>
                                                {skill.level}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
