import React from 'react';
import SkillForm from '@/components/admin/SkillForm';

export default function CreateSkillPage() {
    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Create New Skill</h1>
            <SkillForm />
        </div>
    );
}
