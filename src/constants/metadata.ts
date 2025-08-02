import type { Metadata } from 'next';
import { APP_CONFIG } from './app-config';
import { PAGE_METADATA_KEY, type PageMetadataRecord } from '@/models/page-metadata';

/**
 * SEO and metadata constants for all pages
 */

export const DEFAULT_METADATA: Metadata = {
  title: {
    default: `${APP_CONFIG.name} - AI-Powered Image Processing & Photo Editing Tools`,
    template: `%s | ${APP_CONFIG.name}`,
  },
  description: APP_CONFIG.description,
  keywords: [
    'image processing',
    'photo editing',
    'background removal',
    'image compression',
    'OCR text extraction',
    'image resize',
    'AI image tools',
    'online photo editor',
    'image optimization',
    'PNG to SVG converter',
    'text to image generator',
    'placeholder image generator',
  ],
  authors: [{ name: APP_CONFIG.creator }],
  creator: APP_CONFIG.creator,
  publisher: APP_CONFIG.creator,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: APP_CONFIG.url,
    title: `${APP_CONFIG.name} - AI-Powered Image Processing & Photo Editing Tools`,
    description:
      'Transform your images with AI-powered tools. Remove backgrounds, compress images, OCR text extraction, and more.',
    siteName: APP_CONFIG.name,
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: `${APP_CONFIG.name} - AI-Powered Image Processing Tools`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${APP_CONFIG.name} - AI-Powered Image Processing Tools`,
    description:
      'Transform your images with AI-powered tools. Remove backgrounds, compress images, OCR text extraction, and more.',
    images: ['/twitter-image.jpg'],
    creator: APP_CONFIG.twitter,
  },
  metadataBase: new URL(APP_CONFIG.url),
  alternates: {
    canonical: '/',
  },
  category: 'technology',
} as const;

export const PAGE_METADATA: PageMetadataRecord = {
  [PAGE_METADATA_KEY.PNG_TO_SVG]: {
    title: 'PNG to SVG Converter - Convert Images to Vector Format',
    description:
      'Convert PNG images to SVG vector format online. Transform raster images to scalable vector graphics for logos, icons, and illustrations. Free online converter.',
    keywords: [
      'PNG to SVG',
      'convert PNG to SVG',
      'image to vector',
      'raster to vector',
      'SVG converter',
      'vector graphics',
      'scalable images',
      'logo converter',
      'icon converter',
      'image trace',
    ],
    canonical: '/png-to-svg',
    ogImage: '/og-png-to-svg.jpg',
    twitterImage: '/twitter-png-to-svg.jpg',
  },
  [PAGE_METADATA_KEY.IMAGE_COMPRESS]: {
    title: 'Image Compression - Reduce File Size Without Quality Loss',
    description:
      'Compress images online while maintaining high quality. Reduce file sizes by up to 90% for faster loading websites and easier sharing. Supports JPEG, PNG, WebP formats.',
    keywords: [
      'image compression',
      'compress images',
      'reduce file size',
      'image optimizer',
      'photo compression',
      'JPEG compression',
      'PNG compression',
      'WebP compression',
      'lossless compression',
      'image size reducer',
    ],
    canonical: '/image-compress',
    ogImage: '/og-image-compress.jpg',
    twitterImage: '/twitter-image-compress.jpg',
  },
  [PAGE_METADATA_KEY.BACKGROUND_REMOVE]: {
    title: 'AI Background Remover - Remove Image Backgrounds Instantly',
    description:
      'Remove backgrounds from images automatically using advanced AI technology. Perfect for product photos, portraits, and e-commerce. Free online background removal tool.',
    keywords: [
      'background removal',
      'remove background',
      'AI background remover',
      'transparent background',
      'product photography',
      'photo cutout',
      'image background',
      'e-commerce photos',
      'portrait editing',
      'photo editing',
    ],
    canonical: '/background-remove',
    ogImage: '/og-background-remove.jpg',
    twitterImage: '/twitter-background-remove.jpg',
  },
  [PAGE_METADATA_KEY.OCR]: {
    title: 'OCR Text Extraction - Extract Text from Images Online',
    description:
      'Extract text from images using advanced OCR technology. Support for 35+ languages including English, Chinese, Japanese, Arabic. Convert images to editable text.',
    keywords: [
      'OCR',
      'text extraction',
      'image to text',
      'optical character recognition',
      'text recognition',
      'document scanner',
      'image text reader',
      'multilingual OCR',
      'text from photo',
      'document digitization',
    ],
    canonical: '/ocr',
    ogImage: '/og-ocr.jpg',
    twitterImage: '/twitter-ocr.jpg',
  },
  [PAGE_METADATA_KEY.RESIZE]: {
    title: 'Image Resizer - Resize Images Online While Maintaining Quality',
    description:
      'Resize images to specific dimensions while maintaining quality and aspect ratio. Batch resize multiple images with advanced resizing algorithms.',
    keywords: [
      'image resize',
      'resize images',
      'image resizer',
      'photo resize',
      'batch resize',
      'image dimensions',
      'scale images',
      'crop images',
      'aspect ratio',
      'image scaling',
    ],
    canonical: '/resize',
    ogImage: '/og-resize.jpg',
    twitterImage: '/twitter-resize.jpg',
  },
  [PAGE_METADATA_KEY.PLACEHOLDER]: {
    title: 'Placeholder Image Generator - Create Custom Placeholder Images',
    description:
      'Generate custom placeholder images with various dimensions, colors, and text for your projects. Perfect for web development and design mockups.',
    keywords: [
      'placeholder images',
      'image placeholder',
      'placeholder generator',
      'dummy images',
      'mockup images',
      'web development',
      'design placeholders',
      'custom placeholders',
      'image mockups',
      'development tools',
    ],
    canonical: '/placeholder',
    ogImage: '/og-placeholder.jpg',
    twitterImage: '/twitter-placeholder.jpg',
  },
  [PAGE_METADATA_KEY.PHOTO_EDITOR]: {
    title: 'Advanced Photo Editor - Professional Image Editing Online',
    description:
      'Professional photo editing with advanced filters, adjustments, and effects. Apply vintage filters, adjust brightness, contrast, saturation, and more. Real-time preview with before/after comparison.',
    keywords: [
      'photo editor',
      'image editor',
      'photo filters',
      'image filters',
      'photo effects',
      'brightness adjustment',
      'contrast adjustment',
      'saturation',
      'vintage filter',
      'black and white',
      'sepia',
      'photo enhancement',
      'image enhancement',
      'professional photo editing',
    ],
    canonical: '/photo-editor',
    ogImage: '/og-photo-editor.jpg',
    twitterImage: '/twitter-photo-editor.jpg',
  },
  [PAGE_METADATA_KEY.BATCH_PROCESSOR]: {
    title: 'Batch Image Processor - Process Multiple Images at Once',
    description:
      'Process multiple images simultaneously with batch operations. Resize, compress, convert formats, and apply filters to hundreds of images at once. Save time with bulk image processing.',
    keywords: [
      'batch image processing',
      'bulk image processing',
      'batch resize',
      'batch compress',
      'batch convert',
      'multiple image processing',
      'bulk photo editing',
      'batch operations',
      'image automation',
      'workflow optimization',
    ],
    canonical: '/batch-processor',
    ogImage: '/og-batch-processor.jpg',
    twitterImage: '/twitter-batch-processor.jpg',
  },
  [PAGE_METADATA_KEY.IMAGE_OPTIMIZATION]: {
    title: 'Image Optimization - Optimize Images for Web Performance',
    description:
      'Optimize images for web performance with automatic compression, format conversion, and size optimization. Improve your website loading speed with optimized images.',
    keywords: [
      'image optimization',
      'web image optimization',
      'image performance',
      'optimize images',
      'image loading speed',
      'web performance',
      'image compression',
      'format optimization',
      'responsive images',
      'website optimization',
    ],
    canonical: '/image-optimization',
    ogImage: '/og-image-optimization.jpg',
    twitterImage: '/twitter-image-optimization.jpg',
  },
  [PAGE_METADATA_KEY.BLOG]: {
    title: 'Blog - Image Processing Tips & Tutorials | PixelCraft',
    description:
      'Learn image processing techniques, photography tips, and design tutorials. Expert insights on photo editing, optimization, and creative workflows.',
    keywords: [
      'image processing blog',
      'photography tips',
      'photo editing tutorials',
      'image optimization guide',
      'design tutorials',
      'creative workflows',
      'photo enhancement',
      'image editing tips',
      'digital photography',
      'visual content creation',
    ],
    canonical: '/blog',
    ogImage: '/og-blog.jpg',
    twitterImage: '/twitter-blog.jpg',
  },
  [PAGE_METADATA_KEY.FAQ]: {
    title: 'FAQ - Frequently Asked Questions | PixelCraft',
    description:
      'Find answers to common questions about image processing, file formats, compression, and our tools. Get help with troubleshooting and feature usage.',
    keywords: [
      'frequently asked questions',
      'image processing FAQ',
      'help center',
      'troubleshooting',
      'file formats',
      'image compression help',
      'tool usage guide',
      'technical support',
      'user guide',
      'common issues',
    ],
    canonical: '/faq',
    ogImage: '/og-faq.jpg',
    twitterImage: '/twitter-faq.jpg',
  },
} as const;

export const COMMON_SOCIAL_IMAGE_DIMENSIONS = {
  og: {
    width: 1200,
    height: 630,
  },
  twitter: {
    width: 1200,
    height: 630,
  },
} as const;
