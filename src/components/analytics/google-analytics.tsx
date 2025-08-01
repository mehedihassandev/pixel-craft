'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

// Replace with your actual Google Analytics Measurement ID
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

declare global {
    interface Window {
        gtag: (...args: any[]) => void;
    }
}

export function GoogleAnalytics() {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        if (!GA_MEASUREMENT_ID) return;

        // Load Google Analytics script
        const script1 = document.createElement('script');
        script1.async = true;
        script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
        document.head.appendChild(script1);

        const script2 = document.createElement('script');
        script2.innerHTML = `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
                page_title: document.title,
                page_location: window.location.href,
            });
        `;
        document.head.appendChild(script2);

        return () => {
            document.head.removeChild(script1);
            document.head.removeChild(script2);
        };
    }, []);

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
