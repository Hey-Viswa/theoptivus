import { Query } from 'node-appwrite';
import { adminDatabases } from '@/lib/server/appwrite';
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
        const response = await adminDatabases.listDocuments(
            DATABASE_ID,
            COLLECTIONS.PROJECTS,
            queries
        );
        return {
            projects: response.documents as unknown as Project[],
            total: response.total
        };
    } catch (error) {
        console.error('Error fetching projects:', error);
        return { projects: [], total: 0 };
    }
}

export async function getProjectBySlug(slug: string) {
    try {
        const response = await adminDatabases.listDocuments(
            DATABASE_ID,
            COLLECTIONS.PROJECTS,
            [
                Query.equal('slug', slug),
                Query.limit(1)
            ]
        );

        if (response.documents.length === 0) {
            return null;
        }

        return response.documents[0] as unknown as Project;
    } catch (error) {
        console.error(`Error fetching project with slug ${slug}:`, error);
        return null;
    }
}

export async function getAllProjectSlugs() {
    try {
        const response = await adminDatabases.listDocuments(
            DATABASE_ID,
            COLLECTIONS.PROJECTS,
            [
                Query.select(['slug']),
                Query.limit(100) // Adjust limit as needed
            ]
        );
        return response.documents.map((doc) => doc.slug);
    } catch (error) {
        console.error('Error fetching project slugs:', error);
        return [];
    }
}
