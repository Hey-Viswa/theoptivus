const { Client, Databases, Storage, Permission, Role } = require('node-appwrite');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const client = new Client();

const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;
const apiKey = process.env.APPWRITE_API_KEY || process.env.NEXT_PRIVATE_APPWRITE_SECRET_API_KEY;

console.log('Loaded Environment Variables:', Object.keys(process.env).filter(k => k.includes('APPWRITE')));

if (!endpoint || !projectId || !apiKey) {
    console.error('Error: Missing Appwrite configuration in .env.local');
    if (!endpoint) console.error('- NEXT_PUBLIC_APPWRITE_ENDPOINT is missing');
    if (!projectId) console.error('- NEXT_PUBLIC_APPWRITE_PROJECT_ID is missing');
    if (!apiKey) console.error('- APPWRITE_API_KEY or NEXT_PRIVATE_APPWRITE_SECRET_API_KEY is missing');
    process.exit(1);
}

client
    .setEndpoint(endpoint)
    .setProject(projectId)
    .setKey(apiKey);

const databases = new Databases(client);
const storage = new Storage(client);

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || 'theoptivus-db';
const PROJECTS_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_PROJECTS || 'projects';
const SKILLS_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_SKILLS || 'skills';
const BUCKET_ID = 'project-assets';

