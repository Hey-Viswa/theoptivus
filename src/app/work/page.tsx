import React from 'react';
import type { Metadata } from 'next';
import { getAllProjects } from '@/data/projects';
import { SYSTEM_BUILDS } from '@/data/systems';
import { WorkDirectory } from '@/components/work/WorkDirectory';

export const metadata: Metadata = {
  title: 'Work',
  description:
    'Selected engineering case studies and systems builds by Viswaranjan Giri — FreshKatta, Harsh Savale CMS, StudioFlow, CivicLens, FNet Android, Vanguard ClaimOS, and Mini-VCS.',
};

export default function WorkPage() {
  const projects = getAllProjects();

  return (
    <div className="animate-page-enter">
      <WorkDirectory projects={projects} systems={SYSTEM_BUILDS} />
    </div>
  );
}
