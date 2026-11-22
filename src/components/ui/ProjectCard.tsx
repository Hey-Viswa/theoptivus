import Link from 'next/link';
import Image from 'next/image';
import type { PortfolioProject } from '@/data/projects';

interface ProjectCardProps {
  project: PortfolioProject;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const title = project.shortTitle ?? project.title;
  const image = project.gallery[0];

  return (
    <article className="project-story">
      <Link className="project-story-link" href={'/work/' + project.slug} aria-labelledby={'story-' + project.slug}>
        <figure>
          <div className="project-image">
            <Image
              src={image?.src ?? project.thumbnail}
              alt={image?.alt ?? project.thumbnailAlt}
              fill
              sizes="(max-width: 720px) 95vw, 560px"
            />
          </div>
        </figure>
        <div className="project-description">
          <p className="editorial-label">{project.category} · {project.year}</p>
          <h3 id={'story-' + project.slug}>{title}</h3>
          <p>{project.cardSummary}</p>
        </div>
      </Link>
    </article>
  );
}
