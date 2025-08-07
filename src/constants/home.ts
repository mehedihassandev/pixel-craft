import { ROUTER } from '@/navigation/router';
import {
  Archive,
  Eraser,
  FileText,
  ImageIcon,
  Layers,
  Maximize,
  Sparkles,
  Zap,
  Palette,
  Video,
} from 'lucide-react';

export const features = [
  {
    id: 'placeholder',
    title: 'Placeholder Generator',
    description:
      'Create custom placeholder images with various dimensions, colors, and text for your projects.',
    icon: ImageIcon,
    href: ROUTER.PLACEHOLDER,
    color: 'bg-blue-500',
    gradient: 'from-blue-500 to-blue-600',
    popular: true,
    category: 'Generator',
  },
  {
    id: 'background-remove',
    title: 'Background Remove',
    description: 'Remove backgrounds from images automatically using advanced AI technology.',
    icon: Eraser,
    href: ROUTER.BACKGROUND_REMOVE,
    color: 'bg-red-500',
    gradient: 'from-red-500 to-red-600',
    aiPowered: true,
    popular: true,
    category: 'AI Tools',
  },
  {
    id: 'video-converter',
    title: 'Video Converter',
    description:
      'Convert videos to multiple formats (MP4, WebM, MOV, AVI, GIF) with custom settings.',
    icon: Video,
    href: ROUTER.VIDEO_CONVERTER,
    color: 'bg-blue-500',
    gradient: 'from-blue-500 to-purple-600',
    new: true,
    category: 'Converter',
  },
  {
    id: 'photo-editor',
    title: 'Photo Editor',
    description:
      'Professional photo editing with advanced filters, adjustments, and real-time preview.',
    icon: Palette,
    href: ROUTER.PHOTO_EDITOR,
    color: 'bg-pink-500',
    gradient: 'from-pink-500 to-purple-600',
    popular: true,
    category: 'Editor',
  },
  {
    id: 'resize',
    title: 'Image Resize',
    description: 'Resize images to specific dimensions while maintaining quality and aspect ratio.',
    icon: Maximize,
    href: ROUTER.RESIZE,
    color: 'bg-green-500',
    gradient: 'from-green-500 to-green-600',
    category: 'Transform',
  },
  {
    id: 'ocr',
    title: 'OCR Text Extract',
    description: 'Extract text from images with high accuracy using optical character recognition.',
    icon: FileText,
    href: ROUTER.OCR,
    color: 'bg-indigo-500',
    gradient: 'from-indigo-500 to-indigo-600',
    aiPowered: true,
    category: 'AI Tools',
  },
  {
    id: 'png-to-svg',
    title: 'PNG to SVG',
    description: 'Convert PNG images to scalable SVG format with AI-powered vectorization.',
    icon: Layers,
    href: ROUTER.PNG_TO_SVG,
    color: 'bg-teal-500',
    gradient: 'from-teal-500 to-teal-600',
    aiPowered: true,
    category: 'Converter',
  },

  {
    id: 'gif-to-json',
    title: 'GIF to JSON',
    description: 'Convert animated GIFs to JSON format for web animations and data processing.',
    icon: FileText,
    href: ROUTER.GIF_TO_JSON,
    color: 'bg-orange-500',
    gradient: 'from-orange-500 to-red-600',
    category: 'Converter',
  },
];

// Tool card gradient colors for the "All Tools" section
export const toolCardGradients = [
  'bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/30 border-blue-200 dark:border-blue-700',
  'bg-gradient-to-br from-purple-50 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/30 border-purple-200 dark:border-purple-700',
  'bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/30 border-green-200 dark:border-green-700',
  'bg-gradient-to-br from-orange-50 to-red-100 dark:from-orange-900/20 dark:to-red-900/30 border-orange-200 dark:border-orange-700',
  'bg-gradient-to-br from-cyan-50 to-blue-100 dark:from-cyan-900/20 dark:to-blue-900/30 border-cyan-200 dark:border-cyan-700',
  'bg-gradient-to-br from-rose-50 to-pink-100 dark:from-rose-900/20 dark:to-pink-900/30 border-rose-200 dark:border-rose-700',
  'bg-gradient-to-br from-yellow-50 to-amber-100 dark:from-yellow-900/20 dark:to-amber-900/30 border-yellow-200 dark:border-yellow-700',
  'bg-gradient-to-br from-teal-50 to-cyan-100 dark:from-teal-900/20 dark:to-cyan-900/30 border-teal-200 dark:border-teal-700',
  'bg-gradient-to-br from-violet-50 to-purple-100 dark:from-violet-900/20 dark:to-purple-900/30 border-violet-200 dark:border-violet-700',
  'bg-gradient-to-br from-slate-50 to-gray-100 dark:from-slate-900/20 dark:to-gray-900/30 border-slate-200 dark:border-slate-700',
  'bg-gradient-to-br from-lime-50 to-green-100 dark:from-lime-900/20 dark:to-green-900/30 border-lime-200 dark:border-lime-700',
  'bg-gradient-to-br from-fuchsia-50 to-purple-100 dark:from-fuchsia-900/20 dark:to-purple-900/30 border-fuchsia-200 dark:border-fuchsia-700',
];

