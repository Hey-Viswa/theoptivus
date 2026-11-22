import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import {
  getAllProjectSlugs,
  getProjectBySlug,
  getAdjacentProjects,
} from '@/data/projects';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ProjectGallery } from '@/components/ui/ProjectGallery';
import { RichTextRenderer } from '@/components/ui/RichTextRenderer';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
} from '@/components/ui/Icons';

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

interface CaseStudyPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  return {
    title: project.title,
    description: project.shortDescription || project.tagline,
    openGraph: {
      title: `${project.title} — Case Study`,
      description: project.shortDescription || project.tagline,
      images: [
        {
          url: project.thumbnail,
          alt: project.thumbnailAlt,
        },
      ],
    },
  };
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const { prev, next } = getAdjacentProjects(project.slug);

  return (
    <article className="animate-page-enter max-w-[1200px] mx-auto px-6 md:px-10 pt-10 pb-20 md:pt-14">
      <div className="mb-8">
        <Link
          href="/work"
          className="group inline-flex items-center gap-2 font-mono text-xs text-[var(--fg-secondary)] hover:text-[var(--accent)] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-150 group-hover:-translate-x-0.5" />
          <span>Back to Work</span>
        </Link>
      </div>

      {/* Case Study Header */}
      <header className="space-y-4 max-w-4xl">
        <div className="inline-flex items-center gap-2 font-mono text-xs text-[var(--fg-muted)]">
          <span>{project.category}</span>
          <span aria-hidden="true">·</span>
          <span>{project.year}</span>
        </div>

        <h1 className="font-display text-3xl sm:text-4xl lg:text-[2.95rem] font-semibold tracking-[-0.025em] leading-[1.1] text-[var(--fg-primary)]">
          {project.title}
        </h1>

        <p className="text-base sm:text-lg text-[var(--fg-secondary)] leading-relaxed max-w-3xl">
          {project.tagline}
        </p>

        {(project.liveUrl || project.repoUrl) && (
          <div className="pt-2 flex flex-wrap items-center gap-3.5">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[var(--bg-inverse)] text-[#F6F5F0] hover:bg-[var(--accent)] rounded-lg px-5 py-2.5 text-sm font-medium transition-colors"
              >
                <span>Visit Live Site</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            )}

            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-[var(--border-strong)] bg-[var(--bg-surface)] text-[var(--fg-primary)] hover:border-[var(--fg-primary)] hover:text-[var(--accent)] rounded-lg px-5 py-2.5 text-sm font-medium transition-colors"
              >
                <span>View Source on GitHub</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            )}
          </div>
        )}
      </header>

      {/* Hero Showcase Plate */}
      <div className="my-10 md:my-12 bg-[var(--bg-subtle)]/80 p-3 sm:p-5 rounded-xl border border-[var(--border-subtle)]">
        <div className="relative aspect-[16/10] w-full rounded-lg overflow-hidden border border-[var(--border-subtle)] bg-[var(--bg-surface)]">
          <Image
            src={project.thumbnail}
            alt={project.thumbnailAlt}
            fill
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 92vw, 1120px"
            className="object-cover object-top"
          />
        </div>
      </div>

      {/* 12-Column Editorial Body */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start my-12 md:my-16">
        <aside className="lg:col-span-4 lg:sticky lg:top-24 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl p-6 space-y-6">
          <dl className="space-y-4 text-sm">
            <div className="pb-3.5 border-b border-[var(--border-subtle)]">
              <dt className="font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--fg-muted)]">
                Role
              </dt>
              <dd className="mt-1 font-medium text-[var(--fg-primary)]">
                {project.role}
              </dd>
            </div>

            <div className="pb-3.5 border-b border-[var(--border-subtle)]">
              <dt className="font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--fg-muted)]">
                Client / Context
              </dt>
              <dd className="mt-1 font-medium text-[var(--fg-primary)]">
                {project.client}
              </dd>
            </div>

            <div className="grid grid-cols-2 gap-4 pb-3.5 border-b border-[var(--border-subtle)]">
              <div>
                <dt className="font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--fg-muted)]">
                  Year
                </dt>
                <dd className="mt-1 font-mono text-xs font-medium text-[var(--fg-primary)]">
                  {project.year}
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--fg-muted)]">
                  Status
                </dt>
                <dd className="mt-1 font-mono text-xs font-medium text-[var(--accent)]">
                  {project.status}
                </dd>
              </div>
            </div>
          </dl>

          <div className="space-y-3 pb-5 border-b border-[var(--border-subtle)]">
            <h2 className="font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--fg-muted)]">
              Key Deliverables
            </h2>
            <ul className="space-y-2">
              {project.deliverables.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-xs sm:text-sm text-[var(--fg-secondary)]"
                >
                  <Check className="w-3.5 h-3.5 text-[var(--accent)] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--fg-muted)]">
              Stack
            </h2>
            <div className="space-y-3">
              {project.techCategories.map((group) => (
                <div key={group.category} className="space-y-1">
                  <div className="font-mono text-[11px] text-[var(--fg-secondary)] font-medium">
                    {group.category}
                  </div>
                  <p className="font-mono text-xs text-[var(--fg-muted)] leading-relaxed">
                    {group.technologies.join(' · ')}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </aside>

        <div className="lg:col-span-8 pt-1 lg:pt-2">
          <div className="pb-4 mb-7 border-b border-[var(--border-subtle)] font-mono text-xs uppercase tracking-[0.12em] text-[var(--fg-muted)]">
            Overview
          </div>

          <RichTextRenderer content={project.content} />
        </div>
      </div>

      {/* Screenshots */}
      {project.gallery.length > 0 && (
        <section className="my-14 md:my-20 pt-12 border-t border-[var(--border-subtle)]">
          <SectionHeader title="Screenshots" />

          <ProjectGallery
            items={project.gallery}
            projectTitle={project.title}
          />
        </section>
      )}

      {/* Prev / Next Navigation */}
      <nav
        aria-label="Adjacent case studies"
        className="pt-10 border-t border-[var(--border-subtle)] grid grid-cols-1 sm:grid-cols-2 gap-6"
      >
        {prev && (
          <Link
            href={`/work/${prev.slug}`}
            className="group py-3 flex flex-col justify-between gap-2 transition-colors"
          >
            <div className="inline-flex items-center gap-2 font-mono text-xs text-[var(--fg-muted)] group-hover:text-[var(--accent)] transition-colors">
              <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-150 group-hover:-translate-x-0.5" />
              <span>Previous</span>
            </div>
            <div>
              <div className="font-display text-lg sm:text-xl font-semibold tracking-tight text-[var(--fg-primary)] group-hover:text-[var(--accent)] transition-colors">
                {prev.shortTitle ?? prev.title}
              </div>
              <p className="mt-1 text-xs text-[var(--fg-secondary)] line-clamp-1">
                {prev.cardSummary}
              </p>
            </div>
          </Link>
        )}

        {next && (
          <Link
            href={`/work/${next.slug}`}
            className="group py-3 flex flex-col justify-between gap-2 sm:text-right sm:items-end transition-colors"
          >
            <div className="inline-flex items-center gap-2 font-mono text-xs text-[var(--fg-muted)] group-hover:text-[var(--accent)] transition-colors">
              <span>Next</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-150 group-hover:translate-x-0.5" />
            </div>
            <div>
              <div className="font-display text-lg sm:text-xl font-semibold tracking-tight text-[var(--fg-primary)] group-hover:text-[var(--accent)] transition-colors">
                {next.shortTitle ?? next.title}
              </div>
              <p className="mt-1 text-xs text-[var(--fg-secondary)] line-clamp-1">
                {next.cardSummary}
              </p>
            </div>
          </Link>
        )}
      </nav>
    </article>
  );
}
