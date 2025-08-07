export interface ImageFormat {
  value: string;
  label: string;
  extension: string;
  mimeType: string;
  supportsQuality: boolean;
  description: string;
}

export interface ConversionOptions {
  format: string;
  quality: number;
  width?: number;
  height?: number;
}

export interface ConversionResult {
  blob: Blob;
  originalSize: number;
  convertedSize: number;
  compressionRatio: string;
  format: string;
  filename: string;
}

export const SUPPORTED_FORMATS: ImageFormat[] = [
  {
    value: 'jpeg',
    label: 'JPEG',
    extension: 'jpg',
    mimeType: 'image/jpeg',
    supportsQuality: true,
    description: 'Good compression, smaller file size',
  },
  {
    value: 'png',
    label: 'PNG',
    extension: 'png',
    mimeType: 'image/png',
    supportsQuality: false,
    description: 'Lossless compression, supports transparency',
  },
  {
    value: 'webp',
    label: 'WebP',
    extension: 'webp',
    mimeType: 'image/webp',
    supportsQuality: true,
    description: 'Modern format, excellent compression',
  },
  {
    value: 'avif',
    label: 'AVIF',
    extension: 'avif',
    mimeType: 'image/avif',
    supportsQuality: true,
    description: 'Next-gen format, best compression',
  },
  {
    value: 'heic',
    label: 'HEIC',
    extension: 'jpg',
    mimeType: 'image/jpeg',
    supportsQuality: true,
    description: 'Apple format (converted to high-quality JPEG)',
  },
  {
    value: 'tiff',
    label: 'TIFF',
    extension: 'tiff',
    mimeType: 'image/tiff',
    supportsQuality: false,
    description: 'High quality, large file size',
  },
  {
    value: 'bmp',
    label: 'BMP',
    extension: 'png',
    mimeType: 'image/png',
    supportsQuality: false,
    description: 'Uncompressed format (converted to PNG)',
  },
  {
    value: 'gif',
    label: 'GIF',
    extension: 'png',
    mimeType: 'image/png',
    supportsQuality: false,
    description: 'Animation format (converted to PNG)',
  },
  {
    value: 'ico',
    label: 'ICO',
    extension: 'png',
    mimeType: 'image/png',
    supportsQuality: false,
    description: 'Icon format (32x32 PNG)',
  },
];

export const INPUT_FORMATS = [
  '.jpg',
  '.jpeg',
  '.png',
  '.webp',
  '.bmp',
  '.tiff',
  '.gif',
  '.heic',
  '.avif',
];
