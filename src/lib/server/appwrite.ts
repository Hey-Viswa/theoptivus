import { Client, Databases, Storage, Account, Users } from 'node-appwrite';

const client = new Client();

const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;
const apiKey = process.env.APPWRITE_API_KEY || process.env.NEXT_PRIVATE_APPWRITE_SECRET_API_KEY;

if (!endpoint || !projectId || !apiKey) {
    console.warn('Appwrite server configuration missing. Check .env.local');
} else {
    client
        .setEndpoint(endpoint)
        .setProject(projectId)
        .setKey(apiKey);
}

export const adminDatabases = new Databases(client);
export const adminStorage = new Storage(client);
export const adminAccount = new Account(client);
export const adminUsers = new Users(client);
export { client as adminClient };
