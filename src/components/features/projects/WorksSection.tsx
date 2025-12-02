import Image from 'next/image';
import Link from 'next/link';
import { Project } from '@/types/project';
import { getProjectImageUrl } from '@/lib/utils';

interface WorksSectionProps {
    projects: Project[];
}

export default function WorksSection({ projects }: WorksSectionProps) {
    // Only show first 4 projects on home
    const displayProjects = projects.slice(0, 4);

    // Determine grid class based on number of projects
    const getGridClass = () => {
        if (displayProjects.length === 1) {
            return "grid grid-cols-1 max-w-3xl mx-auto";
        } else if (displayProjects.length === 2) {
            return "grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12";
        } else {
            return "grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12";
        }
    };

    return (
        <section id="works" className="min-h-screen py-20 px-6 bg-background border-b border-white/5">
            <div className="max-w-7xl mx-auto">
                <div className="mb-20">
                    <h2 className="text-4xl md:text-8xl font-display font-bold uppercase mb-6 text-center">
                        Selected Work
                    </h2>
                    <p className="text-center text-gray-400 text-lg max-w-2xl mx-auto">
                        Showcasing recent projects and creative solutions
                    </p>
                </div>

                {displayProjects.length > 0 ? (
                    <div className={getGridClass()}>
                        {displayProjects.map((project) => {
                            // Try thumbnail first, then heroFileId
                            const imageSource = project.thumbnail || project.heroFileId;
                            const imageUrl = getProjectImageUrl(imageSource);

                            return (
                                <article
                                    key={project.$id}
                                    className="group block relative"
                                >
                                    <Link href={`/work/${project.slug}`}>
                                        {/* Image Container - Larger and more prominent */}
                                        <div className="relative aspect-[16/9] overflow-hidden rounded-3xl mb-8 bg-gradient-to-br from-gray-900 to-black border border-white/10 shadow-2xl">
                                            <Image
                                                src={imageUrl}
                                                alt={project.title}
                                                fill
                                                className="object-cover transition-all duration-700 group-hover:scale-[1.08] group-hover:brightness-110"
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                                            />
                                            {/* Enhanced gradient overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-70 group-hover:opacity-40 transition-opacity duration-500" />

                                            {/* Featured Badge */}
                                            {project.featured && (
                                                <div className="absolute top-6 right-6 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black text-xs font-bold px-4 py-2 rounded-full uppercase tracking-wider shadow-lg">
                                                    Featured
                                                </div>
                                            )}

                                            {/* View Overlay */}
                                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10">
                                                <span className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/30 text-white font-semibold rounded-full text-sm uppercase tracking-widest shadow-2xl transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 hover:bg-white hover:text-black hover:scale-105">
                                                    View Case Study
                                                </span>
                                            </div>
                                        </div>

                                        {/* Content - Enhanced typography and spacing */}
                                        <div className="space-y-5">
                                            <div className="flex justify-between items-start gap-4">
                                                <h3 className="text-3xl md:text-4xl font-display font-bold uppercase leading-tight group-hover:text-white transition-colors text-gray-100">
                                                    {project.title}
                                                </h3>
                                                {project.date && (
                                                    <span className="text-sm text-gray-400 font-mono flex-shrink-0 mt-2 px-3 py-1 bg-white/5 rounded-full border border-white/10">
                                                        {new Date(project.date).getFullYear()}
                                                    </span>
                                                )}
                                            </div>

                                            <p className="text-gray-300 leading-relaxed line-clamp-2 text-lg">
                                                {project.shortDescription}
                                            </p>

                                            <div className="flex flex-wrap gap-2 pt-4">
                                                {project.techStack?.slice(0, 3).map((tech) => (
                                                    <span
                                                        key={tech}
                                                        className="text-xs font-medium border border-white/10 bg-white/5 px-3 py-1.5 rounded-lg uppercase tracking-wide text-gray-400 group-hover:border-white/30 group-hover:text-white group-hover:bg-white/10 transition-all duration-300"
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                                {project.techStack && project.techStack.length > 3 && (
                                                    <span className="text-xs font-semibold text-gray-500 px-3 py-1.5 flex items-center">
                                                        +{project.techStack.length - 3} more
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </Link>
                                </article>
                            );
                        })}
                    </div>
                ) : (
                    <div className="text-center text-gray-500 py-20">
                        <p className="text-xl mb-4">No projects found.</p>
                        <p className="text-sm">Check back later for exciting new work!</p>
                    </div>
                )}

                {displayProjects.length > 0 && projects.length > 4 && (
                    <div className="mt-24 text-center">
                        <Link
                            href="/work"
                            className="inline-flex items-center gap-3 px-10 py-4 border-2 border-white/20 rounded-full text-base font-display uppercase tracking-widest hover:bg-white hover:text-black hover:border-white transition-all duration-300 group"
                        >
                            <span>View All Projects</span>
                            <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                        </Link>
                    </div>
                )}
            </div>
        </section>
    );
}
