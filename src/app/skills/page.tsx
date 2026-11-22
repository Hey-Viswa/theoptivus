import React from 'react';
import type { Metadata } from 'next';
import { getSkillsByDomain } from '@/data/skills';
import { getAllProjects } from '@/data/projects';
import { SkillsDirectory } from '@/components/skills/SkillsDirectory';

export const metadata: Metadata = {
  title: 'Skills',
  description:
    'Technical capabilities, languages, frameworks, and cloud infrastructure used across live production platforms, headless CMS studios, and mobile applications.',
};

export default function SkillsPage() {
  const groups = getSkillsByDomain();
  const projects = getAllProjects();

  const projectMap: Record<string, string> = {};
  for (const project of projects) {
    projectMap[project.slug] =
      project.slug === 'harsh-portfolio' ? 'Harsh Savale CMS' : project.title;
  }

  return <SkillsDirectory groups={groups} projectMap={projectMap} />;
}
