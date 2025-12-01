const { Client, Databases, Query } = require('node-appwrite');
const dotenv = require('dotenv');

dotenv.config({ path: '.env.local' });

const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID)
    .setKey(process.env.APPWRITE_API_KEY || process.env.NEXT_PRIVATE_APPWRITE_SECRET_API_KEY);

const databases = new Databases(client);

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
const SKILLS_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_SKILLS || 'skills';

async function updateCSSLevel() {
    try {
        console.log('Fetching CSS3 skill...');
        const skills = await databases.listDocuments(
            DATABASE_ID,
            SKILLS_COLLECTION_ID,
            [Query.equal('name', 'CSS3')]
        );

        if (skills.documents.length === 0) {
            console.error('CSS3 skill not found!');
            return;
        }

        const cssSkill = skills.documents[0];
        console.log(`Found CSS3 (ID: ${cssSkill.$id}), Current Level: ${cssSkill.level}`);

        console.log('Updating level to Intermediate...');
        await databases.updateDocument(
            DATABASE_ID,
            SKILLS_COLLECTION_ID,
            cssSkill.$id,
            {
                level: 'Intermediate'
            }
        );

        console.log('CSS3 level updated successfully!');
    } catch (error) {
        console.error('Error updating skill:', error);
    }
}

updateCSSLevel();
