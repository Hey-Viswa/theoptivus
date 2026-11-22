import { PROJECTS } from '@/data/projects';
import { Project } from '@/types/project';

const LEGACY_PROJECTS: Project[] = PROJECTS.map((project, index) => ({
  $id: project.id,
  $collectionId: 'projects',
  $databaseId: 'main',
  $createdAt: project.date,
  $updatedAt: project.date,
  $permissions: [],
  $sequence: index,
  title: project.title,
  slug: project.slug,
  shortDescription: project.shortDescription,
  content: project.content,
  thumbnail: project.thumbnail,
  galleryImages: project.gallery.map((item) => item.src),
  techStack: project.techStack,
  techCategories: project.techCategories,
  repoUrl: project.repoUrl,
  liveUrl: project.liveUrl,
  published: true,
  featured: project.featured,
  date: project.date,
  entitlementRequired: false,
}));

export async function getProjects(filter?: {
  featured?: boolean;
  tech?: string;
  limit?: number;
  offset?: number;
}) {
  let filtered = [...LEGACY_PROJECTS];

  if (filter?.featured) {
    filtered = filtered.filter((p) => p.featured);
  }

  if (filter?.tech) {
    filtered = filtered.filter((p) => p.techStack?.includes(filter.tech!));
  }

  if (filter?.offset) {
    filtered = filtered.slice(filter.offset);
  }

  if (filter?.limit) {
    filtered = filtered.slice(0, filter.limit);
  }

  return {
    projects: filtered,
    total: filtered.length,
  };
}

export async function getProjectBySlug(slug: string) {
  const project = LEGACY_PROJECTS.find((p) => p.slug === slug);
  return project || null;
}

export async function getAllProjectSlugs() {
  return LEGACY_PROJECTS.map((p) => p.slug);
}
