import React from 'react';
import { notFound } from 'next/navigation';
import SkillForm from '@/components/admin/SkillForm';
import { createAdminClient } from '@/lib/server/appwrite';
import { COLLECTIONS, DATABASE_ID } from '@/lib/appwrite';
import { Skill } from '@/types/skill';

interface EditSkillPageProps {
    params: Promise<{ id: string }>;
}

export default async function EditSkillPage({ params }: EditSkillPageProps) {
    const { id } = await params;
    const collectionId = COLLECTIONS.SKILLS || 'skills';

    try {
        const { databases } = await createAdminClient();
        const skill = await databases.getDocument(
            DATABASE_ID,
            collectionId,
            id
        ) as unknown as Skill;

        return (
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Edit Skill</h1>
                <SkillForm initialData={skill} isEditMode={true} />
            </div>
        );
    } catch (error) {
        console.error('Error fetching skill:', error);
        notFound();
    }
}
