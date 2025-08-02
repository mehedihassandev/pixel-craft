import { Palette, Maximize2, Zap, Eye, Download } from 'lucide-react';

export const pngToSvgFeatures = [
  {
    icon: Palette,
    title: 'Colors',
    description: 'Customize number of colors',
    bgColor: 'bg-pink-100 dark:bg-pink-900/20',
    iconColor: 'text-pink-600 dark:text-pink-400',
    badgeHover: 'hover:bg-pink-100 dark:hover:bg-pink-900/20',
    badgeBg: 'bg-pink-100 dark:bg-pink-900/20',
    badgeIconColor: 'text-pink-600',
  },
  {
    icon: Maximize2,
    title: 'Scale',
    description: 'Adjust output scale',
    bgColor: 'bg-blue-100 dark:bg-blue-900/20',
    iconColor: 'text-blue-600 dark:text-blue-400',
    badgeHover: 'hover:bg-blue-100 dark:hover:bg-blue-900/20',
    badgeBg: 'bg-blue-100 dark:bg-blue-900/20',
    badgeIconColor: 'text-blue-600',
  },
  {
    icon: Zap,
    title: 'Threshold',
    description: 'Fine-tune detail threshold',
    bgColor: 'bg-yellow-100 dark:bg-yellow-900/20',
    iconColor: 'text-yellow-600 dark:text-yellow-400',
    badgeHover: 'hover:bg-yellow-100 dark:hover:bg-yellow-900/20',
    badgeBg: 'bg-yellow-100 dark:bg-yellow-900/20',
    badgeIconColor: 'text-yellow-600',
  },
  {
    icon: Eye,
    title: 'Preview',
    description: 'Instant SVG rendering',
    bgColor: 'bg-green-100 dark:bg-green-900/20',
    iconColor: 'text-green-600 dark:text-green-400',
    badgeHover: 'hover:bg-green-100 dark:hover:bg-green-900/20',
    badgeBg: 'bg-green-100 dark:bg-green-900/20',
    badgeIconColor: 'text-green-600',
  },
  {
    icon: Download,
    title: 'Download',
    description: 'Export as SVG file',
    bgColor: 'bg-purple-100 dark:bg-purple-900/20',
    iconColor: 'text-purple-600 dark:text-purple-400',
    badgeHover: 'hover:bg-purple-100 dark:hover:bg-purple-900/20',
    badgeBg: 'bg-purple-100 dark:bg-purple-900/20',
    badgeIconColor: 'text-purple-600',
  },
];

export const howToUseSteps = [
  {
    step: '1',
    title: 'Upload Image',
    desc: 'Select a PNG file from your device and see instant preview',
    color: 'from-pink-500 to-rose-500',
  },
  {
    step: '2',
    title: 'Adjust Settings',
    desc: 'Fine-tune colors, scale, and threshold for perfect results',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    step: '3',
    title: 'Convert & Download',
    desc: 'Click convert, preview your SVG, and download instantly',
    color: 'from-green-500 to-emerald-500',
  },
];

export const headerBadges = [
  {
    label: 'Color Control',
    feature: pngToSvgFeatures[0],
  },
  {
    label: 'Scale Control',
    feature: pngToSvgFeatures[1],
  },
  {
    label: 'Threshold Filtering',
    feature: pngToSvgFeatures[2],
  },
  {
    label: 'Instant Preview',
    feature: pngToSvgFeatures[3],
  },
];
