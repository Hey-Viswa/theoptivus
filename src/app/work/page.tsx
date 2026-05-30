import React from 'react';
import { Metadata } from 'next';
import { getProjects } from '@/lib/projects';
import WorksSection from '@/components/features/projects/WorksSection';
import DitherBackground from '@/components/ui/DitherBackground';

export const metadata: Metadata = {
    title: 'Work | StudioFlow',
    description: 'Explore our latest projects and case studies.',
};

export const revalidate = 60;

interface WorkPageProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function WorkPage({ searchParams }: WorkPageProps) {
    const resolvedSearchParams = await searchParams;
    const tech = typeof resolvedSearchParams.tech === 'string' ? resolvedSearchParams.tech : undefined;
    
    // Pass a higher limit or fetch all since this is the dedicated works page
    const { projects } = await getProjects({ tech, limit: 12 });

    return (
        <div className="relative min-h-screen bg-background">
            <div className="fixed inset-0 z-0 opacity-100 pointer-events-none">
                <DitherBackground className="w-full h-full" />
            </div>
            <div className="relative z-10 pt-24">
                <WorksSection projects={projects} />
            </div>
        </div>
    );
}
