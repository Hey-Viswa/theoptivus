import { Client, Databases, Storage } from 'node-appwrite';

const createAdminClient = async () => {
    const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
    const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;
    const key = process.env.APPWRITE_API_KEY || process.env.NEXT_PRIVATE_APPWRITE_SECRET_API_KEY;

    if (!endpoint || !projectId || !key) {
        throw new Error('APPWRITE_MISSING_CONFIG');
    }

    const client = new Client()
        .setEndpoint(endpoint)
        .setProject(projectId)
        .setKey(key);

    return {
        get databases() {
            return new Databases(client);
        },
        get storage() {
            return new Storage(client);
        }
    };
};

export { createAdminClient };
