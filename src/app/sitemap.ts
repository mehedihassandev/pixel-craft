import { MetadataRoute } from 'next';
import { SITEMAP_CONFIG, SITEMAP_ROUTES } from '@/constants';

export default function sitemap(): MetadataRoute.Sitemap {
  return SITEMAP_ROUTES.map(route => ({
    url: `${SITEMAP_CONFIG.baseUrl}${route.path}`,
    lastModified: route.lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
