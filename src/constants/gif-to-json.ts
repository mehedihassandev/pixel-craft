/**
 * Constants for GIF to JSON conversion functionality
 */

export const GIF_TO_JSON_CONFIG = {
  // File restrictions
  MAX_FILE_SIZE: 50, // MB
  SUPPORTED_FORMATS: ['.gif'],
  MIME_TYPES: ['image/gif'],

  // Processing limits
  MAX_FRAMES: 500, // Maximum frames to process
  MAX_DIMENSIONS: 2048, // Maximum width/height in pixels

  // Output settings
  DEFAULT_OUTPUT_FORMAT: 'base64', // 'base64' | 'blob'
  COMPRESSION_QUALITY: 0.9,

  // UI messages
  MESSAGES: {
    UPLOAD_TITLE: 'Upload GIF File',
    UPLOAD_SUBTITLE: 'Convert your GIF to JSON format with frame data',
    PROCESSING: 'Extracting frames...',
    SUCCESS: 'GIF converted to JSON successfully!',
    ERROR: 'Failed to convert GIF. Please try again.',
    FILE_TOO_LARGE: 'File size exceeds 50MB limit',
    INVALID_FORMAT: 'Please select a valid GIF file',
    TOO_MANY_FRAMES: 'GIF has too many frames (max 500)',
    DIMENSIONS_TOO_LARGE: 'GIF dimensions are too large (max 2048x2048)',
  },

  // Processing options
  FRAME_EXTRACTION_OPTIONS: {
    preserveAspectRatio: true,
    backgroundColor: 'transparent',
    includeMetadata: true,
  },

  // Preview settings
  PREVIEW_CONFIG: {
    MAX_PREVIEW_FRAMES: 10,
    THUMBNAIL_SIZE: 150,
    AUTOPLAY: false,
  },
} as const;

export const GIF_JSON_SCHEMA = {
  width: 'number',
  height: 'number',
  frameCount: 'number',
  duration: 'number',
  loopCount: 'number',
  frames: [
    {
      index: 'number',
      delay: 'number',
      image: 'string (base64)',
      width: 'number',
      height: 'number',
      x: 'number',
      y: 'number',
      disposal: 'number',
    },
  ],
  metadata: {
    size: 'number',
    created: 'string',
    format: 'string',
  },
} as const;

export const OUTPUT_FORMAT_OPTIONS = [
  {
    value: 'base64',
    label: 'Base64 Encoded Images',
    description: 'Images encoded as base64 strings (larger file size)',
  },
  {
    value: 'blob',
    label: 'Separate Image Files + JSON',
    description: 'JSON metadata with separate PNG files (smaller total size)',
  },
] as const;

export const QUALITY_PRESETS = [
  {
    name: 'High Quality',
    quality: 0.95,
    description: 'Best quality, larger files',
  },
  {
    name: 'Balanced',
    quality: 0.8,
    description: 'Good quality, moderate file size',
  },
  {
    name: 'Compact',
    quality: 0.6,
    description: 'Smaller files, reduced quality',
  },
] as const;
