import type { SkillDomain } from '@/data/skills';

export type SkillCategory = SkillDomain;
export type SkillLevel = 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';

export interface Skill {
  $id?: string;
  name: string;
  slug: string;
  category: SkillCategory;
  level: SkillLevel;
  iconFileId?: string;
  featured: boolean;
  order: number;
}

export interface SkillDTO {
  name: string;
  slug: string;
  category: SkillCategory;
  level: SkillLevel;
  iconFileId?: string;
  featured: boolean;
  order: number;
}
