/**
 * Image filters and photo editing constants
 * Presets, filter definitions, and image processing settings
 */

// Filter range limits
export const FILTER_RANGES = {
  BRIGHTNESS: { min: -100, max: 100, default: 0 },
  CONTRAST: { min: -100, max: 100, default: 0 },
  SATURATION: { min: -100, max: 100, default: 0 },
  HUE: { min: 0, max: 360, default: 0 },
  BLUR: { min: 0, max: 20, default: 0 },
  SHARPEN: { min: 0, max: 100, default: 0 },
  SEPIA: { min: 0, max: 100, default: 0 },
  VIGNETTE: { min: 0, max: 100, default: 0 },
  TEMPERATURE: { min: -100, max: 100, default: 0 },
  EXPOSURE: { min: -100, max: 100, default: 0 },
  SHADOWS: { min: -100, max: 100, default: 0 },
  HIGHLIGHTS: { min: -100, max: 100, default: 0 },
} as const;

// Filter preset definitions
export const FILTER_PRESETS = [
  {
    name: 'None',
    description: 'Original image',
    options: {},
  },
  {
    name: 'Vivid',
    description: 'Enhanced colors and contrast',
    options: {
      saturation: 30,
      contrast: 15,
      brightness: 5,
    },
  },
  {
    name: 'Vintage',
    description: 'Classic vintage look',
    options: {
      vintage: true,
      contrast: -10,
      brightness: 5,
      vignette: 30,
    },
  },
  {
    name: 'Black & White',
    description: 'Classic monochrome',
    options: {
      blackAndWhite: true,
      contrast: 20,
    },
  },
  {
    name: 'Sepia',
    description: 'Warm sepia tone',
    options: {
      sepia: 80,
      brightness: 10,
    },
  },
  {
    name: 'Cool',
    description: 'Cool blue tones',
    options: {
      temperature: -40,
      contrast: 10,
      saturation: 15,
    },
  },
  {
    name: 'Warm',
    description: 'Warm golden tones',
    options: {
      temperature: 40,
      brightness: 5,
      saturation: 10,
    },
  },
  {
    name: 'High Contrast',
    description: 'Dramatic contrast',
    options: {
      contrast: 40,
      saturation: 20,
      sharpen: 20,
    },
  },
  {
    name: 'Soft',
    description: 'Soft and dreamy',
    options: {
      blur: 1,
      brightness: 10,
      contrast: -15,
    },
  },
  {
    name: 'Sharp',
    description: 'Enhanced details',
    options: {
      sharpen: 50,
      contrast: 15,
      saturation: 10,
    },
  },
] as const;

// Image processing constants
export const IMAGE_PROCESSING = {
  DEFAULT_QUALITY: 0.9,
  PNG_QUALITY: 1.0,
  JPEG_QUALITY: 0.85,
  WEBP_QUALITY: 0.8,
  CANVAS_MAX_SIZE: 4096,
  THUMBNAIL_SIZE: 200,
  PREVIEW_MAX_SIZE: 800,

  // Canvas filters
  CSS_FILTER_UNITS: {
    brightness: '%',
    contrast: '%',
    saturate: '%',
    'hue-rotate': 'deg',
    blur: 'px',
    sepia: '%',
    grayscale: '%',
  },

  // Color manipulation
  VINTAGE_TRANSFORM: {
    red: { r: 1.2, g: 0.1, b: 0 },
    green: { r: 0.1, g: 1.1, b: 0 },
    blue: { r: 0, g: 0, b: 0.8 },
  },

  // Kernel filters
  SHARPEN_KERNEL: [0, -1, 0, -1, 5, -1, 0, -1, 0],
  BLUR_KERNEL: [1, 2, 1, 2, 4, 2, 1, 2, 1],
  EDGE_DETECTION_KERNEL: [-1, -1, -1, -1, 8, -1, -1, -1, -1],
} as const;

// Error messages for image processing
export const IMAGE_PROCESSING_ERRORS = {
  CANVAS_NOT_AVAILABLE: 'Canvas not available - this function can only run on the client side',
  FAILED_TO_CREATE_BLOB: 'Failed to create blob',
  FAILED_TO_LOAD_IMAGE: 'Failed to load image',
  PROCESSING_FAILED: 'Processing failed',
  QUEUE_CLEARED: 'Queue cleared',
  CONTEXT_NOT_AVAILABLE: 'Canvas context not available',
  UNSUPPORTED_FORMAT: 'Unsupported image format',
  IMAGE_TOO_LARGE: 'Image dimensions exceed maximum allowed size',
} as const;
