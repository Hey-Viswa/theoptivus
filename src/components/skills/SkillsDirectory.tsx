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
  const [domain, setDomain] = useState<SkillDomain | 'All'>(groups[0]?.domain ?? 'All');
  const visibleGroups = domain === 'All' ? groups : groups.filter((group) => group.domain === domain);

  return (
    <>
      <div className="editorial-filters skills-filters" role="group" aria-label="Filter skills by area">
        <button type="button" aria-pressed={domain === 'All'} onClick={() => setDomain('All')}>All skills</button>
        {groups.map((group) => (
          <button key={group.domain} type="button" aria-pressed={domain === group.domain} onClick={() => setDomain(group.domain)}>
            {group.domain}
          </button>
        ))}
      </div>
      <p className="sr-only" role="status">{domain === 'All' ? 'Showing all skills' : 'Showing ' + domain}</p>

      <div className="skills-groups">
        {visibleGroups.map((group) => (
          <section className="skill-group" key={group.domain}>
            <h2 className="editorial-heading">{group.domain}</h2>
            <ul>
              {group.skills.map((skill) => {
                const examples = skill.projects.map((id) => projectLinks[id]).filter(Boolean);

                return (
                  <li key={skill.slug} className="skill-row">
                    <h3>{skill.name}</h3>
                    <div>
                      {skill.context && <p>{skill.context}</p>}
                      {examples.length > 0 && (
                        <ul className="skill-examples" aria-label={'Projects using ' + skill.name}>
                          {examples.map(({ href, label }) => (
                            <li key={href}><Link className="text-link" href={href}>{label}</Link></li>
                          ))}
                        </ul>
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
