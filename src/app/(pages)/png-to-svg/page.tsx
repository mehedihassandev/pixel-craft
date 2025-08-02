'use client';
import { PngToSvgConverter } from '@/components/png-to-svg/png-to-svg';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Download } from 'lucide-react';
import { pngToSvgFeatures, howToUseSteps, headerBadges } from '@/constants/png-to-svg';

export default function PngToSvgPage() {
  return (
    <main className="container mx-auto px-4 py-8 max-w-7xl space-y-12 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-gradient-to-r from-pink-300/20 to-purple-300/20 rounded-full blur-3xl"></div>
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-300/20 to-cyan-300/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-gradient-to-r from-yellow-300/20 to-orange-300/20 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <div className="text-center mb-8 relative">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-purple-600 rounded-full blur-md opacity-50 animate-pulse"></div>
            <div className="relative p-4 bg-gradient-to-br from-primary/20 via-purple-500/20 to-pink-500/20 rounded-full border border-primary/30 backdrop-blur-sm">
              <Download className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-r from-gray-900 via-purple-900 to-pink-900 dark:from-white dark:via-purple-300 dark:to-pink-300 bg-clip-text text-transparent">
            PNG to SVG Converter
          </h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Convert your PNG images into clean, scalable SVGs with full control over colors, scale,
          and threshold settings. Perfect for web optimization and vector graphics.
        </p>
        <div className="flex justify-center gap-3 flex-wrap mt-6">
          {headerBadges.map(badge => {
            const IconComponent = badge.feature.icon;
            return (
              <Badge
                key={badge.label}
                variant="secondary"
                className={`flex items-center gap-2 ${badge.feature.badgeHover} transition-all duration-300 hover:scale-105 px-4 py-2 text-sm`}
              >
                <div className={`p-1 ${badge.feature.badgeBg} rounded-full`}>
                  <IconComponent className={`h-3 w-3 ${badge.feature.badgeIconColor}`} />
                </div>
                {badge.label}
              </Badge>
            );
          })}
        </div>
      </div>

      {/* Features Overview */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {pngToSvgFeatures.map(feat => {
          const IconComponent = feat.icon;
          return (
            <Card
              key={feat.title}
              className="text-center hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group border-0 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-900 shadow-lg hover:shadow-primary/25"
            >
              <CardContent className="pt-8 pb-6">
                <div className="flex justify-center mb-4">
                  <div
                    className={`p-4 ${feat.bgColor} rounded-2xl group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-primary/20`}
                  >
                    <IconComponent className={`h-6 w-6 ${feat.iconColor}`} />
                  </div>
                </div>
                <h3 className="font-bold text-lg mb-3 group-hover:text-primary transition-colors">
                  {feat.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feat.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Converter Section */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-purple-500/5 to-pink-500/5 rounded-3xl blur-xl"></div>
        <div className="relative">
          <PngToSvgConverter />
        </div>
      </div>

      {/* How to Use Section */}
      <Card className="mt-12 border-0 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm shadow-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-2xl">
            <div className="p-2 bg-gradient-to-br from-primary/20 via-purple-500/20 to-pink-500/20 rounded-xl border border-primary/30">
              <Download className="h-5 w-5 text-primary" />
            </div>
            How to Use PNG to SVG Converter
          </CardTitle>
          <CardDescription className="text-lg">
            Follow these simple steps to convert your PNG images to scalable SVG format
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex flex-col items-center text-center p-4 border border-dashed border-blue-300 rounded-xl hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-all duration-300 group">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <span className="text-blue-600 font-bold text-sm">1</span>
              </div>
              <h4 className="font-semibold mb-2 text-sm">Upload PNG Image</h4>
              <p className="text-xs text-muted-foreground">
                Select or drag & drop your PNG image file to start the conversion
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-4 border border-dashed border-green-300 rounded-xl hover:bg-green-50/50 dark:hover:bg-green-900/10 transition-all duration-300 group">
              <div className="w-10 h-10 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <span className="text-green-600 font-bold text-sm">2</span>
              </div>
              <h4 className="font-semibold mb-2 text-sm">Adjust Settings</h4>
              <p className="text-xs text-muted-foreground">
                Configure color palette, scale, and quality threshold for optimal results
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-4 border border-dashed border-purple-300 rounded-xl hover:bg-purple-50/50 dark:hover:bg-purple-900/10 transition-all duration-300 group">
              <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <span className="text-purple-600 font-bold text-sm">3</span>
              </div>
              <h4 className="font-semibold mb-2 text-sm">Generate SVG</h4>
              <p className="text-xs text-muted-foreground">
                Click convert to generate your scalable SVG with real-time preview
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-4 border border-dashed border-orange-300 rounded-xl hover:bg-orange-50/50 dark:hover:bg-orange-900/10 transition-all duration-300 group">
              <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <span className="text-orange-600 font-bold text-sm">4</span>
              </div>
              <h4 className="font-semibold mb-2 text-sm">Download SVG</h4>
              <p className="text-xs text-muted-foreground">
                Preview your converted SVG and download the scalable vector file
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
