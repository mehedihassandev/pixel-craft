import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import { join } from 'path';
import { VideoConverter, ConversionOptions } from '@/lib/video-converter';
import { VIDEO_CONVERTER_CONFIG, VIDEO_CONVERTER_MESSAGES } from '@/constants/video-converter';

// FFmpeg-based video conversion for local/Docker deployment
export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const format = formData.get('format') as string;
    const resolution = formData.get('resolution') as string;
    const quality = formData.get('quality') as 'high' | 'medium' | 'low';
    const frameRate = formData.get('frameRate') as string;
    const duration = formData.get('duration')
      ? parseInt(formData.get('duration') as string)
      : undefined;

    // Validate file
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Check file size
    if (file.size > VIDEO_CONVERTER_CONFIG.MAX_FILE_SIZE) {
      return NextResponse.json({ error: VIDEO_CONVERTER_MESSAGES.FILE_TOO_LARGE }, { status: 400 });
    }

    // Validate format
    if (!VIDEO_CONVERTER_CONFIG.OUTPUT_FORMATS.find((f: any) => f.value === format)) {
      return NextResponse.json({ error: 'Invalid output format' }, { status: 400 });
    }

    // Ensure temp directory exists
    await VideoConverter.ensureTempDir();

    // Create temporary file paths
    const tempDir = join(process.cwd(), 'tmp', 'video-conversions');
    const inputFileName = `input_${Date.now()}_${file.name}`;
    const inputPath = join(tempDir, inputFileName);

    const outputFileName = VideoConverter.generateUniqueFilename(file.name, format);
    const outputPath = join(tempDir, outputFileName);

    try {
      // Save uploaded file
      const arrayBuffer = await file.arrayBuffer();
      await fs.writeFile(inputPath, Buffer.from(arrayBuffer));

      // Get video information
      const videoInfo = await VideoConverter.getVideoInfo(inputPath);

      // Prepare conversion options
      const conversionOptions: ConversionOptions = {
        format,
        resolution: resolution || 'original',
        quality: quality || 'medium',
        frameRate: frameRate || 'original',
        duration,
      };

      // Special handling for GIF format
      if (format === 'gif' && !duration) {
        const videoDuration = videoInfo.format?.duration || 0;
        conversionOptions.duration = Math.min(
          videoDuration,
          VIDEO_CONVERTER_CONFIG.MAX_GIF_DURATION
        );
      }

      // Convert video
      await VideoConverter.convertVideo(
        inputPath,
        outputPath,
        conversionOptions,
        (progress: any) => {
          // Progress tracking could be implemented with WebSockets or Server-Sent Events
          console.log(`Conversion progress: ${progress.percent}%`);
        }
      );

      // Read converted file
      const convertedFile = await fs.readFile(outputPath);

      // Get output format info
      const formatInfo = VIDEO_CONVERTER_CONFIG.OUTPUT_FORMATS.find((f: any) => f.value === format);
      const mimeType = getMimeType(format);

      // Cleanup temporary files
      await Promise.all([
        VideoConverter.cleanupFile(inputPath),
        VideoConverter.cleanupFile(outputPath),
      ]);

      // Return converted file
      return new NextResponse(convertedFile, {
        status: 200,
        headers: {
          'Content-Type': mimeType,
          'Content-Disposition': `attachment; filename="${outputFileName}"`,
          'Content-Length': convertedFile.length.toString(),
        },
      });
    } catch (conversionError) {
      console.error('Video conversion error:', conversionError);

      // Cleanup files in case of error
      await Promise.all([
        VideoConverter.cleanupFile(inputPath).catch(() => {}),
        VideoConverter.cleanupFile(outputPath).catch(() => {}),
      ]);

      return NextResponse.json(
        {
          error: VIDEO_CONVERTER_MESSAGES.CONVERSION_ERROR,
          details: conversionError instanceof Error ? conversionError.message : 'Unknown error',
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

function getMimeType(format: string): string {
  const mimeTypes: Record<string, string> = {
    mp4: 'video/mp4',
    webm: 'video/webm',
    mov: 'video/quicktime',
    avi: 'video/x-msvideo',
    flv: 'video/x-flv',
    wmv: 'video/x-ms-wmv',
    gif: 'image/gif',
  };

  return mimeTypes[format] || 'application/octet-stream';
}
