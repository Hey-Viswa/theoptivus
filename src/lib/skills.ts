import { Query } from 'node-appwrite';
import { createAdminClient } from '@/lib/server/appwrite';
import { COLLECTIONS, DATABASE_ID } from '@/lib/appwrite';
import { Skill } from '@/types/skill';

export async function getSkills(filter?: {
    category?: string;
    featured?: boolean;
    limit?: number;
}) {
    const queries = [
        Query.orderAsc('order'),
    ];

    if (filter?.category) {
        queries.push(Query.equal('category', filter.category));
    }

    if (filter?.featured) {
        queries.push(Query.equal('featured', true));
    }

    if (filter?.limit) {
        queries.push(Query.limit(filter.limit));
    }

    try {
        // Ensure COLLECTIONS.SKILLS is defined, fallback if not in env yet
        const collectionId = COLLECTIONS.SKILLS || 'skills';
        const { databases } = await createAdminClient();

        const response = await databases.listDocuments(
            DATABASE_ID,
            collectionId,
            queries
        );
        return {
            skills: response.documents as unknown as Skill[],
            total: response.total
        };
    } catch (error) {
        console.error('Error fetching skills:', error);
        return { skills: [], total: 0 };
    }
}

export async function getAllSkills() {
    // Fetch all skills, might need pagination loop if > 100, but for now 100 is enough
    return getSkills({ limit: 100 });
}
