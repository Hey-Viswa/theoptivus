import { ID, Storage } from 'node-appwrite';
import { createAdminClient } from './server/appwrite';

/**
 * Upload a file to an Appwrite storage bucket
 * @param file - File buffer or Blob
 * @param fileName - Name for the file
 * @param bucketId - Bucket ID (default: 'project-assets')
 * @returns File ID or null if upload fails
 */
export async function uploadToAppwriteBucket(
    file: Buffer | Blob,
    fileName: string,
    bucketId: string = 'project-assets'
): Promise<string | null> {
    try {
        const { storage } = await createAdminClient();

        const result = await storage.createFile(
            bucketId,
            ID.unique(),
            file
        );

        console.log(`File uploaded successfully: ${result.$id}`);
        return result.$id;
    } catch (error) {
        console.error('Error uploading file to Appwrite:', error);
        return null;
    }
}

/**
 * Upload multiple files to Appwrite bucket
 * @param files - Array of file objects with buffer and name
 * @param bucketId - Bucket ID (default: 'project-assets')
 * @returns Array of file IDs
 */
export async function uploadMultipleFiles(
    files: Array<{ buffer: Buffer | Blob; name: string }>,
    bucketId: string = 'project-assets'
): Promise<string[]> {
    const fileIds: string[] = [];

    for (const file of files) {
        const fileId = await uploadToAppwriteBucket(file.buffer, file.name, bucketId);
        if (fileId) {
            fileIds.push(fileId);
        }
    }

    return fileIds;
}

/**
 * Delete a file from Appwrite bucket
 * @param fileId - File ID to delete
 * @param bucketId - Bucket ID (default: 'project-assets')
 * @returns Success boolean
 */
export async function deleteFromAppwriteBucket(
    fileId: string,
    bucketId: string = 'project-assets'
): Promise<boolean> {
    try {
        const { storage } = await createAdminClient();
        await storage.deleteFile(bucketId, fileId);
        console.log(`File deleted successfully: ${fileId}`);
        return true;
    } catch (error) {
        console.error('Error deleting file from Appwrite:', error);
        return false;
    }
}
