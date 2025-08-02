/**
 * Server-side AdSense configuration loader
 * This file loads environment variables server-side and provides them to client components
 */

// Server-side environment variable access
const getServerAdSenseConfig = () => {
  return {
    publisherId: process.env.ADSENSE_PUBLISHER_ID || 'YOUR_PUBLISHER_ID',
    adSlots: {
      homepage: {
        banner: process.env.ADSENSE_HOMEPAGE_BANNER || 'YOUR_BANNER_AD_SLOT',
        rectangle: process.env.ADSENSE_HOMEPAGE_RECTANGLE || 'YOUR_RECTANGLE_AD_SLOT',
        sidebar: process.env.ADSENSE_HOMEPAGE_SIDEBAR || 'YOUR_SIDEBAR_AD_SLOT',
      },
      article: {
        top: process.env.ADSENSE_ARTICLE_TOP || 'YOUR_ARTICLE_TOP_AD_SLOT',
        middle: process.env.ADSENSE_ARTICLE_MIDDLE || 'YOUR_ARTICLE_MIDDLE_AD_SLOT',
        bottom: process.env.ADSENSE_ARTICLE_BOTTOM || 'YOUR_ARTICLE_BOTTOM_AD_SLOT',
      },
      general: {
        footer: process.env.ADSENSE_FOOTER || 'YOUR_FOOTER_AD_SLOT',
        mobile: process.env.ADSENSE_MOBILE || 'YOUR_MOBILE_AD_SLOT',
      },
    },
    settings: {
      lazyLoading: true,
      fullWidthResponsive: true,
      testMode: process.env.ADSENSE_TEST_MODE === 'true' || process.env.NODE_ENV === 'development',
    },
  };
};

// Export the server config
export const SERVER_ADSENSE_CONFIG = getServerAdSenseConfig();

// Create client-safe config (for hydration)
export const createClientAdSenseConfig = (serverConfig: typeof SERVER_ADSENSE_CONFIG) => {
  return {
    ...serverConfig,
    get clientId(): string {
      return `ca-pub-${this.publisherId}`;
    },
  };
};
