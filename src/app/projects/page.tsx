import { databases, COLLECTIONS, DATABASE_ID } from '@/lib/appwrite';
import { Query } from 'appwrite';
import Image from 'next/image';
import Link from 'next/link';

interface Project {
    $id: string;
    title: string;
    slug: string;
    coverImage: string;
    techStack?: string[];
    summary: string;
    date: string;
}

async function getProjects() {
    try {
        const res = await databases.listDocuments(
            DATABASE_ID,
            COLLECTIONS.PROJECTS,
            [
                Query.orderDesc('date')
            ]
        );
        return res.documents as unknown as Project[];
    } catch (error) {
        console.error('Error fetching projects:', error);
        return [];
    }
}

export const metadata = {
    title: 'Projects | Viswa',
    description: 'A collection of my work and side projects.',
};

export default async function ProjectsPage() {
    const projects = await getProjects();

    return (
        <div className="min-h-screen pt-32 pb-20 px-6">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-6xl md:text-8xl font-display font-bold uppercase mb-20 text-center">
                    All Works
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20">
                    {projects.map((project, index) => (
                        <Link
                            key={project.$id}
                            href={`/projects/${project.slug}`}
                            className="group block"
                        >
                            <div className="relative aspect-video overflow-hidden rounded-xl mb-6 border border-white/10">
                                <Image
                                    src={project.coverImage}
                                    alt={project.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                            </div>

                            <div className="flex justify-between items-start mb-2">
                                <h2 className="text-3xl font-display font-bold uppercase group-hover:text-accent transition-colors">
                                    {project.title}
                                </h2>
                                <span className="text-sm text-gray-500 font-mono">
                                    {new Date(project.date).getFullYear()}
                                </span>
                            </div>

                            <p className="text-gray-400 mb-4 line-clamp-2">
                                {project.summary}
                            </p>

                            <div className="flex flex-wrap gap-2">
                                {project.techStack?.map((t) => (
                                    <span key={t} className="text-xs border border-white/10 px-3 py-1 rounded-full uppercase tracking-wider text-gray-400">
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </Link>
                    ))}
                </div>

                {projects.length === 0 && (
                    <div className="text-center text-gray-500 py-20">
                        No projects found. Check back later!
                    </div>
                )}
            </div>
        </div>
    );
}
