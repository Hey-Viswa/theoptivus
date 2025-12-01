import React from 'react';
import { Metadata } from 'next';
import { getProjects } from '@/lib/projects';
import ProjectCard from '@/components/ui/ProjectCard';

export const metadata: Metadata = {
    title: 'Work | StudioFlow',
    description: 'Explore our latest projects and case studies.',
};

// Revalidate every 60 seconds (ISR)
export const revalidate = 60;

interface WorkPageProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function WorkPage({ searchParams }: WorkPageProps) {
    // Await searchParams before accessing properties
    const resolvedSearchParams = await searchParams;
    const tech = typeof resolvedSearchParams.tech === 'string' ? resolvedSearchParams.tech : undefined;

    const { projects } = await getProjects({ tech });

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black pt-24 pb-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                        Our Work
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        A collection of our recent projects, case studies, and experiments.
                    </p>
                </div>

                {/* Filter Section (Simple implementation for now) */}
                {/* We can add a client component for interactive filtering later */}

                {projects.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {projects.map((project) => (
                            <ProjectCard key={project.$id} project={project} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <p className="text-xl text-gray-500">No projects found.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
