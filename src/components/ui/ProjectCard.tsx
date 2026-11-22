import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { PortfolioProject } from '@/data/projects';

export interface ProjectCardProps {
  project: PortfolioProject;
  variant?: 'featured' | 'grid';
  index?: number | string;
  priority?: boolean;
  className?: string;
}

export function ProjectCard({
  project,
  variant = 'grid',
  priority = false,
  className = '',
}: ProjectCardProps) {
  const displayTitle = project.shortTitle ?? project.title;
  const isLiveProduct = project.slug === 'freshkatta';

  return (
    <article className={`group relative flex flex-col ${className}`}>
      <Link
        href={`/work/${project.slug}`}
        className="flex flex-col focus-visible:outline-none"
        aria-label={`${displayTitle} — ${project.cardSummary}`}
      >
        {/* Uniform Full-Color UI Plate Inside Warm Archival Stone Mat */}
        <div className="bg-[var(--bg-subtle)]/80 border border-[var(--border-subtle)] group-hover:border-[var(--border-strong)] rounded-xl p-3 sm:p-4 transition-colors duration-200">
          <div className="relative aspect-[16/10] w-full rounded-lg overflow-hidden border border-[var(--border-subtle)] bg-[var(--bg-surface)]">
            <Image
              src={project.thumbnail}
              alt={project.thumbnailAlt || `${displayTitle} interface preview`}
              fill
              priority={priority}
              sizes={
                variant === 'featured'
                  ? '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 560px'
                  : '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 540px'
              }
              className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.015]"
            />
          </div>
        </div>

        {/* Minimal 2-Row Editorial Caption (Fixed Height Across Every Row) */}
        <div className="pt-4 px-0.5 space-y-1">
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="font-display text-lg sm:text-xl font-semibold tracking-tight text-[var(--fg-primary)] group-hover:text-[var(--accent)] transition-colors truncate">
              {displayTitle}
            </h3>
            <span
              className={`shrink-0 font-mono text-xs ${
                isLiveProduct
                  ? 'text-[var(--accent)] font-medium'
                  : 'text-[var(--fg-muted)]'
              }`}
            >
              {isLiveProduct
                ? `Live · ${project.year}`
                : `${project.category} · ${project.year}`}
            </span>
          </div>

          <p className="text-sm text-[var(--fg-secondary)] leading-relaxed line-clamp-1">
            {project.cardSummary}
          </p>
        </div>
      </Link>
    </article>
  );
}

export default ProjectCard;
