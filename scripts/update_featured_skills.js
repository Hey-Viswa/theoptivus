const { Client, Databases, Query } = require('node-appwrite');
require('dotenv').config({ path: '.env.local' });

const client = new Client();

const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;
const apiKey = process.env.APPWRITE_API_KEY || process.env.NEXT_PRIVATE_APPWRITE_SECRET_API_KEY;

if (!endpoint || !projectId || !apiKey) {
    console.error('Error: Missing Appwrite configuration in .env.local');
    process.exit(1);
}

client
    .setEndpoint(endpoint)
    .setProject(projectId)
    .setKey(apiKey);

const databases = new Databases(client);

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
const SKILLS_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_SKILLS || 'skills';

const TOP_SKILLS = [
    'Next.js',
    'React.js',
    'MongoDB',
    'Appwrite Database',
    'Node.js',
    'Express.js',
    'Jetpack Compose',
    'Kotlin (Jetpack Compose)', // Handling potential name variations
    'Kotlin',
    'TailwindCSS'
];

async function updateFeaturedSkills() {
    try {
        console.log('Fetching all skills...');
        let allSkills = [];
        let offset = 0;
        let limit = 100;

        // Fetch all skills
        while (true) {
            const response = await databases.listDocuments(
                DATABASE_ID,
                SKILLS_COLLECTION_ID,
                [
                    Query.limit(limit),
                    Query.offset(offset)
                ]
            );

            allSkills = [...allSkills, ...response.documents];

            if (response.documents.length < limit) break;
            offset += limit;
        }

        console.log(`Found ${allSkills.length} skills.`);

        // Update each skill
        for (const skill of allSkills) {
            const isFeatured = TOP_SKILLS.some(topSkill =>
                skill.name.toLowerCase() === topSkill.toLowerCase() ||
                skill.name.toLowerCase().includes(topSkill.toLowerCase()) // Loose match for things like "Kotlin (Jetpack Compose)"
            );

            // Only update if the status is different to save API calls
            if (skill.featured !== isFeatured) {
                console.log(`Updating ${skill.name}: Featured = ${isFeatured}`);
                await databases.updateDocument(
                    DATABASE_ID,
                    SKILLS_COLLECTION_ID,
                    skill.$id,
                    {
                        featured: isFeatured
                    }
                );
            }
        }

        console.log('Featured skills updated successfully!');

    } catch (error) {
        console.error('Error updating skills:', error);
    }
}

updateFeaturedSkills();
