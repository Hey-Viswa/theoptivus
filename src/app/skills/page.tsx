import type { Metadata } from 'next';
import Link from 'next/link';
import { CurvedArrow } from '@/components/ui/Scribbles';
import { getSkillsByDomain } from '@/data/skills';
import { getAllProjects } from '@/data/projects';
import { SkillsDirectory } from '@/components/skills/SkillsDirectory';

export const metadata: Metadata = {
  title: 'Skills',
  description: 'Software tools Viswa uses and examples of how he has used them.',
};

export default function SkillsPage() {
  const projectLinks = Object.fromEntries([
    ...getAllProjects().map((project) => [
      project.slug,
      { label: project.shortTitle ?? project.title, href: '/work/' + project.slug },
    ] as const),
  ]);

  return (
    <div className="site-width editorial-page">
      <header className="editorial-page-head skills-introduction">
        <div>
          <h1 className="editorial-title">Skills</h1>
          <p className="editorial-intro">The tools I use, what I’ve used them for, and where you can see them in the work.</p>
        </div>
        <aside className="skills-margin" aria-label="An example from FNet">
          <p>In FNet, ₹12.50 is stored as 1,250 paise. That keeps the ledger arithmetic exact.</p>
          <Link className="text-link" href="/work/fnet">
            Inside FNet <CurvedArrow variant="right" className="caption-arrow" />
          </Link>
        </aside>
      </header>
      <SkillsDirectory groups={getSkillsByDomain()} projectLinks={projectLinks} />
    </div>
  );
}
