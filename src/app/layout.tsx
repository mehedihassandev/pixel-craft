import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { GoogleAnalytics } from '@/components/analytics/google-analytics';
import { ThemeProvider } from '@/components/providers/theme-provider';

import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: {
    default: 'PixelCraft - AI-Powered Image Processing & Photo Editing Tools',
    template: '%s | PixelCraft',
  },
  description:
    'Transform your images with AI-powered tools. Remove backgrounds, compress images, OCR text extraction, resize photos, and create stunning visuals with PixelCraft - the ultimate online image processing platform.',
  keywords: [
    'image processing',
    'photo editing',
    'background removal',
    'image compression',
    'OCR text extraction',
    'image resize',
    'AI image tools',
    'online photo editor',
    'image optimization',
    'PNG to SVG converter',
    'text to image generator',
    'placeholder image generator',
  ],
  authors: [{ name: 'PixelCraft Team' }],
  creator: 'PixelCraft',
  publisher: 'PixelCraft',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://pixel-craft-sigma.vercel.app',
    title: 'PixelCraft - AI-Powered Image Processing & Photo Editing Tools',
    description:
      'Transform your images with AI-powered tools. Remove backgrounds, compress images, OCR text extraction, and more.',
    siteName: 'PixelCraft',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'PixelCraft - AI-Powered Image Processing Tools',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PixelCraft - AI-Powered Image Processing Tools',
    description:
      'Transform your images with AI-powered tools. Remove backgrounds, compress images, OCR text extraction, and more.',
    images: ['/twitter-image.jpg'],
    creator: '@pixelcraft',
  },
  metadataBase: new URL('https://pixel-craft-sigma.vercel.app'),
  alternates: {
    canonical: '/',
  },
  category: 'technology',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'PixelCraft',
    description:
      'AI-powered image processing and photo editing platform with background removal, compression, OCR, and more tools.',
    url: 'https://pixel-craft-sigma.vercel.app',
    applicationCategory: 'MultimediaApplication',
    operatingSystem: 'Web Browser',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '1250',
    },
    featureList: [
      'AI Background Removal',
      'Image Compression',
      'OCR Text Extraction',
      'Image Resizing',
      'PNG to SVG Conversion',
      'Text to Image Generation',
      'Placeholder Image Creation',
    ],
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#000000" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />

        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Preload critical fonts */}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="font-body antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <GoogleAnalytics />
          <Header />
          {children}
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
