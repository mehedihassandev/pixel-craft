'use client';

import { useEffect } from 'react';
import Script from 'next/script';

interface GoogleAdsenseProps {
  pId: string;
}

/**
 * Google AdSense initialization component
 * Should be placed once in the root layout
 */
export function GoogleAdsense({ pId }: GoogleAdsenseProps) {
  return (
    <Script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-${pId}`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
      onLoad={() => {
        // Initialize AdSense when script loads
        if (typeof window !== 'undefined' && (window as any).adsbygoogle) {
          try {
            ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
          } catch (error) {
            console.error('AdSense initialization error:', error);
          }
        }
      }}
    />
  );
}
