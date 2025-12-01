import { NextRequest, NextResponse } from 'next/server';
import { adminDatabases } from '@/lib/server/appwrite';
import { COLLECTIONS, DATABASE_ID } from '@/lib/appwrite';
import { ID } from 'node-appwrite';

const SKILLS_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_SKILLS || 'skills';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        if (!body.name || !body.slug) {
            return NextResponse.json({ error: 'Name and Slug are required' }, { status: 400 });
        }

        const skill = await adminDatabases.createDocument(
            DATABASE_ID,
            SKILLS_COLLECTION_ID,
            ID.unique(),
            body
        );

        return NextResponse.json(skill);
    } catch (error: any) {
        console.error('Error creating skill:', error);
        return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
    }
}

export async function PUT(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');
        const body = await req.json();

        if (!id) {
            return NextResponse.json({ error: 'Skill ID is required' }, { status: 400 });
        }

        // Remove system attributes
        const { $id, $createdAt, $updatedAt, $permissions, $databaseId, $collectionId, ...data } = body;

        const skill = await adminDatabases.updateDocument(
            DATABASE_ID,
            SKILLS_COLLECTION_ID,
            id,
            data
        );

        return NextResponse.json(skill);
    } catch (error: any) {
        console.error('Error updating skill:', error);
        return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'Skill ID is required' }, { status: 400 });
        }

        await adminDatabases.deleteDocument(
            DATABASE_ID,
            SKILLS_COLLECTION_ID,
            id
        );

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error('Error deleting skill:', error);
        return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
    }
}
