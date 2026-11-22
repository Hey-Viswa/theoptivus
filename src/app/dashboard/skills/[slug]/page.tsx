import React from 'react';
import { notFound } from 'next/navigation';
import SkillForm from '@/components/admin/SkillForm';
import { createAdminClient } from '@/lib/server/appwrite';
import { COLLECTIONS, DATABASE_ID } from '@/lib/appwrite';
import { Skill } from '@/types/skill';

interface EditSkillPageProps {
  params: Promise<{ slug: string }>;
}

export default async function EditSkillPage({ params }: EditSkillPageProps) {
  const { slug } = await params;
  const collectionId = COLLECTIONS.SKILLS || 'skills';
  let skill: Skill | null = null;

  try {
    const { databases } = await createAdminClient();
    skill = (await databases.getDocument(
      DATABASE_ID,
      collectionId,
      slug
    )) as unknown as Skill;
  } catch (error) {
    console.error('Error fetching skill:', error);
  }

  if (!skill) {
    notFound();
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Edit Skill</h1>
      <SkillForm initialData={skill} isEditMode={true} />
    </div>
  );
}
