import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
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

// Revalidate every 60 seconds (ISR)
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
            // Filter out invalid skill IDs (must be valid UIDs)
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

    // Get hero image URL
    const imageSource = project.thumbnail || project.heroFileId;
    const heroImageUrl = getProjectImageUrl(imageSource);

    // Get gallery images - handle both string and array formats
    let gallerySource: string[] = [];

    // Check if galleryImages exists and parse it
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

    // Fallback to galleryFileIds if galleryImages is empty
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
        <div className="min-h-screen bg-black">
            {/* Header with back link */}
            <div className="max-w-7xl mx-auto px-6 pt-32 pb-8">
                <Link
                    href="/work"
                    className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
                >
                    <span className="transform group-hover:-translate-x-1 transition-transform">←</span>
                    <span className="text-sm uppercase tracking-wider">Back to Work</span>
                </Link>
            </div>

            {/* Hero Image */}
            <div className="max-w-7xl mx-auto px-6 mb-16">
                <div className="relative aspect-video overflow-hidden rounded-2xl border border-white/10 group">
                    <Image
                        src={heroImageUrl}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                    {/* Featured Badge */}
                    {project.featured && (
                        <div className="absolute top-6 right-6 bg-yellow-400 text-black text-xs font-bold px-4 py-2 rounded-full uppercase tracking-wider">
                            Featured
                        </div>
                    )}
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-6 pb-20">
                {/* Title and Meta */}
                <div className="mb-16">
                    <h1 className="text-5xl md:text-7xl font-display font-bold uppercase mb-6">
                        {project.title}
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-400 mb-8 max-w-3xl">
                        {project.shortDescription}
                    </p>

                    {/* Action Links */}
                    <div className="flex flex-wrap gap-4">
                        {project.liveUrl && (
                            <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-8 py-4 bg-white text-black font-medium rounded-full hover:bg-gray-200 transition-all duration-300 flex items-center gap-2"
                            >
                                <span>View Live Demo</span>
                            </a>
                        )}
                        {project.repoUrl && (
                            <a
                                href={project.repoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-8 py-4 border-2 border-white/20 rounded-full hover:bg-white/10 transition-all duration-300"
                            >
                                View Code
                            </a>
                        )}
                    </div>
                </div>

                {/* Main Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-16">
                    {/* Sidebar */}
                    <div className="lg:col-span-1 space-y-12">
                        {/* Year */}
                        {project.date && (
                            <div className="border border-white/10 rounded-2xl p-6 bg-black/40 backdrop-blur-sm">
                                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Year</h3>
                                <p className="text-4xl font-display font-bold text-white">
                                    {new Date(project.date).getFullYear()}
                                </p>
                            </div>
                        )}

                        {/* Tech Stack */}
                        <div className="border border-white/10 rounded-2xl p-6 bg-black/40 backdrop-blur-sm">
                            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6">Tech Stack</h3>
                            {project.techCategories && project.techCategories.length > 0 ? (
                                <div className="space-y-6">
                                    {project.techCategories.map((techCat, idx) => (
                                        <div key={idx}>
                                            <h4 className="text-xs text-gray-600 font-semibold uppercase tracking-wider mb-3">
                                                {techCat.category}
                                            </h4>
                                            <div className="flex flex-wrap gap-2">
                                                {techCat.technologies.map((tech, i) => (
                                                    <span
                                                        key={i}
                                                        className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs font-medium hover:border-white/30 hover:bg-white/10 hover:text-white transition-all duration-300"
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : linkedSkills.length > 0 ? (
                                <div className="flex flex-wrap gap-2">
                                    {linkedSkills.map(skill => (
                                        <span
                                            key={skill.$id}
                                            className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs font-medium hover:border-white/30 hover:bg-white/10 hover:text-white transition-all duration-300"
                                        >
                                            {skill.name}
                                        </span>
                                    ))}
                                </div>
                            ) : project.techStack && project.techStack.length > 0 ? (
                                <div className="flex flex-wrap gap-2">
                                    {project.techStack.map((tech, i) => (
                                        <span
                                            key={i}
                                            className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs font-medium hover:border-white/30 hover:bg-white/10 hover:text-white transition-all duration-300"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            ) : null}
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-3 space-y-12">
                        {/* Overview */}
                        <div>
                            <h2 className="text-2xl font-display font-bold uppercase mb-6 text-white">Overview</h2>
                            {project.content ? (
                                <div className="prose prose-invert prose-lg max-w-none prose-headings:font-display prose-headings:uppercase prose-headings:tracking-wide prose-p:text-gray-300 prose-p:leading-relaxed prose-ul:text-gray-300 prose-li:marker:text-gray-500 font-opensans">
                                    <RichTextRenderer content={project.content} />
                                </div>
                            ) : (
                                <p className="text-gray-300 text-lg leading-relaxed font-light">
                                    No detailed content available for this project.
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Gallery Section */}
                {galleryUrls.length > 0 && (
                    <div className="mt-24 pt-12 border-t border-white/10">
                        <h2 className="text-3xl md:text-5xl font-display font-bold uppercase mb-12">
                            Project Gallery
                        </h2>
                        <Carousel images={galleryUrls} title={project.title} />
                    </div>
                )}

                {/* Technologies Used Grid */}
                {linkedSkills.length > 0 && (
                    <div className="mt-24 pt-12 border-t border-white/10">
                        <h2 className="text-3xl md:text-5xl font-display font-bold uppercase mb-12">
                            Technologies Used
                        </h2>
                        <SkillsGrid skills={linkedSkills} />
                    </div>
                )}
            </div>

            {/* Navigation Footer */}
            <div className="border-t border-white/10 py-12">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <Link
                        href="/work"
                        className="inline-flex items-center gap-3 px-10 py-4 border-2 border-white/20 rounded-full text-base font-display uppercase tracking-widest hover:bg-white hover:text-black hover:border-white transition-all duration-300 group"
                    >
                        <span className="transform group-hover:-translate-x-1 transition-transform">←</span>
                        <span>Back to All Work</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}
