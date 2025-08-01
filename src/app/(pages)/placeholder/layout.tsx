import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Placeholder Image Generator - Create Custom Placeholder Images',
    description: 'Generate custom placeholder images for web development and design mockups. Choose size, color, format, and add custom text. Perfect for developers and designers.',
    keywords: [
        'placeholder image',
        'placeholder generator',
        'mockup images',
        'dummy images',
        'placeholder pics',
        'development placeholders',
        'design placeholders',
        'custom placeholders',
        'web development',
        'wireframe images'
    ],
    openGraph: {
        title: 'Placeholder Image Generator - Create Custom Placeholder Images',
        description: 'Generate custom placeholder images for web development and design mockups. Choose size, color, format, and add custom text.',
        url: 'https://pixel-craft-sigma.vercel.app/placeholder',
        images: [
            {
                url: '/og-placeholder.jpg',
                width: 1200,
                height: 630,
                alt: 'Placeholder Image Generator',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Placeholder Image Generator - Create Custom Placeholder Images',
        description: 'Generate custom placeholder images for web development and design mockups.',
        images: ['/twitter-placeholder.jpg'],
    },
    alternates: {
        canonical: '/placeholder',
    },
};

export default function PlaceholderLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
