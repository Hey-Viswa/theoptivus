import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getAllProjects } from '@/data/projects';

export const metadata: Metadata = { title: 'Selected work', description: 'Software projects by Biswaranjan Giri.' };

export default function WorkPage() {
  return (
    <section className="site-width editorial-page">
      <header className="editorial-page-head"><h1 className="editorial-title">Selected work</h1></header>
      <ul className="work-archive">
        {getAllProjects().map(project => (
          <li key={project.slug}>
            <Link href={'/work/' + project.slug}>
              <span className={'archive-thumb thumb-' + project.slug}><Image src={project.thumbnail} alt="" fill sizes="(max-width: 600px) 74px, 136px" /></span>
              <div><p className="cover-credit">{project.category} · {project.year}</p>
                <h2>{project.shortTitle ?? project.title}</h2><p>{project.cardSummary}</p></div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