async function setup() {
    console.log('Starting Appwrite Setup...');

    // 1. Create Database
    try {
        await databases.get(DATABASE_ID);
        console.log(`Database ${DATABASE_ID} already exists.`);
    } catch (error) {
        if (error.code === 404) {
            console.log(`Creating database ${DATABASE_ID}...`);
            await databases.create(DATABASE_ID, 'TheOptivus Database');
        } else {
            throw error;
        }
    }

    // 2. Create Projects Collection
    try {
        await databases.getCollection(DATABASE_ID, PROJECTS_COLLECTION_ID);
        console.log(`Collection ${PROJECTS_COLLECTION_ID} already exists.`);
    } catch (error) {
        if (error.code === 404) {
            console.log(`Creating collection ${PROJECTS_COLLECTION_ID}...`);
            await databases.createCollection(DATABASE_ID, PROJECTS_COLLECTION_ID, 'Projects', [
                Permission.read(Role.any()), // Public read
            ]);
        } else {
            throw error;
        }
    }

    // 2.1 Create Skills Collection
    try {
        await databases.getCollection(DATABASE_ID, SKILLS_COLLECTION_ID);
        console.log(`Collection ${SKILLS_COLLECTION_ID} already exists.`);
    } catch (error) {
        if (error.code === 404) {
            console.log(`Creating collection ${SKILLS_COLLECTION_ID}...`);
            await databases.createCollection(DATABASE_ID, SKILLS_COLLECTION_ID, 'Skills', [
                Permission.read(Role.any()), // Public read
            ]);
        } else {
            throw error;
        }
    }

    // 3. Create Attributes for Projects
    const projectAttributes = [
        { key: 'title', type: 'string', size: 200, required: true },
        { key: 'slug', type: 'string', size: 200, required: true },
        { key: 'shortDescription', type: 'string', size: 500, required: true },
        { key: 'content', type: 'string', size: 1000000, required: false }, // Large text
        { key: 'heroFileId', type: 'string', size: 255, required: false },
        { key: 'galleryFileIds', type: 'string', size: 255, required: false, array: true },
        { key: 'techStack', type: 'string', size: 100, required: false, array: true },
        { key: 'skills', type: 'string', size: 255, required: false, array: true }, // Link to Skills
        { key: 'repoUrl', type: 'url', required: false },
        { key: 'liveUrl', type: 'url', required: false },
        { key: 'published', type: 'boolean', required: false },
        { key: 'featured', type: 'boolean', required: false },
        { key: 'date', type: 'datetime', required: false },
        { key: 'entitlementRequired', type: 'boolean', required: false },
    ];

    console.log('Checking Project attributes...');
    for (const attr of projectAttributes) {
        try {
            if (attr.type === 'string') {
                if (attr.array) {
                    await databases.createStringAttribute(DATABASE_ID, PROJECTS_COLLECTION_ID, attr.key, attr.size, attr.required, undefined, true);
                } else {
                    await databases.createStringAttribute(DATABASE_ID, PROJECTS_COLLECTION_ID, attr.key, attr.size, attr.required);
                }
            } else if (attr.type === 'url') {
                await databases.createUrlAttribute(DATABASE_ID, PROJECTS_COLLECTION_ID, attr.key, attr.required);
            } else if (attr.type === 'boolean') {
                await databases.createBooleanAttribute(DATABASE_ID, PROJECTS_COLLECTION_ID, attr.key, attr.required);
            } else if (attr.type === 'datetime') {
                await databases.createDatetimeAttribute(DATABASE_ID, PROJECTS_COLLECTION_ID, attr.key, attr.required);
            }
            console.log(`Created attribute: ${attr.key}`);
        } catch (error) {
            if (error.code === 409) {
                console.log(`Attribute ${attr.key} already exists.`);
            } else {
                console.error(`Failed to create attribute ${attr.key}:`, error.message);
            }
        }
        await new Promise(resolve => setTimeout(resolve, 200));
    }

    // 3.1 Create Attributes for Skills
    const skillAttributes = [
        { key: 'name', type: 'string', size: 100, required: true },
        { key: 'slug', type: 'string', size: 100, required: true },
        { key: 'category', type: 'string', size: 50, required: true }, // Enum simulated as string
        { key: 'level', type: 'string', size: 50, required: true }, // Enum simulated as string
        { key: 'iconFileId', type: 'string', size: 255, required: false },
        { key: 'featured', type: 'boolean', required: false },
        { key: 'order', type: 'integer', required: false },
    ];

    console.log('Checking Skill attributes...');
    for (const attr of skillAttributes) {
        try {
            if (attr.type === 'string') {
                await databases.createStringAttribute(DATABASE_ID, SKILLS_COLLECTION_ID, attr.key, attr.size, attr.required);
            } else if (attr.type === 'boolean') {
                await databases.createBooleanAttribute(DATABASE_ID, SKILLS_COLLECTION_ID, attr.key, attr.required);
            } else if (attr.type === 'integer') {
                await databases.createIntegerAttribute(DATABASE_ID, SKILLS_COLLECTION_ID, attr.key, attr.required);
            }
            console.log(`Created attribute: ${attr.key}`);
        } catch (error) {
            if (error.code === 409) {
                console.log(`Attribute ${attr.key} already exists.`);
            } else {
                console.error(`Failed to create attribute ${attr.key}:`, error.message);
            }
        }
        await new Promise(resolve => setTimeout(resolve, 200));
    }

    // 4. Create Indexes
    try {
        await databases.createIndex(DATABASE_ID, PROJECTS_COLLECTION_ID, 'unique_slug', 'unique', ['slug']);
        console.log('Created unique index for project slug.');
    } catch (error) {
        if (error.code === 409) {
            console.log('Index unique_slug already exists.');
        } else {
            console.error('Failed to create index:', error.message);
        }
    }

    try {
        await databases.createIndex(DATABASE_ID, SKILLS_COLLECTION_ID, 'unique_skill_slug', 'unique', ['slug']);
        console.log('Created unique index for skill slug.');
    } catch (error) {
        if (error.code === 409) {
            console.log('Index unique_skill_slug already exists.');
        } else {
            console.error('Failed to create index:', error.message);
        }
    }

    // 5. Create Storage Bucket
    try {
        await storage.getBucket(BUCKET_ID);
        console.log(`Bucket ${BUCKET_ID} already exists.`);
    } catch (error) {
        if (error.code === 404) {
            console.log(`Creating bucket ${BUCKET_ID}...`);
            await storage.createBucket(BUCKET_ID, 'Project Assets', [
                Permission.read(Role.any()), // Public read
            ], true, undefined, undefined, ['jpg', 'jpeg', 'png', 'webp', 'gif', 'svg']);
        } else {
            throw error;
        }
    }

    console.log('Setup complete!');
}

setup().catch(console.error);
