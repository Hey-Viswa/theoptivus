import { Client, Databases } from 'node-appwrite';

const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID)
    .setKey(process.env.NEXT_PRIVATE_APPWRITE_SECRET_API_KEY);

const databases = new Databases(client);

async function testConnection() {
    try {
        console.log('Testing Appwrite connection...');
        console.log('Endpoint:', process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT);
        console.log('Project ID:', process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);

        // Try to get the database details
        const db = await databases.get(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID);
        console.log('✅ Connection successful!');
        console.log('Database Name:', db.name);
        console.log('Database ID:', db.$id);
    } catch (error) {
        console.error('❌ Connection failed:', error.message);
    }
}

testConnection();
