import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/server/appwrite';
import { ID } from 'node-appwrite';
import { InputFile } from 'node-appwrite/file';

export async function POST(req: NextRequest) {
  try {
    const { storage } = await createAdminClient();
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const inputFile = InputFile.fromBuffer(buffer, file.name);

    const result = await storage.createFile('project-assets', ID.unique(), inputFile);

    return NextResponse.json(result);
  } catch (error: unknown) {
    console.error('Error uploading file:', error);
    const message = error instanceof Error ? error.message : 'Internal Server Error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
