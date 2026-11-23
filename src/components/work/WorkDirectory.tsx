'use client';

import { useState } from 'react';
import { PROJECT_CATEGORIES, type PortfolioProject } from '@/data/projects';
import { ProjectCard } from '@/components/ui/ProjectCard';

type CategoryFilter = (typeof PROJECT_CATEGORIES)[number];

export function WorkDirectory({ projects }: { projects: PortfolioProject[] }) {
  const [category, setCategory] = useState<CategoryFilter>('All');

  const visibleProjects =
    category === 'All'
      ? projects.filter((project) => project.slug !== 'fnet')
      : projects.filter((project) => project.category === category);

  const statusText =
    category === 'All'
      ? `Showing ${visibleProjects.length} additional case studies below the featured FNet case study`
      : `${visibleProjects.length} ${visibleProjects.length === 1 ? 'case study' : 'case studies'} in ${category}`;

  return (
    <section aria-labelledby="work-directory-heading">
      <h2 id="work-directory-heading" className="sr-only">
        {category === 'All' ? 'More case studies' : `${category} case studies`}
      </h2>

      <div className="editorial-filters" role="group" aria-label="Filter case studies">
        {PROJECT_CATEGORIES.map((item) => (
          <button
            key={item}
            type="button"
            aria-pressed={category === item}
            onClick={() => setCategory(item)}
          >
            {item}
          </button>
        ))}
      </div>

      <p className="sr-only" role="status">
        {statusText}
      </p>

      {visibleProjects.length === 0 ? (
        <p className="text-[var(--fg-secondary)]">No case studies in this category.</p>
      ) : (
        <div className="work-projects">
          {visibleProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </section>
  );
}
