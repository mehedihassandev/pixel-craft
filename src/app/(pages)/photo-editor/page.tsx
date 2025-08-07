'use client';

import dynamicImport from 'next/dynamic';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  Image as ImageIcon,
  Settings,
  Layers,
} from 'lucide-react';

// Dynamically import components to avoid SSR issues
const AdvancedPhotoEditor = dynamicImport(
  () =>
    import('@/components/photo-editor/advanced-photo-editor').then(mod => ({
      default: mod.AdvancedPhotoEditor,
    })),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading photo editor...</div>
      </div>
    ),
  }
);

const ImageCompressionForm = dynamicImport(
  () =>
    import('@/components/image-compress/image-compression-form').then(mod => ({
      default: mod.ImageCompressionForm,
    })),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading compression tool...</div>
      </div>
    ),
  }
);

const BatchImageProcessor = dynamicImport(
  () =>
    import('@/components/batch-processor/batch-image-processor').then(mod => ({
      default: mod.BatchImageProcessor,
    })),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading batch processor...</div>
      </div>
    ),
  }
);

// Disable static generation for this page
export const dynamic = 'force-dynamic';

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

const tips = [
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
          Complete photo editing suite with professional filters, adjustments, format conversion,
          smart compression, and batch processing. Transform your images with AI-powered tools and
          optimize them for web delivery.
        </p>

        <div className="flex flex-wrap justify-center gap-2 mt-6">
          <Badge variant="secondary" className="text-sm">
            ✨ Professional Filters
          </Badge>
          <Badge variant="secondary" className="text-sm">
            🎨 Real-time Preview
          </Badge>
          <Badge variant="secondary" className="text-sm">
            🔄 Format Conversion
          </Badge>
          <Badge variant="secondary" className="text-sm">
            📱 HEIC Support
          </Badge>
          <Badge variant="secondary" className="text-sm">
            📦 Smart Compression
          </Badge>
          <Badge variant="secondary" className="text-sm">
            ⚡ Batch Processing
          </Badge>
          <Badge variant="secondary" className="text-sm">
            🔒 Privacy First
          </Badge>
        </div>
      </div>

      {/* Main Editor */}
      <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Layers className="h-5 w-5" />
            Photo Editing Studio
          </CardTitle>
          <CardDescription>
            Choose your editing mode: individual photo editing, compression optimization, or batch
            processing
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="editor" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="editor" className="flex items-center gap-2">
                <Palette className="h-4 w-4" />
                Photo Editor
              </TabsTrigger>
              <TabsTrigger value="compression" className="flex items-center gap-2">
                <Archive className="h-4 w-4" />
                Compression
              </TabsTrigger>
              <TabsTrigger value="batch" className="flex items-center gap-2">
                <Layers className="h-4 w-4" />
                Batch Processing
              </TabsTrigger>
            </TabsList>

            <TabsContent value="editor" className="mt-6">
              <div className="space-y-4">
                <div className="text-center space-y-2">
                  <h3 className="text-lg font-semibold">Advanced Photo Editor</h3>
                  <p className="text-sm text-muted-foreground">
                    Apply filters, adjust colors, and enhance your photos with professional tools
                  </p>
                </div>
                <AdvancedPhotoEditor />
              </div>
            </TabsContent>

            <TabsContent value="compression" className="mt-6">
              <div className="space-y-4">
                <div className="text-center space-y-2">
                  <h3 className="text-lg font-semibold">Smart Image Compression</h3>
                  <p className="text-sm text-muted-foreground">
                    Reduce file sizes while maintaining quality for web optimization
                  </p>
                </div>
                <ImageCompressionForm />
              </div>
            </TabsContent>

            <TabsContent value="batch" className="mt-6">
              <div className="space-y-4">
                <div className="text-center space-y-2">
                  <h3 className="text-lg font-semibold">Batch Image Processing</h3>
                  <p className="text-sm text-muted-foreground">
                    Process multiple images with resize, compress, and format conversion operations
                  </p>
                </div>
                <BatchImageProcessor />
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Features Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
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
            Pro Tips for Better Photo Editing & Optimization
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
          <div className="grid md:grid-cols-4 gap-6">
            <div className="space-y-2">
              <h4 className="font-medium">Supported Formats</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Input: JPEG, PNG, WebP, HEIC, AVIF, TIFF, BMP, GIF
                <br />
                Output: All major formats with quality control
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Processing</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Server-side processing with Sharp for high-quality conversions and client-side
                filters for privacy
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Compression</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Advanced algorithms with up to 90% size reduction while maintaining visual quality
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Batch Operations</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Process multiple images simultaneously with resize, compress, format conversion, and
                bulk download
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
