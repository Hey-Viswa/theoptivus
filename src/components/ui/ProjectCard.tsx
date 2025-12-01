import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Project } from '@/types/project';
import TechPills from './TechPills';

interface ProjectCardProps {
    project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
    // Fallback image if heroFileId is missing (though it should ideally be there)
    // We'll assume we have a way to get the image URL. For now, we'll use a placeholder or a helper function.
    // Since we don't have the helper yet, I'll assume a prop or just use a placeholder logic.
    // Ideally, we should pass the full image URL or have a helper `getFilePreview(fileId)`.

    // For this implementation, I'll assume we pass the image URL or use a placeholder.
    // But wait, the project object has `heroFileId`. I need a way to construct the URL.
    // I should probably create a helper in `src/lib/utils.ts` or similar, but for now I'll inline a simple construction 
    // or just use a placeholder if not present.

    const imageUrl = project.heroFileId
        ? `${process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT}/storage/buckets/project-assets/files/${project.heroFileId}/view?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID}`
        : '/placeholder-project.jpg'; // Ensure this exists or handle it

    return (
        <div className="group flex flex-col bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300">
            <div className="relative h-48 w-full overflow-hidden">
                <Image
                    src={imageUrl}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                {project.featured && (
                    <div className="absolute top-2 right-2 bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded">
                        Featured
                    </div>
                )}
            </div>

            <div className="flex flex-col flex-grow p-5">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    <Link href={`/work/${project.slug}`}>
                        {project.title}
                    </Link>
                </h3>

                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3 flex-grow">
                    {project.shortDescription}
                </p>

                <div className="mt-auto">
                    <TechPills techStack={project.techStack || []} />

                    <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center">
                        <Link
                            href={`/work/${project.slug}`}
                            className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                        >
                            View Case Study &rarr;
                        </Link>
                        {project.liveUrl && (
                            <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs text-gray-500 hover:text-gray-900 dark:hover:text-gray-300"
                            >
                                Live Demo
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;