// Tool card icon colors
export const toolCardIconColors = [
  'bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 group-hover:bg-blue-200 dark:group-hover:bg-blue-800/60',
  'bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400 group-hover:bg-purple-200 dark:group-hover:bg-purple-800/60',
  'bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400 group-hover:bg-green-200 dark:group-hover:bg-green-800/60',
  'bg-orange-100 dark:bg-orange-900/40 text-orange-600 dark:text-orange-400 group-hover:bg-orange-200 dark:group-hover:bg-orange-800/60',
  'bg-cyan-100 dark:bg-cyan-900/40 text-cyan-600 dark:text-cyan-400 group-hover:bg-cyan-200 dark:group-hover:bg-cyan-800/60',
  'bg-rose-100 dark:bg-rose-900/40 text-rose-600 dark:text-rose-400 group-hover:bg-rose-200 dark:group-hover:bg-rose-800/60',
  'bg-yellow-100 dark:bg-yellow-900/40 text-yellow-600 dark:text-yellow-400 group-hover:bg-yellow-200 dark:group-hover:bg-yellow-800/60',
  'bg-teal-100 dark:bg-teal-900/40 text-teal-600 dark:text-teal-400 group-hover:bg-teal-200 dark:group-hover:bg-teal-800/60',
  'bg-violet-100 dark:bg-violet-900/40 text-violet-600 dark:text-violet-400 group-hover:bg-violet-200 dark:group-hover:bg-violet-800/60',
  'bg-slate-100 dark:bg-slate-900/40 text-slate-600 dark:text-slate-400 group-hover:bg-slate-200 dark:group-hover:bg-slate-800/60',
  'bg-lime-100 dark:bg-lime-900/40 text-lime-600 dark:text-lime-400 group-hover:bg-lime-200 dark:group-hover:bg-lime-800/60',
  'bg-fuchsia-100 dark:bg-fuchsia-900/40 text-fuchsia-600 dark:text-fuchsia-400 group-hover:bg-fuchsia-200 dark:group-hover:bg-fuchsia-800/60',
];

// Tool card hover shadow colors
export const toolCardHoverColors = [
  'hover:shadow-blue-500/25',
  'hover:shadow-purple-500/25',
  'hover:shadow-green-500/25',
  'hover:shadow-orange-500/25',
  'hover:shadow-cyan-500/25',
  'hover:shadow-rose-500/25',
  'hover:shadow-yellow-500/25',
  'hover:shadow-teal-500/25',
  'hover:shadow-violet-500/25',
  'hover:shadow-slate-500/25',
  'hover:shadow-lime-500/25',
  'hover:shadow-fuchsia-500/25',
];

// Tool card title hover colors
export const toolCardTitleHoverColors = [
  'group-hover:text-blue-600 dark:group-hover:text-blue-400',
  'group-hover:text-purple-600 dark:group-hover:text-purple-400',
  'group-hover:text-green-600 dark:group-hover:text-green-400',
  'group-hover:text-orange-600 dark:group-hover:text-orange-400',
  'group-hover:text-cyan-600 dark:group-hover:text-cyan-400',
  'group-hover:text-rose-600 dark:group-hover:text-rose-400',
  'group-hover:text-yellow-600 dark:group-hover:text-yellow-400',
  'group-hover:text-teal-600 dark:group-hover:text-teal-400',
  'group-hover:text-violet-600 dark:group-hover:text-violet-400',
  'group-hover:text-slate-600 dark:group-hover:text-slate-400',
  'group-hover:text-lime-600 dark:group-hover:text-lime-400',
  'group-hover:text-fuchsia-600 dark:group-hover:text-fuchsia-400',
];

// Tool card arrow hover colors
export const toolCardArrowHoverColors = [
  'group-hover:text-blue-600 dark:group-hover:text-blue-400',
  'group-hover:text-purple-600 dark:group-hover:text-purple-400',
  'group-hover:text-green-600 dark:group-hover:text-green-400',
  'group-hover:text-orange-600 dark:group-hover:text-orange-400',
  'group-hover:text-cyan-600 dark:group-hover:text-cyan-400',
  'group-hover:text-rose-600 dark:group-hover:text-rose-400',
  'group-hover:text-yellow-600 dark:group-hover:text-yellow-400',
  'group-hover:text-teal-600 dark:group-hover:text-teal-400',
  'group-hover:text-violet-600 dark:group-hover:text-violet-400',
  'group-hover:text-slate-600 dark:group-hover:text-slate-400',
  'group-hover:text-lime-600 dark:group-hover:text-lime-400',
  'group-hover:text-fuchsia-600 dark:group-hover:text-fuchsia-400',
];
