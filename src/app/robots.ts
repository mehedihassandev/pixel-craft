import { MetadataRoute } from 'next';
import { ROBOTS_CONFIG } from '@/constants';

export default function robots(): MetadataRoute.Robots {
  return ROBOTS_CONFIG;
}
