import type { Metadata } from 'next';
import Image from 'next/image';
import { ProjectGallery } from '@/components/ui/ProjectGallery';
import { RichTextRenderer } from '@/components/ui/RichTextRenderer';
import { notFound } from 'next/navigation';
import { FNET_CHAPTERS, FNET_POST, getAllProjectSlugs, getProjectBySlug } from '@/data/projects';

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllProjectSlugs().map(slug => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProjectBySlug((await params).slug);
  if (!project) return { title: 'Project not found' };
  return { title: project.title + ' · Case study', description: project.shortDescription,
    openGraph: { title: project.title, description: project.shortDescription, images: [project.thumbnail] } };
}

export default async function CaseStudyPage({ params }: Props) {
  const project = getProjectBySlug((await params).slug);
  if (!project) notFound();

  if (project.slug !== 'fnet') {
    return (
      <article className="site-width folio-study archive-study">
        <header className="editorial-page-head">
          <p className="cover-credit">{project.category} · {project.year}</p>
          <h1 className="editorial-title">{project.shortTitle ?? project.title}</h1>
          <p className="editorial-intro">{project.tagline}</p>
          <div className="editorial-actions">
            {project.liveUrl && <a className="text-link" href={project.liveUrl}>Visit project</a>}
            {project.repoUrl && <a className="text-link" href={project.repoUrl}>View source on GitHub</a>}
          </div>
        </header>
        <ProjectGallery items={project.gallery} projectTitle={project.title} />
        <dl className="study-facts">
          <div><dt>My role</dt><dd>{project.role}</dd></div>
          <div><dt>Project type</dt><dd>{project.category}</dd></div>
        </dl>
        <RichTextRenderer content={project.content} />
      </article>
    );
  }

  return (
    <article id="sys_fnet" className="site-width folio-study">
      <header className="study-opening">
        <div>
          <p className="cover-credit">{project.category} · {project.year}</p>
          <h1>{project.title}</h1>
          <p className="study-deck">{project.tagline}</p>
          <p className="study-lead">A personal finance app that records expenses offline, tracks money across accounts, and lets you trace a balance back to the entry that changed it.</p>
          <a className="text-link" href={FNET_POST}>Biswaranjan Giri | LinkedIn</a>
        </div>
        <Image src={project.thumbnail} alt={project.thumbnailAlt} width={230} height={515} sizes="(max-width: 600px) 160px, 230px" preload className="study-phone" />
      </header>
      <dl className="study-facts">
        <div><dt>My role</dt><dd>{project.role}</dd></div>
        <div><dt>Stack</dt><dd>{project.techStack.join(' · ')}</dd></div>
        <div><dt>Status</dt><dd>{project.status}</dd></div>
      </dl>
      {FNET_CHAPTERS.map(chapter => (
        <section key={chapter.title} className="study-chapter">
          <h2>{chapter.title}</h2>
          {chapter.body.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
          <div className="study-screens">
            {chapter.screens.map(index => {
              const screen = project.gallery[index];
              return (
                <figure key={screen.src}>
                  <a href={screen.src} aria-label={'Open full-size ' + screen.alt}>
                    <Image src={screen.src} alt={screen.alt} width={280} height={625} sizes="(max-width: 600px) 40vw, 240px" />
                  </a>
                  <figcaption>{screen.caption}</figcaption>
                </figure>
              );
            })}
          </div>
        </section>
      ))}
      <section className="study-chapter study-verification">
        <h2>Putting the ledger to the test</h2>
        <p>A loan restored from backup used to stay invisible in an already-open Accounts screen. I changed that screen to observe saved schedules. An emulator test now restores a loan while the screen is open, checks that the card appears with the exact balance, and checks that the journal hasn’t changed.</p>
        <p>The November 21 development record reports 373 passing unit tests and a debug build installed on a Galaxy S25. Background delivery of bank alerts is still subject to Android’s scheduling, so testing on a real phone remains part of the work.</p>
        <a className="text-link" href={FNET_POST}>See the FNet showcase on LinkedIn</a>
      </section>
    </article>
  );
}
