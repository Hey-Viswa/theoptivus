import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProjectBySlug, getAllProjectSlugs } from '@/lib/projects';
import { adminDatabases } from '@/lib/server/appwrite';
import { DATABASE_ID, COLLECTIONS } from '@/lib/appwrite';
import { Skill } from '@/types/skill';
import TechPills from '@/components/ui/TechPills';
import Gallery from '@/components/ui/Gallery';
import RichTextRenderer from '@/components/ui/RichTextRenderer';
import SkillsGrid from '@/components/skills/SkillsGrid';

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

    const ogImage = project.heroFileId
        ? `${process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT}/storage/buckets/project-assets/files/${project.heroFileId}/view?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID}`
        : undefined;

    return {
        title: `${project.title} | StudioFlow`,
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
    if (project.skills && project.skills.length > 0) {
        try {
            // Fetch skills by ID. Since listDocuments doesn't support "whereIn" for IDs easily,
            // and we expect a small number of skills per project, we fetch them in parallel.
            const skillPromises = project.skills.map(id =>
                adminDatabases.getDocument(DATABASE_ID, COLLECTIONS.SKILLS || 'skills', id)
            );
            const results = await Promise.all(skillPromises);
            linkedSkills = results as unknown as Skill[];
        } catch (e) {
            console.error('Error fetching linked skills', e);
        }
    }

    const heroImageUrl = project.heroFileId
        ? `${process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT}/storage/buckets/project-assets/files/${project.heroFileId}/view?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID}`
        : null;

    return (
        <article className="min-h-screen bg-white dark:bg-black pt-24 pb-16">
            {/* Hero Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                        {project.title}
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300">
                        {project.shortDescription}
                    </p>
                    <div className="mt-8 flex justify-center gap-4">
                        {project.repoUrl && (
                            <a
                                href={project.repoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-6 py-2 rounded-full border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                            >
                                View Code
                            </a>
                        )}
                        {project.liveUrl && (
                            <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-6 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                            >
                                Live Demo
                            </a>
                        )}
                    </div>
                </div>

                {heroImageUrl && (
                    <div className="relative w-full h-[50vh] md:h-[70vh] rounded-2xl overflow-hidden shadow-2xl">
                        <Image
                            src={heroImageUrl}
                            alt={project.title}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                )}
            </div>

            {/* Content Section */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    <div className="md:col-span-1 space-y-8">
                        <div>
                            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">Tech Stack</h3>
                            {linkedSkills.length > 0 ? (
                                <div className="flex flex-wrap gap-2">
                                    {linkedSkills.map(skill => (
                                        <span key={skill.$id} className="text-xs border border-gray-200 dark:border-gray-700 px-2 py-1 rounded-md text-gray-700 dark:text-gray-300">
                                            {skill.name}
                                        </span>
                                    ))}
                                </div>
                            ) : (
                                <TechPills techStack={project.techStack || []} className="flex-col items-start" />
                            )}
                        </div>
                        {project.date && (
                            <div>
                                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">Date</h3>
                                <p className="text-gray-900 dark:text-white">
                                    {new Date(project.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="md:col-span-3">
                        {project.content ? (
                            <RichTextRenderer content={project.content} />
                        ) : (
                            <p className="text-gray-500 italic">No detailed content available for this project.</p>
                        )}

                        {linkedSkills.length > 0 && (
                            <div className="mt-12 pt-8 border-t border-gray-100 dark:border-gray-800">
                                <h3 className="text-xl font-bold mb-6">Technologies Used</h3>
                                <SkillsGrid skills={linkedSkills} />
                            </div>
                        )}
                    </div>
                </div>

                {/* Gallery Section */}
                {project.galleryFileIds && project.galleryFileIds.length > 0 && (
                    <div className="mt-16 border-t border-gray-200 dark:border-gray-800 pt-16">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Project Gallery</h2>
                        <Gallery fileIds={project.galleryFileIds} />
                    </div>
                )}
            </div>

            {/* Navigation Footer */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 pt-12 border-t border-gray-200 dark:border-gray-800 text-center">
                <Link
                    href="/work"
                    className="inline-flex items-center text-lg font-medium text-blue-600 dark:text-blue-400 hover:underline"
                >
                    &larr; Back to Work
                </Link>
            </div>
        </article>
    );
}
