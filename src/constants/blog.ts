/**
 * Blog constants
 * Content arrays and configurations for the blog section
 */

export const BLOG_POSTS = [
  {
    id: 1,
    title: '10 Essential Image Optimization Tips for Better Website Performance',
    excerpt:
      'Learn how to optimize images for faster loading times and better SEO rankings. Discover the best formats, compression techniques, and tools.',
    author: 'PixelCraft Team',
    publishedAt: '2025-07-15',
    readTime: '5 min read',
    category: 'Optimization',
    slug: 'image-optimization-tips-website-performance',
  },
  {
    id: 2,
    title: 'AI Background Removal: How It Works and Best Practices',
    excerpt:
      'Explore the technology behind AI-powered background removal and learn best practices for getting professional results.',
    author: 'PixelCraft Team',
    publishedAt: '2025-07-10',
    readTime: '7 min read',
    category: 'AI Technology',
    slug: 'ai-background-removal-guide',
  },
  {
    id: 3,
    title: 'Complete Guide to Image Compression: Lossless vs Lossy',
    excerpt:
      'Understanding the difference between lossless and lossy compression, when to use each, and how to achieve the best results.',
    author: 'PixelCraft Team',
    publishedAt: '2025-07-05',
    readTime: '6 min read',
    category: 'Compression',
    slug: 'image-compression-guide',
  },
  {
    id: 4,
    title: 'OCR Technology Explained: From Text Recognition to Digital Documents',
    excerpt:
      'Learn how OCR technology works, its applications, and tips for getting the best text extraction results from images.',
    author: 'PixelCraft Team',
    publishedAt: '2025-06-30',
    readTime: '8 min read',
    category: 'OCR',
    slug: 'ocr-technology-explained',
  },
  {
    id: 5,
    title: 'Social Media Image Sizes: The Complete 2025 Guide',
    excerpt:
      'Stay updated with the latest social media image dimensions for Facebook, Instagram, Twitter, LinkedIn, and more platforms.',
    author: 'PixelCraft Team',
    publishedAt: '2025-06-25',
    readTime: '4 min read',
    category: 'Social Media',
    slug: 'social-media-image-sizes-2025',
  },
  {
    id: 6,
    title: 'PNG vs SVG: When to Use Vector Graphics',
    excerpt:
      'Understand the differences between PNG and SVG formats, and learn when to convert raster images to vector graphics.',
    author: 'PixelCraft Team',
    publishedAt: '2025-06-20',
    readTime: '5 min read',
    category: 'Formats',
    slug: 'png-vs-svg-vector-graphics',
  },
] as const;

export const BLOG_CATEGORIES = [
  'All',
  'Optimization',
  'AI Technology',
  'Compression',
  'OCR',
  'Social Media',
  'Formats',
] as const;
