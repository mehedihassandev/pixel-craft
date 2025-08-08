import { NextRequest, NextResponse } from 'next/server';
import { VIDEO_CONVERTER_CONFIG, VIDEO_CONVERTER_MESSAGES } from '@/constants/video-converter';

// Vercel-compatible video converter using cloud services
export const runtime = 'edge';
export const maxDuration = 300; // 5 minutes

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const format = formData.get('format') as string;
    const resolution = formData.get('resolution') as string;
    const quality = formData.get('quality') as 'high' | 'medium' | 'low';

    // Validate file
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Check file size
    if (file.size > VIDEO_CONVERTER_CONFIG.MAX_FILE_SIZE) {
      return NextResponse.json({ error: VIDEO_CONVERTER_MESSAGES.FILE_TOO_LARGE }, { status: 400 });
    }

    // Validate format
    if (!VIDEO_CONVERTER_CONFIG.OUTPUT_FORMATS.find(f => f.value === format)) {
      return NextResponse.json({ error: 'Invalid output format' }, { status: 400 });
    }

    // For Vercel deployment, we'll use a cloud video processing service
    // This is a fallback implementation that suggests using cloud services

    const cloudinaryApiKey = process.env.CLOUDINARY_API_KEY;
    const cloudinaryApiSecret = process.env.CLOUDINARY_API_SECRET;
    const cloudinaryCloudName = process.env.CLOUDINARY_CLOUD_NAME;

    if (!cloudinaryApiKey || !cloudinaryApiSecret || !cloudinaryCloudName) {
      return NextResponse.json(
        {
          error: 'Video conversion requires cloud processing setup',
          suggestion: 'Please configure Cloudinary for video processing on Vercel',
          documentation: '/docs/video-converter-setup.md#vercel-deployment',
          fallback: 'Use local deployment for FFmpeg-based processing',
        },
        { status: 501 }
      );
    }

    // Convert video using Cloudinary
    try {
      const cloudinaryFormData = new FormData();
      cloudinaryFormData.append('file', file);
      cloudinaryFormData.append('upload_preset', 'video_processing');
      cloudinaryFormData.append('resource_type', 'video');

      // Set transformation parameters based on user input
      const transformations = [];

      if (resolution && resolution !== 'original') {
        const [width, height] = resolution.split('x');
        transformations.push(`w_${width},h_${height},c_scale`);
      }

      if (quality) {
        const qualityMap = { high: 'auto:best', medium: 'auto:good', low: 'auto:low' };
        transformations.push(`q_${qualityMap[quality]}`);
      }

      if (format !== 'mp4') {
        transformations.push(`f_${format}`);
      }

      if (transformations.length > 0) {
        cloudinaryFormData.append('transformation', transformations.join(','));
      }

      const cloudinaryResponse = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudinaryCloudName}/video/upload`,
        {
          method: 'POST',
          body: cloudinaryFormData,
        }
      );

      if (!cloudinaryResponse.ok) {
        throw new Error('Cloudinary processing failed');
      }

      const result = await cloudinaryResponse.json();

      // Return the processed video URL
      return NextResponse.json({
        success: true,
        downloadUrl: result.secure_url,
        originalUrl: result.url,
        publicId: result.public_id,
        format: result.format,
        duration: result.duration,
        size: result.bytes,
      });
    } catch (cloudinaryError) {
      console.error('Cloudinary error:', cloudinaryError);
      return NextResponse.json(
        {
          error: 'Cloud video processing failed',
          details: cloudinaryError instanceof Error ? cloudinaryError.message : 'Unknown error',
          suggestion: 'Try with a smaller file or different format',
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      {
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
