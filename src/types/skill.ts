export type SkillCategory = 'Languages' | 'Frameworks' | 'BlockChain' | 'Databases' | 'Cloud' | 'Tools' | 'Concepts';
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
