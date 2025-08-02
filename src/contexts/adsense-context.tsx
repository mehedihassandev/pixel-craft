'use client';

import React, { createContext, useContext, ReactNode } from 'react';

// Define the AdSense configuration type
export interface AdSenseConfig {
  publisherId: string;
  clientId: string;
  adSlots: {
    homepage: {
      banner: string;
      rectangle: string;
      sidebar: string;
    };
    article: {
      top: string;
      middle: string;
      bottom: string;
    };
    general: {
      footer: string;
      mobile: string;
    };
  };
  settings: {
    lazyLoading: boolean;
    fullWidthResponsive: boolean;
    testMode: boolean;
  };
}

// Create the context
const AdSenseContext = createContext<AdSenseConfig | null>(null);

// Provider props
interface AdSenseProviderProps {
  children: ReactNode;
  config: Omit<AdSenseConfig, 'clientId'> & { publisherId: string };
}

// Provider component
export function AdSenseProvider({ children, config }: AdSenseProviderProps) {
  const configWithClientId: AdSenseConfig = {
    ...config,
    clientId: `ca-pub-${config.publisherId}`,
  };

  return <AdSenseContext.Provider value={configWithClientId}>{children}</AdSenseContext.Provider>;
}

// Hook to use AdSense configuration
export function useAdSenseConfig(): AdSenseConfig {
  const context = useContext(AdSenseContext);
  if (!context) {
    throw new Error('useAdSenseConfig must be used within an AdSenseProvider');
  }
  return context;
}

// Higher-order component for pages that need AdSense config
export function withAdSenseConfig<T extends object>(Component: React.ComponentType<T>) {
  return function WrappedComponent(props: T) {
    const config = useAdSenseConfig();
    return <Component {...props} adSenseConfig={config} />;
  };
}
