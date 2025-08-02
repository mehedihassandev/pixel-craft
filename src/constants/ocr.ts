import {
  FileText,
  Eye,
  Languages,
  Zap,
  Camera,
  Upload,
  Brain,
  Globe,
  Smartphone,
  Cpu,
  Download,
} from 'lucide-react';

export const ocrFeatures = [
  {
    icon: Languages,
    title: 'Multi-Language Support',
    description: 'Support for 35+ languages including English, Chinese, Japanese, Arabic, and more',
  },
  {
    icon: Brain,
    title: 'AI-Powered Recognition',
    description: 'Advanced neural network models for high accuracy text recognition',
  },
  {
    icon: Zap,
    title: 'Fast Processing',
    description: 'Real-time OCR processing with optimized WebAssembly engine',
  },
  {
    icon: Camera,
    title: 'Camera Integration',
    description: 'Capture text directly from your device camera',
  },
  {
    icon: Upload,
    title: 'Multiple Formats',
    description: 'Support for PNG, JPG, WebP, BMP, TIFF and other image formats',
  },
  {
    icon: Download,
    title: 'Export Options',
    description: 'Export results as TXT, JSON, or hOCR formats',
  },
];

export const ocrUseCases = [
  {
    title: 'Document Digitization',
    description: 'Convert scanned documents, receipts, and invoices into editable text',
    examples: ['Business cards', 'Receipts', 'Invoices', 'Legal documents'],
  },
  {
    title: 'Education & Research',
    description: 'Extract text from textbooks, research papers, and handwritten notes',
    examples: ['Textbook pages', 'Research papers', 'Handwritten notes', 'Whiteboards'],
  },
  {
    title: 'Accessibility',
    description: 'Help visually impaired users access text content from images',
    examples: ['Street signs', 'Menu cards', 'Product labels', 'Instructions'],
  },
  {
    title: 'Content Management',
    description: 'Organize and search through image-based content libraries',
    examples: ['Photo archives', 'Historical documents', 'Marketing materials', 'Screenshots'],
  },
];

export const ocrTechnicalSpecs = [
  {
    feature: 'Recognition Engine',
    value: 'Tesseract.js v6.0+',
    description: "Google's OCR engine compiled to WebAssembly",
  },
  {
    feature: 'Supported Languages',
    value: '35+ Languages',
    description: 'Including Latin, Asian, Arabic, and Cyrillic scripts',
  },
  {
    feature: 'Image Formats',
    value: 'PNG, JPG, WebP, BMP, TIFF',
    description: 'All major image formats supported',
  },
  {
    feature: 'Maximum File Size',
    value: '10MB',
    description: 'Optimized for web performance',
  },
  {
    feature: 'Processing Mode',
    value: 'Client-side',
    description: 'No server upload required - privacy protected',
  },
  {
    feature: 'Output Formats',
    value: 'TXT, JSON, hOCR',
    description: 'Multiple export options with coordinate data',
  },
];

export const ocrSupportedLanguages = [
  'English',
  'Spanish',
  'French',
  'German',
  'Italian',
  'Portuguese',
  'Russian',
  'Japanese',
  'Chinese (Simplified)',
  'Chinese (Traditional)',
  'Korean',
  'Arabic',
  'Hindi',
  'Thai',
  'Vietnamese',
  'Hebrew',
  'Bengali',
  'Tamil',
  'Telugu',
  'Marathi',
  'Gujarati',
  'Kannada',
  'Oriya',
  'Punjabi',
  'Assamese',
  'Nepali',
  'Sinhala',
  'Myanmar',
  'Khmer',
  'Lao',
  'Tibetan',
  'Urdu',
  'Persian',
  'Pashto',
  'Amharic',
];

export const ocrBrowserSupport = [
  {
    name: 'Chrome',
    version: '57+',
    status: 'Full Support',
  },
  {
    name: 'Firefox',
    version: '52+',
    status: 'Full Support',
  },
  {
    name: 'Safari',
    version: '11+',
    status: 'Full Support',
  },
  {
    name: 'Edge',
    version: '16+',
    status: 'Full Support',
  },
];

export const ocrHeaderBadges = [
  {
    icon: Globe,
    label: '35+ Languages',
  },
  {
    icon: Cpu,
    label: 'Client-side Processing',
  },
  {
    icon: Smartphone,
    label: 'Mobile Friendly',
  },
  {
    icon: Eye,
    label: 'Privacy Protected',
  },
];

export const ocrTips = {
  do: [
    'Use high-resolution images (300+ DPI)',
    'Ensure good lighting and contrast',
    'Keep text horizontal and straight',
    'Use clear, sharp images',
    'Select the correct language',
  ],
  avoid: [
    'Blurry or low-quality images',
    'Handwritten text (unless very clear)',
    'Complex backgrounds',
    'Rotated or skewed text',
    'Very small text sizes',
  ],
};

export const ocrPerformanceFeatures = {
  performance: [
    'Client-side processing (no server upload)',
    'WebAssembly for native-like performance',
    'Progressive loading of language models',
    'Optimized for modern browsers',
    'Real-time progress tracking',
  ],
  privacy: [
    'Images never leave your device',
    'No data collection or storage',
    'No account registration required',
    'GDPR compliant by design',
    'Open source technology',
  ],
};
