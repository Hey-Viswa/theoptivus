import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/server/appwrite';
import { z } from 'zod';
import { ID } from 'node-appwrite';

const contactFormSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    message: z.string().min(10, 'Message must be at least 10 characters'),
    honeypot: z.string().optional(),
});

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // Honeypot check
        if (body.honeypot) {
            // Silently fail for bots
            return NextResponse.json({ success: true }, { status: 200 });
        }

        const result = contactFormSchema.safeParse(body);

        if (!result.success) {
            return NextResponse.json(
                { error: 'Validation failed', details: result.error.flatten() },
                { status: 400 }
            );
        }

        const { name, email, message } = result.data;
        const { databases } = await createAdminClient();

        const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;
        const COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_MESSAGES!;

        if (!DATABASE_ID || !COLLECTION_ID) {
            throw new Error('Missing Appwrite configuration');
        }

        await databases.createDocument(
            DATABASE_ID,
            COLLECTION_ID,
            ID.unique(),
            {
                name,
                email,
                message,
                timestamp: new Date().toISOString(),
            }
        );

        return NextResponse.json({ success: true }, { status: 200 });

    } catch (error: any) {
        console.error('Error processing contact form:', error);
        return NextResponse.json(
            {
                error: 'Internal server error',
                details: error.message,
                stack: error.stack
            },
            { status: 500 }
        );
    }
}
