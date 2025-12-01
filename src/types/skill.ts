import { Models } from 'appwrite';

export type SkillCategory = 'Frontend' | 'Backend' | 'Mobile' | 'DevOps' | 'Database' | 'Tools';
export type SkillLevel = 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';

export interface Skill extends Models.Document {
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
