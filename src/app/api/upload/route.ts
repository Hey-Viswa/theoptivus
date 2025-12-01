import { NextRequest, NextResponse } from 'next/server';
import { adminStorage } from '@/lib/server/appwrite';
import { ID } from 'node-appwrite';

// This is a simplified upload handler. 
// In a real app, you might generate a signed URL for client-side upload 
// or handle the stream here. Appwrite supports client-side uploads directly 
// with permissions, but for admin we can proxy or use server SDK.

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json({ error: 'No file provided' }, { status: 400 });
        }

        // Convert File to Buffer for Node SDK
        const buffer = Buffer.from(await file.arrayBuffer());

        // We need to construct a file object that Appwrite Node SDK accepts.
        // It usually expects a path or a buffer with filename.
        // The InputFile.fromBuffer is the way to go in newer SDKs.
        const { InputFile } = require('node-appwrite');

        const inputFile = InputFile.fromBuffer(buffer, file.name);

        const result = await adminStorage.createFile(
            'project-assets', // Bucket ID
            ID.unique(),
            inputFile
        );

        return NextResponse.json(result);
    } catch (error: any) {
        console.error('Error uploading file:', error);
        return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
    }
}
