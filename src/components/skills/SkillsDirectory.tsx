'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { SkillDomain, SkillItem } from '@/data/skills';

type SkillGroup = { domain: SkillDomain; skills: SkillItem[] };
type ProjectLink = { href: string; label: string };

export function SkillsDirectory({
  groups,
  projectLinks,
}: {
  groups: SkillGroup[];
  projectLinks: Record<string, ProjectLink>;
}) {
  const [domain, setDomain] = useState<SkillDomain | 'All'>('All');
  const visibleGroups =
    domain === 'All' ? groups : groups.filter((group) => group.domain === domain);

  return (
    <>
      <div className="editorial-filters skills-filters" role="group" aria-label="Filter skills by area">
        <button
          type="button"
          aria-pressed={domain === 'All'}
          onClick={() => setDomain('All')}
        >
          All skills
        </button>
        {groups.map((group) => (
          <button
            key={group.domain}
            type="button"
            aria-pressed={domain === group.domain}
            onClick={() => setDomain(group.domain)}
          >
            {group.domain}
          </button>
        ))}
      </div>

      <p className="sr-only" role="status">
        {domain === 'All'
          ? `Showing all ${groups.length} skill areas`
          : `Showing ${domain}`}
      </p>

      <div className="skills-groups">
        {visibleGroups.map((group) => (
          <section className="skill-group" key={group.domain}>
            <h2 className="editorial-heading">{group.domain}</h2>
            <ul className="min-w-0">
              {group.skills.map((skill) => {
                const examples = skill.projects
                  .map((id) => projectLinks[id])
                  .filter((item): item is ProjectLink => Boolean(item));

                return (
                  <li key={skill.slug} className="skill-row">
                    <h3>{skill.name}</h3>
                    <div className="min-w-0">
                      {skill.context && <p>{skill.context}</p>}
                      {examples.length > 0 && (
                        <div className="mt-2.5 flex flex-wrap items-center gap-2">
                          <span className="font-mono text-xs uppercase tracking-[0.04em] text-[var(--fg-muted)]">
                            Used in
                          </span>
                          <ul
                            className="skill-examples mt-0! gap-2!"
                            aria-label={`Projects using ${skill.name}`}
                          >
                            {examples.map(({ href, label }) => (
                              <li key={href}>
                                <Link
                                  href={href}
                                  aria-label={`${label} — ${skill.name} project evidence`}
                                  className="inline-flex items-center gap-1 min-h-[40px] px-2.5 py-1 rounded border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[0.84rem] font-medium text-[var(--accent)] hover:border-[var(--accent)] hover:bg-[var(--bg-subtle)] hover:text-[var(--accent-hover)] transition-colors"
                                >
                                  <span>{label}</span>
                                  <span aria-hidden="true">→</span>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>
    </>
  );
}
