import Image from 'next/image';
import Link from 'next/link';
import { Project } from '@/types/project';

interface WorksSectionProps {
    projects: Project[];
}

export default function WorksSection({ projects }: WorksSectionProps) {
    // Only show first 4 projects on home
    const displayProjects = projects.slice(0, 4);

    return (
        <section id="works" className="min-h-screen py-20 px-6 bg-background">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-4xl md:text-8xl font-display font-bold uppercase mb-20 text-center">
                    Selected Work
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20">
                    {displayProjects.map((project) => {
                        const imageUrl = project.heroFileId
                            ? `${process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT}/storage/buckets/project-assets/files/${project.heroFileId}/view?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID}`
                            : '/placeholder-project.jpg';

                        return (
                            <Link
                                key={project.$id}
                                href={`/work/${project.slug}`}
                                className="group block"
                            >
                                <div className="relative aspect-video overflow-hidden rounded-xl mb-6 border border-white/10">
                                    <Image
                                        src={imageUrl}
                                        alt={project.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                                </div>

                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-3xl font-display font-bold uppercase group-hover:text-accent transition-colors">
                                        {project.title}
                                    </h3>
                                    <span className="text-sm text-gray-500 font-mono">
                                        {project.date ? new Date(project.date).getFullYear() : ''}
                                    </span>
                                </div>

                                <p className="text-gray-400 mb-4 line-clamp-2">
                                    {project.shortDescription}
                                </p>

                                <div className="flex flex-wrap gap-2">
                                    {project.techStack?.map((t) => (
                                        <span key={t} className="text-xs border border-white/10 px-3 py-1 rounded-full uppercase tracking-wider text-gray-400">
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </Link>
                        );
                    })}
                </div>

                {projects.length === 0 && (
                    <div className="text-center text-gray-500 py-20">
                        No projects found. Check back later!
                    </div>
                )}

                <div className="mt-20 text-center">
                    <Link
                        href="/work"
                        className="inline-block px-8 py-4 border border-white/20 rounded-full text-lg font-display uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300"
                    >
                        See All Work
                    </Link>
                </div>
            </div>
        </section>
    );
}
