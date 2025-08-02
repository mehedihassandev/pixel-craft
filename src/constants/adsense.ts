/**
 * Google AdSense configuration constants
 * Configure your AdSense settings and ad placements here
 */

import { SERVER_ADSENSE_CONFIG, createClientAdSenseConfig } from './adsense-server';

// Create the client-side configuration from server config
export const ADSENSE_CONFIG = createClientAdSenseConfig(SERVER_ADSENSE_CONFIG);

/**
 * AdSense policies and guidelines compliance
 */
export const ADSENSE_POLICIES = {
  // Minimum content requirements
  minContentLength: 300, // words

  // Ad placement guidelines
  maxAdsPerPage: 3,
  minDistanceBetweenAds: 300, // pixels

  // Content guidelines
  allowedContent: [
    'Educational content',
    'Technology tutorials',
    'Image processing guides',
    'Software documentation',
  ],

  // Prohibited content (ensure your content doesn't fall into these categories)
  prohibitedContent: ['Adult content', 'Violence', 'Illegal activities', 'Copyrighted material'],
} as const;

/**
 * Test ad unit configuration for development
 */
export const TEST_AD_CONFIG = {
  publisherId: '0000000000000000',
  clientId: 'ca-pub-0000000000000000',
  adSlots: {
    banner: '1234567890',
    rectangle: '1234567891',
    sidebar: '1234567892',
  },
} as const;
