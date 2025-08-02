'use client';

import { useEffect, useRef } from 'react';
import { validateAdConfig, AdPerformanceMonitor, createAdObserver } from '@/lib/ad-utils';

interface AdUnitProps {
  /**
   * AdSense ad slot ID (data-ad-slot)
   */
  adSlot: string;
  /**
   * AdSense client ID (data-ad-client)
   */
  adClient: string;
  /**
   * Ad format (auto, rectangle, horizontal, vertical)
   */
  adFormat?: 'auto' | 'rectangle' | 'horizontal' | 'vertical';
  /**
   * Full width responsive ads
   */
  fullWidthResponsive?: boolean;
  /**
   * Custom style for the ad container
   */
  style?: React.CSSProperties;
  /**
   * CSS class for the ad container
   */
  className?: string;
  /**
   * Ad layout key (for specific layouts)
   */
  adLayoutKey?: string;
  /**
   * Whether to use lazy loading
   */
  lazy?: boolean;
}

export type { AdUnitProps };

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

/**
 * Google AdSense Ad Unit Component
 * Renders a single ad unit with lazy loading support
 */
export function AdUnit({
  adSlot,
  adClient,
  adFormat = 'auto',
  fullWidthResponsive = true,
  style = { display: 'block' },
  className = '',
  adLayoutKey,
  lazy = true,
}: AdUnitProps) {
  const adRef = useRef<HTMLModElement>(null);
  const hasLoaded = useRef(false);
  const performanceMonitor = AdPerformanceMonitor.getInstance();

  useEffect(() => {
    // Validate ad configuration
    const publisherId = adClient.replace('ca-pub-', '');
    if (!validateAdConfig(publisherId, adSlot)) {
      return;
    }

    if (!lazy || hasLoaded.current) return;

    const observer = createAdObserver(entry => {
      if (entry.isIntersecting && !hasLoaded.current) {
        hasLoaded.current = true;
        loadAd();
        observer.disconnect();
      }
    });

    if (adRef.current) {
      observer.observe(adRef.current);
    }

    return () => observer.disconnect();
  }, [lazy, adClient, adSlot]);

  useEffect(() => {
    if (!lazy) {
      loadAd();
    }
  }, [lazy]);

  const loadAd = () => {
    const startTime = performance.now();

    try {
      if (typeof window !== 'undefined' && window.adsbygoogle) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});

        // Track performance
        setTimeout(() => {
          performanceMonitor.trackAdLoad(adSlot, startTime);
        }, 100);
      }
    } catch (error) {
      console.error('AdSense error:', error);
    }
  };

  return (
    <div className={`ad-container ${className}`}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={style}
        data-ad-client={adClient}
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={fullWidthResponsive}
        {...(adLayoutKey && { 'data-ad-layout-key': adLayoutKey })}
      />
    </div>
  );
}

/**
 * Pre-configured ad units for common placements
 */

interface CommonAdProps {
  adSlot: string;
  adClient: string;
  lazy?: boolean;
}

/**
 * Banner ad - typically placed at top of content
 */
export function BannerAd({ adSlot, adClient, lazy = true }: CommonAdProps) {
  return (
    <AdUnit
      adSlot={adSlot}
      adClient={adClient}
      adFormat="horizontal"
      style={{ display: 'block', minHeight: '90px' }}
      className="banner-ad mb-6"
      lazy={lazy}
    />
  );
}

/**
 * Rectangle ad - good for sidebars or content sections
 */
export function RectangleAd({ adSlot, adClient, lazy = true }: CommonAdProps) {
  return (
    <AdUnit
      adSlot={adSlot}
      adClient={adClient}
      adFormat="rectangle"
      style={{ display: 'block', minHeight: '250px' }}
      className="rectangle-ad my-4"
      lazy={lazy}
    />
  );
}

/**
 * In-article ad - placed within content
 */
export function InArticleAd({ adSlot, adClient, lazy = true }: CommonAdProps) {
  return (
    <div className="in-article-ad my-8 flex justify-center">
      <AdUnit
        adSlot={adSlot}
        adClient={adClient}
        adFormat="auto"
        style={{ display: 'block', minHeight: '200px' }}
        className="max-w-full"
        lazy={lazy}
      />
    </div>
  );
}

/**
 * Sidebar ad - vertical format for sidebars
 */
export function SidebarAd({ adSlot, adClient, lazy = true }: CommonAdProps) {
  return (
    <div className="sidebar-ad sticky top-4">
      <AdUnit
        adSlot={adSlot}
        adClient={adClient}
        adFormat="vertical"
        style={{ display: 'block', minHeight: '600px' }}
        className="w-full"
        lazy={lazy}
      />
    </div>
  );
}
