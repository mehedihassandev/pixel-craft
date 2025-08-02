import {
  Eraser,
  Sparkles,
  Download,
  Eye,
  Layers,
  Image as ImageIcon,
  Shield,
  Zap,
  Settings,
} from 'lucide-react';

export const backgroundRemoveFeatures = [
  {
    title: 'AI-Powered Detection',
    description:
      'Advanced machine learning algorithms automatically detect subjects and backgrounds with high precision.',
    icon: Sparkles,
  },
  {
    title: 'Instant Processing',
    description: 'Get results in seconds with our optimized background removal engine.',
    icon: Zap,
  },
  {
    title: 'High Quality Output',
    description: 'Maintain image quality while removing backgrounds with clean, sharp edges.',
    icon: Eye,
  },
  {
    title: 'Multiple Formats',
    description: 'Support for JPG, PNG, and WebP input formats with PNG transparent output.',
    icon: ImageIcon,
  },
  {
    title: 'Batch Processing',
    description: 'Process multiple images at once for efficient workflow management.',
    icon: Layers,
  },
  {
    title: 'Privacy Focused',
    description: 'All processing happens securely with no image data stored on our servers.',
    icon: Shield,
  },
];

export const backgroundRemoveUseCases = [
  {
    title: 'E-commerce Products',
    description: 'Create professional product photos with clean backgrounds for online stores.',
    examples: ['Product catalogs', 'Marketing materials', 'Social media posts'],
  },
  {
    title: 'Portrait Photography',
    description: 'Remove distracting backgrounds from portraits and headshots.',
    examples: ['Professional headshots', 'Social profiles', 'Dating apps'],
  },
  {
    title: 'Graphic Design',
    description: 'Extract subjects for use in graphic design projects and compositions.',
    examples: ['Poster design', 'Website graphics', 'Print materials'],
  },
  {
    title: 'Content Creation',
    description: 'Enhance your content with custom backgrounds and compositions.',
    examples: ['YouTube thumbnails', 'Instagram posts', 'Blog images'],
  },
];

export const backgroundRemoveHeaderBadges = [
  { label: 'AI Powered', icon: Sparkles },
  { label: 'Instant Results', icon: Eye },
  { label: 'PNG Output', icon: Download },
  { label: 'High Quality', icon: Layers },
];

export const backgroundRemoveTips = {
  do: [
    'Use high-contrast images with clear subject separation',
    'Ensure good lighting on your subject',
    'Choose images with sharp focus on the main subject',
    'Use images with minimal motion blur',
    'Select photos with clear subject boundaries',
  ],
  avoid: [
    'Images with very similar background and subject colors',
    'Blurry or low-resolution images',
    'Images with complex transparent objects like glass',
    'Photos with excessive grain or noise',
    'Images where subject merges with background',
  ],
};

export const backgroundRemoveTechnicalSpecs = [
  {
    feature: 'Maximum File Size',
    value: '10MB',
    description: 'Maximum upload size per image',
  },
  {
    feature: 'Supported Formats',
    value: 'JPG, PNG, WebP',
    description: 'Input image formats supported',
  },
  {
    feature: 'Output Format',
    value: 'PNG',
    description: 'Transparent background PNG output',
  },
  {
    feature: 'Processing Time',
    value: '2-5 seconds',
    description: 'Average processing time per image',
  },
  {
    feature: 'Maximum Resolution',
    value: '4000x4000px',
    description: 'Maximum image dimensions supported',
  },
];

export const backgroundRemovePerformanceFeatures = {
  performance: [
    'GPU-accelerated processing',
    'Optimized for web performance',
    'Real-time preview generation',
    'Efficient memory usage',
    'Progressive image loading',
  ],
  privacy: [
    'No server-side image storage',
    'Client-side processing option',
    'Secure HTTPS transmission',
    'No tracking or analytics',
    'GDPR compliant',
  ],
};
