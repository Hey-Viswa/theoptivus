'use client';

import { useState } from 'react';
import { PROJECT_CATEGORIES, type PortfolioProject } from '@/data/projects';
import { ProjectCard } from '@/components/ui/ProjectCard';

type CategoryFilter = (typeof PROJECT_CATEGORIES)[number];

export function WorkDirectory({ projects }: { projects: PortfolioProject[] }) {
  const [category, setCategory] = useState<CategoryFilter>('All');
  const visibleProjects = category === 'All'
    ? projects
    : projects.filter((project) => project.category === category);

  return (
    <>
      <div className="editorial-filters" role="group" aria-label="Filter case studies">
        {PROJECT_CATEGORIES.map((item) => (
          <button key={item} type="button" aria-pressed={category === item} onClick={() => setCategory(item)}>
            {item}
          </button>
        ))}
      </div>
      <p className="sr-only" role="status">
        {visibleProjects.length} {visibleProjects.length === 1 ? 'case study' : 'case studies'}
      </p>
      {visibleProjects.length === 0 && <p>No case studies in this category.</p>}
      <div className="work-projects">
        {visibleProjects.map((project) => <ProjectCard key={project.id} project={project} />)}
      </div>
    </>
  );
}
