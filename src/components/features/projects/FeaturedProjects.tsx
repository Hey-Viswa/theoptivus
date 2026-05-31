'use client';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import Link from 'next/link';
import { getProjects } from '@/lib/projects';

gsap.registerPlugin(ScrollTrigger);

import { Project } from '@/types/project';

// Map tech names to Simple Icons slugs (https://simpleicons.org)
const TECH_ICON_MAP: Record<string, string> = {
    'React': 'react',
    'Node.js': 'nodedotjs',
    'Express': 'express',
    'MongoDB': 'mongodb',
    'REST APIs': 'fastapi',
    'WebSockets': 'socketdotio',
    'Redis': 'redis',
    'Razorpay': 'razorpay',
    'AWS S3': 'amazonwebservices',
    'Next.js': 'nextdotjs',
    'Next.js 15': 'nextdotjs',
    'TypeScript': 'typescript',
    'Solidity': 'solidity',
    'Hardhat': 'ethereum',
    'Polygon': 'polygon',
    'wagmi': 'ethereum',
    'viem': 'ethereum',
    'Clerk': 'clerk',
    'MongoDB Atlas': 'mongodb',
    'Tailwind CSS': 'tailwindcss',
    'shadcn/ui': 'shadcnui',
    'Zustand': 'react',
    'ERC-721': 'ethereum',
    'Smart Contracts': 'ethereum',
    'MetaMask': 'ethereum',
    'Socket.io': 'socketdotio',
    'OpenAI API': 'openai',
    'JWT': 'jsonwebtokens',
};

function getTechIconUrl(techName: string): string | null {
    if (techName === 'OpenAI API' || techName === 'OpenAI') {
        return 'https://api.iconify.design/simple-icons:openai.svg?color=white';
    }
    if (techName === 'AWS S3' || techName === 'AWS') {
        return 'https://api.iconify.design/simple-icons:amazonaws.svg?color=white';
    }
    const slug = TECH_ICON_MAP[techName];
    if (!slug) return null;
    return `https://api.iconify.design/simple-icons:${slug}.svg?color=white`;
}

export default function FeaturedProjects() {
    const sectionRef = useRef<HTMLElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await getProjects({ featured: true, limit: 5 });
                setProjects(res.projects);
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
            const container = containerRef.current;
            if (!container) return;

            const getScrollAmount = () => container.scrollWidth - window.innerWidth;

            const tween = gsap.to(container, {
                x: () => -getScrollAmount(),
                ease: 'none',
            });

            ScrollTrigger.create({
                trigger: triggerRef.current,
                pin: true,
                animation: tween,
                scrub: 1,
                end: () => `+=${getScrollAmount()}`,
                invalidateOnRefresh: true,
            });
        }, sectionRef);

        return () => ctx.revert();
    }, [loading, projects]);

    if (loading) return <div className="h-screen flex items-center justify-center bg-background text-foreground/50 font-mono text-sm">Loading projects...</div>;
    if (projects.length === 0) return null;

    return (
        <section ref={sectionRef} id="works" className="overflow-hidden bg-background">
            <div ref={triggerRef} className="h-screen flex items-center overflow-x-hidden">
                <div ref={containerRef} className="flex gap-0 will-change-transform">
                    {/* Intro panel */}
                    <div className="flex-shrink-0 w-screen h-screen flex items-center bg-accent">
                        <div className="px-10 md:px-20 max-w-3xl">
                            <span className="font-mono text-xs uppercase tracking-widest text-background/70 mb-6 block">02 // PORTFOLIO</span>
                            <h2 className="text-6xl md:text-[7rem] font-display font-black uppercase tracking-tight leading-[0.9] text-background mb-8">
                                Selected<br /><span className="font-serif italic normal-case font-normal text-[1.1em]">work</span>
                            </h2>
                            <p className="text-xl md:text-2xl text-background/80 font-sans leading-relaxed max-w-lg">
                                A curated selection of projects showcasing <span className="highlight-yellow italic font-serif font-normal text-foreground">full-stack thinking</span> and engineering precision.
                            </p>
                        </div>
                    </div>

                    {/* Project cards */}
                    {projects.map((project, index) => (
                        <Link
                            key={project.$id}
                            href={`/work/${project.slug}`}
                            className="flex-shrink-0 w-screen h-screen flex items-end group relative overflow-hidden bg-[#0a0a0a]"
                        >
                            {/* Full-bleed background image — dimmed */}
                            <div className="absolute inset-0">
                                <Image
                                    src={project.thumbnail || '/images/gears.png'}
                                    alt={project.title}
                                    fill
                                    className="object-cover opacity-15 group-hover:opacity-25 scale-105 group-hover:scale-110 transition-all duration-1000"
                                />
                            </div>

                            {/* Heavy gradient from bottom for text readability */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

                            {/* Content — bottom-aligned for editorial feel */}
                            <div className="relative z-10 px-10 md:px-20 pb-16 md:pb-24 w-full">
                                <span className="font-mono text-xs uppercase tracking-widest text-white/30 mb-6 block">
                                    {String(index + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
                                </span>

                                <h3 className="text-7xl md:text-[8rem] font-display font-black uppercase text-white leading-[0.9] mb-6 group-hover:translate-x-4 transition-transform duration-500">
                                    {project.title.split(' ').map((word, i, arr) => (
                                        i === arr.length - 1 ? (
                                            <span key={i} className="font-serif italic normal-case font-normal highlight-yellow text-foreground px-4 md:px-6 py-1 ml-2 inline-block">
                                                {word}
                                            </span>
                                        ) : (
                                            <span key={i}>{word} </span>
                                        )
                                    ))}
                                </h3>

                                <p className="text-xl md:text-3xl text-white/80 max-w-4xl mb-10 font-serif italic normal-case font-normal leading-relaxed">
                                    {project.shortDescription}
                                </p>

                                {/* Tech icons */}
                                <div className="flex items-center gap-5">
                                    {project.techStack?.slice(0, 6).map((t) => {
                                        const iconUrl = getTechIconUrl(t);
                                        return (
                                            <div key={t} className="flex items-center gap-2 group/tech">
                                                {iconUrl ? (
                                                    // eslint-disable-next-line @next/next/no-img-element
                                                    <img
                                                        src={iconUrl}
                                                        alt={t}
                                                        width={20}
                                                        height={20}
                                                        className="opacity-50 group-hover:opacity-80 transition-opacity"
                                                    />
                                                ) : (
                                                    <span className="w-5 h-5 border border-white/20 flex items-center justify-center text-[8px] font-mono text-white/40 uppercase">
                                                        {t.substring(0, 2)}
                                                    </span>
                                                )}
                                                <span className="text-xs font-mono text-white/40 uppercase tracking-wider hidden md:inline">
                                                    {t}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* View prompt — top right */}
                            <div className="absolute top-10 right-10 md:right-20 z-10">
                                <span className="font-mono text-xs uppercase tracking-widest text-white/20 group-hover:text-white/60 transition-colors duration-500">
                                    View Project →
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
