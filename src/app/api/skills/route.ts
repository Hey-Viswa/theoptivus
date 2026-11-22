import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/server/appwrite';
import { DATABASE_ID } from '@/lib/appwrite';
import { ID } from 'node-appwrite';

const SKILLS_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_SKILLS || 'skills';
const SYSTEM_KEYS = new Set([
  '$id',
  '$createdAt',
  '$updatedAt',
  '$permissions',
  '$databaseId',
  '$collectionId',
]);

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Record<string, unknown>;

    if (!body.name || !body.slug) {
      return NextResponse.json({ error: 'Name and Slug are required' }, { status: 400 });
    }

    const { databases } = await createAdminClient();
    const skill = await databases.createDocument(
      DATABASE_ID,
      SKILLS_COLLECTION_ID,
      ID.unique(),
      body
    );

    return NextResponse.json(skill);
  } catch (error: unknown) {
    console.error('Error creating skill:', error);
    const message = error instanceof Error ? error.message : 'Internal Server Error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const body = (await req.json()) as Record<string, unknown>;

    if (!id) {
      return NextResponse.json({ error: 'Skill ID is required' }, { status: 400 });
    }

    const data = Object.fromEntries(
      Object.entries(body).filter(([key]) => !SYSTEM_KEYS.has(key))
    );

    const { databases } = await createAdminClient();
    const skill = await databases.updateDocument(
      DATABASE_ID,
      SKILLS_COLLECTION_ID,
      id,
      data
    );

    return NextResponse.json(skill);
  } catch (error: unknown) {
    console.error('Error updating skill:', error);
    const message = error instanceof Error ? error.message : 'Internal Server Error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Skill ID is required' }, { status: 400 });
    }

    const { databases } = await createAdminClient();
    await databases.deleteDocument(DATABASE_ID, SKILLS_COLLECTION_ID, id);

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error('Error deleting skill:', error);
    const message = error instanceof Error ? error.message : 'Internal Server Error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
