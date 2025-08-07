import { NextRequest, NextResponse } from 'next/server';
import sharp from 'sharp';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const targetFormat = formData.get('targetFormat') as string;
    const quality = parseInt(formData.get('quality') as string) || 90;
    const width = formData.get('width') ? parseInt(formData.get('width') as string) : undefined;
    const height = formData.get('height') ? parseInt(formData.get('height') as string) : undefined;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    if (!targetFormat) {
      return NextResponse.json({ error: 'No target format specified' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    let processedBuffer: Buffer;
    let mimeType: string;
    let extension: string;

    // Handle HEIC input files using Sharp
    if (
      file.type === 'image/heic' ||
      file.name.toLowerCase().endsWith('.heic') ||
      file.name.toLowerCase().endsWith('.heif')
    ) {
      try {
        // Try to convert HEIC using Sharp
        let sharpImage = sharp(buffer);

        // Apply resize if specified
        if (width || height) {
          sharpImage = sharpImage.resize(width, height, {
            fit: 'inside',
            withoutEnlargement: true,
          });
        }

        if (targetFormat === 'heic') {
          // If target is also HEIC, convert to high-quality JPEG as fallback
          processedBuffer = await sharpImage.jpeg({ quality: Math.max(quality, 90) }).toBuffer();
          mimeType = 'image/jpeg';
          extension = 'jpg';

          // Add headers to indicate this is a HEIC fallback
          const headers = new Headers();
          headers.set('Content-Type', mimeType);
          headers.set(
            'Content-Disposition',
            `attachment; filename="converted-heic-fallback.${extension}"`
          );
          headers.set('X-Original-Size', buffer.length.toString());
          headers.set('X-Converted-Size', processedBuffer.length.toString());
          headers.set('X-Compression-Ratio', '0');
          headers.set('X-Format-Note', 'HEIC converted to high-quality JPEG');

          return new NextResponse(new Uint8Array(processedBuffer), { headers });
        } else {
          // Convert HEIC to target format
          processedBuffer = await convertWithSharp(sharpImage, targetFormat, quality);
          ({ mimeType, extension } = getFormatInfo(targetFormat));
        }
      } catch (error) {
        console.error('HEIC conversion failed with Sharp:', error);
        return NextResponse.json(
          {
            error: 'HEIC conversion failed',
            details: error instanceof Error ? error.message : 'Unknown error',
            suggestion:
              'This server may not have HEIC support compiled in Sharp. Try converting to JPEG first using another tool.',
          },
          { status: 400 }
        );
      }
    } else {
      // Handle other input formats with Sharp
      let sharpImage = sharp(buffer);

      // Apply resize if specified
      if (width || height) {
        sharpImage = sharpImage.resize(width, height, {
          fit: 'inside',
          withoutEnlargement: true,
        });
      }

      // For HEIC output, we'll provide JPEG as fallback since Sharp doesn't support HEIC output
      if (targetFormat === 'heic') {
        // Convert to high-quality JPEG as HEIC alternative
        processedBuffer = await sharpImage.jpeg({ quality: Math.max(quality, 90) }).toBuffer();
        mimeType = 'image/jpeg';
        extension = 'jpg';

        // Add a header to indicate this is a HEIC fallback
        const headers = new Headers();
        headers.set('Content-Type', mimeType);
        headers.set(
          'Content-Disposition',
          `attachment; filename="converted-heic-fallback.${extension}"`
        );
        headers.set('X-Original-Size', buffer.length.toString());
        headers.set('X-Converted-Size', processedBuffer.length.toString());
        headers.set('X-Compression-Ratio', '0');
        headers.set('X-Format-Note', 'HEIC converted to high-quality JPEG');

        return new NextResponse(new Uint8Array(processedBuffer), { headers });
      } else {
        processedBuffer = await convertWithSharp(sharpImage, targetFormat, quality);
        ({ mimeType, extension } = getFormatInfo(targetFormat));
      }
    }

    // Get file info
    const originalSize = buffer.length;
    const convertedSize = processedBuffer.length;
    const compressionRatio = (((originalSize - convertedSize) / originalSize) * 100).toFixed(1);

    const headers = new Headers();
    headers.set('Content-Type', mimeType);
    headers.set('Content-Disposition', `attachment; filename="converted.${extension}"`);
    headers.set('X-Original-Size', originalSize.toString());
    headers.set('X-Converted-Size', convertedSize.toString());
    headers.set('X-Compression-Ratio', compressionRatio);

    return new NextResponse(new Uint8Array(processedBuffer), { headers });
  } catch (error) {
    console.error('Image conversion error:', error);
    return NextResponse.json(
      {
        error: 'Failed to convert image',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

async function convertWithSharp(
  sharpImage: sharp.Sharp,
  targetFormat: string,
  quality: number
): Promise<Buffer> {
  switch (targetFormat) {
    case 'jpeg':
    case 'jpg':
      return sharpImage.jpeg({ quality }).toBuffer();
    case 'png':
      return sharpImage.png().toBuffer();
    case 'webp':
      return sharpImage.webp({ quality }).toBuffer();
    case 'avif':
      return sharpImage.avif({ quality }).toBuffer();
    case 'tiff':
      return sharpImage.tiff().toBuffer();
    case 'bmp':
      // Sharp doesn't support BMP output, convert to PNG instead
      return sharpImage.png().toBuffer();
    case 'gif':
      // Sharp doesn't support GIF output directly, convert to PNG
      return sharpImage.png().toBuffer();
    case 'ico':
      return sharpImage.resize(32, 32).png().toBuffer(); // ICO as PNG 32x32
    default:
      // Default to JPEG for unsupported formats
      return sharpImage.jpeg({ quality }).toBuffer();
  }
}

function getFormatInfo(format: string): { mimeType: string; extension: string } {
  switch (format) {
    case 'jpeg':
    case 'jpg':
      return { mimeType: 'image/jpeg', extension: 'jpg' };
    case 'png':
      return { mimeType: 'image/png', extension: 'png' };
    case 'webp':
      return { mimeType: 'image/webp', extension: 'webp' };
    case 'avif':
      return { mimeType: 'image/avif', extension: 'avif' };
    case 'tiff':
      return { mimeType: 'image/tiff', extension: 'tiff' };
    case 'bmp':
      // Since we convert BMP to PNG, return PNG info
      return { mimeType: 'image/png', extension: 'png' };
    case 'gif':
      // Since we convert GIF to PNG, return PNG info
      return { mimeType: 'image/png', extension: 'png' };
    case 'ico':
      return { mimeType: 'image/png', extension: 'png' }; // ICO converted to PNG
    case 'heic':
      return { mimeType: 'image/jpeg', extension: 'jpg' }; // HEIC converted to JPEG
    default:
      return { mimeType: 'image/jpeg', extension: 'jpg' }; // Default fallback
  }
}
