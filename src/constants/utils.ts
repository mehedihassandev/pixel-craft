/**
 * Utility constants for file size formatting and conversion
 */

export const BYTE_UNITS = ['Bytes', 'KB', 'MB', 'GB'] as const;

export const BYTE_CONVERSION = {
  BYTES_TO_KB: 1024,
  KB_TO_MB: 1024,
  MB_TO_GB: 1024,
  BYTES_TO_MB: 1024 * 1024,
  BYTES_TO_GB: 1024 * 1024 * 1024,
} as const;

export const TIME_CONSTANTS = {
  MILLISECONDS_PER_SECOND: 1000,
  SECONDS_PER_MINUTE: 60,
  MINUTES_PER_HOUR: 60,
  HOURS_PER_DAY: 24,
} as const;

export const PERFORMANCE_METRICS = {
  // Rough estimation: 1MB takes about 2 seconds to compress
  COMPRESSION_TIME_PER_MB: 2,
  // Add overhead for multiple files (seconds per file)
  FILE_PROCESSING_OVERHEAD: 0.5,
  // Minimum processing time
  MIN_PROCESSING_TIME: 1,
  // Progress update interval in milliseconds
  PROGRESS_UPDATE_INTERVAL: 100,
} as const;

export const UI_CONSTANTS = {
  // Debounce delays
  SEARCH_DEBOUNCE_MS: 300,
  RESIZE_DEBOUNCE_MS: 150,
  INPUT_DEBOUNCE_MS: 500,

  // Animation durations
  TOAST_DURATION_MS: 3000,
  LOADING_ANIMATION_MS: 200,

  // Pagination
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 100,

  // Progress indicators
  PROGRESS_BAR_UPDATE_INTERVAL: 50,
} as const;

export const VALIDATION_PATTERNS = {
  HEX_COLOR: /^[0-9a-fA-F]{6}$/,
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  URL: /^https?:\/\/.+/,
  FILENAME: /^[^<>:"/\\|?*]+$/,
} as const;

export const DEFAULT_VALUES = {
  PLACEHOLDER_TEXT: 'Sample Text',
  PLACEHOLDER_WIDTH: 400,
  PLACEHOLDER_HEIGHT: 300,
  BACKGROUND_COLOR: 'ffffff',
  TEXT_COLOR: '000000',
  FONT_SIZE: 16,
  QUALITY: 90,
  COMPRESSION_TARGET: 1, // MB
} as const;
