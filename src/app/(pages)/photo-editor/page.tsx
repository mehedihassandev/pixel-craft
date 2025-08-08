'use client';

import dynamicImport from 'next/dynamic';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Palette, Layers, Archive, Sparkles } from 'lucide-react';
import {
  PHOTO_EDITOR_FEATURES,
  PHOTO_EDITOR_TIPS,
  PHOTO_EDITOR_BADGES,
  PHOTO_EDITOR_TECHNICAL_SPECS,
  PHOTO_EDITOR_META,
  PHOTO_EDITOR_TAB_CONFIGS,
} from '@/constants/photo-editor';

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
            {PHOTO_EDITOR_META.title}
          </h1>
        </div>

        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
          {PHOTO_EDITOR_META.description}
        </p>

        <div className="flex flex-wrap justify-center gap-2 mt-6">
          {PHOTO_EDITOR_BADGES.map((badge, index) => (
            <Badge key={index} variant="secondary" className="text-sm">
              {badge.label}
            </Badge>
          ))}
        </div>
      </div>

      {/* Main Editor */}
      <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Layers className="h-5 w-5" />
            {PHOTO_EDITOR_META.mainCardTitle}
          </CardTitle>
          <CardDescription>{PHOTO_EDITOR_META.mainCardDescription}</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="editor" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              {PHOTO_EDITOR_TAB_CONFIGS.map(tab => (
                <TabsTrigger key={tab.value} value={tab.value} className="flex items-center gap-2">
                  <tab.icon className="h-4 w-4" />
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {PHOTO_EDITOR_TAB_CONFIGS.map(tab => (
              <TabsContent key={tab.value} value={tab.value} className="mt-6">
                <div className="space-y-4">
                  <div className="text-center space-y-2">
                    <h3 className="text-lg font-semibold">{tab.title}</h3>
                    <p className="text-sm text-muted-foreground">{tab.description}</p>
                  </div>
                  {tab.value === 'editor' && <AdvancedPhotoEditor />}
                  {tab.value === 'compression' && <ImageCompressionForm />}
                  {tab.value === 'batch' && <BatchImageProcessor />}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>

      {/* Features Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {PHOTO_EDITOR_FEATURES.map((feature, index) => (
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
            {PHOTO_EDITOR_META.tipsTitle}
          </CardTitle>
          <CardDescription>{PHOTO_EDITOR_META.tipsDescription}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {PHOTO_EDITOR_TIPS.map((tip, index) => (
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
          <CardTitle>{PHOTO_EDITOR_META.technicalSpecsTitle}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-6">
            {PHOTO_EDITOR_TECHNICAL_SPECS.map((spec, index) => (
              <div key={index} className="space-y-2">
                <h4 className="font-medium">{spec.title}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 whitespace-pre-line">
                  {spec.description}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
