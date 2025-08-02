/**
 * Enum for page metadata keys
 * This ensures type safety and prevents typos when referencing page metadata
 */

export enum PAGE_METADATA_KEY {
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
 * Type alias for page metadata key values
 */
export type PageMetadataKeyType = `${PAGE_METADATA_KEY}`;

/**
 * Array of all page metadata keys (useful for iteration)
 */
export const PAGE_METADATA_KEYS = Object.values(PAGE_METADATA_KEY) as PageMetadataKeyType[];

/**
 * Type for the page metadata object structure
 */
export interface PageMetadataConfig {
  title: string;
  description: string;
  keywords: readonly string[];
  canonical: string;
  ogImage: string;
  twitterImage: string;
}

/**
 * Type for the complete page metadata record
 */
export type PageMetadataRecord = Record<PageMetadataKeyType, PageMetadataConfig>;
