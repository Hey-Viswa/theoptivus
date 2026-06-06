import React from 'react';
import { Metadata } from 'next';
import DistortionImage from '@/components/ui/DistortionImage';
import KineticText from '@/components/ui/KineticText';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProjectBySlug, getAllProjectSlugs } from '@/lib/projects';
import { createAdminClient } from '@/lib/server/appwrite';
import { DATABASE_ID, COLLECTIONS } from '@/lib/appwrite';
import { Skill } from '@/types/skill';
import { getProjectImageUrl, getGalleryImageUrls } from '@/lib/utils';
import RichTextRenderer from '@/components/ui/RichTextRenderer';
import SkillsGrid from '@/components/skills/SkillsGrid';
import Carousel from '@/components/ui/Carousel';
import DitherBackground from '@/components/ui/DitherBackground';

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    const slugs = await getAllProjectSlugs();
    return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const resolvedParams = await params;
    const project = await getProjectBySlug(resolvedParams.slug);

    if (!project) {
        return {
            title: 'Project Not Found',
        };
    }

    const imageSource = project.thumbnail || project.heroFileId;
    const ogImage = imageSource ? getProjectImageUrl(imageSource) : undefined;

    return {
        title: `${project.title} | Biswaranjan`,
        description: project.shortDescription,
        openGraph: {
            images: ogImage ? [ogImage] : [],
        },
    };
}

export const revalidate = 60;

