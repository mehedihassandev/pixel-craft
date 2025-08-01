import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Image Optimization - Optimize Images for Web Performance',
    description: 'Optimize images for web use with advanced compression algorithms. Reduce file sizes while maintaining quality for faster loading websites and better SEO rankings.',
    keywords: [
        'image optimization',
        'optimize images',
        'web image optimization',
        'image performance',
        'website speed optimization',
        'image SEO',
        'fast loading images',
        'image quality optimization',
        'web performance',
        'image file size reduction'
    ],
    openGraph: {
        title: 'Image Optimization - Optimize Images for Web Performance',
        description: 'Optimize images for web use with advanced compression algorithms. Reduce file sizes while maintaining quality for faster loading websites.',
        url: 'https://pixel-craft-sigma.vercel.app/image-optimization',
        images: [
            {
                url: '/og-image-optimization.jpg',
                width: 1200,
                height: 630,
                alt: 'Image Optimization Tool',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Image Optimization - Optimize Images for Web Performance',
        description: 'Optimize images for web use with advanced compression algorithms. Reduce file sizes while maintaining quality.',
        images: ['/twitter-image-optimization.jpg'],
    },
    alternates: {
        canonical: '/image-optimization',
    },
};

export default function ImageOptimizationLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
