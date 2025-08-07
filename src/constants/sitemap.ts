import { APP_CONFIG } from './app-config';

/**
 * Sitemap configuration constants
 */

export const SITEMAP_CONFIG = {
  baseUrl: APP_CONFIG.url,
  changeFrequencies: {
    DAILY: 'daily',
    WEEKLY: 'weekly',
    MONTHLY: 'monthly',
    YEARLY: 'yearly',
  },
  priorities: {
    HOME: 1,
    MAIN_FEATURES: 0.9,
    FEATURES: 0.8,
    SECONDARY: 0.7,
    BLOG: 0.6,
    OTHER: 0.5,
  },
} as const;

export const SITEMAP_ROUTES = [
  {
    path: '',
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: SITEMAP_CONFIG.priorities.HOME,
  },
  {
    path: '/background-remove',
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: SITEMAP_CONFIG.priorities.MAIN_FEATURES,
  },
  {
    path: '/image-compress',
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: SITEMAP_CONFIG.priorities.MAIN_FEATURES,
  },
  {
    path: '/ocr',
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: SITEMAP_CONFIG.priorities.FEATURES,
  },
  {
    path: '/resize',
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: SITEMAP_CONFIG.priorities.FEATURES,
  },
  {
    path: '/png-to-svg',
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: SITEMAP_CONFIG.priorities.FEATURES,
  },
  {
    path: '/placeholder',
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: SITEMAP_CONFIG.priorities.SECONDARY,
  },
  {
    path: '/image-optimization',
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: SITEMAP_CONFIG.priorities.SECONDARY,
  },
  {
    path: '/photo-editor',
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: SITEMAP_CONFIG.priorities.SECONDARY,
  },
  {
    path: '/batch-processor',
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: SITEMAP_CONFIG.priorities.SECONDARY,
  },
  {
    path: '/gif-to-json',
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: SITEMAP_CONFIG.priorities.FEATURES,
  },
  {
    path: '/blog',
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: SITEMAP_CONFIG.priorities.BLOG,
  },
  {
    path: '/faq',
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: SITEMAP_CONFIG.priorities.OTHER,
  },
] as const;
