/**
 * Enum for page metadata keys to prevent typos and provide better type safety
 */
export enum PageMetadataKey {
  PNG_TO_SVG = 'png-to-svg',
  IMAGE_COMPRESS = 'image-compress',
  BACKGROUND_REMOVE = 'background-remove',
  OCR = 'ocr',
  RESIZE = 'resize',
  PLACEHOLDER = 'placeholder',
  PHOTO_EDITOR = 'photo-editor',
  BATCH_PROCESSOR = 'batch-processor',
  IMAGE_OPTIMIZATION = 'image-optimization',
  BLOG = 'blog',
  FAQ = 'faq',
}

/**
 * Type for page metadata keys derived from the enum
 */
export type PageMetadataKeyType = `${PageMetadataKey}`;
