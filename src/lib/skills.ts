import { SKILLS, SKILL_DOMAINS } from '@/data/skills';
import { Skill } from '@/types/skill';

const LEGACY_SKILLS: Skill[] = SKILLS.map((skill, index) => ({
  $id: `skill_${skill.slug}`,
  name: skill.name,
  slug: skill.slug,
  category: skill.domain,
  level: 'Advanced',
  featured: true,
  order: index + 1,
}));

export async function getSkills(filter?: {
  category?: string;
  featured?: boolean;
  limit?: number;
}) {
  let filtered = [...LEGACY_SKILLS];

  if (filter?.category) {
    filtered = filtered.filter((s) => s.category === filter.category);
  }

  if (filter?.featured) {
    filtered = filtered.filter((s) => s.featured);
  }

  if (filter?.limit) {
    filtered = filtered.slice(0, filter.limit);
  }

  return {
    skills: filtered,
    total: filtered.length,
    domains: SKILL_DOMAINS,
  };
}

export async function getAllSkills() {
  return getSkills();
}
