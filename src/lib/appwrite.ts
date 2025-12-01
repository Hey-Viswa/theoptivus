import { Client, Databases, Storage, Account } from 'appwrite';

const client = new Client();

const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;

if (!endpoint || !projectId) {
    console.warn('Appwrite configuration missing. Please check your .env.local file or deployment settings.');
} else {
    client
        .setEndpoint(endpoint)
        .setProject(projectId);
}

export const databases = new Databases(client);
export const storage = new Storage(client);
export const account = new Account(client);
export { client };

// Collection IDs
export const COLLECTIONS = {
    PROJECTS: process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_PROJECTS || 'projects',
    SKILLS: process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_SKILLS || 'skills',
    MESSAGES: process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_MESSAGES || 'messages',
};

export const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;
