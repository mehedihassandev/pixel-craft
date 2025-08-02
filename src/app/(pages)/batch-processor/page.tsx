'use client';

import { BatchImageProcessor } from '@/components/batch-processor/batch-image-processor';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Zap, Settings, Archive, Clock, Shield, Cpu } from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'Lightning Fast',
    description:
      'Process hundreds of images in parallel with optimized algorithms and web workers.',
  },
  {
    icon: Settings,
    title: 'Multiple Operations',
    description: 'Combine resize, compress, format conversion, and renaming in a single workflow.',
  },
  {
    icon: Archive,
    title: 'Bulk Download',
    description: 'Download all processed images as a convenient ZIP file with one click.',
  },
  {
    icon: Clock,
    title: 'Progress Tracking',
    description: 'Real-time progress indicators and estimated completion times for all operations.',
  },
  {
    icon: Shield,
    title: 'Privacy Protected',
    description:
      'All processing happens locally in your browser - your images never leave your device.',
  },
  {
    icon: Cpu,
    title: 'Smart Processing',
    description:
      'Automatic device detection and optimization for best performance on any hardware.',
  },
];

const useCases = [
  {
    title: 'Photography Workflows',
    description: 'Resize and compress photos from photo shoots for web galleries and social media.',
  },
  {
    title: 'E-commerce Product Images',
    description: 'Standardize product photos with consistent dimensions and optimized file sizes.',
  },
  {
    title: 'Website Optimization',
    description: 'Convert images to WebP format and compress for faster website loading.',
  },
  {
    title: 'Archive Management',
    description: 'Organize and rename large collections of images with consistent naming patterns.',
  },
  {
    title: 'Social Media Content',
    description: 'Prepare images for different platforms with specific size requirements.',
  },
  {
    title: 'Blog Content',
    description: 'Optimize images for blogs with proper compression and format conversion.',
  },
];

const tips = [
  'Enable compression for web-optimized images that load faster',
  'Use format conversion to WebP for modern browsers with better compression',
  'Set up consistent naming patterns for better file organization',
  'Process images in smaller batches on slower devices for better performance',
  'Combine operations to minimize processing time and maintain quality',
  'Use aspect ratio maintenance when resizing to prevent image distortion',
];

export default function BatchProcessorPage() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-12 max-w-7xl relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-gradient-to-r from-blue-300/20 to-cyan-300/20 rounded-full blur-3xl"></div>
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-gradient-to-r from-green-300/20 to-blue-300/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-gradient-to-r from-purple-300/20 to-pink-300/20 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <div className="text-center space-y-4 relative">
        <div className="flex justify-center items-center gap-3 mb-4">
          <Zap className="h-8 w-8 text-blue-600" />
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-cyan-600 to-green-600 bg-clip-text text-transparent">
            Batch Image Processor
          </h1>
        </div>

        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
          Process hundreds of images simultaneously with automated operations. Perfect for
          photographers, content creators, and anyone who needs to handle large image collections
          efficiently.
        </p>

        <div className="flex flex-wrap justify-center gap-2 mt-6">
          <Badge variant="secondary" className="text-sm">
            ⚡ Bulk Processing
          </Badge>
          <Badge variant="secondary" className="text-sm">
            🔄 Multiple Operations
          </Badge>
          <Badge variant="secondary" className="text-sm">
            📦 ZIP Download
          </Badge>
          <Badge variant="secondary" className="text-sm">
            🔒 Client-side Only
          </Badge>
        </div>
      </div>

      {/* Main Processor */}
      <BatchImageProcessor />

      {/* Features Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <Card
            key={index}
            className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 border-0"
          >
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500">
                  <feature.icon className="h-5 w-5 text-white" />
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-600 dark:text-gray-300">
                {feature.description}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Use Cases */}
      <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Archive className="h-5 w-5" />
            Perfect For These Use Cases
          </CardTitle>
          <CardDescription>
            Discover how batch processing can streamline your image workflows.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {useCases.map((useCase, index) => (
              <div key={index} className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                <h4 className="font-medium text-sm mb-2">{useCase.title}</h4>
                <p className="text-xs text-gray-600 dark:text-gray-300">{useCase.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Pro Tips */}
      <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Cpu className="h-5 w-5" />
            Pro Tips for Efficient Batch Processing
          </CardTitle>
          <CardDescription>
            Maximize your productivity with these professional tips.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {tips.map((tip, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50"
              >
                <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-white text-sm font-bold flex-shrink-0 mt-0.5">
                  {index + 1}
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300">{tip}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Performance & Technical Info */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm shadow-lg">
          <CardHeader>
            <CardTitle>Performance Optimization</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Smart Resource Management</h4>
              <p className="text-xs text-gray-600 dark:text-gray-300">
                Automatic detection of device capabilities and adjustment of processing parameters
                for optimal performance.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Parallel Processing</h4>
              <p className="text-xs text-gray-600 dark:text-gray-300">
                Web Workers enable true parallel processing without blocking the user interface.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Memory Optimization</h4>
              <p className="text-xs text-gray-600 dark:text-gray-300">
                Efficient memory management prevents browser crashes when processing large image
                collections.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm shadow-lg">
          <CardHeader>
            <CardTitle>Supported Operations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Image Resizing</h4>
              <p className="text-xs text-gray-600 dark:text-gray-300">
                Resize with aspect ratio preservation, fit, fill, or cover modes.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Format Conversion</h4>
              <p className="text-xs text-gray-600 dark:text-gray-300">
                Convert between JPEG, PNG, and WebP formats with quality control.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-sm">File Renaming</h4>
              <p className="text-xs text-gray-600 dark:text-gray-300">
                Pattern-based renaming with support for prefixes, suffixes, and indexing.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
