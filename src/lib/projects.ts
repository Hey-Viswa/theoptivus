import { Query } from 'node-appwrite';
import { createAdminClient } from '@/lib/server/appwrite';
import { COLLECTIONS, DATABASE_ID } from '@/lib/appwrite';
import { Project } from '@/types/project';

export async function getProjects(filter?: {
    featured?: boolean;
    tech?: string;
    limit?: number;
    offset?: number;
}) {
    const queries = [
        Query.equal('published', true),
        Query.orderDesc('date'),
    ];

    if (filter?.featured) {
        queries.push(Query.equal('featured', true));
    }

    if (filter?.tech) {
        queries.push(Query.search('techStack', filter.tech));
    }

    if (filter?.limit) {
        queries.push(Query.limit(filter.limit));
    }

    if (filter?.offset) {
        queries.push(Query.offset(filter.offset));
    }

    try {
        const { databases } = await createAdminClient();
        const response = await databases.listDocuments(
            DATABASE_ID,
            COLLECTIONS.PROJECTS,
            queries
        );
        return {
            projects: response.documents.map((doc) => {
                const project = doc as unknown as Project;
                if (project.slug === 'studioflow') {
                    return {
                        ...project,
                        thumbnail: '/projects/studioflow/thumbnail.png'
                    };
                }
                return project;
            }),
            total: response.total
        };
    } catch (error) {
        console.error('Error fetching projects:', error);
        return { projects: [], total: 0 };
    }
}

export async function getProjectBySlug(slug: string) {
    try {
        const { databases } = await createAdminClient();
        const response = await databases.listDocuments(
            DATABASE_ID,
            COLLECTIONS.PROJECTS,
            [Query.equal('slug', slug)]
        );

        if (response.documents.length === 0) {
            return null;
        }

        const project = response.documents[0] as unknown as Project;

        // Hardcode local images for StudioFlow project
        if (slug === 'studioflow') {
            return {
                ...project,
                thumbnail: '/projects/studioflow/thumbnail.png',
                galleryImages: [
                    '/projects/studioflow/dashboard.png',
                    '/projects/studioflow/invoice.png',
                    '/projects/studioflow/rbac.png',
                    '/projects/studioflow/files.png',
                ],
                techCategories: [
                    {
                        category: 'Frontend',
                        technologies: ['React', 'Tailwind CSS', 'Shadcn UI']
                    },
                    {
                        category: 'Backend',
                        technologies: ['Node.js', 'Express', 'MongoDB']
                    },
                    {
                        category: 'Real-time',
                        technologies: ['Socket.IO']
                    },
                    {
                        category: 'Job Queue',
                        technologies: ['Redis', 'BullMQ']
                    },
                    {
                        category: 'Payments',
                        technologies: ['Razorpay']
                    },
                    {
                        category: 'Storage',
                        technologies: ['AWS S3']
                    }
                ],
                liveUrl: 'https://www.studioflow.studio/', // Add live URL for demo button
                repoUrl: 'https://github.com/Hey-Viswa/StudioFlow'
            } as Project;
        }

        return project;
    } catch (error) {
        console.error('Error fetching project:', error);
        return null;
    }
}

export async function getAllProjectSlugs() {
    try {
        const { databases } = await createAdminClient();
        const response = await databases.listDocuments(
            DATABASE_ID,
            COLLECTIONS.PROJECTS,
            [
                Query.select(['slug']),
            ]
        );
        return response.documents.map((doc) => doc.slug as string);
    } catch (error) {
        console.error('Error fetching project slugs:', error);
        return [];
    }
}
