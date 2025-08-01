import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'PNG to SVG Converter - Convert Images to Vector Format',
    description: 'Convert PNG images to SVG vector format online. Transform raster images to scalable vector graphics for logos, icons, and illustrations. Free online converter.',
    keywords: [
        'PNG to SVG',
        'convert PNG to SVG',
        'image to vector',
        'raster to vector',
        'SVG converter',
        'vector graphics',
        'scalable images',
        'logo converter',
        'icon converter',
        'image trace'
    ],
    openGraph: {
        title: 'PNG to SVG Converter - Convert Images to Vector Format',
        description: 'Convert PNG images to SVG vector format online. Transform raster images to scalable vector graphics for logos and icons.',
        url: 'https://pixel-craft-sigma.vercel.app/png-to-svg',
        images: [
            {
                url: '/og-png-to-svg.jpg',
                width: 1200,
                height: 630,
                alt: 'PNG to SVG Converter',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'PNG to SVG Converter - Convert Images to Vector Format',
        description: 'Convert PNG images to SVG vector format online. Transform raster images to scalable vector graphics.',
        images: ['/twitter-png-to-svg.jpg'],
    },
    alternates: {
        canonical: '/png-to-svg',
    },
};

export default function PngToSvgLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
