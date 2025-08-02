import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { GoogleAnalytics } from '@/components/analytics/google-analytics';
import { GoogleAdsense } from '@/components/ads/google-adsense';
import { AdSenseProvider } from '@/contexts/adsense-context';
import { ThemeProvider } from '@/components/theme/theme-provider';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { ReactNode } from 'react';
import {
  DEFAULT_METADATA,
  STRUCTURED_DATA,
  THEME_CONFIG,
  PRECONNECT_DOMAINS,
  CRITICAL_FONTS,
} from '@/constants';
import { SERVER_ADSENSE_CONFIG } from '@/constants/adsense-server';

export const metadata: Metadata = DEFAULT_METADATA;

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#000000" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />

        {/* Preconnect to external domains */}
        {PRECONNECT_DOMAINS.map(domain => (
          <link key={domain} rel="preconnect" href={domain} crossOrigin="anonymous" />
        ))}

        {/* AdSense preconnect for better performance */}
        <link
          rel="preconnect"
          href="https://pagead2.googlesyndication.com"
          crossOrigin="anonymous"
        />
        <link rel="preconnect" href="https://googleads.g.doubleclick.net" crossOrigin="anonymous" />

        {/* Preload critical fonts */}
        {CRITICAL_FONTS.map(font => (
          <link key={font} href={font} rel="stylesheet" />
        ))}

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(STRUCTURED_DATA) }}
        />
      </head>
      <body className="font-body antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme={THEME_CONFIG.defaultTheme}
          enableSystem={THEME_CONFIG.enableSystem}
          disableTransitionOnChange={THEME_CONFIG.disableTransitionOnChange}
        >
          <AdSenseProvider config={SERVER_ADSENSE_CONFIG}>
            <GoogleAnalytics />
            <GoogleAdsense pId={SERVER_ADSENSE_CONFIG.publisherId} />
            <Header />
            {children}
            <Footer />
            <Toaster />
          </AdSenseProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
