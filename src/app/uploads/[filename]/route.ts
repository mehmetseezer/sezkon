import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ filename: string }> }
) {
  const { filename } = await params;
  const filePath = path.join(process.cwd(), 'public', 'uploads', filename);

  try {
    // 1. Try to read the file from the local filesystem
    const file = await fs.readFile(filePath);

    // Determine content type based on extension
    const ext = path.extname(filename).toLowerCase();
    let contentType = 'application/octet-stream';
    if (ext === '.jpg' || ext === '.jpeg') contentType = 'image/jpeg';
    else if (ext === '.png') contentType = 'image/png';
    else if (ext === '.webp') contentType = 'image/webp';
    else if (ext === '.gif') contentType = 'image/gif';
    else if (ext === '.svg') contentType = 'image/svg+xml';
    else if (ext === '.ico') contentType = 'image/x-icon';

    return new NextResponse(file, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (localError: any) {
    // 2. If not found locally, try to fetch from the production URL as a fallback
    try {
      const prodUrl = `https://www.sezkon.com/uploads/${filename}`;
      const response = await fetch(prodUrl);
      
      if (!response.ok) {
        return new NextResponse('File not found', { status: 404 });
      }

      const blob = await response.blob();
      const contentType = response.headers.get('Content-Type') || 'application/octet-stream';

      return new NextResponse(blob, {
        headers: {
          'Content-Type': contentType,
          'Cache-Control': 'public, max-age=31536000, immutable',
        },
      });
    } catch (remoteError) {
      console.error('Failed to proxy image from production:', remoteError);
      return new NextResponse('File not found', { status: 404 });
    }
  }
}
