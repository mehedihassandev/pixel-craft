import { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Eraser, Sparkles, Download, Eye, Layers } from 'lucide-react';
import { BackgroundRemovalFormWrapper } from '@/components/background-remove';

export const metadata: Metadata = {
  title: 'AI Background Removal - Remove Image Backgrounds Instantly',
  description:
    'Remove backgrounds from images instantly with AI. Upload your photo and get professional results in seconds. Perfect for product photos, portraits, and social media.',
  keywords: [
    'background removal',
    'remove background',
    'AI background remover',
    'image background removal',
    'photo background remover',
    'transparent background',
    'product photography',
    'portrait background removal',
  ],
  openGraph: {
    title: 'AI Background Removal - Remove Image Backgrounds Instantly',
    description:
      'Remove backgrounds from images instantly with AI. Upload your photo and get professional results in seconds.',
    url: 'https://pixel-craft-sigma.vercel.app/background-remove',
    images: [
      {
        url: '/og-background-remove.jpg',
        width: 1200,
        height: 630,
        alt: 'AI Background Removal Tool',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Background Removal - Remove Image Backgrounds Instantly',
    description:
      'Remove backgrounds from images instantly with AI. Upload your photo and get professional results in seconds.',
    images: ['/twitter-background-remove.jpg'],
  },
  alternates: {
    canonical: '/background-remove',
  },
};

export default function BackgroundRemovePage() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-12 max-w-7xl relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-gradient-to-r from-red-300/20 to-pink-300/20 rounded-full blur-3xl"></div>
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-300/20 to-indigo-300/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-gradient-to-r from-orange-300/20 to-yellow-300/20 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <div className="text-center space-y-4 relative">
        <div className="flex justify-center items-center gap-3 mb-4">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-pink-600 rounded-full blur-md opacity-50 animate-pulse"></div>
            <div className="relative p-4 bg-gradient-to-br from-red-500/20 via-pink-500/20 to-purple-500/20 rounded-full border border-red-500/30 backdrop-blur-sm">
              <Eraser className="h-8 w-8 text-red-600" />
            </div>
          </div>
          <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-r from-gray-900 via-red-900 to-pink-900 dark:from-white dark:via-red-300 dark:to-pink-300 bg-clip-text text-transparent">
            Background Removal
          </h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Remove backgrounds from your images using our AI-powered tool. Get professional quality
          results with transparent PNG output in seconds.
        </p>
        <div className="flex justify-center gap-3 flex-wrap mt-6">
          {[
            { label: 'AI Powered', icon: Sparkles },
            { label: 'Instant Results', icon: Eye },
            { label: 'PNG Output', icon: Download },
            { label: 'High Quality', icon: Layers },
          ].map(badge => {
            const IconComponent = badge.icon;
            return (
              <Badge
                key={badge.label}
                variant="secondary"
                className="flex items-center gap-2 hover:bg-red-100 dark:hover:bg-red-900/20 transition-all duration-300 hover:scale-105 px-4 py-2 text-sm"
              >
                <div className="p-1 bg-red-100 dark:bg-red-900/20 rounded-full">
                  <IconComponent className="h-3 w-3 text-red-600" />
                </div>
                {badge.label}
              </Badge>
            );
          })}
        </div>
      </div>

      {/* Features Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card className="text-center hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group border-0 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm shadow-lg hover:shadow-red-500/25">
          <CardContent className="pt-8 pb-6">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-red-100 dark:bg-red-900/20 rounded-2xl group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-red-500/25">
                <Sparkles className="h-5 w-5 text-red-600 dark:text-red-400" />
              </div>
            </div>
            <h3 className="font-bold text-lg mb-3 group-hover:text-primary transition-colors">
              AI-Powered
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Advanced AI algorithms automatically detect and remove backgrounds with precision
            </p>
          </CardContent>
        </Card>

        <Card className="text-center hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group border-0 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm shadow-lg hover:shadow-green-500/25">
          <CardContent className="pt-8 pb-6">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-2xl group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-green-500/25">
                <Eye className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <h3 className="font-bold text-lg mb-3 group-hover:text-primary transition-colors">
              Instant Preview
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              See results instantly with side-by-side comparison and transparent background
            </p>
          </CardContent>
        </Card>

        <Card className="text-center hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group border-0 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm shadow-lg hover:shadow-purple-500/25">
          <CardContent className="pt-8 pb-6">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-2xl group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-purple-500/25">
                <Download className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
            <h3 className="font-bold text-lg mb-3 group-hover:text-primary transition-colors">
              PNG Export
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Download high-quality PNG files with transparent backgrounds ready to use
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="relative space-y-12">
        <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 via-pink-500/5 to-purple-500/5 rounded-3xl blur-xl"></div>
        <div className="relative space-y-12">
          {/* Background Removal Form Section */}
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-2">Remove Background from Image</h2>
              <p className="text-muted-foreground">
                Upload an image and remove its background using advanced AI technology
              </p>
            </div>
            <BackgroundRemovalFormWrapper />
          </div>

          {/* How to Use Section */}
          <Card className="mb-8 border-0 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm shadow-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <div className="p-2 bg-gradient-to-br from-red-500/20 via-pink-500/20 to-purple-500/20 rounded-xl border border-red-500/30">
                  <Eraser className="h-5 w-5 text-red-600" />
                </div>
                How to Remove Background
              </CardTitle>
              <CardDescription className="text-lg">
                Follow these simple steps to remove backgrounds from your images
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="flex flex-col items-center text-center p-4 border border-dashed border-red-300 rounded-xl hover:bg-red-50/50 dark:hover:bg-red-900/10 transition-all duration-300 group">
                  <div className="w-10 h-10 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <span className="text-red-600 font-bold text-sm">1</span>
                  </div>
                  <h4 className="font-semibold mb-2 text-sm">Upload Image</h4>
                  <p className="text-xs text-muted-foreground">
                    Select or drag & drop your image file (JPG, PNG, WebP)
                  </p>
                </div>
                <div className="flex flex-col items-center text-center p-4 border border-dashed border-green-300 rounded-xl hover:bg-green-50/50 dark:hover:bg-green-900/10 transition-all duration-300 group">
                  <div className="w-10 h-10 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <span className="text-green-600 font-bold text-sm">2</span>
                  </div>
                  <h4 className="font-semibold mb-2 text-sm">AI Processing</h4>
                  <p className="text-xs text-muted-foreground">
                    Our AI automatically detects and removes the background
                  </p>
                </div>
                <div className="flex flex-col items-center text-center p-4 border border-dashed border-purple-300 rounded-xl hover:bg-purple-50/50 dark:hover:bg-purple-900/10 transition-all duration-300 group">
                  <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <span className="text-purple-600 font-bold text-sm">3</span>
                  </div>
                  <h4 className="font-semibold mb-2 text-sm">Preview Results</h4>
                  <p className="text-xs text-muted-foreground">
                    See before/after comparison with transparent background
                  </p>
                </div>
                <div className="flex flex-col items-center text-center p-4 border border-dashed border-blue-300 rounded-xl hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-all duration-300 group">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <span className="text-blue-600 font-bold text-sm">4</span>
                  </div>
                  <h4 className="font-semibold mb-2 text-sm">Download PNG</h4>
                  <p className="text-xs text-muted-foreground">
                    Download your image with transparent background as PNG
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
