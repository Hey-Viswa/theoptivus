'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { SKILL_DOMAINS, type SkillDomain, type SkillItem } from '@/data/skills';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Reveal } from '@/components/ui/Reveal';
import { ArrowUpRight } from '@/components/ui/Icons';
import { ScribbleUnderline } from '@/components/ui/Scribbles';

export interface SkillDomainGroup {
  domain: SkillDomain;
  skills: SkillItem[];
}

export interface SkillsDirectoryProps {
  groups: SkillDomainGroup[];
  projectMap: Record<string, string>;
}

const SHORT_DOMAIN_LABELS: Record<SkillDomain, string> = {
  Languages: 'Languages',
  'Frontend & Mobile': 'Frontend',
  'Backend & Real-time': 'Backend',
  'Databases & Storage': 'Data',
  'Cloud & Platforms': 'Cloud',
  'Payments & Tooling': 'Tooling',
  'Film & Visual Craft': 'Film',
};

export function SkillsDirectory({ groups, projectMap }: SkillsDirectoryProps) {
  const [activeDomain, setActiveDomain] = useState<'All' | SkillDomain>('All');

  const totalSkillsCount = groups.reduce(
    (sum, group) => sum + group.skills.length,
    0
  );

  const visibleGroups =
    activeDomain === 'All'
      ? groups
      : groups.filter((group) => group.domain === activeDomain);

  return (
    <div className="max-w-[1200px] mx-auto px-5 sm:px-6 md:px-10 pt-12 pb-24 md:pt-20">
      <Reveal>
        <SectionHeader
          as="h1"
          title="Skills"
          description="Engineering tools, Android stack, and visual craft."
          action={{ label: 'View work', href: '/work' }}
        />

        {/* Domain Tabs with Hand-Drawn Scribble Active Underline */}
        <div
          role="tablist"
          aria-label="Filter skills by technical domain"
          className="mb-12 border-b border-[var(--border-subtle)] flex flex-wrap items-center gap-x-5 sm:gap-x-6 gap-y-2"
        >
          <button
            type="button"
            role="tab"
            aria-selected={activeDomain === 'All'}
            onClick={() => setActiveDomain('All')}
            className={`relative min-h-[42px] pb-3 -mb-px inline-flex items-center gap-1.5 text-xs font-mono transition-colors cursor-pointer ${
              activeDomain === 'All'
                ? 'text-[var(--fg-primary)] font-semibold'
                : 'text-[var(--fg-muted)] hover:text-[var(--fg-primary)]'
            }`}
          >
            <span>All</span>
            <span className="text-[11px]">({totalSkillsCount})</span>
            {activeDomain === 'All' && (
              <ScribbleUnderline className="absolute bottom-0 left-0 w-full h-2 text-[var(--accent)]" />
            )}
          </button>

          {groups.map((group) => {
            const isSelected = activeDomain === group.domain;
            return (
              <button
                key={group.domain}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => setActiveDomain(group.domain)}
                className={`relative min-h-[42px] pb-3 -mb-px inline-flex items-center gap-1.5 text-xs font-mono transition-colors cursor-pointer ${
                  isSelected
                    ? 'text-[var(--fg-primary)] font-semibold'
                    : 'text-[var(--fg-muted)] hover:text-[var(--fg-primary)]'
                }`}
              >
                <span>{SHORT_DOMAIN_LABELS[group.domain]}</span>
                <span className="text-[11px]">({group.skills.length})</span>
                {isSelected && (
                  <ScribbleUnderline className="absolute bottom-0 left-0 w-full h-2 text-[var(--accent)]" />
                )}
              </button>
            );
          })}
        </div>

        {/* Unboxed Ledger */}
        <div className="space-y-12">
          {visibleGroups.map((group) => {
            const domainIndex = SKILL_DOMAINS.indexOf(group.domain) + 1;
            const formattedIndex = String(domainIndex).padStart(2, '0');

            return (
              <section
                key={group.domain}
                aria-labelledby={`domain-heading-${formattedIndex}`}
                className="pt-6 border-t border-[var(--border-strong)]"
              >
                <div className="pb-4 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                  <h2
                    id={`domain-heading-${formattedIndex}`}
                    className="font-display text-xl sm:text-2xl font-semibold text-[var(--fg-primary)]"
                  >
                    {group.domain}
                  </h2>

                  <span className="font-mono text-xs text-[var(--fg-muted)]">
                    {group.skills.length} items
                  </span>
                </div>

                <div className="divide-y divide-[var(--border-subtle)]">
                  {group.skills.map((skill) => {
                    const linkedProjects = skill.projects.filter(
                      (slug) => Boolean(projectMap[slug])
                    );

                    return (
                      <div
                        key={skill.slug}
                        className="py-3.5 grid grid-cols-1 lg:grid-cols-12 gap-2.5 lg:gap-6 items-start lg:items-center"
                      >
                        <div className="lg:col-span-3">
                          <h3 className="font-display text-base font-semibold text-[var(--fg-primary)]">
                            {skill.name}
                          </h3>
                        </div>

                        <div className="lg:col-span-5">
                          {skill.context && (
                            <p className="text-sm text-[var(--fg-secondary)] leading-relaxed">
                              {skill.context}
                            </p>
                          )}
                        </div>

                        <div className="lg:col-span-4 flex flex-wrap items-center lg:justify-end gap-2">
                          {linkedProjects.length > 0 ? (
                            linkedProjects.map((slug) => (
                              <Link
                                key={slug}
                                href={`/work/${slug}`}
                                className="group inline-flex items-center gap-1 px-2.5 py-1 rounded-md font-mono text-xs bg-[var(--bg-surface)] text-[var(--fg-secondary)] border border-[var(--border-subtle)] hover:border-[var(--border-strong)] hover:text-[var(--accent)] transition-colors"
                              >
                                <span>{projectMap[slug]}</span>
                                <ArrowUpRight className="w-3 h-3 text-[var(--fg-muted)] group-hover:text-[var(--accent)] transition-colors" />
                              </Link>
                            ))
                          ) : (
                            <span className="font-mono text-[11px] text-[var(--fg-muted)]">
                              Core
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>
      </Reveal>
    </div>
  );
}

export default SkillsDirectory;
