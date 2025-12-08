/**
 * Get the project image URL, supporting both local paths and Appwrite file IDs
 * @param imagePathOrId - Local path (starts with /) or Appwrite file ID
 * @param bucketId - Appwrite bucket ID (default: 'project-assets')
 * @returns Full image URL
 */
export function getProjectImageUrl(imagePathOrId?: string, bucketId: string = 'project-assets'): string {
    if (!imagePathOrId) {
        // Return a simple data URL placeholder instead of a file path
        return 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="450" viewBox="0 0 800 450"%3E%3Crect width="800" height="450" fill="%23111"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="24" fill="%23666"%3EPROJECT%3C/text%3E%3C/svg%3E';
    }

    // If it starts with /, it's a local path
    if (imagePathOrId.startsWith('/')) {
        return imagePathOrId;
    }

    // Otherwise, it's an Appwrite file ID
    const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
    const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;

    if (!endpoint || !projectId) {
        return 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="450" viewBox="0 0 800 450"%3E%3Crect width="800" height="450" fill="%23111"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="24" fill="%23666"%3EPROJECT%3C/text%3E%3C/svg%3E';
    }

    return `${endpoint}/storage/buckets/${bucketId}/files/${imagePathOrId}/view?project=${projectId}`;
}

/**
 * Get gallery image URLs, supporting both local paths and Appwrite file IDs
 * @param images - Array of local paths or Appwrite file IDs
 * @param bucketId - Appwrite bucket ID (default: 'project-assets')
 * @returns Array of full image URLs
 */
export function getGalleryImageUrls(images?: string[], bucketId: string = 'project-assets'): string[] {
    if (!images || images.length === 0) {
        return [];
    }

    return images.map(img => getProjectImageUrl(img, bucketId));
}
