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

    // Determine grid class based on number of projects
    const getGridClass = () => {
        if (projects.length === 1) {
            return "grid grid-cols-1 max-w-2xl mx-auto";
        } else if (projects.length === 2) {
            return "grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto";
        } else if (projects.length <= 3) {
            return "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8";
        } else {
            return "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8";
        }
    };

    return (
        <div className="min-h-screen bg-black pt-24 pb-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-20">
                    <h1 className="text-5xl md:text-8xl font-display font-bold uppercase mb-6 text-white">
                        Our Work
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                        A collection of our recent projects, case studies, and experiments.
                    </p>
                </div>

                {/* Projects Grid */}
                {projects.length > 0 ? (
                    <div className={getGridClass()}>
                        {projects.map((project) => (
                            <ProjectCard key={project.$id} project={project} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-32">
                        <p className="text-2xl text-gray-500 mb-4">No projects found.</p>
                        <p className="text-gray-600">Check back soon for exciting new work!</p>
                    </div>
                )}
            </div>
        </div>
    );
}
