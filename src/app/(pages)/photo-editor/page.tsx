'use client';

import { AdvancedPhotoEditor } from '@/components/photo-editor/advanced-photo-editor';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Palette, Sparkles, Eye, Sliders, Filter, Zap } from 'lucide-react';

const features = [
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
    icon: Zap,
    title: 'Fast Processing',
    description: 'Client-side processing ensures privacy and lightning-fast results.',
  },
];

const tips = [
  'Start with preset filters to quickly enhance your photos',
  'Use the split view to compare original and edited versions',
  'Adjust exposure and highlights for better lighting balance',
  'Apply subtle vignette effects to draw focus to the center',
  'Combine multiple adjustments for professional-looking results',
  'Save your edited images in high quality PNG format',
];

export default function PhotoEditorPage() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-12 max-w-7xl relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-gradient-to-r from-purple-300/20 to-pink-300/20 rounded-full blur-3xl"></div>
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-300/20 to-cyan-300/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-gradient-to-r from-orange-300/20 to-red-300/20 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <div className="text-center space-y-4 relative">
        <div className="flex justify-center items-center gap-3 mb-4">
          <Palette className="h-8 w-8 text-purple-600" />
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
            Advanced Photo Editor
          </h1>
        </div>

        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
          Transform your photos with professional-grade filters and adjustments. Apply artistic
          effects, enhance colors, and create stunning visuals with real-time preview.
        </p>

        <div className="flex flex-wrap justify-center gap-2 mt-6">
          <Badge variant="secondary" className="text-sm">
            ✨ Professional Filters
          </Badge>
          <Badge variant="secondary" className="text-sm">
            🎨 Real-time Preview
          </Badge>
          <Badge variant="secondary" className="text-sm">
            ⚡ Instant Processing
          </Badge>
          <Badge variant="secondary" className="text-sm">
            🔒 Privacy First
          </Badge>
        </div>
      </div>

      {/* Main Editor */}
      <AdvancedPhotoEditor />

      {/* Features Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <Card
            key={index}
            className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 border-0"
          >
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500">
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

      {/* Tips Section */}
      <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            Pro Tips for Better Photo Editing
          </CardTitle>
          <CardDescription>
            Get the most out of your photo editing experience with these professional tips.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {tips.map((tip, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50"
              >
                <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white text-sm font-bold flex-shrink-0 mt-0.5">
                  {index + 1}
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300">{tip}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Technical Specs */}
      <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm shadow-lg">
        <CardHeader>
          <CardTitle>Technical Specifications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <h4 className="font-medium">Supported Formats</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                JPEG, PNG, WebP input formats with PNG output for best quality
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Processing</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Client-side processing using HTML5 Canvas API for privacy and speed
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Browser Support</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Modern browsers with Canvas API support (Chrome 50+, Firefox 50+, Safari 10+)
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
