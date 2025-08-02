/**
 * UI messages, labels, and text constants
 */

export const UI_MESSAGES = {
  // File upload messages
  CLICK_TO_SELECT: 'Click to select image',
  DRAG_AND_DROP: 'or drag and drop files here',
  SUPPORTS_FORMATS: 'Supports JPG, PNG, WebP formats',
  MAX_SIZE_10MB: 'Max size: 10MB',
  MAX_SIZE_50MB: 'Max size: 50MB',
  PNG_ONLY: 'PNG images only',

  // Processing messages
  PROCESSING: 'Processing...',
  COMPRESSING: 'Compressing...',
  CONVERTING: 'Converting...',
  ANALYZING: 'Analyzing...',
  EXTRACTING_TEXT: 'Extracting text...',

  // Success messages
  PROCESSING_COMPLETE: 'Processing complete!',
  COMPRESSION_COMPLETE: 'Compression complete!',
  CONVERSION_COMPLETE: 'Conversion complete!',
  TEXT_COPIED: 'Text copied to clipboard',
  URL_COPIED: 'URL copied to clipboard',

  // Error messages
  FAILED_TO_COPY: 'Failed to copy to clipboard',
  FAILED_TO_READ_FILE: 'Failed to read the image file',
  FAILED_TO_PROCESS: 'Failed to process the image. Please try again.',
  FAILED_TO_LOAD_IMAGE: 'Failed to load image',
  FAILED_TO_RESIZE: 'Failed to resize image',
  FAILED_TO_APPLY_FILTERS: 'Failed to apply filters',
  FAILED_TO_REPROCESS: 'Failed to reprocess the file',
  OCR_ERROR: 'OCR Error',
  UNKNOWN_ERROR: 'Unknown error',

  // Placeholders
  ENTER_PLACEHOLDER_TEXT: 'Enter placeholder text...',
  ENTER_WIDTH: 'Enter width...',
  ENTER_HEIGHT: 'Enter height...',

  // Labels
  WIDTH: 'Width',
  HEIGHT: 'Height',
  QUALITY: 'Quality',
  FORMAT: 'Format',
  BACKGROUND_COLOR: 'Background Color',
  TEXT_COLOR: 'Text Color',
  FONT_SIZE: 'Font Size',

  // Buttons
  DOWNLOAD: 'Download',
  PROCESS: 'Process',
  COMPRESS: 'Compress',
  CONVERT: 'Convert',
  UPLOAD: 'Upload',
  RESET: 'Reset',
  COPY: 'Copy',
  REPROCESS: 'Reprocess',

  // Progress
  PROGRESS: 'Progress',
  COMPLETED: 'Completed',
  PENDING: 'Pending',
  FAILED: 'Failed',
} as const;

export const FORM_PLACEHOLDERS = {
  WIDTH: 'e.g., 800',
  HEIGHT: 'e.g., 600',
  QUALITY: 'e.g., 90',
  FONT_SIZE: 'e.g., 16',
  TEXT: 'Sample Text',
  BACKGROUND_COLOR: 'ffffff',
  TEXT_COLOR: '000000',
} as const;

export const TOOLTIPS = {
  QUALITY: 'Higher quality = larger file size',
  WIDTH_HEIGHT: 'Image dimensions in pixels',
  BACKGROUND_COLOR: 'Hex color code without #',
  TEXT_COLOR: 'Hex color code without #',
  FONT_SIZE: 'Font size in pixels',
  MAINTAIN_ASPECT_RATIO: 'Keep original proportions',
} as const;

export const FILE_DESCRIPTIONS = {
  SUPPORTED_FORMATS_BASIC: 'Supports JPG, PNG, WebP formats',
  SUPPORTED_FORMATS_EXTENDED: 'Supports JPG, PNG, WebP, BMP, TIFF formats',
  PNG_ONLY: 'PNG images only',
  MAX_SIZE_BASIC: 'Max size: 10MB',
  MAX_SIZE_EXTENDED: 'Max size: 50MB',
  BATCH_LIMIT: 'Up to 50 files at once',
} as const;
