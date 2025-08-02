/**
 * Application configuration constants
 * Contains global app settings, URLs, and metadata
 */

export const APP_CONFIG = {
  name: 'PixelCraft',
  description:
    'Transform your images with AI-powered tools. Remove backgrounds, compress images, OCR text extraction, resize photos, and create stunning visuals with PixelCraft - the ultimate online image processing platform.',
  url: 'https://pixel-craft-sigma.vercel.app',
  creator: 'PixelCraft Team',
  twitter: '@pixelcraft',
  version: '1.0.0',
} as const;

export const STRUCTURED_DATA = {
  context: 'https://schema.org',
  type: 'SoftwareApplication',
  name: APP_CONFIG.name,
  description:
    'AI-powered image processing and photo editing platform with background removal, compression, OCR, and more tools.',
  url: APP_CONFIG.url,
  applicationCategory: 'MultimediaApplication',
  operatingSystem: 'Web Browser',
  offers: {
    type: 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  aggregateRating: {
    type: 'AggregateRating',
    ratingValue: '4.8',
    reviewCount: '1250',
  },
  featureList: [
    'AI Background Removal',
    'Image Compression',
    'OCR Text Extraction',
    'Image Resizing',
    'PNG to SVG Conversion',
    'Text to Image Generation',
    'Placeholder Image Creation',
  ],
} as const;

export const THEME_CONFIG = {
  defaultTheme: 'system',
  themeColor: '#000000',
  enableSystem: true,
  disableTransitionOnChange: true,
} as const;

export const ROBOTS_CONFIG = {
  rules: {
    userAgent: '*',
    allow: '/',
    disallow: ['/api/', '/admin/'],
  },
  sitemap: `${APP_CONFIG.url}/sitemap.xml`,
};

export const PRECONNECT_DOMAINS = [
  'https://fonts.googleapis.com',
  'https://fonts.gstatic.com',
] as const;

export const CRITICAL_FONTS = [
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
] as const;
