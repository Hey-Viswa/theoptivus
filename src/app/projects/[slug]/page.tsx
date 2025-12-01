import { databases, COLLECTIONS, DATABASE_ID } from '@/lib/appwrite';
import { Query } from 'appwrite';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

interface Project {
    $id: string;
    title: string;
    slug: string;
    description: string;
    coverImage: string;
    tech: string[];
    demoUrl?: string;
    repoUrl?: string;
    date: string;
    screenshots?: string[];
}

async function getProject(slug: string): Promise<Project | null> {
    try {
        const res = await databases.listDocuments(
            DATABASE_ID,
            COLLECTIONS.PROJECTS,
            [Query.equal('slug', slug)]
        );
        return res.documents[0] as unknown as Project;
    } catch (error) {
        console.error('Error fetching project:', error);
        return null;
    }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const project = await getProject(slug);
    if (!project) return { title: 'Project Not Found' };
    return {
        title: `${project.title} | Viswa`,
        description: project.description.substring(0, 160),
    };
}

export async function generateStaticParams() {
    try {
        const res = await databases.listDocuments(
            DATABASE_ID,
            COLLECTIONS.PROJECTS,
            [Query.select(['slug'])]
        );
        return res.documents.map((doc) => ({
            slug: doc.slug,
        }));
    } catch (error) {
        console.error('Error generating params:', error);
        return [];
    }
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const project = await getProject(slug);

    if (!project) {
        notFound();
    }

    return (
        <div className="min-h-screen pb-20">
            {/* Hero Media */}
            <div className="relative w-full h-[70vh] md:h-[85vh]">
                <Image
                    src={project.coverImage}
                    alt={project.title}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute bottom-0 left-0 w-full p-6 md:p-20">
                    <h1 className="text-6xl md:text-9xl font-display font-bold uppercase text-white mb-4">
                        {project.title}
                    </h1>
                    <div className="flex flex-wrap gap-4">
                        {project.tech.map((t) => (
                            <span key={t} className="px-4 py-2 border border-white/30 rounded-full text-sm uppercase tracking-wider backdrop-blur-sm">
                                {t}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 mt-20 grid grid-cols-1 md:grid-cols-3 gap-20">
                {/* Sidebar Info */}
                <div className="md:col-span-1 space-y-10">
                    <div>
                        <h3 className="text-sm uppercase tracking-widest text-gray-500 mb-2">Date</h3>
                        <p className="text-xl">{new Date(project.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
                    </div>

                    <div className="flex flex-col gap-4">
                        {project.demoUrl && (
                            <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-white text-black rounded-full font-medium text-center hover:bg-gray-200 transition-colors">
                                Live Demo ↗
                            </a>
                        )}
                        {project.repoUrl && (
                            <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="px-6 py-3 border border-white/20 rounded-full font-medium text-center hover:bg-white/10 transition-colors">
                                GitHub Repo ↗
                            </a>
                        )}
                    </div>
                </div>

                {/* Main Content */}
                <div className="md:col-span-2 space-y-10">
                    <div className="prose prose-invert prose-lg max-w-none">
                        {/* Simple markdown rendering or just text for now. Ideally use a markdown parser. */}
                        <div className="whitespace-pre-wrap">{project.description}</div>
                    </div>

                    {/* Screenshots Gallery */}
                    {project.screenshots && project.screenshots.length > 0 && (
                        <div className="space-y-10 mt-20">
                            <h3 className="text-2xl font-display uppercase">Gallery</h3>
                            {project.screenshots.map((shot, index) => (
                                <div key={index} className="relative w-full aspect-video rounded-xl overflow-hidden border border-white/10">
                                    <Image
                                        src={shot}
                                        alt={`${project.title} screenshot ${index + 1}`}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Next Project Navigation (Optional - could be added later) */}
            <div className="max-w-7xl mx-auto px-6 mt-40 border-t border-white/10 pt-20">
                <Link href="/" className="text-xl text-gray-400 hover:text-white transition-colors">
                    ← Back to Home
                </Link>
            </div>
        </div>
    );
}
