/**
 * File validation and processing constants
 */

export const SUPPORTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
] as const;

export const SUPPORTED_IMAGE_EXTENSIONS = ['jpg', 'jpeg', 'png', 'webp'] as const;

export const ADDITIONAL_SUPPORTED_TYPES = ['image/bmp', 'image/tiff', 'image/tif'] as const;

export const ALL_SUPPORTED_TYPES = [
  ...SUPPORTED_IMAGE_TYPES,
  ...ADDITIONAL_SUPPORTED_TYPES,
] as const;

export const FILE_SIZE_LIMITS = {
  // In bytes
  MAX_FILE_SIZE: 50 * 1024 * 1024, // 50MB
  MAX_BATCH_SIZE: 100 * 1024 * 1024, // 100MB total for batch
  MAX_SINGLE_IMAGE: 25 * 1024 * 1024, // 25MB for single image processing
  MIN_FILE_SIZE: 1, // 1 byte minimum

  // Compression targets
  COMPRESSION_TARGET_SIZE: 1024 * 1024, // 1MB target size

  // Readable formats
  get MAX_FILE_SIZE_MB() {
    return this.MAX_FILE_SIZE / (1024 * 1024);
  },
  get MAX_BATCH_SIZE_MB() {
    return this.MAX_BATCH_SIZE / (1024 * 1024);
  },
  get MAX_SINGLE_IMAGE_MB() {
    return this.MAX_SINGLE_IMAGE / (1024 * 1024);
  },
  get COMPRESSION_TARGET_SIZE_MB() {
    return this.COMPRESSION_TARGET_SIZE / (1024 * 1024);
  },
} as const;

export const IMAGE_DIMENSIONS = {
  MIN_WIDTH: 1,
  MIN_HEIGHT: 1,
  MAX_WIDTH: 5000,
  MAX_HEIGHT: 5000,
  DEFAULT_WIDTH: 400,
  DEFAULT_HEIGHT: 300,
} as const;

export const QUALITY_SETTINGS = {
  MIN_QUALITY: 1,
  MAX_QUALITY: 100,
  DEFAULT_QUALITY: 90,
  HIGH_QUALITY: 95,
  MEDIUM_QUALITY: 80,
  LOW_QUALITY: 60,
} as const;

export const FONT_SETTINGS = {
  MIN_FONT_SIZE: 1,
  MAX_FONT_SIZE: 500,
  DEFAULT_FONT_SIZE: 16,
} as const;

export const COLOR_VALIDATION = {
  HEX_PATTERN: /^[0-9a-fA-F]{6}$/,
  DEFAULT_BG_COLOR: 'ffffff',
  DEFAULT_TEXT_COLOR: '000000',
} as const;

export const COMPRESSION_PRESETS = {
  HIGH_QUALITY: {
    quality: 0.9,
    maxSizeMB: 2,
    description: 'Best quality, larger file size',
  },
  BALANCED: {
    quality: 0.8,
    maxSizeMB: 1,
    description: 'Good balance of quality and size',
  },
  WEB_OPTIMIZED: {
    quality: 0.7,
    maxSizeMB: 0.5,
    description: 'Optimized for web use',
  },
  MAXIMUM_COMPRESSION: {
    quality: 0.6,
    maxSizeMB: 0.25,
    description: 'Smallest file size',
  },
} as const;

export const OCR_SETTINGS = {
  DEFAULT_LANGUAGE: 'eng',
  MIN_CONFIDENCE: 0,
  MAX_CONFIDENCE: 100,
  DEFAULT_CONFIDENCE: 70,
  DEFAULT_PSM: 3, // Fully automatic page segmentation
  SUPPORTED_LANGUAGES: [
    { code: 'eng', name: 'English' },
    { code: 'spa', name: 'Spanish' },
    { code: 'fra', name: 'French' },
    { code: 'deu', name: 'German' },
    { code: 'ita', name: 'Italian' },
    { code: 'por', name: 'Portuguese' },
    { code: 'rus', name: 'Russian' },
    { code: 'jpn', name: 'Japanese' },
    { code: 'chi_sim', name: 'Chinese (Simplified)' },
    { code: 'chi_tra', name: 'Chinese (Traditional)' },
    { code: 'kor', name: 'Korean' },
    { code: 'ara', name: 'Arabic' },
    { code: 'hin', name: 'Hindi' },
  ],
  OUTPUT_FORMATS: ['text', 'json', 'hocr'] as const,
} as const;

export const BATCH_PROCESSING = {
  MAX_FILES_PER_BATCH: 50,
  CONCURRENT_PROCESSING_LIMIT: 3,
  PROGRESS_UPDATE_INTERVAL: 100, // milliseconds
} as const;

export const ERROR_MESSAGES = {
  UNSUPPORTED_FILE_TYPE: (type: string) =>
    `Unsupported file type: ${type}. Supported formats: ${SUPPORTED_IMAGE_EXTENSIONS.join(', ').toUpperCase()}`,
  FILE_TOO_LARGE: (size: number) =>
    `File too large: ${(size / (1024 * 1024)).toFixed(1)}MB. Maximum size: ${FILE_SIZE_LIMITS.MAX_FILE_SIZE_MB}MB`,
  EMPTY_FILE: 'File is empty',
  PROCESSING_FAILED: 'Failed to process image',
  COMPRESSION_FAILED: 'Failed to compress image',
  INVALID_DIMENSIONS: 'Invalid image dimensions',
  NETWORK_ERROR: 'Network error occurred',
} as const;
