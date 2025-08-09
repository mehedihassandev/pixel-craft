'use client';

import { useState, useMemo, useEffect } from 'react';
import { ImagePreview } from '@/components/placeholder/image-preview';
import { Skeleton } from '@/components/ui/skeleton';
import { PlaceholderForm } from '@/components/placeholder/placeholder-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  ImageIcon,
  Palette,
  Type,
  Settings,
  Zap,
  Download,
  Sparkles,
  Layers,
  Grid3X3,
} from 'lucide-react';

export interface PlaceholdrOptions {
  width: number;
  height: number;
  text: string;
  bgColor: string;
  textColor: string;
  format: 'png' | 'jpg' | 'webp';
  fontSize: number | null;
}

const PlaceholderPage = () => {
  const [options, setOptions] = useState<PlaceholdrOptions>({
    width: 600,
    height: 400,
    text: '',
    bgColor: 'c0c0c0',
    textColor: 'F0F8FF',
    format: 'png',
    fontSize: null,
  });

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const imageUrl = useMemo(() => {
    const { width, height, text, bgColor, textColor, format, fontSize } = options;
    if (!mounted) {
      return `https://placehold.co/600x400/EFEFEF/AAAAAA.png?text=Loading...`;
    }

    // Ensure width and height are valid numbers with fallbacks
    const validWidth = width && width > 0 ? width : 600;
    const validHeight = height && height > 0 ? height : 400;

    const cleanBgColor = bgColor.replace('#', '');
    const cleanTextColor = textColor.replace('#', '');

    // Use the correct placehold.co URL format with extension
    let url = `https://placehold.co/${validWidth}x${validHeight}/${cleanBgColor}/${cleanTextColor}.${format}`;

    // Add text parameter if provided
    if (text) {
      url += `?text=${encodeURIComponent(text)}`;
    }

    return url;
  }, [options, mounted]);

  if (!mounted) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Skeleton className="w-full max-w-md h-64" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl space-y-12 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-gradient-to-r from-purple-300/20 to-pink-300/20 rounded-full blur-3xl"></div>
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-gradient-to-r from-orange-300/20 to-yellow-300/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-gradient-to-r from-blue-300/20 to-indigo-300/20 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <div className="text-center mb-8 relative">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-purple-600 rounded-full blur-md opacity-50 animate-pulse"></div>
            <div className="relative p-4 bg-gradient-to-br from-primary/20 via-purple-500/20 to-pink-500/20 rounded-full border border-primary/30 backdrop-blur-sm">
              <ImageIcon className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-r from-gray-900 via-purple-900 to-pink-900 dark:from-white dark:via-purple-300 dark:to-pink-300 bg-clip-text text-transparent">
            Placeholder Generator
          </h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Create custom placeholder images with full control over dimensions, colors, text, and
          format. Perfect for mockups, wireframes, and development.
        </p>
      </div>

      {/* Features Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card className="text-center hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group border-0 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm shadow-lg hover:shadow-purple-500/25">
          <CardContent className="pt-8 pb-6">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-2xl group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-blue-500/25">
                <Grid3X3 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <h3 className="font-bold text-lg mb-3 group-hover:text-primary transition-colors">
              Custom Dimensions
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Set any width and height up to 5000px
            </p>
          </CardContent>
        </Card>

        <Card className="text-center hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group border-0 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm shadow-lg hover:shadow-green-500/25">
          <CardContent className="pt-8 pb-6">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-2xl group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-green-500/25">
                <Palette className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <h3 className="font-bold text-lg mb-3 group-hover:text-primary transition-colors">
              Color Control
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Customize background and text colors
            </p>
          </CardContent>
        </Card>

        <Card className="text-center hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group border-0 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm shadow-lg hover:shadow-purple-500/25">
          <CardContent className="pt-8 pb-6">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-2xl group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-purple-500/25">
                <Type className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
            <h3 className="font-bold text-lg mb-3 group-hover:text-primary transition-colors">
              Text & Typography
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Add custom text with AI-suggested font sizes
            </p>
          </CardContent>
        </Card>

        <Card className="text-center hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group border-0 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm shadow-lg hover:shadow-orange-500/25">
          <CardContent className="pt-8 pb-6">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-orange-100 dark:bg-orange-900/20 rounded-2xl group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-orange-500/25">
                <Layers className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              </div>
            </div>
            <h3 className="font-bold text-lg mb-3 group-hover:text-primary transition-colors">
              Multiple Formats
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Export as PNG, JPG, or WebP formats
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-purple-500/5 to-pink-500/5 rounded-3xl blur-xl"></div>
        <div className="relative">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {/* Left Column - Form */}
            <div className="space-y-6">
              <PlaceholderForm options={options} setOptions={setOptions} />
            </div>

            {/* Right Column - Preview */}
            <div className="space-y-6">
              <ImagePreview options={options} url={imageUrl} />
            </div>
          </div>
        </div>
      </div>

      {/* How to Use Section */}
      <Card className="mt-12 border-0 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm shadow-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-2xl">
            <div className="p-2 bg-gradient-to-br from-primary/20 via-purple-500/20 to-pink-500/20 rounded-xl border border-primary/30">
              <Settings className="h-5 w-5 text-primary" />
            </div>
            How to Use Placeholder Generator
          </CardTitle>
          <CardDescription className="text-lg">
            Follow these simple steps to create your perfect placeholder image
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex flex-col items-center text-center p-4 border border-dashed border-blue-300 rounded-xl hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-all duration-300 group shadow-md hover:shadow-lg hover:shadow-blue-500/25">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-sm shadow-blue-500/25">
                <span className="text-blue-600 font-bold text-sm">1</span>
              </div>
              <h4 className="font-semibold mb-2 text-sm">Set Dimensions</h4>
              <p className="text-xs text-muted-foreground">
                Enter your desired width and height in pixels (up to 5000px)
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-4 border border-dashed border-green-300 rounded-xl hover:bg-green-50/50 dark:hover:bg-green-900/10 transition-all duration-300 group shadow-md hover:shadow-lg hover:shadow-green-500/25">
              <div className="w-10 h-10 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-sm shadow-green-500/25">
                <span className="text-green-600 font-bold text-sm">2</span>
              </div>
              <h4 className="font-semibold mb-2 text-sm">Choose Colors</h4>
              <p className="text-xs text-muted-foreground">
                Select background and text colors using the color picker
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-4 border border-dashed border-purple-300 rounded-xl hover:bg-purple-50/50 dark:hover:bg-purple-900/10 transition-all duration-300 group shadow-md hover:shadow-lg hover:shadow-purple-500/25">
              <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-sm shadow-purple-500/25">
                <span className="text-purple-600 font-bold text-sm">3</span>
              </div>
              <h4 className="font-semibold mb-2 text-sm">Add Text & Format</h4>
              <p className="text-xs text-muted-foreground">
                Add custom text with AI-suggested sizing and choose output format
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-4 border border-dashed border-orange-300 rounded-xl hover:bg-orange-50/50 dark:hover:bg-orange-900/10 transition-all duration-300 group shadow-md hover:shadow-lg hover:shadow-orange-500/25">
              <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-sm shadow-orange-500/25">
                <span className="text-orange-600 font-bold text-sm">4</span>
              </div>
              <h4 className="font-semibold mb-2 text-sm">Preview & Download</h4>
              <p className="text-xs text-muted-foreground">
                Preview your placeholder and download in your chosen format
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Features & Tips */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        <Card className="shadow-xl hover:shadow-2xl transition-all duration-300 hover:shadow-purple-500/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5" />
              Smart Features
            </CardTitle>
            <CardDescription>Advanced capabilities to enhance your workflow</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3">
              <Badge variant="outline" className="mt-1 shadow-sm">
                AI
              </Badge>
              <div>
                <h4 className="font-medium">Smart Font Sizing</h4>
                <p className="text-sm text-muted-foreground">
                  Get AI-powered font size suggestions based on your image dimensions for optimal
                  readability.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Badge variant="outline" className="mt-1 shadow-sm">
                Live
              </Badge>
              <div>
                <h4 className="font-medium">Real-time Preview</h4>
                <p className="text-sm text-muted-foreground">
                  See your changes instantly with live preview that updates as you modify settings.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Badge variant="outline" className="mt-1 shadow-sm">
                Fast
              </Badge>
              <div>
                <h4 className="font-medium">Instant Generation</h4>
                <p className="text-sm text-muted-foreground">
                  No waiting time - placeholders are generated instantly using optimized APIs.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-xl hover:shadow-2xl transition-all duration-300 hover:shadow-blue-500/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Pro Tips
            </CardTitle>
            <CardDescription>Make the most out of your placeholder images</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div>
                <h4 className="font-medium text-sm">Common Dimensions</h4>
                <p className="text-sm text-muted-foreground">
                  Use standard ratios like 16:9 (1920x1080), 4:3 (800x600), or 1:1 (500x500) for
                  better compatibility.
                </p>
              </div>

              <div>
                <h4 className="font-medium text-sm">Color Contrast</h4>
                <p className="text-sm text-muted-foreground">
                  Ensure good contrast between background and text colors for readability (WCAG
                  guidelines).
                </p>
              </div>

              <div>
                <h4 className="font-medium text-sm">Format Selection</h4>
                <p className="text-sm text-muted-foreground">
                  Use PNG for transparency support, JPG for smaller file sizes, WebP for modern
                  browsers.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Use Cases */}
      <Card className="mt-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:shadow-indigo-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="h-5 w-5" />
            Perfect for
          </CardTitle>
          <CardDescription>Common use cases for placeholder images</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-muted/50 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
              <h4 className="font-medium mb-1">Web Development</h4>
              <p className="text-xs text-muted-foreground">Mockups & wireframes</p>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
              <h4 className="font-medium mb-1">UI/UX Design</h4>
              <p className="text-xs text-muted-foreground">Prototypes & layouts</p>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
              <h4 className="font-medium mb-1">Content Creation</h4>
              <p className="text-xs text-muted-foreground">Blog posts & articles</p>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
              <h4 className="font-medium mb-1">Testing</h4>
              <p className="text-xs text-muted-foreground">Image loading tests</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PlaceholderPage;
