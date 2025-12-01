import { Models } from 'appwrite';

export interface Project extends Models.Document {
    title: string;
    slug: string;
    shortDescription: string;
    content?: string;
    heroFileId?: string;
    galleryFileIds?: string[];
    techStack?: string[];
    skills?: string[]; // Array of Skill IDs
    repoUrl?: string;
    liveUrl?: string;
    published: boolean;
    featured: boolean;
    date?: string;
    entitlementRequired: boolean;
    ownerId?: string;
}

export interface ProjectDTO {
    title: string;
    slug: string;
    shortDescription: string;
    content?: string;
    heroFileId?: string;
    galleryFileIds?: string[];
    techStack?: string[];
    skills?: string[];
    repoUrl?: string;
    liveUrl?: string;
    published?: boolean;
    featured?: boolean;
    date?: string;
    entitlementRequired?: boolean;
}
