/**
 * Central export point for all application constants
 * Import specific constants from their respective files, or use this index for convenience
 */

// App configuration and metadata
export * from './app-config';
export * from './metadata';

// File validation and processing
export * from './file-validation';

// UI constants and messages
export * from './ui-messages';

// Feature-specific constants
export * from './background-remove';
export * from './contact';
export * from './gif-to-json';
export * from './home';
export * from './image-compress';
export * from './ocr';
export * from './png-to-svg';
export * from './stats';

// Site structure and navigation
export * from './sitemap';

// Utility constants
export * from './utils';

// Re-export commonly used constants for convenience
export { APP_CONFIG, STRUCTURED_DATA, THEME_CONFIG, ROBOTS_CONFIG } from './app-config';

export { DEFAULT_METADATA, PAGE_METADATA } from './metadata';

export {
  SUPPORTED_IMAGE_TYPES,
  FILE_SIZE_LIMITS,
  IMAGE_DIMENSIONS,
  QUALITY_SETTINGS,
  COMPRESSION_PRESETS,
  ERROR_MESSAGES,
} from './file-validation';

export { SITEMAP_ROUTES, SITEMAP_CONFIG } from './sitemap';

export { DEFAULT_VALUES, UI_CONSTANTS, VALIDATION_PATTERNS } from './utils';

export { UI_MESSAGES, FORM_PLACEHOLDERS, TOOLTIPS, FILE_DESCRIPTIONS } from './ui-messages';
