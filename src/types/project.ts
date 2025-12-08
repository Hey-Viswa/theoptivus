import { Models } from 'appwrite';

export interface Project extends Models.Document {
    title: string;
    slug: string;
    shortDescription: string;
    content?: string;
    heroFileId?: string;
    thumbnail?: string; // Local path like /projects/studioflow/thumbnail.png
    galleryFileIds?: string[];
    galleryImages?: string[]; // Local paths for gallery images
    techStack?: string[];
    techCategories?: { category: string; technologies: string[] }[]; // Organized tech stack
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
    thumbnail?: string;
    galleryFileIds?: string[];
    galleryImages?: string[];
    techStack?: string[];
    techCategories?: { category: string; technologies: string[] }[];
    skills?: string[];
    repoUrl?: string;
    liveUrl?: string;
    published?: boolean;
    featured?: boolean;
    date?: string;
    entitlementRequired?: boolean;
}
