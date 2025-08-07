/**
 * MIME types and file format constants
 * Centralized definitions for all supported file types
 */

// Image MIME types
export const IMAGE_MIME_TYPES = {
  PNG: 'image/png',
  JPEG: 'image/jpeg',
  JPG: 'image/jpg',
  WEBP: 'image/webp',
  GIF: 'image/gif',
  SVG: 'image/svg+xml',
  BMP: 'image/bmp',
  TIFF: 'image/tiff',
  HEIC: 'image/heic',
  HEIF: 'image/heif',
  AVIF: 'image/avif',
} as const;

// Video MIME types
export const VIDEO_MIME_TYPES = {
  MP4: 'video/mp4',
  WEBM: 'video/webm',
  OGV: 'video/ogg',
  AVI: 'video/avi',
  MOV: 'video/quicktime',
  WMV: 'video/x-ms-wmv',
  FLV: 'video/x-flv',
  MKV: 'video/x-matroska',
} as const;

// Document MIME types
export const DOCUMENT_MIME_TYPES = {
  JSON: 'application/json',
  TEXT: 'text/plain',
  HTML: 'text/html',
  CSS: 'text/css',
  JAVASCRIPT: 'text/javascript',
  XML: 'text/xml',
  PDF: 'application/pdf',
  ZIP: 'application/zip',
  RAR: 'application/x-rar-compressed',
} as const;

// File accept patterns for input elements
export const FILE_ACCEPT_PATTERNS = {
  IMAGES: 'image/*',
  VIDEOS: 'video/*',
  PNG_ONLY: IMAGE_MIME_TYPES.PNG,
  HEIC_IMAGES: [IMAGE_MIME_TYPES.HEIC, IMAGE_MIME_TYPES.HEIF].join(','),
  ALL_IMAGES: Object.values(IMAGE_MIME_TYPES).join(','),
  ALL_VIDEOS: Object.values(VIDEO_MIME_TYPES).join(','),
  DOCUMENTS: Object.values(DOCUMENT_MIME_TYPES).join(','),
} as const;

// Common image validation patterns
export const IMAGE_VALIDATION = {
  STARTS_WITH_IMAGE: 'image/',
  HEIC_EXTENSIONS: ['.heic', '.heif'],
  COMMON_EXTENSIONS: ['.jpg', '.jpeg', '.png', '.webp', '.gif'],
  VECTOR_EXTENSIONS: ['.svg'],
  RAW_EXTENSIONS: ['.raw', '.cr2', '.nef', '.arw'],
} as const;

// Data URI prefixes
export const DATA_URI_PREFIXES = {
  PNG: `data:${IMAGE_MIME_TYPES.PNG};base64,`,
  JPEG: `data:${IMAGE_MIME_TYPES.JPEG};base64,`,
  SVG: `data:${IMAGE_MIME_TYPES.SVG};base64,`,
  JSON: `data:${DOCUMENT_MIME_TYPES.JSON};base64,`,
  TEXT: `data:${DOCUMENT_MIME_TYPES.TEXT};base64,`,
} as const;
