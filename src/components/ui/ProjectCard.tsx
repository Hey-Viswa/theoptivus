import Link from 'next/link';
import Image from 'next/image';
import type { PortfolioProject } from '@/data/projects';

interface ProjectCardProps {
  project: PortfolioProject;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const title = project.shortTitle ?? project.title;
  const primaryScreen = project.gallery[0];
  const secondaryScreen = project.gallery[4];
  const isFNet = project.slug === 'fnet';

  return (
    <article className="project-story">
      <Link
        className="project-story-link group"
        href={`/work/${project.slug}`}
        aria-labelledby={`story-${project.slug}`}
      >
        {isFNet ? (
          <div className="print-media print-lead-media">
            <Image
              src={primaryScreen?.src ?? project.thumbnail}
              alt={primaryScreen?.alt ?? project.thumbnailAlt}
              width={216}
              height={480}
              sizes="(max-width: 720px) 40vw, 175px"
              className="print-lead-screen"
            />
            {secondaryScreen && (
              <Image
                src={secondaryScreen.src}
                alt={secondaryScreen.alt}
                width={216}
                height={480}
                sizes="(max-width: 720px) 36vw, 160px"
                className="print-lead-screen print-lead-screen-secondary"
              />
            )}
          </div>
        ) : (
          <div className="project-image">
            <Image
              src={project.thumbnail}
              alt={project.thumbnailAlt || primaryScreen?.alt || title}
              fill
              sizes="(max-width: 720px) 94vw, 520px"
            />
          </div>
        )}

        <div className="project-description">
          <p className="editorial-label">
            {project.category} · {project.year}
          </p>
          <h3 id={`story-${project.slug}`}>{title}</h3>
          <p>{project.cardSummary}</p>
          <span className="print-cta">
            Read case study <span aria-hidden="true">→</span>
          </span>
        </div>
      </Link>
    </article>
  );
}
