import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Image Compression - Reduce File Size Without Quality Loss',
    description: 'Compress images online while maintaining high quality. Reduce file sizes by up to 90% for faster loading websites and easier sharing. Supports JPEG, PNG, WebP formats.',
    keywords: [
        'image compression',
        'compress images',
        'reduce file size',
        'image optimizer',
        'photo compression',
        'JPEG compression',
        'PNG compression',
        'WebP compression',
        'lossless compression',
        'image size reducer'
    ],
    openGraph: {
        title: 'Image Compression - Reduce File Size Without Quality Loss',
        description: 'Compress images online while maintaining high quality. Reduce file sizes by up to 90% for faster loading websites.',
        url: 'https://pixel-craft-sigma.vercel.app/image-compress',
        images: [
            {
                url: '/og-image-compress.jpg',
                width: 1200,
                height: 630,
                alt: 'Image Compression Tool',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Image Compression - Reduce File Size Without Quality Loss',
        description: 'Compress images online while maintaining high quality. Reduce file sizes by up to 90% for faster loading websites.',
        images: ['/twitter-image-compress.jpg'],
    },
    alternates: {
        canonical: '/image-compress',
    },
};

export default function ImageCompressLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
