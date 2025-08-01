import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Image Resize Tool - Resize Photos Online Free',
    description: 'Resize images online for free. Change image dimensions, maintain aspect ratio, and optimize for web, social media, or print. Support for JPEG, PNG, WebP formats.',
    keywords: [
        'image resize',
        'resize photos',
        'image dimensions',
        'photo resizer',
        'resize pictures',
        'image scaler',
        'batch resize',
        'maintain aspect ratio',
        'resize for web',
        'social media image sizes'
    ],
    openGraph: {
        title: 'Image Resize Tool - Resize Photos Online Free',
        description: 'Resize images online for free. Change image dimensions, maintain aspect ratio, and optimize for web, social media, or print.',
        url: 'https://pixel-craft-sigma.vercel.app/resize',
        images: [
            {
                url: '/og-resize.jpg',
                width: 1200,
                height: 630,
                alt: 'Image Resize Tool',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Image Resize Tool - Resize Photos Online Free',
        description: 'Resize images online for free. Change image dimensions, maintain aspect ratio, and optimize for web, social media, or print.',
        images: ['/twitter-resize.jpg'],
    },
    alternates: {
        canonical: '/resize',
    },
};

export default function ResizeLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
