import { ADSENSE_POLICIES } from '@/constants';

/**
 * Utility functions for AdSense compliance and performance optimization
 */

/**
 * Check if content meets minimum requirements for ad placement
 */
export function isContentEligibleForAds(contentLength: number): boolean {
  return contentLength >= ADSENSE_POLICIES.minContentLength;
}

/**
 * Calculate optimal ad placement positions based on content length
 */
export function calculateAdPlacements(contentLength: number): number[] {
  const placements: number[] = [];
  const maxAds = Math.min(ADSENSE_POLICIES.maxAdsPerPage, Math.floor(contentLength / 500));

  if (maxAds >= 1) placements.push(0.3); // 30% through content
  if (maxAds >= 2) placements.push(0.7); // 70% through content
  if (maxAds >= 3) placements.push(0.5); // 50% through content (middle)

  return placements.sort();
}

/**
 * Check if two ad positions are far enough apart
 */
export function isAdSpacingValid(
  position1: number,
  position2: number,
  contentHeight: number
): boolean {
  const pixelDistance = Math.abs(position1 - position2) * contentHeight;
  return pixelDistance >= ADSENSE_POLICIES.minDistanceBetweenAds;
}

/**
 * Validate ad configuration
 */
export function validateAdConfig(publisherId: string, adSlot: string): boolean {
  // Basic validation
  if (!publisherId || publisherId === 'YOUR_PUBLISHER_ID') {
    console.warn('[AdSense] Publisher ID not configured');
    return false;
  }

  if (!adSlot || adSlot === 'YOUR_BANNER_AD_SLOT' || adSlot.includes('YOUR_')) {
    console.warn('[AdSense] Ad slot not configured');
    return false;
  }

  return true;
}

/**
 * Performance monitoring for ads
 */
export class AdPerformanceMonitor {
  private static instance: AdPerformanceMonitor;
  private loadTimes: Map<string, number> = new Map();

  static getInstance(): AdPerformanceMonitor {
    if (!AdPerformanceMonitor.instance) {
      AdPerformanceMonitor.instance = new AdPerformanceMonitor();
    }
    return AdPerformanceMonitor.instance;
  }

  trackAdLoad(adSlot: string, startTime: number): void {
    const loadTime = performance.now() - startTime;
    this.loadTimes.set(adSlot, loadTime);

    // Log slow-loading ads
    if (loadTime > 3000) {
      console.warn(`[AdSense] Slow ad load detected for slot ${adSlot}: ${loadTime}ms`);
    }
  }

  getAverageLoadTime(): number {
    if (this.loadTimes.size === 0) return 0;
    const total = Array.from(this.loadTimes.values()).reduce((sum, time) => sum + time, 0);
    return total / this.loadTimes.size;
  }

  getSlowAds(threshold = 2000): string[] {
    return Array.from(this.loadTimes.entries())
      .filter(([, time]) => time > threshold)
      .map(([slot]) => slot);
  }
}

/**
 * Enhanced intersection observer for better lazy loading
 */
export function createAdObserver(
  callback: (entry: IntersectionObserverEntry) => void,
  options?: IntersectionObserverInit
): IntersectionObserver {
  const defaultOptions: IntersectionObserverInit = {
    rootMargin: '200px 0px',
    threshold: 0.1,
    ...options,
  };

  return new IntersectionObserver(entries => {
    entries.forEach(callback);
  }, defaultOptions);
}
