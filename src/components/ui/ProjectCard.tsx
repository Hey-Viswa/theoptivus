import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Project } from '@/types/project';
import { getProjectImageUrl } from '@/lib/utils';

interface ProjectCardProps {
    project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
    // Try thumbnail first, then heroFileId
    const imageSource = project.thumbnail || project.heroFileId;
    const imageUrl = getProjectImageUrl(imageSource);

    return (
        <article className="group relative flex flex-col h-full">
            <Link href={`/work/${project.slug}`} className="flex flex-col h-full">
                {/* Image Container */}
                <div className="relative aspect-[16/10] overflow-hidden rounded-2xl mb-6 bg-gradient-to-br from-gray-900 to-black border border-white/10">
                    <Image
                        src={imageUrl}
                        alt={project.title}
                        fill
                        className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-500" />

                    {/* Featured Badge */}
                    {project.featured && (
                        <div className="absolute top-4 right-4 bg-yellow-400 text-black text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
                            Featured
                        </div>
                    )}

                    {/* View Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <span className="px-8 py-3 bg-white text-black font-medium rounded-full text-sm uppercase tracking-widest shadow-xl transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                            View Case Study →
                        </span>
                    </div>
                </div>

                {/* Content */}
                <div className="flex flex-col flex-grow space-y-4">
                    <div className="flex justify-between items-start gap-4">
                        <h3 className="text-2xl md:text-3xl font-display font-bold uppercase leading-tight group-hover:text-white transition-colors">
                            {project.title}
                        </h3>
                        {project.date && (
                            <span className="text-sm text-gray-500 font-mono flex-shrink-0 mt-1">
                                {new Date(project.date).getFullYear()}
                            </span>
                        )}
                    </div>

                    <p className="text-gray-400 leading-relaxed line-clamp-3 flex-grow">
                        {project.shortDescription}
                    </p>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 pt-2">
                        {project.techStack?.slice(0, 4).map((tech) => (
                            <span
                                key={tech}
                                className="text-xs border border-white/10 px-3 py-1.5 rounded-full uppercase tracking-wider text-gray-400 hover:border-white/30 hover:text-gray-300 transition-colors"
                            >
                                {tech}
                            </span>
                        ))}
                        {project.techStack && project.techStack.length > 4 && (
                            <span className="text-xs text-gray-500 px-2 py-1.5">
                                +{project.techStack.length - 4}
                            </span>
                        )}
                    </div>

                    {/* Links */}
                    {project.liveUrl && (
                        <div className="pt-4 border-t border-white/5">
                            <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors"
                            >
                                <span>Live Demo</span>
                                <span>↗</span>
                            </a>
                        </div>
                    )}
                </div>
            </Link>
        </article>
    );
};

export default ProjectCard;
