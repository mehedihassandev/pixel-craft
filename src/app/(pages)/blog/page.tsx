import { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Blog - Image Processing Tips & Tutorials | PixelCraft',
    description: 'Learn image processing techniques, photo editing tips, and AI-powered image manipulation tutorials. Expert guides for photographers and designers.',
    keywords: [
        'image processing blog',
        'photo editing tutorials',
        'image optimization tips',
        'AI image processing',
        'photography tips',
        'image enhancement',
        'background removal guide',
        'image compression tips'
    ],
    openGraph: {
        title: 'Blog - Image Processing Tips & Tutorials | PixelCraft',
        description: 'Learn image processing techniques, photo editing tips, and AI-powered image manipulation tutorials.',
        url: 'https://pixel-craft-sigma.vercel.app/blog',
    },
    alternates: {
        canonical: '/blog',
    },
};

const blogPosts = [
    {
        id: 1,
        title: "10 Essential Image Optimization Tips for Better Website Performance",
        excerpt: "Learn how to optimize images for faster loading times and better SEO rankings. Discover the best formats, compression techniques, and tools.",
        author: "PixelCraft Team",
        publishedAt: "2025-07-15",
        readTime: "5 min read",
        category: "Optimization",
        slug: "image-optimization-tips-website-performance"
    },
    {
        id: 2,
        title: "AI Background Removal: How It Works and Best Practices",
        excerpt: "Explore the technology behind AI-powered background removal and learn best practices for getting professional results.",
        author: "PixelCraft Team",
        publishedAt: "2025-07-10",
        readTime: "7 min read",
        category: "AI Technology",
        slug: "ai-background-removal-guide"
    },
    {
        id: 3,
        title: "Complete Guide to Image Compression: Lossless vs Lossy",
        excerpt: "Understanding the difference between lossless and lossy compression, when to use each, and how to achieve the best results.",
        author: "PixelCraft Team",
        publishedAt: "2025-07-05",
        readTime: "6 min read",
        category: "Compression",
        slug: "image-compression-guide"
    },
    {
        id: 4,
        title: "OCR Technology Explained: From Text Recognition to Digital Documents",
        excerpt: "Learn how OCR technology works, its applications, and tips for getting the best text extraction results from images.",
        author: "PixelCraft Team",
        publishedAt: "2025-06-30",
        readTime: "8 min read",
        category: "OCR",
        slug: "ocr-technology-explained"
    },
    {
        id: 5,
        title: "Social Media Image Sizes: The Complete 2025 Guide",
        excerpt: "Stay updated with the latest social media image dimensions for Facebook, Instagram, Twitter, LinkedIn, and more platforms.",
        author: "PixelCraft Team",
        publishedAt: "2025-06-25",
        readTime: "4 min read",
        category: "Social Media",
        slug: "social-media-image-sizes-2025"
    },
    {
        id: 6,
        title: "PNG vs SVG: When to Use Vector Graphics",
        excerpt: "Understand the differences between PNG and SVG formats, and learn when to convert raster images to vector graphics.",
        author: "PixelCraft Team",
        publishedAt: "2025-06-20",
        readTime: "5 min read",
        category: "Formats",
        slug: "png-vs-svg-vector-graphics"
    }
];

const categories = ["All", "Optimization", "AI Technology", "Compression", "OCR", "Social Media", "Formats"];

export default function BlogPage() {
    return (
        <div className="container mx-auto px-4 py-8 max-w-6xl">
            {/* Header */}
            <div className="text-center space-y-4 mb-12">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    PixelCraft Blog
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                    Expert tips, tutorials, and insights on image processing, AI technology, and digital design.
                </p>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 justify-center mb-8">
                {categories.map((category) => (
                    <Badge
                        key={category}
                        variant={category === "All" ? "default" : "secondary"}
                        className="cursor-pointer hover:bg-primary/20 transition-colors"
                    >
                        {category}
                    </Badge>
                ))}
            </div>

            {/* Blog Posts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {blogPosts.map((post) => (
                    <Card key={post.id} className="hover:shadow-lg transition-shadow duration-300">
                        <CardHeader>
                            <div className="flex items-center justify-between mb-2">
                                <Badge variant="outline">{post.category}</Badge>
                                <div className="flex items-center text-sm text-gray-500">
                                    <Clock className="w-4 h-4 mr-1" />
                                    {post.readTime}
                                </div>
                            </div>
                            <CardTitle className="text-lg hover:text-primary transition-colors">
                                <Link href={`/blog/${post.slug}`}>
                                    {post.title}
                                </Link>
                            </CardTitle>
                            <CardDescription className="text-sm">
                                {post.excerpt}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center text-sm text-gray-500">
                                    <Calendar className="w-4 h-4 mr-1" />
                                    {new Date(post.publishedAt).toLocaleDateString()}
                                </div>
                                <Button variant="ghost" size="sm" asChild>
                                    <Link href={`/blog/${post.slug}`}>
                                        Read More
                                        <ArrowRight className="w-4 h-4 ml-1" />
                                    </Link>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Newsletter Signup */}
            <Card className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl">Stay Updated with PixelCraft</CardTitle>
                    <CardDescription>
                        Get the latest tips, tutorials, and updates on image processing technology delivered to your inbox.
                    </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                    <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                        <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                            Subscribe
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
