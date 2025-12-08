import { Client, Databases, Storage } from 'node-appwrite';

const createAdminClient = async () => {
    const client = new Client()
        .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
        .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!)
        .setKey(process.env.APPWRITE_API_KEY || process.env.NEXT_PRIVATE_APPWRITE_SECRET_API_KEY!);

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
