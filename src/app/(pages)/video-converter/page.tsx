import { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Video, Settings, Download, Zap, FileVideo, Play } from 'lucide-react';
import { VideoConverterForm } from '@/components/video-converter';

export const metadata: Metadata = {
  title: 'Video Format Converter - Convert Videos to Multiple Formats',
  description:
    'Convert your videos to different formats (MP4, WebM, MOV, AVI, GIF) with customizable quality settings. Free online video converter tool with FFmpeg support.',
  keywords: [
    'video converter',
    'format converter',
    'MP4 converter',
    'WebM converter',
    'MOV converter',
    'AVI converter',
    'GIF converter',
    'video format',
    'online video converter',
    'free video converter',
    'FFmpeg',
    'video compression',
    'video optimization',
  ],
  openGraph: {
    title: 'Video Format Converter - Convert Videos to Multiple Formats',
    description:
      'Convert your videos to different formats with customizable quality settings. Professional video conversion tool.',
    url: 'https://pixel-craft-sigma.vercel.app/video-converter',
    images: [
      {
        url: '/og-video-converter.jpg',
        width: 1200,
        height: 630,
        alt: 'Video Format Converter Tool',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Video Format Converter - Convert Videos to Multiple Formats',
    description:
      'Convert your videos to different formats with customizable quality settings. Professional video conversion tool.',
    images: ['/twitter-video-converter.jpg'],
  },
  alternates: {
    canonical: '/video-converter',
  },
};

export default function VideoConverterPage() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-12 max-w-7xl relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-gradient-to-r from-blue-300/20 to-purple-300/20 rounded-full blur-3xl"></div>
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-300/20 to-pink-300/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-gradient-to-r from-green-300/20 to-blue-300/20 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <div className="text-center space-y-4 relative">
        <div className="flex justify-center items-center gap-3 mb-4">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-md opacity-50 animate-pulse"></div>
            <div className="relative p-4 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-full border border-blue-500/30 backdrop-blur-sm">
              <Video className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 dark:from-white dark:via-blue-300 dark:to-purple-300 bg-clip-text text-transparent">
            Video Converter
          </h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Convert your videos to multiple formats with professional quality. Support for MP4, WebM,
          MOV, AVI, GIF and more with customizable settings.
        </p>
        <div className="flex justify-center gap-3 flex-wrap mt-6">
          {[
            { label: 'Multiple Formats', icon: Video },
            { label: 'HD Quality', icon: Zap },
            { label: 'Fast Processing', icon: Settings },
            { label: 'Easy Download', icon: Download },
          ].map(badge => {
            const IconComponent = badge.icon;
            return (
              <Badge
                key={badge.label}
                variant="secondary"
                className="flex items-center gap-2 hover:bg-blue-100 dark:hover:bg-blue-900/20 transition-all duration-300 hover:scale-105 px-4 py-2 text-sm"
              >
                <div className="p-1 bg-blue-100 dark:bg-blue-900/20 rounded-full">
                  <IconComponent className="h-3 w-3 text-blue-600" />
                </div>
                {badge.label}
              </Badge>
            );
          })}
        </div>
      </div>

      {/* Features Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card className="text-center hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group border-0 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm shadow-lg hover:shadow-blue-500/25">
          <CardContent className="pt-8 pb-6">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-2xl group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-blue-500/25">
                <FileVideo className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <h3 className="font-bold text-lg mb-3 group-hover:text-primary transition-colors">
              Multiple Formats
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Convert to MP4, WebM, MOV, AVI, GIF and more with support for various codecs
            </p>
          </CardContent>
        </Card>

        <Card className="text-center hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group border-0 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm shadow-lg hover:shadow-purple-500/25">
          <CardContent className="pt-8 pb-6">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-2xl group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-purple-500/25">
                <Settings className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
            <h3 className="font-bold text-lg mb-3 group-hover:text-primary transition-colors">
              Custom Settings
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Adjust quality, resolution, frame rate and compression for optimal results
            </p>
          </CardContent>
        </Card>

        <Card className="text-center hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group border-0 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm shadow-lg hover:shadow-green-500/25">
          <CardContent className="pt-8 pb-6">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-2xl group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-green-500/25">
                <Zap className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <h3 className="font-bold text-lg mb-3 group-hover:text-primary transition-colors">
              Fast Processing
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Powered by FFmpeg for professional-grade video processing and conversion
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="relative space-y-12">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 rounded-3xl blur-xl"></div>
        <div className="relative space-y-12">
          {/* Video Converter Form Section */}
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-2">Convert Your Video</h2>
              <p className="text-muted-foreground">
                Upload a video file and convert it to your desired format with custom settings
              </p>
            </div>
            <VideoConverterForm />
          </div>

          {/* How to Use Section */}
          <Card className="mb-8 border-0 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm shadow-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <div className="p-2 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-xl border border-blue-500/30">
                  <Video className="h-5 w-5 text-blue-600" />
                </div>
                How to Convert Videos
              </CardTitle>
              <CardDescription className="text-lg">
                Follow these simple steps to convert your videos to different formats
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="flex flex-col items-center text-center p-4 border border-dashed border-blue-300 rounded-xl hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-all duration-300 group">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <span className="text-blue-600 font-bold text-sm">1</span>
                  </div>
                  <h4 className="font-semibold mb-2 text-sm">Upload Video</h4>
                  <p className="text-xs text-muted-foreground">
                    Select or drag & drop your video file (MP4, MOV, AVI, WebM)
                  </p>
                </div>
                <div className="flex flex-col items-center text-center p-4 border border-dashed border-purple-300 rounded-xl hover:bg-purple-50/50 dark:hover:bg-purple-900/10 transition-all duration-300 group">
                  <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <span className="text-purple-600 font-bold text-sm">2</span>
                  </div>
                  <h4 className="font-semibold mb-2 text-sm">Choose Format</h4>
                  <p className="text-xs text-muted-foreground">
                    Select output format and adjust quality, resolution settings
                  </p>
                </div>
                <div className="flex flex-col items-center text-center p-4 border border-dashed border-green-300 rounded-xl hover:bg-green-50/50 dark:hover:bg-green-900/10 transition-all duration-300 group">
                  <div className="w-10 h-10 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <span className="text-green-600 font-bold text-sm">3</span>
                  </div>
                  <h4 className="font-semibold mb-2 text-sm">Process Video</h4>
                  <p className="text-xs text-muted-foreground">
                    Our system converts your video with FFmpeg processing
                  </p>
                </div>
                <div className="flex flex-col items-center text-center p-4 border border-dashed border-orange-300 rounded-xl hover:bg-orange-50/50 dark:hover:bg-orange-900/10 transition-all duration-300 group">
                  <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <span className="text-orange-600 font-bold text-sm">4</span>
                  </div>
                  <h4 className="font-semibold mb-2 text-sm">Download Result</h4>
                  <p className="text-xs text-muted-foreground">
                    Download your converted video in the new format
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Supported Formats Section */}
          <Card className="border-0 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm shadow-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <div className="p-2 bg-gradient-to-br from-green-500/20 via-blue-500/20 to-purple-500/20 rounded-xl border border-green-500/30">
                  <Play className="h-5 w-5 text-green-600" />
                </div>
                Supported Formats
              </CardTitle>
              <CardDescription className="text-lg">
                We support all major video formats for input and output
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                {[
                  { format: 'MP4', description: 'Most compatible', color: 'blue' },
                  { format: 'WebM', description: 'Web optimized', color: 'green' },
                  { format: 'MOV', description: 'Apple format', color: 'purple' },
                  { format: 'AVI', description: 'Classic format', color: 'red' },
                  { format: 'FLV', description: 'Flash video', color: 'orange' },
                  { format: 'WMV', description: 'Windows format', color: 'indigo' },
                  { format: 'GIF', description: 'Animated image', color: 'pink' },
                ].map(item => (
                  <div
                    key={item.format}
                    className={`text-center p-4 rounded-xl border-2 border-dashed transition-all duration-300 hover:scale-105 group border-${item.color}-300 hover:bg-${item.color}-50/50 dark:hover:bg-${item.color}-900/10`}
                  >
                    <div
                      className={`w-12 h-12 mx-auto mb-3 bg-${item.color}-100 dark:bg-${item.color}-900/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}
                    >
                      <FileVideo className={`h-6 w-6 text-${item.color}-600`} />
                    </div>
                    <h4 className="font-bold text-lg mb-1">{item.format}</h4>
                    <p className="text-xs text-muted-foreground">{item.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
