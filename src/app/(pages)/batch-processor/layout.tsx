import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Batch Image Processor - Process Multiple Images at Once',
  description:
    'Process hundreds of images simultaneously with automated operations. Resize, compress, convert formats, and rename files in bulk. Perfect for photographers and content creators.',
  keywords: [
    'batch image processing',
    'bulk image processing',
    'batch resize images',
    'batch compress images',
    'bulk image converter',
    'batch image optimizer',
    'mass image processing',
    'automated image processing',
    'bulk photo editor',
    'batch image renaming',
  ],
  openGraph: {
    title: 'Batch Image Processor - Process Multiple Images at Once',
    description:
      'Process hundreds of images simultaneously with automated operations. Resize, compress, convert formats, and rename files in bulk.',
    url: 'https://pixel-craft-sigma.vercel.app/batch-processor',
    images: [
      {
        url: '/og-batch-processor.jpg',
        width: 1200,
        height: 630,
        alt: 'Batch Image Processor Tool',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Batch Image Processor - Process Multiple Images at Once',
    description:
      'Process hundreds of images simultaneously with automated operations. Resize, compress, convert formats, and rename files in bulk.',
    images: ['/twitter-batch-processor.jpg'],
  },
  alternates: {
    canonical: '/batch-processor',
  },
};

export default function BatchProcessorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
