'use client';

import { useEffect, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import Script from 'next/script';

// Google Analytics Measurement ID
const GA_MEASUREMENT_ID = process.env.GA_MEASUREMENT_ID;

declare global {
    interface Window {
        gtag: (...args: any[]) => void;
        dataLayer: any[];
    }
}

function GoogleAnalyticsInner() {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        if (!GA_MEASUREMENT_ID || !window.gtag) return;

        const url = pathname + searchParams.toString();
        // Track page views
        window.gtag('config', GA_MEASUREMENT_ID, {
            page_path: url,
            page_title: document.title,
        });
    }, [pathname, searchParams]);

    return null;
}

export function GoogleAnalytics() {
    if (!GA_MEASUREMENT_ID) return null;

    return (
        <>
            {/* Google Analytics Scripts */}
            <Script
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
                strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
                {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${GA_MEASUREMENT_ID}');
                `}
            </Script>

            {/* Page tracking component */}
            <Suspense fallback={null}>
                <GoogleAnalyticsInner />
            </Suspense>
        </>
    );
}

// Custom hook for tracking events
export function useGoogleAnalytics() {
    const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
        if (!GA_MEASUREMENT_ID || !window.gtag) return;

        window.gtag('event', eventName, {
            event_category: 'engagement',
            event_label: parameters?.label,
            value: parameters?.value,
            ...parameters,
        });
    };

    const trackConversion = (action: string, category: string, label?: string) => {
        if (!GA_MEASUREMENT_ID || !window.gtag) return;

        window.gtag('event', action, {
            event_category: category,
            event_label: label,
        });
    };

    return { trackEvent, trackConversion };
}
