'use client';
import { useEffect, useState } from 'react';
import { databases, COLLECTIONS, DATABASE_ID } from '@/lib/appwrite';
import Image from 'next/image';

interface Skill {
    $id: string;
    name: string;
    category: string;
    icon?: string;
}

export default function Skills() {
    const [skills, setSkills] = useState<Skill[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSkills = async () => {
            try {
                const res = await databases.listDocuments(
                    DATABASE_ID,
                    COLLECTIONS.SKILLS
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

    if (loading) return <div className="py-10 text-center text-gray-500">Loading skills...</div>;
    if (skills.length === 0) return null;

    // Group skills by category
    const groupedSkills = skills.reduce((acc, skill) => {
        if (!acc[skill.category]) {
            acc[skill.category] = [];
        }
        acc[skill.category].push(skill);
        return acc;
    }, {} as Record<string, Skill[]>);

    return (
        <section className="py-20">
            <h2 className="text-4xl font-display font-bold uppercase mb-10">Technical Arsenal</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {Object.entries(groupedSkills).map(([category, categorySkills]) => (
                    <div key={category} className="space-y-6">
                        <h3 className="text-xl font-bold uppercase tracking-wider text-accent border-b border-white/10 pb-2">
                            {category}
                        </h3>
                        <div className="flex flex-wrap gap-4">
                            {categorySkills.map((skill) => (
                                <div
                                    key={skill.$id}
                                    className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors"
                                >
                                    {skill.icon && (
                                        <div className="relative w-6 h-6">
                                            <Image
                                                src={skill.icon}
                                                alt={skill.name}
                                                fill
                                                className="object-contain"
                                            />
                                        </div>
                                    )}
                                    <span className="font-medium">{skill.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
