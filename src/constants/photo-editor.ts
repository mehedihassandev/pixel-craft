import {
  Palette,
  Sparkles,
  Eye,
  Sliders,
  Filter,
  Zap,
  FileImage,
  Repeat,
  Archive,
  Settings,
  Layers,
} from 'lucide-react';

export const PHOTO_EDITOR_FEATURES = [
  {
    icon: Palette,
    title: 'Professional Filters',
    description: 'Apply vintage, black & white, sepia, and other artistic filters to your photos.',
  },
  {
    icon: Sliders,
    title: 'Advanced Adjustments',
    description:
      'Fine-tune brightness, contrast, saturation, hue, and exposure with precision controls.',
  },
  {
    icon: FileImage,
    title: 'Format Conversion',
    description: 'Convert between JPG, PNG, WebP, AVIF, HEIC, TIFF, BMP, GIF with quality control.',
  },
  {
    icon: Archive,
    title: 'Smart Compression',
    description:
      'Reduce file size by up to 90% while maintaining visual quality with advanced algorithms.',
  },
  {
    icon: Eye,
    title: 'Real-time Preview',
    description: 'See changes instantly with side-by-side before/after comparison.',
  },
  {
    icon: Filter,
    title: 'Custom Effects',
    description: 'Add vignette, sharpen, blur, and temperature effects to enhance your images.',
  },
  {
    icon: Sparkles,
    title: 'One-Click Presets',
    description: 'Choose from professionally crafted presets for instant photo enhancement.',
  },
  {
    icon: Repeat,
    title: 'Batch Processing',
    description: 'Process multiple images simultaneously with batch operations and bulk download.',
  },
  {
    icon: Zap,
    title: 'Fast Processing',
    description: 'Server-side processing with Sharp ensures high quality and fast results.',
  },
  {
    icon: Settings,
    title: 'Advanced Settings',
    description: 'Customize quality, dimensions, and output preferences for optimal results.',
  },
];

export const PHOTO_EDITOR_TIPS = [
  'Start with preset filters to quickly enhance your photos',
  'Use the split view to compare original and edited versions',
  'Use modern formats like WebP and AVIF for better compression',
  'Use batch processing to optimize multiple images at once',
  'Adjust exposure and highlights for better lighting balance',
  'Apply subtle vignette effects to draw focus to the center',
  'HEIC format provides excellent compression for Apple devices',
  'Combine multiple adjustments for professional-looking results',
  'Use compression settings to balance quality and file size',
  'Save your edited images in high quality PNG format',
  'Use batch conversion to export multiple formats simultaneously',
  'Optimize images for web to improve loading speeds',
];

export const PHOTO_EDITOR_BADGES = [
  { label: '✨ Professional Filters' },
  { label: '🎨 Real-time Preview' },
  { label: '🔄 Format Conversion' },
  { label: '📱 HEIC Support' },
  { label: '📦 Smart Compression' },
  { label: '⚡ Batch Processing' },
  { label: '🔒 Privacy First' },
];

export const PHOTO_EDITOR_TECHNICAL_SPECS = [
  {
    title: 'Supported Formats',
    description:
      'Input: JPEG, PNG, WebP, HEIC, AVIF, TIFF, BMP, GIF\nOutput: All major formats with quality control',
  },
  {
    title: 'Processing',
    description:
      'Server-side processing with Sharp for high-quality conversions and client-side filters for privacy',
  },
  {
    title: 'Compression',
    description:
      'Advanced algorithms with up to 90% size reduction while maintaining visual quality',
  },
  {
    title: 'Batch Operations',
    description:
      'Process multiple images simultaneously with resize, compress, format conversion, and bulk download',
  },
];

export const PHOTO_EDITOR_META = {
  title: 'Advanced Photo Editor',
  description:
    'Complete photo editing suite with professional filters, adjustments, format conversion, smart compression, and batch processing. Transform your images with AI-powered tools and optimize them for web delivery.',
  mainCardTitle: 'Photo Editing Studio',
  mainCardDescription:
    'Choose your editing mode: individual photo editing, compression optimization, or batch processing',
  tipsTitle: 'Pro Tips for Better Photo Editing & Optimization',
  tipsDescription:
    'Get the most out of your photo editing experience with these professional tips.',
  technicalSpecsTitle: 'Technical Specifications',
};

export const PHOTO_EDITOR_TAB_CONFIGS = [
  {
    value: 'editor',
    icon: Palette,
    label: 'Photo Editor',
    title: 'Advanced Photo Editor',
    description: 'Apply filters, adjust colors, and enhance your photos with professional tools',
  },
  {
    value: 'compression',
    icon: Archive,
    label: 'Compression',
    title: 'Smart Image Compression',
    description: 'Reduce file sizes while maintaining quality for web optimization',
  },
  {
    value: 'batch',
    icon: Layers,
    label: 'Batch Processing',
    title: 'Batch Image Processing',
    description: 'Process multiple images with resize, compress, and format conversion operations',
  },
];
