import React from 'react';
import ProjectForm from '@/components/admin/ProjectForm';

export default function CreateProjectPage() {
    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Create New Project</h1>
            <ProjectForm />
        </div>
    );
}