export default async function ProjectPage({ params }: PageProps) {
    const resolvedParams = await params;
    const project = await getProjectBySlug(resolvedParams.slug);

    if (!project) {
        notFound();
    }

    // Fetch linked skills if they exist
    let linkedSkills: Skill[] = [];
    if (project.skills && Array.isArray(project.skills) && project.skills.length > 0) {
        try {
            const { databases } = await createAdminClient();
            const validSkillIds = project.skills.filter(id =>
                typeof id === 'string' && id.length <= 36 && /^[a-zA-Z0-9_]+$/.test(id) && !id.startsWith('_')
            );

            if (validSkillIds.length > 0) {
                const skillPromises = validSkillIds.map(id =>
                    databases.getDocument(DATABASE_ID, COLLECTIONS.SKILLS || 'skills', id)
                );
                const results = await Promise.all(skillPromises);
                linkedSkills = results as unknown as Skill[];
            }
        } catch (e) {
            console.error('Error fetching linked skills', e);
        }
    }

    const imageSource = project.thumbnail || project.heroFileId;
    const heroImageUrl = getProjectImageUrl(imageSource);

    let gallerySource: string[] = [];
    if (project.galleryImages) {
        if (typeof project.galleryImages === 'string') {
            try {
                gallerySource = JSON.parse(project.galleryImages);
            } catch {
                gallerySource = [project.galleryImages];
            }
        } else if (Array.isArray(project.galleryImages)) {
            gallerySource = project.galleryImages;
        }
    }
    if (gallerySource.length === 0 && project.galleryFileIds) {
        if (typeof project.galleryFileIds === 'string') {
            try {
                gallerySource = JSON.parse(project.galleryFileIds);
            } catch {
                gallerySource = [project.galleryFileIds];
            }
        } else if (Array.isArray(project.galleryFileIds)) {
            gallerySource = project.galleryFileIds;
        }
    }

    const galleryUrls = getGalleryImageUrls(gallerySource);

    return (
        <div className="relative min-h-screen bg-background text-foreground flex flex-col overflow-hidden pt-32 pb-20">
            {/* Dither Background */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <DitherBackground className="w-full h-full" />
            </div>

            <div className="relative z-10 px-6 md:px-12 max-w-[1600px] mx-auto w-full">
                
                {/* Header with back link */}
                <div className="mb-12">
                    <Link
                        href="/work"
                        className="inline-flex items-center gap-2 text-foreground/70 hover:text-foreground font-mono font-bold tracking-widest text-xs uppercase transition-colors"
                    >
                        <span>← Back to Work</span>
                    </Link>
                </div>

                {/* Hero / Title Section */}
                <div className="mb-20">
                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 lg:gap-12">
                        <div className="max-w-4xl">
                            <span className="font-mono text-xs uppercase tracking-widest text-foreground/50 mb-6 block">PROJECT CASE STUDY</span>
                            <KineticText className="mb-8">
                                <h1 className="text-5xl sm:text-6xl md:text-[8rem] font-display font-black uppercase tracking-tight leading-[0.9]">
                                    {project.title.split(' ').map((word, i, arr) => (
                                        i === arr.length - 1 ? (
                                            <span key={i} className="font-serif italic normal-case font-normal highlight-yellow text-foreground px-2 sm:px-4 md:px-6 py-1 ml-1 sm:ml-2 inline-block">
                                                {word}
                                            </span>
                                        ) : (
                                            <span key={i}>{word} </span>
                                        )
                                    ))}
                                </h1>
                            </KineticText>
                            <p className="text-xl md:text-2xl text-foreground/80 font-sans leading-relaxed max-w-2xl">
                                {project.shortDescription}
                            </p>
                        </div>
                        
                        {/* Action Links */}
                        <div className="flex flex-col gap-4 min-w-[200px]">
                            {project.liveUrl && (
                                <a
                                    href={project.liveUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="editorial-btn uppercase text-sm w-full"
                                >
                                    Live Demo ↗
                                </a>
                            )}
                            {project.repoUrl && (
                                <a
                                    href={project.repoUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="editorial-btn border-2 border-foreground bg-transparent text-foreground hover:bg-foreground hover:text-background uppercase text-sm w-full text-center"
                                >
                                    GitHub Repo ↗
                                </a>
                            )}
                        </div>
                    </div>
                </div>

                {/* Main Hero Image — three.js RGB-shift on hover */}
                <div className="relative aspect-video w-full overflow-hidden border border-foreground mb-20">
                    <DistortionImage
                        src={heroImageUrl}
                        alt={project.title}
                        className="absolute inset-0 w-full h-full"
                    />
                    {project.featured && (
                        <div className="absolute top-6 right-6 bg-foreground text-background text-xs font-mono font-bold px-4 py-2 uppercase tracking-wider">
                            Featured
                        </div>
                    )}
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 border-t border-foreground pt-12">
                    {/* Sidebar / Meta info */}
                    <div className="lg:col-span-4 space-y-12 bg-background p-5 sm:p-6 md:p-8 lg:p-10 border border-foreground lg:border-none">
                        {/* Year */}
                        {project.date && (
                            <div>
                                <h3 className="text-xs font-mono font-bold text-foreground/50 uppercase tracking-widest mb-3">Year</h3>
                                <p className="text-4xl font-display font-black text-foreground">
                                    {new Date(project.date).getFullYear()}
                                </p>
                            </div>
                        )}

                        {/* Tech Stack */}
                        <div>
                            <h3 className="text-xs font-mono font-bold text-foreground/50 uppercase tracking-widest mb-4">Tech Stack</h3>
                            {project.techCategories && project.techCategories.length > 0 ? (
                                <div className="space-y-6">
                                    {project.techCategories.map((techCat, idx) => (
                                        <div key={idx}>
                                            <h4 className="text-[10px] font-mono text-foreground/70 uppercase tracking-wider mb-2">
                                                {techCat.category}
                                            </h4>
                                            <div className="flex flex-wrap gap-3">
                                                {techCat.technologies.map((tech, i) => (
                                                    <span
                                                        key={i}
                                                        className="neo-pill"
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : linkedSkills.length > 0 ? (
                                <div className="flex flex-wrap gap-3">
                                    {linkedSkills.map(skill => (
                                        <span
                                            key={skill.slug}
                                            className="neo-pill"
                                        >
                                            {skill.name}
                                        </span>
                                    ))}
                                </div>
                            ) : project.techStack && project.techStack.length > 0 ? (
                                <div className="flex flex-wrap gap-3">
                                    {project.techStack.map((tech, i) => (
                                        <span
                                            key={i}
                                            className="neo-pill"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            ) : null}
                        </div>
                    </div>

                    {/* Main Overview */}
                    <div className="lg:col-span-8 lg:border-l border-foreground lg:pl-12 bg-background p-5 sm:p-6 md:p-8 lg:p-10 border border-foreground lg:border-y-0 lg:border-r-0">
                        <h2 className="text-3xl font-display font-black uppercase mb-8 text-foreground">Overview</h2>
                        {project.content ? (
                            <div className="prose prose-lg max-w-none prose-headings:font-display prose-headings:uppercase prose-headings:font-black prose-p:text-foreground/80 prose-p:font-sans prose-p:leading-relaxed prose-strong:text-foreground prose-a:text-accent font-sans">
                                <RichTextRenderer content={project.content} />
                            </div>
                        ) : (
                            <p className="text-foreground/80 text-lg leading-relaxed font-sans">
                                No detailed content available for this project.
                            </p>
                        )}
                    </div>
                </div>

                {/* Gallery Section */}
                {galleryUrls.length > 0 && (
                    <div className="mt-20 pt-20 border-t border-foreground">
                        <h2 className="text-4xl sm:text-5xl md:text-7xl font-display font-black uppercase mb-12">
                            Project <span className="font-serif italic normal-case font-normal highlight-blue text-background px-2 sm:px-4">Gallery</span>
                        </h2>
                        <Carousel images={galleryUrls} title={project.title} />
                    </div>
                )}
            </div>
        </div>
    );
}
