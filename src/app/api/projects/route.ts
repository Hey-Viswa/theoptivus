import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/server/appwrite';
import { COLLECTIONS, DATABASE_ID } from '@/lib/appwrite';
import { ID } from 'node-appwrite';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        // Basic validation
        if (!body.title || !body.slug) {
            return NextResponse.json({ error: 'Title and Slug are required' }, { status: 400 });
        }

        const { databases } = await createAdminClient();
        const project = await databases.createDocument(
            DATABASE_ID,
            COLLECTIONS.PROJECTS,
            ID.unique(),
            {
                ...body,
                date: body.date || new Date().toISOString(),
            }
        );

        return NextResponse.json(project);
    } catch (error: any) {
        console.error('Error creating project:', error);
        return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
    }
}

export async function PUT(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');
        const body = await req.json();

        if (!id) {
            return NextResponse.json({ error: 'Project ID is required' }, { status: 400 });
        }

        // Remove system attributes if present
        const { $id, $createdAt, $updatedAt, $permissions, $databaseId, $collectionId, ...data } = body;

        const { databases } = await createAdminClient();
        const project = await databases.updateDocument(
            DATABASE_ID,
            COLLECTIONS.PROJECTS,
            id,
            data
        );

        return NextResponse.json(project);
    } catch (error: any) {
        console.error('Error updating project:', error);
        return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'Project ID is required' }, { status: 400 });
        }

        const { databases } = await createAdminClient();
        await databases.deleteDocument(
            DATABASE_ID,
            COLLECTIONS.PROJECTS,
            id
        );

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error('Error deleting project:', error);
        return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
    }
}
