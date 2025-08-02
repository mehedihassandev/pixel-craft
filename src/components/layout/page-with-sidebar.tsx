'use client';

import { ReactNode } from 'react';
import { SidebarAd } from '@/components/ads';
import { useAdSenseConfig } from '@/contexts/adsense-context';

interface PageWithSidebarProps {
  children: ReactNode;
  showSidebar?: boolean;
  sidebarPosition?: 'left' | 'right';
}

/**
 * Layout component for pages that need sidebar ads
 */
export function PageWithSidebar({
  children,
  showSidebar = true,
  sidebarPosition = 'right',
}: PageWithSidebarProps) {
  const adSenseConfig = useAdSenseConfig();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left sidebar */}
        {showSidebar && sidebarPosition === 'left' && (
          <aside className="lg:w-80 order-2 lg:order-1">
            <div className="space-y-6">
              <SidebarAd
                adSlot={adSenseConfig.adSlots.homepage.sidebar}
                adClient={adSenseConfig.clientId}
              />
            </div>
          </aside>
        )}

        {/* Main content */}
        <main className={`flex-1 ${showSidebar ? 'lg:order-2' : ''}`}>{children}</main>

        {/* Right sidebar */}
        {showSidebar && sidebarPosition === 'right' && (
          <aside className="lg:w-80 order-2 lg:order-3">
            <div className="space-y-6">
              <SidebarAd
                adSlot={adSenseConfig.adSlots.homepage.sidebar}
                adClient={adSenseConfig.clientId}
              />
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}
