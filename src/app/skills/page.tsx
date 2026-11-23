import type { Metadata } from 'next';
import Link from 'next/link';
import { CurvedArrow } from '@/components/ui/Scribbles';
import { SkillsDirectory } from '@/components/skills/SkillsDirectory';
import { getAllProjects } from '@/data/projects';
import { SITE_CONFIG } from '@/data/site';
import { getSkillsByDomain } from '@/data/skills';

export const metadata: Metadata = {
  title: 'Skills',
  description: `Software tools ${SITE_CONFIG.name} uses and direct project evidence across shipped work.`,
};

export default function SkillsPage() {
  const projectLinks = Object.fromEntries(
    getAllProjects().map((project) => [
      project.slug,
      { label: project.shortTitle ?? project.title, href: `/work/${project.slug}` },
    ] as const)
  );

  return (
    <div className="site-width editorial-page">
      <header className="editorial-page-head skills-introduction">
        <div>
          <p className="editorial-label">{SITE_CONFIG.name} · Technical Stack</p>
          <h1 className="editorial-title">Skills</h1>
          <p className="editorial-intro">
            The tools I use, what I’ve used them for, and direct links to the shipped projects that
            back them up.
          </p>
        </div>

        <aside className="skills-margin" aria-label="An example from FNet">
          <p>In FNet, ₹12.50 is stored as 1,250 paise. That keeps the ledger arithmetic exact.</p>
          <Link className="text-link min-h-[44px]" href="/work/fnet">
            Inside FNet <CurvedArrow variant="right" className="caption-arrow" />
          </Link>
        </aside>
      </header>

      <SkillsDirectory groups={getSkillsByDomain()} projectLinks={projectLinks} />
    </div>
  );
}
