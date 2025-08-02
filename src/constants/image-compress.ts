import {
  Archive,
  Zap,
  Shield,
  Gauge,
  HardDrive,
  Settings2,
  Eye,
  Download,
  DownloadCloud,
  FileImage,
  Smartphone,
  Globe,
  Cpu,
  Clock,
} from 'lucide-react';

export const compressionFeatures = [
  {
    icon: Zap,
    title: 'Lightning Fast',
    description:
      'Advanced compression algorithms with Web Worker support for blazing fast processing',
  },
  {
    icon: Shield,
    title: 'Quality Preserved',
    description:
      'Maintain visual quality while reducing file size by up to 80% with smart optimization',
  },
  {
    icon: Gauge,
    title: 'Smart Optimization',
    description: 'Automatic resizing and quality adjustment based on your target requirements',
  },
  {
    icon: HardDrive,
    title: 'Size Reduction',
    description: 'Target file sizes under 1MB without compromising visual quality',
  },
  {
    icon: Settings2,
    title: 'Customizable Settings',
    description:
      'Fine-tune compression parameters including quality, size limits, and output format',
  },
  {
    icon: Archive,
    title: 'Batch Processing',
    description: 'Process multiple images simultaneously with bulk download options',
  },
];

export const compressionUseCases = [
  {
    title: 'Web Optimization',
    description: 'Optimize images for faster website loading and better user experience',
    icon: Globe,
  },
  {
    title: 'Mobile Apps',
    description: 'Reduce app size and improve performance on mobile devices',
    icon: Smartphone,
  },
  {
    title: 'Email Attachments',
    description: 'Compress images to meet email size restrictions while maintaining quality',
    icon: Download,
  },
  {
    title: 'Storage Saving',
    description: 'Free up valuable storage space without losing important visual details',
    icon: HardDrive,
  },
];

export const compressionTechnicalSpecs = [
  {
    category: 'Supported Formats',
    specs: [
      'JPEG / JPG - Best for photos',
      'PNG - Supports transparency',
      'WebP - Modern compression',
      'Input size: Up to 50MB per file',
    ],
  },
  {
    category: 'Compression Settings',
    specs: [
      'Quality range: 10% - 100%',
      'Target size: 0.1MB - 10MB',
      'Max dimensions: 480px - 4000px',
      'Batch processing: Unlimited files',
    ],
  },
  {
    category: 'Performance',
    specs: ['Web Worker processing', 'Real-time preview', 'Progress tracking', 'Memory efficient'],
  },
];

export const compressionHeaderBadges = [
  {
    icon: Zap,
    label: 'Fast Compression',
  },
  {
    icon: Shield,
    label: 'Quality Preserved',
  },
  {
    icon: FileImage,
    label: 'Multiple Formats',
  },
  {
    icon: Archive,
    label: 'Batch Processing',
  },
  {
    icon: Download,
    label: 'Instant Download',
  },
];

export const compressionTips = [
  {
    category: 'Best Practices',
    tips: [
      'Use JPEG for photos with many colors and gradients',
      'Use PNG for images with transparency or sharp edges',
      'Consider WebP for modern browsers and best compression',
      'Batch process multiple images for efficiency',
      'Compare before and after results for quality assessment',
    ],
  },
  {
    category: 'Quality Guidelines',
    tips: [
      '80-90% quality for high-end displays and print',
      '70-80% quality for web optimization',
      '50-70% quality for thumbnails and previews',
      'Always test on target devices and screens',
      'Consider viewing distance and image purpose',
    ],
  },
];

export const compressionPerformanceFeatures = [
  {
    icon: Cpu,
    title: 'Web Worker Processing',
    description: "Background processing that doesn't block the UI",
  },
  {
    icon: Clock,
    title: 'Real-time Progress',
    description: 'Live progress tracking with time estimation',
  },
  {
    icon: Eye,
    title: 'Live Preview',
    description: 'Side-by-side comparison of original and compressed images',
  },
  {
    icon: DownloadCloud,
    title: 'Flexible Downloads',
    description: 'Individual downloads or bulk ZIP export options',
  },
];
