import type { Metadata } from 'next';
import { PAGE_METADATA, COMMON_SOCIAL_IMAGE_DIMENSIONS, APP_CONFIG } from '@/constants';
import { PAGE_METADATA_KEY } from '@/models/page-metadata';

/**
 * Helper function to generate metadata for pages
 */
export function generatePageMetadata(pageKey: PAGE_METADATA_KEY): Metadata {
  const pageData = PAGE_METADATA[pageKey];

  return {
    title: pageData.title,
    description: pageData.description,
    keywords: [...pageData.keywords],
    openGraph: {
      title: pageData.title,
      description: pageData.description,
      url: `${APP_CONFIG.url}${pageData.canonical}`,
      images: [
        {
          url: pageData.ogImage,
          width: COMMON_SOCIAL_IMAGE_DIMENSIONS.og.width,
          height: COMMON_SOCIAL_IMAGE_DIMENSIONS.og.height,
          alt: pageData.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: pageData.title,
      description: pageData.description,
      images: [pageData.twitterImage],
    },
    alternates: {
      canonical: pageData.canonical,
    },
  };
}
