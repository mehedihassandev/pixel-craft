/**
 * UI Components Constants
 * Constants used across various UI components like headers, footers, etc.
 */

// Mobile breakpoint
export const MOBILE_BREAKPOINT = 768;

// Icon mappings for navigation and headers
export const ICON_MAP = {
  Eraser: 'Eraser',
  Zap: 'Zap',
  Sparkles: 'Sparkles',
  Maximize: 'Maximize',
  Archive: 'Archive',
  ImageIcon: 'ImageIcon',
  FileText: 'FileText',
  Layers: 'Layers',
  Palette: 'Palette',
} as const;

// File size formatting
export const FILE_SIZE_UNITS = ['Bytes', 'KB', 'MB', 'GB'] as const;

// Placeholder image format options
export const PLACEHOLDER_FORMAT_OPTIONS = [
  { value: 'png', label: 'PNG' },
  { value: 'jpg', label: 'JPG' },
  { value: 'webp', label: 'WebP' },
];

// Default placeholder dimensions
export const PLACEHOLDER_DEFAULTS = {
  WIDTH: 600,
  HEIGHT: 400,
} as const;

// OCR Visualizer canvas constraints
export const OCR_CANVAS_CONSTRAINTS = {
  MAX_WIDTH: 800,
  MAX_HEIGHT: 600,
} as const;

// Sidebar configuration
export const SIDEBAR_COOKIE_NAME = 'sidebar_state';
export const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days
export const SIDEBAR_WIDTH = '16rem';
export const SIDEBAR_WIDTH_MOBILE = '18rem';
export const SIDEBAR_WIDTH_ICON = '3rem';
export const SIDEBAR_KEYBOARD_SHORTCUT = 'b';
