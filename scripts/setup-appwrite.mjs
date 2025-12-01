import { Client, Databases, Permission, Role } from 'node-appwrite';

const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID)
    .setKey(process.env.NEXT_PRIVATE_APPWRITE_SECRET_API_KEY);

const databases = new Databases(client);
const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;

async function setupAppwrite() {
    try {
        console.log('🚀 Starting Appwrite Setup...');

        // 1. Create Collections
        console.log('Creating Collections...');

        // Projects Collection
        try {
            await databases.createCollection(DATABASE_ID, 'projects', 'Projects', [
                Permission.read(Role.any()),
                Permission.read(Role.users()),
                Permission.write(Role.users()) // Adjust permissions as needed
            ]);
            console.log('✅ Projects collection created');
        } catch (e) {
            console.log('ℹ️ Projects collection might already exist');
        }

        // Skills Collection
        try {
            await databases.createCollection(DATABASE_ID, 'skills', 'Skills', [
                Permission.read(Role.any()),
                Permission.read(Role.users()),
                Permission.write(Role.users())
            ]);
            console.log('✅ Skills collection created');
        } catch (e) {
            console.log('ℹ️ Skills collection might already exist');
        }

        // Messages Collection
        try {
            await databases.createCollection(DATABASE_ID, 'messages', 'Messages', [
                Permission.create(Role.any()), // Allow anyone to create
                Permission.read(Role.users()),
                Permission.write(Role.users())
            ]);
            console.log('✅ Messages collection created');
        } catch (e) {
            console.log('ℹ️ Messages collection might already exist');
        }

        // 2. Create Attributes for Projects
        console.log('Creating Project Attributes...');
        const projectAttrs = [
            databases.createStringAttribute(DATABASE_ID, 'projects', 'title', 255, true),
            databases.createStringAttribute(DATABASE_ID, 'projects', 'slug', 255, true),
            databases.createStringAttribute(DATABASE_ID, 'projects', 'summary', 1024, true),
            databases.createStringAttribute(DATABASE_ID, 'projects', 'description', 10000, false),
            databases.createBooleanAttribute(DATABASE_ID, 'projects', 'featured', false, false),
            databases.createDatetimeAttribute(DATABASE_ID, 'projects', 'date', true),
            databases.createUrlAttribute(DATABASE_ID, 'projects', 'coverImage', true),
            databases.createStringAttribute(DATABASE_ID, 'projects', 'tech', 255, false, undefined, true), // Array
            databases.createUrlAttribute(DATABASE_ID, 'projects', 'demoUrl', false),
            databases.createUrlAttribute(DATABASE_ID, 'projects', 'repoUrl', false),
        ];
        await Promise.allSettled(projectAttrs);

        // 3. Create Attributes for Skills
        console.log('Creating Skill Attributes...');
        const skillAttrs = [
            databases.createStringAttribute(DATABASE_ID, 'skills', 'name', 255, true),
            databases.createStringAttribute(DATABASE_ID, 'skills', 'category', 255, true),
            databases.createUrlAttribute(DATABASE_ID, 'skills', 'icon', false),
        ];
        await Promise.allSettled(skillAttrs);

        // 4. Create Attributes for Messages
        console.log('Creating Message Attributes...');
        const messageAttrs = [
            databases.createStringAttribute(DATABASE_ID, 'messages', 'name', 255, true),
            databases.createEmailAttribute(DATABASE_ID, 'messages', 'email', true),
            databases.createStringAttribute(DATABASE_ID, 'messages', 'message', 5000, true),
            databases.createDatetimeAttribute(DATABASE_ID, 'messages', 'timestamp', true),
        ];
        await Promise.allSettled(messageAttrs);

        console.log('🎉 Appwrite Setup Complete!');
        console.log('Please update your .env.local with the Collection IDs if they changed (though we used custom IDs "projects", "skills", "messages" if possible, otherwise check Console).');

    } catch (error) {
        console.error('❌ Setup failed:', error);
    }
}

setupAppwrite();
