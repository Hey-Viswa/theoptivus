import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/server/appwrite';
import { COLLECTIONS, DATABASE_ID } from '@/lib/appwrite';
import { ID } from 'node-appwrite';

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
  } catch (error: unknown) {
    console.error('Error creating project:', error);
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
      return NextResponse.json({ error: 'Project ID is required' }, { status: 400 });
    }

    const data = Object.fromEntries(
      Object.entries(body).filter(([key]) => !SYSTEM_KEYS.has(key))
    );

    const { databases } = await createAdminClient();
    const project = await databases.updateDocument(
      DATABASE_ID,
      COLLECTIONS.PROJECTS,
      id,
      data
    );

    return NextResponse.json(project);
  } catch (error: unknown) {
    console.error('Error updating project:', error);
    const message = error instanceof Error ? error.message : 'Internal Server Error';
    return NextResponse.json({ error: message }, { status: 500 });
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
    await databases.deleteDocument(DATABASE_ID, COLLECTIONS.PROJECTS, id);

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error('Error deleting project:', error);
    const message = error instanceof Error ? error.message : 'Internal Server Error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
