/**
 * API endpoints and external URLs
 * Centralized definitions for all API calls and external services
 */

// Internal API endpoints
export const API_ENDPOINTS = {
  BACKGROUND_REMOVE: '/api/background-remove',
  IMAGE_CONVERT: '/api/image-convert',
  VIDEO_CONVERTER: '/api/video-converter',
  GITHUB_STATS: '/api/github-stats',
  OCR_EXTRACT: '/api/ocr',
  COMPRESS_IMAGE: '/api/compress',
  RESIZE_IMAGE: '/api/resize',
  BATCH_PROCESS: '/api/batch-process',
  HEALTH_CHECK: '/api/health',
} as const;

// External service URLs
export const EXTERNAL_URLS = {
  // GitHub URLs
  GITHUB_REPO: 'https://github.com/mehedihassandev/pixel-craft',
  GITHUB_README: 'https://github.com/mehedihassandev/pixel-craft#readme',
  GITHUB_ISSUES: 'https://github.com/mehedihassandev/pixel-craft/issues',
  GITHUB_DISCUSSIONS: 'https://github.com/mehedihassandev/pixel-craft/discussions',

  // Documentation and guides
  DOCUMENTATION_BASE: 'https://pixel-craft-docs.vercel.app',
  API_DOCS: 'https://pixel-craft-docs.vercel.app/api',
  TUTORIALS: 'https://pixel-craft-docs.vercel.app/tutorials',

  // Social and contact
  WEBSITE: 'https://pixel-craft-sigma.vercel.app',
  SUPPORT_EMAIL: 'mailto:support@pixelcraft.dev',

  // Analytics and tracking
  GOOGLE_ANALYTICS: 'https://www.googletagmanager.com/gtag/js',

  // CDN and assets
  CDN_BASE: 'https://cdn.pixelcraft.dev',
  STATIC_ASSETS: 'https://assets.pixelcraft.dev',
} as const;

// HTTP status codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  CONFLICT: 409,
  PAYLOAD_TOO_LARGE: 413,
  UNPROCESSABLE_ENTITY: 422,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
} as const;

// Content type validation
export const CONTENT_TYPE_CHECKS = {
  JSON: 'application/json',
  HTML: 'text/html',
  MULTIPART: 'multipart/form-data',
  URL_ENCODED: 'application/x-www-form-urlencoded',
} as const;
