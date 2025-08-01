import { NextResponse } from 'next/server';

// Use Node.js runtime to support external uploads
// export const runtime = 'edge';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file || typeof file === 'string' || !(file instanceof Blob)) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const size = arrayBuffer.byteLength;
    const filename = (file as File).name || 'unknown';

    // Upload to Cloudinary using REST API
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.CLOUDINARY_UPLOAD_PRESET;
    if (!cloudName || !uploadPreset) {
      return NextResponse.json({ error: 'Cloudinary config missing' }, { status: 500 });
    }
    const uploadForm = new FormData();
    uploadForm.append('file', file as Blob);
    uploadForm.append('upload_preset', uploadPreset);
    const cloudRes = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      { method: 'POST', body: uploadForm }
    );
    const cloudData = await cloudRes.json();
    if (!cloudRes.ok) {
      return NextResponse.json({ error: 'Cloudinary upload failed', details: cloudData }, { status: 500 });
    }
    // cloudData.bytes is the delivered bytes after optimization
    return NextResponse.json({
      filename,
      originalSize: size,
      url: cloudData.secure_url,
      compressedSize: cloudData.bytes
    });
  } catch (err) {
    console.error('API upload error:', err);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
