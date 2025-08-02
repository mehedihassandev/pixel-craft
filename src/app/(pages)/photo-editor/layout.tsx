import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Advanced Photo Editor - Professional Image Editing Online',
  description:
    'Professional photo editing with advanced filters, adjustments, and effects. Apply vintage filters, adjust brightness, contrast, saturation, and more. Real-time preview with before/after comparison.',
  keywords: [
    'photo editor',
    'image editor',
    'photo filters',
    'image filters',
    'photo effects',
    'brightness adjustment',
    'contrast adjustment',
    'saturation',
    'vintage filter',
    'black and white',
    'sepia',
    'photo enhancement',
    'image enhancement',
    'professional photo editing',
  ],
  openGraph: {
    title: 'Advanced Photo Editor - Professional Image Editing Online',
    description:
      'Professional photo editing with advanced filters, adjustments, and effects. Apply vintage filters, adjust brightness, contrast, saturation, and more.',
    url: 'https://pixel-craft-sigma.vercel.app/photo-editor',
    images: [
      {
        url: '/og-photo-editor.jpg',
        width: 1200,
        height: 630,
        alt: 'Advanced Photo Editor Tool',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Advanced Photo Editor - Professional Image Editing Online',
    description:
      'Professional photo editing with advanced filters, adjustments, and effects. Apply vintage filters, adjust brightness, contrast, saturation, and more.',
    images: ['/twitter-photo-editor.jpg'],
  },
  alternates: {
    canonical: '/photo-editor',
  },
};

export default function PhotoEditorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
