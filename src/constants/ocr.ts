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

// Language options for OCR
export const LANGUAGE_OPTIONS = [
  { value: 'eng', label: 'English' },
  { value: 'spa', label: 'Spanish' },
  { value: 'fra', label: 'French' },
  { value: 'deu', label: 'German' },
  { value: 'ita', label: 'Italian' },
  { value: 'por', label: 'Portuguese' },
  { value: 'rus', label: 'Russian' },
  { value: 'jpn', label: 'Japanese' },
  { value: 'chi_sim', label: 'Chinese (Simplified)' },
  { value: 'chi_tra', label: 'Chinese (Traditional)' },
  { value: 'kor', label: 'Korean' },
  { value: 'ara', label: 'Arabic' },
  { value: 'hin', label: 'Hindi' },
  { value: 'tha', label: 'Thai' },
  { value: 'vie', label: 'Vietnamese' },
  { value: 'heb', label: 'Hebrew' },
  { value: 'tur', label: 'Turkish' },
  { value: 'pol', label: 'Polish' },
  { value: 'nld', label: 'Dutch' },
  { value: 'swe', label: 'Swedish' },
  { value: 'nor', label: 'Norwegian' },
  { value: 'dan', label: 'Danish' },
  { value: 'fin', label: 'Finnish' },
  { value: 'ces', label: 'Czech' },
  { value: 'slk', label: 'Slovak' },
  { value: 'hun', label: 'Hungarian' },
  { value: 'ron', label: 'Romanian' },
  { value: 'bul', label: 'Bulgarian' },
  { value: 'hrv', label: 'Croatian' },
  { value: 'srp', label: 'Serbian' },
  { value: 'slv', label: 'Slovenian' },
  { value: 'ukr', label: 'Ukrainian' },
  { value: 'ben', label: 'Bengali' },
  { value: 'guj', label: 'Gujarati' },
  { value: 'pan', label: 'Punjabi' },
  { value: 'tel', label: 'Telugu' },
  { value: 'kan', label: 'Kannada' },
  { value: 'mal', label: 'Malayalam' },
  { value: 'tam', label: 'Tamil' },
  { value: 'mar', label: 'Marathi' },
  { value: 'nep', label: 'Nepali' },
  { value: 'sin', label: 'Sinhala' },
  { value: 'mya', label: 'Myanmar' },
  { value: 'khm', label: 'Khmer' },
  { value: 'lao', label: 'Lao' },
  { value: 'tib', label: 'Tibetan' },
  { value: 'urd', label: 'Urdu' },
  { value: 'fas', label: 'Persian' },
  { value: 'pus', label: 'Pashto' },
  { value: 'tir', label: 'Tigrinya' },
  { value: 'amh', label: 'Amharic' },
] as const;

// PSM (Page Segmentation Mode) options
export const PSM_OPTIONS = [
  { value: '0', label: 'OSD only' },
  { value: '1', label: 'Automatic page segmentation with OSD' },
  { value: '2', label: 'Automatic page segmentation, no OSD' },
  { value: '3', label: 'Fully automatic page segmentation (Default)' },
  { value: '4', label: 'Assume a single column of text' },
  {
    value: '5',
    label: 'Assume a single uniform block of vertically aligned text',
  },
  { value: '6', label: 'Assume a single uniform block of text' },
  { value: '7', label: 'Treat the image as a single text line' },
  { value: '8', label: 'Treat the image as a single word' },
  { value: '9', label: 'Treat the image as a single word in a circle' },
  { value: '10', label: 'Treat the image as a single character' },
  { value: '11', label: 'Sparse text. Find as much text as possible' },
  { value: '12', label: 'Sparse text with OSD' },
  { value: '13', label: 'Raw line. Treat the image as a single text line' },
] as const;

// OEM (OCR Engine Mode) options
export const OEM_OPTIONS = [
  { value: '0', label: 'Legacy engine only' },
  { value: '1', label: 'Neural nets LSTM engine only' },
  { value: '2', label: 'Legacy + LSTM engines' },
  { value: '3', label: 'Default, based on what is available (Recommended)' },
] as const;

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
