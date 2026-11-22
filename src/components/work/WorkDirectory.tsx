'use client';

import React, { useState, useMemo } from 'react';
import {
  PROJECT_CATEGORIES,
  type PortfolioProject,
} from '@/data/projects';
import { SYSTEM_BUILDS, type SystemBuild } from '@/data/systems';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ProjectCard } from '@/components/ui/ProjectCard';
import { ArrowUpRight } from '@/components/ui/Icons';
import {
  ScribbleUnderline,
  SketchDivider,
  AsteriskDoodle,
} from '@/components/ui/Scribbles';
import { AndroidCodeDoodle, MarginNote } from '@/components/ui/Characters';

export type CategoryFilter = (typeof PROJECT_CATEGORIES)[number];

export interface WorkDirectoryProps {
  projects: PortfolioProject[];
  systems?: SystemBuild[];
}

export function WorkDirectory({
  projects,
  systems = SYSTEM_BUILDS,
}: WorkDirectoryProps) {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('All');

  const categoryCounts = useMemo(() => {
    const counts: Record<CategoryFilter, number> = {
      All: projects.length,
      'Live Product': 0,
      'Client Work': 0,
      SaaS: 0,
      'Hackathon AI': 0,
    };

    for (const project of projects) {
      counts[project.category] = (counts[project.category] ?? 0) + 1;
    }

    return counts;
  }, [projects]);

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'All') {
      return projects;
    }
    return projects.filter((project) => project.category === activeCategory);
  }, [projects, activeCategory]);

  return (
    <div className="max-w-[1200px] mx-auto px-5 sm:px-6 md:px-10 pt-12 pb-24 md:pt-20">
      <SectionHeader
        as="h1"
        title="Work"
        description="Selected client platforms, web apps, and production builds."
        className="mb-8"
      />

      {/* Filter Bar with Hand-Drawn Active Underline */}
      <div
        role="toolbar"
        aria-label="Filter projects by category"
        className="mb-10 border-b border-[var(--border-subtle)] flex flex-wrap items-center gap-x-6 sm:gap-x-7 gap-y-2"
      >
        {PROJECT_CATEGORIES.map((category) => {
          const isActive = activeCategory === category;
          const count = categoryCounts[category] ?? 0;

          return (
            <button
              key={category}
              type="button"
              aria-pressed={isActive}
              onClick={() => setActiveCategory(category)}
              className={`relative min-h-[42px] pb-3 -mb-px inline-flex items-center gap-1.5 font-mono text-xs transition-colors cursor-pointer ${
                isActive
                  ? 'text-[var(--fg-primary)] font-semibold'
                  : 'text-[var(--fg-muted)] hover:text-[var(--fg-primary)]'
              }`}
            >
              <span>{category}</span>
              <span className="text-[11px]">({count})</span>
              {isActive && (
                <ScribbleUnderline className="absolute bottom-0 left-0 w-full h-2 text-[var(--accent)]" />
              )}
            </button>
          );
        })}
      </div>

      {/* Uniform Visual Project Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-12 md:gap-y-14">
        {filteredProjects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            variant="grid"
            priority={index < 2}
          />
        ))}
      </div>

      {/* Systems & Native Android Notebook Section */}
      <section id="systems" className="pt-16 md:pt-24">
        <SketchDivider className="w-full h-3 text-[var(--border-strong)] mb-12" />

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div className="flex items-start gap-3.5">
            <AndroidCodeDoodle className="w-11 h-11 text-[var(--fg-primary)] shrink-0 mt-0.5" />
            <div>
              <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-[var(--fg-primary)]">
                Systems &amp; Native Android
              </h2>
              <p className="text-sm sm:text-base text-[var(--fg-secondary)] mt-1 max-w-[54ch]">
                Engineering builds anchored by first-principles architecture,
                double-entry invariants, and offline-first tooling.
              </p>
            </div>
          </div>

          <MarginNote
            text="systems, Kotlin & low-level builds"
            arrowVariant="down-left"
            arrowPosition="left"
            className="shrink-0"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {systems.map((build) => (
            <article
              key={build.id}
              className="notebook-card rounded-xl p-5 sm:p-6 flex flex-col justify-between gap-5"
            >
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs text-[var(--fg-muted)]">
                  <span className="inline-flex items-center gap-1.5">
                    <AsteriskDoodle className="w-3.5 h-3.5 text-[var(--accent)]" />
                    <span>{build.index} · {build.category}</span>
                  </span>
                  <span>{build.status}</span>
                </div>

                <div>
                  <h3 className="font-display text-xl font-semibold text-[var(--fg-primary)]">
                    {build.name}
                  </h3>
                  <p className="text-sm text-[var(--fg-secondary)] leading-relaxed mt-1.5">
                    {build.summary}
                  </p>
                </div>

                <ul className="space-y-1.5">
                  {build.highlights.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2.5 text-sm text-[var(--fg-secondary)] leading-relaxed"
                    >
                      <span
                        className="mt-2 w-1.5 h-1.5 rounded-full bg-[var(--accent)] shrink-0"
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-[var(--border-subtle)] flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap gap-1.5">
                  {build.stack.map((tech) => (
                    <span
                      key={tech}
                      className="font-mono text-[11px] px-2 py-0.5 rounded bg-[var(--bg-subtle)] text-[var(--fg-secondary)]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <a
                  href={build.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-mono text-xs font-medium text-[var(--fg-primary)] hover:text-[var(--accent)] transition-colors shrink-0"
                >
                  <span>GitHub</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

export default WorkDirectory;
