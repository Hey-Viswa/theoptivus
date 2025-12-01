import React from 'react';
import { notFound } from 'next/navigation';
import { getProjects } from '@/lib/projects'; // We need a getProjectById really, but for now...
import ProjectForm from '@/components/admin/ProjectForm';
import { adminDatabases } from '@/lib/server/appwrite';
import { COLLECTIONS, DATABASE_ID } from '@/lib/appwrite';
import { Project } from '@/types/project';

interface EditProjectPageProps {
    params: Promise<{ id: string }>;
}

export default async function EditProjectPage({ params }: EditProjectPageProps) {
    const { id } = await params;

    try {
        const project = await adminDatabases.getDocument(
            DATABASE_ID,
            COLLECTIONS.PROJECTS,
            id
        ) as unknown as Project;

        return (
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Edit Project</h1>
                <ProjectForm initialData={project} isEditMode={true} />
            </div>
        );
    } catch (error) {
        console.error('Error fetching project:', error);
        notFound();
    }
}
