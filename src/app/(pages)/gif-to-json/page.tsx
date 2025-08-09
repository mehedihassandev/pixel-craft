'use client';

import { GifToJsonForm } from '@/components/gif-to-json';
import { JsonPlaybackDemo } from '@/components/gif-to-json/json-playback-demo';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileCode, Layers, Download, Eye, Settings, Zap, Copy } from 'lucide-react';
import { SAMPLE_JSON_STRUCTURE, SAMPLE_CANVAS_EXAMPLE } from '@/constants/gif-to-json';

export default function GifToJsonPage() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-12 max-w-7xl relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-gradient-to-r from-blue-300/20 to-indigo-300/20 rounded-full blur-3xl"></div>
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-300/20 to-pink-300/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-gradient-to-r from-cyan-300/20 to-blue-300/20 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <div className="text-center space-y-4 relative">
        <div className="flex justify-center items-center gap-3 mb-4">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full blur-md opacity-50 animate-pulse"></div>
            <div className="relative p-4 bg-gradient-to-br from-blue-500/20 via-indigo-500/20 to-purple-500/20 rounded-full border border-blue-500/30 backdrop-blur-sm">
              <FileCode className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 dark:from-white dark:via-blue-300 dark:to-indigo-300 bg-clip-text text-transparent">
            GIF to JSON Converter
          </h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Extract frame-by-frame data from animated GIFs and convert to JSON format. Perfect for
          building custom animation players, analyzing frame timing, or reconstructing animations in
          web applications.
        </p>
        <div className="flex justify-center gap-3 flex-wrap mt-6">
          {[
            { label: 'Frame Extraction', icon: Layers },
            { label: 'JSON Output', icon: FileCode },
            { label: 'Canvas Ready', icon: Eye },
            { label: 'Fast Processing', icon: Zap },
          ].map(badge => {
            const IconComponent = badge.icon;
            return (
              <Badge
                key={badge.label}
                variant="secondary"
                className="flex items-center gap-2 hover:bg-blue-100 dark:hover:bg-blue-900/20 transition-all duration-300 hover:scale-105 px-4 py-2 text-sm"
              >
                <div className="p-1 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                  <IconComponent className="h-3 w-3 text-blue-600 dark:text-blue-400" />
                </div>
                {badge.label}
              </Badge>
            );
          })}
        </div>
      </div>

      {/* Main Form */}
      <GifToJsonForm />

      {/* Demo Section */}
      <Card className="mt-16">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">Test Your JSON Output</CardTitle>
          <CardDescription className="text-lg">
            Try the JSON playback demo to see how your converted data works in a Canvas-based
            animation player.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <JsonPlaybackDemo />
        </CardContent>
      </Card>

      {/* Preview Features Section */}
      <Card className="bg-gradient-to-br from-blue-50/50 via-indigo-50/30 to-purple-50/50 dark:from-blue-950/20 dark:via-indigo-950/10 dark:to-purple-950/20 border-blue-200/50 dark:border-blue-800/30">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Preview Features
          </CardTitle>
          <CardDescription className="text-lg">
            Real-time preview and analysis of your GIF conversion process
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Frame Preview */}
            <div className="bg-gradient-to-br from-blue-100/70 to-cyan-100/50 dark:from-blue-900/30 dark:to-cyan-900/20 rounded-lg p-6 border border-blue-200/50 dark:border-blue-700/30">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <Eye className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="font-semibold text-blue-900 dark:text-blue-100">Frame Preview</h3>
              </div>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                Live preview of individual frames as they're extracted from your GIF
              </p>
            </div>

            {/* Progress Tracking */}
            <div className="bg-gradient-to-br from-indigo-100/70 to-blue-100/50 dark:from-indigo-900/30 dark:to-blue-900/20 rounded-lg p-6 border border-indigo-200/50 dark:border-indigo-700/30">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-indigo-500/20 rounded-lg">
                  <Zap className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h3 className="font-semibold text-indigo-900 dark:text-indigo-100">
                  Progress Tracking
                </h3>
              </div>
              <p className="text-sm text-indigo-700 dark:text-indigo-300">
                Real-time progress bar showing extraction and conversion status
              </p>
            </div>

            {/* JSON Structure */}
            <div className="bg-gradient-to-br from-purple-100/70 to-pink-100/50 dark:from-purple-900/30 dark:to-pink-900/20 rounded-lg p-6 border border-purple-200/50 dark:border-purple-700/30">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-purple-500/20 rounded-lg">
                  <FileCode className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="font-semibold text-purple-900 dark:text-purple-100">JSON Preview</h3>
              </div>
              <p className="text-sm text-purple-700 dark:text-purple-300">
                Preview the generated JSON structure before downloading
              </p>
            </div>

            {/* Download Options */}
            <div className="bg-gradient-to-br from-cyan-100/70 to-teal-100/50 dark:from-cyan-900/30 dark:to-teal-900/20 rounded-lg p-6 border border-cyan-200/50 dark:border-cyan-700/30">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-cyan-500/20 rounded-lg">
                  <Download className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
                </div>
                <h3 className="font-semibold text-cyan-900 dark:text-cyan-100">Download Options</h3>
              </div>
              <p className="text-sm text-cyan-700 dark:text-cyan-300">
                Multiple export formats with customizable quality settings
              </p>
            </div>
          </div>

          {/* Advanced Preview Features */}
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-gradient-to-r from-violet-50/80 to-purple-50/60 dark:from-violet-950/30 dark:to-purple-950/20 rounded-lg p-6 border border-violet-200/50 dark:border-violet-700/30">
              <h4 className="font-semibold text-lg mb-3 text-violet-900 dark:text-violet-100">
                Interactive Frame Navigation
              </h4>
              <ul className="space-y-2 text-sm text-violet-700 dark:text-violet-300">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-violet-500 rounded-full"></div>
                  Scrub through frames with timeline slider
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-violet-500 rounded-full"></div>
                  Play/pause animation preview
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-violet-500 rounded-full"></div>
                  Adjust playback speed controls
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-violet-500 rounded-full"></div>
                  Frame-by-frame stepping
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-r from-emerald-50/80 to-teal-50/60 dark:from-emerald-950/30 dark:to-teal-950/20 rounded-lg p-6 border border-emerald-200/50 dark:border-emerald-700/30">
              <h4 className="font-semibold text-lg mb-3 text-emerald-900 dark:text-emerald-100">
                Conversion Analytics
              </h4>
              <ul className="space-y-2 text-sm text-emerald-700 dark:text-emerald-300">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                  Total frame count and duration
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                  File size comparison (before/after)
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                  Compression ratio statistics
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                  Processing time metrics
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Usage Examples */}
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Usage Examples</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold">JSON Structure</h3>
              </div>
              <div className="bg-muted rounded-lg p-4 text-sm font-mono overflow-x-auto">
                <pre>{SAMPLE_JSON_STRUCTURE}</pre>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3">Canvas Animation Example</h3>
              <div className="bg-muted rounded-lg p-4 text-sm font-mono overflow-x-auto">
                <pre>{SAMPLE_CANVAS_EXAMPLE}</pre>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
