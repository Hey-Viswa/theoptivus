'use client';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import Link from 'next/link';
import { databases, COLLECTIONS, DATABASE_ID } from '@/lib/appwrite';
import { Query } from 'appwrite';

gsap.registerPlugin(ScrollTrigger);

interface Project {
    $id: string;
    title: string;
    slug: string;
    coverImage: string;
    tech: string[];
}

export default function FeaturedProjects() {
    const sectionRef = useRef<HTMLElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await databases.listDocuments(
                    DATABASE_ID,
                    COLLECTIONS.PROJECTS,
                    [
                        Query.equal('featured', true),
                        Query.orderDesc('date'),
                        Query.limit(5)
                    ]
                );
                setProjects(res.documents as unknown as Project[]);
            } catch (error) {
                console.error('Error fetching projects:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    useEffect(() => {
        if (loading || projects.length === 0) return;

        const ctx = gsap.context(() => {
            const cards = gsap.utils.toArray('.project-card');

            gsap.to(cards, {
                xPercent: -100 * (cards.length - 1),
                ease: 'none',
                scrollTrigger: {
                    trigger: triggerRef.current,
                    pin: true,
                    scrub: 1,
                    snap: 1 / (cards.length - 1),
                    end: () => '+=' + (triggerRef.current?.offsetWidth || 0),
                }
            });
        }, sectionRef);

        return () => ctx.revert();
    }, [loading, projects]);

    if (loading) return <div className="h-screen flex items-center justify-center">Loading...</div>;
    if (projects.length === 0) return null;

    return (
        <section ref={sectionRef} className="overflow-hidden bg-background">
            <div ref={triggerRef} className="h-screen flex items-center px-10 overflow-x-hidden">
                <div className="flex gap-20 pl-20">
                    <div className="flex-shrink-0 w-[40vw] flex flex-col justify-center">
                        <h2 className="text-6xl font-display font-bold uppercase mb-6">
                            Selected<br />Works
                        </h2>
                        <p className="text-gray-400 max-w-md">
                            A collection of projects that define my journey as a developer.
                        </p>
                    </div>

                    {projects.map((project) => (
                        <Link key={project.$id} href={`/projects/${project.slug}`} className="project-card flex-shrink-0 w-[60vw] md:w-[40vw] group">
                            <div className="relative aspect-video overflow-hidden rounded-lg mb-6">
                                <Image
                                    src={project.coverImage}
                                    alt={project.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                            </div>
                            <h3 className="text-4xl font-display font-bold uppercase mb-2 group-hover:text-accent transition-colors">
                                {project.title}
                            </h3>
                            <div className="flex gap-2">
                                {project.tech.map((t) => (
                                    <span key={t} className="text-xs border border-white/20 px-3 py-1 rounded-full uppercase tracking-wider">
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
