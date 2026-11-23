import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { FNetSaveDemo } from '@/components/ui/FNetSaveDemo';
import { ProjectGallery } from '@/components/ui/ProjectGallery';
import { RichTextRenderer } from '@/components/ui/RichTextRenderer';
import { InkCalloutStroke } from '@/components/ui/Scribbles';
import {
  FNET_CHAPTERS,
  FNET_POST,
  getAdjacentProjects,
  getAllProjectSlugs,
  getProjectBySlug,
} from '@/data/projects';

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProjectBySlug((await params).slug);
  if (!project) return { title: 'Project not found' };
  return {
    title: `${project.title} · Case study`,
    description: project.shortDescription,
    openGraph: {
      title: project.title,
      description: project.shortDescription,
      images: [project.thumbnail],
    },
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const project = getProjectBySlug((await params).slug);
  if (!project) notFound();

  const { prev, next } = getAdjacentProjects(project.slug);

  if (project.slug !== 'fnet') {
    return (
      <article className="site-width folio-study archive-study">
        <nav aria-label="Breadcrumb" className="mb-4 text-[var(--accent)]">
          <Link
            href="/work"
            className="text-link inline-flex items-center gap-1.5 min-h-[44px] text-sm font-medium"
          >
            <span aria-hidden="true">←</span> All work
          </Link>
        </nav>

        <header className="editorial-page-head">
          <p className="cover-credit">
            {project.category} · {project.year}
          </p>
          <h1 className="editorial-title">{project.title}</h1>
          <p className="editorial-intro">{project.tagline}</p>
          {(project.liveUrl || project.repoUrl) && (
            <div className="editorial-actions text-[var(--accent)]">
              {project.liveUrl && (
                <a
                  className="text-link inline-flex items-center gap-1 min-h-[44px] font-medium"
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit live project <span aria-hidden="true">↗</span>
                </a>
              )}
              {project.repoUrl && (
                <a
                  className="text-link inline-flex items-center gap-1 min-h-[44px] font-medium"
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View source on GitHub <span aria-hidden="true">↗</span>
                </a>
              )}
            </div>
          )}
        </header>

        <ProjectGallery items={project.gallery} projectTitle={project.title} />

        <dl className="study-facts">
          <div>
            <dt>My role</dt>
            <dd>{project.role}</dd>
          </div>
          <div>
            <dt>Project type</dt>
            <dd>{project.category}</dd>
          </div>
          <div>
            <dt>Context</dt>
            <dd>{project.client}</dd>
          </div>
          <div>
            <dt>Stack</dt>
            <dd>{project.techStack.join(' · ')}</dd>
          </div>
          <div>
            <dt>Status</dt>
            <dd>{project.status}</dd>
          </div>
        </dl>

        <RichTextRenderer content={project.content} className="mt-8" />

        <footer className="mt-14 pt-6 border-t border-[var(--border-subtle)] flex flex-wrap items-center justify-between gap-4 text-[var(--accent)]">
          <Link
            href="/work"
            className="text-link inline-flex items-center gap-1.5 min-h-[44px] font-medium"
          >
            <span aria-hidden="true">←</span> All work
          </Link>
          <div className="flex flex-wrap items-center gap-5">
            {prev && (
              <Link
                href={`/work/${prev.slug}`}
                className="text-link inline-flex items-center gap-1.5 min-h-[44px] font-medium"
              >
                <span aria-hidden="true">←</span> {prev.shortTitle ?? prev.title}
              </Link>
            )}
            {next && (
              <Link
                href={`/work/${next.slug}`}
                className="text-link inline-flex items-center gap-1.5 min-h-[44px] font-medium"
              >
                {next.shortTitle ?? next.title} <span aria-hidden="true">→</span>
              </Link>
            )}
          </div>
        </footer>
      </article>
    );
  }

  const [firstChapter, ...remainingChapters] = FNET_CHAPTERS;

  return (
    <article id="sys_fnet" className="site-width folio-study">
      <nav aria-label="Breadcrumb" className="mb-4 text-[var(--accent)]">
        <Link
          href="/work"
          className="text-link inline-flex items-center gap-1.5 min-h-[44px] text-sm font-medium"
        >
          <span aria-hidden="true">←</span> All work
        </Link>
      </nav>

      <header className="study-opening">
        <div>
          <p className="cover-credit">
            {project.category} · {project.year}
          </p>
          <h1>{project.title}</h1>
          <p className="study-deck">{project.tagline}</p>
          <p className="study-lead">
            A personal finance app that records expenses offline, tracks money across accounts, and
            lets you trace a balance back to the entry that changed it.
          </p>
          <div className="text-[var(--accent)]">
            <a
              className="text-link inline-flex items-center min-h-[44px] font-medium"
              href={FNET_POST}
              target="_blank"
              rel="noopener noreferrer"
            >
              Viswaranjan Giri | LinkedIn
            </a>
          </div>
        </div>
        <Image
          src={project.thumbnail}
          alt={project.thumbnailAlt}
          width={230}
          height={511}
          sizes="(max-width: 600px) 160px, 230px"
          preload
          className="study-phone"
        />
      </header>

      <dl className="study-facts">
        <div>
          <dt>My role</dt>
          <dd>{project.role}</dd>
        </div>
        <div>
          <dt>Stack</dt>
          <dd>{project.techStack.join(' · ')}</dd>
        </div>
        <div>
          <dt>Status</dt>
          <dd>{project.status}</dd>
        </div>
      </dl>

      {firstChapter && (
        <section className="study-chapter">
          <h2>{firstChapter.title}</h2>
          {firstChapter.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <div className="study-screens">
            {firstChapter.screens.map((index) => {
              const screen = project.gallery[index];
              if (!screen) return null;
              return (
                <figure key={screen.src}>
                  <a href={screen.src} aria-label={`Open full-size ${screen.alt}`}>
                    <Image
                      src={screen.src}
                      alt={screen.alt}
                      width={280}
                      height={622}
                      sizes="(max-width: 600px) 40vw, 240px"
                    />
                  </a>
                  <figcaption>{screen.caption}</figcaption>
                </figure>
              );
            })}
          </div>
          <aside className="study-annotation" aria-label="Atomic Room transaction note">
            <InkCalloutStroke variant="pointer" className="study-annotation-stroke" />
            <p>
              One Room transaction saves both entry and balance in exact integer paise — closing
              mid-train keeps them in sync.
            </p>
          </aside>
        </section>
      )}

      <FNetSaveDemo heading="Try the offline save flow" headingAs="h2" />

      {remainingChapters.map((chapter) => (
        <section key={chapter.title} className="study-chapter">
          <h2>{chapter.title}</h2>
          {chapter.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <div className="study-screens">
            {chapter.screens.map((index) => {
              const screen = project.gallery[index];
              if (!screen) return null;
              return (
                <figure key={screen.src}>
                  <a href={screen.src} aria-label={`Open full-size ${screen.alt}`}>
                    <Image
                      src={screen.src}
                      alt={screen.alt}
                      width={280}
                      height={622}
                      sizes="(max-width: 600px) 40vw, 240px"
                    />
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
        <p>
          A loan restored from backup used to stay invisible in an already-open Accounts screen. I
          changed that screen to observe saved schedules. An emulator test now restores a loan
          while the screen is open, checks that the card appears with the exact balance, and checks
          that the journal hasn’t changed.
        </p>
        <p>
          The November 21 development record reports 373 passing unit tests and a debug build
          installed on a Galaxy S25. Background delivery of bank alerts is still subject to Android’s
          scheduling, so testing on a real phone remains part of the work.
        </p>
        <a
          className="text-link inline-flex items-center min-h-[44px]"
          href={FNET_POST}
          target="_blank"
          rel="noopener noreferrer"
        >
          FNet showcase on LinkedIn
        </a>
      </section>

      <footer className="max-w-[46rem] mx-auto mt-12 pt-6 border-t border-[var(--border-subtle)] flex flex-wrap items-center justify-between gap-4 text-[var(--accent)]">
        <Link
          href="/work"
          className="text-link inline-flex items-center gap-1.5 min-h-[44px] font-medium"
        >
          <span aria-hidden="true">←</span> All work
        </Link>
        {next && (
          <Link
            href={`/work/${next.slug}`}
            className="text-link inline-flex items-center gap-1.5 min-h-[44px] font-medium"
          >
            Next: {next.shortTitle ?? next.title} <span aria-hidden="true">→</span>
          </Link>
        )}
      </footer>
    </article>
  );
}
