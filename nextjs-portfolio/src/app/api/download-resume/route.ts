import { NextRequest, NextResponse } from 'next/server';
import { client } from '@/sanity/client';

export async function GET(request: NextRequest) {
  try {
    // Get the about data from Sanity
    const aboutData = await client.fetch(`
      *[_type == "about"][0] {
        resume {
          asset->{
            _id,
            url,
            originalFilename,
            size,
            mimeType
          },
          title
        }
      }
    `);

    if (!aboutData?.resume?.asset?.url) {
      return NextResponse.json(
        { error: 'Resume not found' },
        { status: 404 }
      );
    }

    const { asset, title } = aboutData.resume;
    const resumeUrl = asset.url;
    const filename = title || asset.originalFilename || 'Resume.pdf';

    // Fetch the resume file from Sanity CDN
    const response = await fetch(resumeUrl);

    if (!response.ok) {
      throw new Error(`Failed to fetch resume: ${response.statusText}`);
    }

    // Get the file buffer
    const fileBuffer = await response.arrayBuffer();

    const headers = new Headers();
    headers.set('Content-Type', asset.mimeType || 'application/pdf');
    headers.set('Content-Disposition', `attachment; filename="${filename}"`);
    headers.set('Content-Length', asset.size?.toString() || fileBuffer.byteLength.toString());
    headers.set('Cache-Control', 'public, max-age=3600'); // Cache for 1 hour
    // Create response with proper headers for download
    return new NextResponse(fileBuffer, {
      status: 200,
      headers,
    });

  } catch (error) {
    console.error('Resume download error:', error);
    return NextResponse.json(
      { error: 'Failed to download resume' },
      { status: 500 }
    );
  }
}

