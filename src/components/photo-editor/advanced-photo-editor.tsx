'use client';

import React, { useState, useCallback, useRef, useEffect } from 'react';
import Image from 'next/image';
import { imageProcessor, presetFilters, FilterOptions, PresetFilter } from '@/lib/image-filters';
import { usePerformanceMonitor } from '@/lib/performance-monitor';
import { formatFileSize, createFilePreviewUrl, revokeFilePreviewUrl } from '@/lib/utils';
import { ImageUploadZone } from '@/components/ui/image-upload-zone';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Progress } from '@/components/ui/progress';
import { FormatConversion } from '@/components/photo-editor/format-conversion';
import {
  Upload,
  Image as ImageIcon,
  Download,
  RotateCcw,
  Palette,
  Sliders,
  Sparkles,
  Filter,
  Sun,
  Moon,
  Contrast,
  Zap,
  Eye,
  EyeOff,
  FileImage,
  Camera,
  Edit3,
  Settings,
  Layers,
  Wand2,
  RefreshCw,
  Save,
  FolderOpen,
} from 'lucide-react';

interface ProcessedImageData {
  originalFile: File;
  originalPreviewUrl: string;
  processedPreviewUrl?: string;
  processedBlob?: Blob;
  appliedFilters: FilterOptions;
  isHEIC?: boolean;
  heicProcessed?: boolean;
}

export function AdvancedPhotoEditor() {
  const [imageData, setImageData] = useState<ProcessedImageData | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isProcessingHEIC, setIsProcessingHEIC] = useState(false);
  const [currentFilters, setCurrentFilters] = useState<FilterOptions>({});
  const [selectedPreset, setSelectedPreset] = useState<string>('None');
  const [showPreview, setShowPreview] = useState(true);
  const [previewSplit, setPreviewSplit] = useState(50); // For before/after split view
  const [conversionProgress, setConversionProgress] = useState(0);
  const { startOperation, endOperation, getRecommendedSettings } = usePerformanceMonitor();

  const handleFileSelect = useCallback(async (files: File[]) => {
    if (!files || files.length === 0) return;

    const file = files[0];

    if (!file.type.startsWith('image/')) {
      console.error('Please select a valid image file');
      return;
    }

    let originalPreviewUrl = createFilePreviewUrl(file);
    let processedFile = file;
    const isHEIC = file.type === 'image/heic' || file.name.toLowerCase().endsWith('.heic');
    let heicProcessed = false;

    // Handle HEIC files specifically
    if (isHEIC) {
      setIsProcessingHEIC(true);
      try {
        console.log('Processing HEIC file:', file.name);
        // For HEIC files, we need to convert them for preview
        const { HEICProcessor } = await import('@/lib/heic-processor');
        const processor = HEICProcessor.getInstance();

        // Convert HEIC to JPEG for preview
        const jpegBlob = await processor.convertHEICToJPEG(file, 90);
        processedFile = new File([jpegBlob], file.name.replace(/\.heic$/i, '.jpg'), {
          type: 'image/jpeg',
          lastModified: file.lastModified,
        });

        // Clean up the previous URL
        if (originalPreviewUrl !== createFilePreviewUrl(file)) {
          URL.revokeObjectURL(originalPreviewUrl);
        }

        originalPreviewUrl = createFilePreviewUrl(processedFile);
        heicProcessed = true;
        console.log('HEIC conversion successful');
      } catch (error) {
        console.warn('HEIC client-side conversion failed, will use server-side:', error);
        // Keep the original file and URL - server will handle conversion
        processedFile = file;
        originalPreviewUrl = createFilePreviewUrl(file);
      } finally {
        setIsProcessingHEIC(false);
      }
    }

    // Test if the image can be loaded
    const testImageLoad = (): Promise<boolean> => {
      return new Promise(resolve => {
        if (typeof window === 'undefined') {
          resolve(true);
          return;
        }

        const testImg = document.createElement('img');
        testImg.onload = () => {
          resolve(true);
        };
        testImg.onerror = () => {
          console.warn('Image failed to load in browser');
          resolve(false);
        };
        testImg.src = originalPreviewUrl;

        // Timeout after 5 seconds
        setTimeout(() => {
          resolve(false);
        }, 5000);
      });
    };

    // If it's a HEIC file and we couldn't convert it, show a placeholder
    const canLoad = await testImageLoad();
    if (!canLoad && isHEIC && !heicProcessed) {
      // Create a placeholder for HEIC files that can't be displayed
      originalPreviewUrl =
        'data:image/svg+xml;base64,' +
        btoa(`
        <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
          <rect width="100%" height="100%" fill="#f3f4f6"/>
          <text x="50%" y="40%" text-anchor="middle" fill="#6b7280" font-family="Arial, sans-serif" font-size="16">
            HEIC Image
          </text>
          <text x="50%" y="55%" text-anchor="middle" fill="#9ca3af" font-family="Arial, sans-serif" font-size="12">
            ${file.name}
          </text>
          <text x="50%" y="70%" text-anchor="middle" fill="#9ca3af" font-family="Arial, sans-serif" font-size="10">
            Will be processed on conversion
          </text>
        </svg>
      `);
    }

    setImageData({
      originalFile: file,
      originalPreviewUrl,
      appliedFilters: {},
      isHEIC,
      heicProcessed,
    });

    // Reset filters
    setCurrentFilters({});
    setSelectedPreset('None');
  }, []);

  const applyFilters = useCallback(
    async (filters: FilterOptions) => {
      if (!imageData) return;

      setIsProcessing(true);
      const operationId = startOperation('photo-editing', imageData.originalFile.size);

      try {
        const processedBlob = await imageProcessor.applyFilters(imageData.originalFile, filters);
        const processedPreviewUrl = createFilePreviewUrl(
          new File([processedBlob], 'processed.png')
        );

        // Clean up previous processed image
        if (imageData.processedPreviewUrl) {
          revokeFilePreviewUrl(imageData.processedPreviewUrl);
        }

        setImageData(prev => ({
          ...prev!,
          processedPreviewUrl,
          processedBlob,
          appliedFilters: filters,
        }));

        endOperation(operationId, 'photo-editing', imageData.originalFile.size);
      } catch (error) {
        console.error('Failed to apply filters:', error);
      } finally {
        setIsProcessing(false);
      }
    },
    [imageData, startOperation, endOperation]
  );

  const handleFilterChange = useCallback(
    (key: keyof FilterOptions, value: any) => {
      const newFilters = { ...currentFilters, [key]: value };
      setCurrentFilters(newFilters);
      setSelectedPreset('Custom');

      // Debounce filter application
      const timeoutId = setTimeout(() => {
        applyFilters(newFilters);
      }, 300);

      return () => clearTimeout(timeoutId);
    },
    [currentFilters, applyFilters]
  );

  const handlePresetSelect = useCallback(
    (preset: PresetFilter) => {
      setCurrentFilters(preset.options);
      setSelectedPreset(preset.name);
      applyFilters(preset.options);
    },
    [applyFilters]
  );

  const handleReset = useCallback(() => {
    setCurrentFilters({});
    setSelectedPreset('None');
    if (imageData?.processedPreviewUrl) {
      revokeFilePreviewUrl(imageData.processedPreviewUrl);
    }
    setImageData(prev => ({
      ...prev!,
      processedPreviewUrl: undefined,
      processedBlob: undefined,
      appliedFilters: {},
    }));
  }, [imageData]);

  const handleDownload = useCallback(() => {
    if (!imageData?.processedBlob || typeof document === 'undefined') return;

    const url = createFilePreviewUrl(new File([imageData.processedBlob], 'edited-image.png'));
    const link = document.createElement('a');
    link.href = url;
    link.download = `edited-${imageData.originalFile.name.replace(/\.[^/.]+$/, '')}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    revokeFilePreviewUrl(url);
  }, [imageData]);

  // Filter control components
  const FilterSlider = ({
    label,
    value,
    min,
    max,
    step = 1,
    filterKey,
    icon,
  }: {
    label: string;
    value: number;
    min: number;
    max: number;
    step?: number;
    filterKey: keyof FilterOptions;
    icon?: React.ReactNode;
  }) => (
    <div className="space-y-3 p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          {icon && (
            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
              <div className="text-white">{icon}</div>
            </div>
          )}
          <Label className="text-sm font-medium">{label}</Label>
        </div>
        <div className="px-3 py-1 bg-white dark:bg-gray-700 rounded-lg">
          <span className="text-sm font-mono text-blue-600 dark:text-blue-400">{value}</span>
        </div>
      </div>
      <Slider
        value={[value]}
        onValueChange={([newValue]) => handleFilterChange(filterKey, newValue)}
        min={min}
        max={max}
        step={step}
        className="w-full"
      />
    </div>
  );

  return (
    <div className="min-h-screen">
      <div className="w-full max-w-7xl mx-auto p-4 space-y-6">
        {/* Upload Area */}
        {!imageData && (
          <Card className="border-0 shadow-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl">
            <CardContent className="p-8">
              <ImageUploadZone
                onFilesSelected={handleFileSelect}
                accept=".jpg,.jpeg,.png,.webp,.heic,.avif,.tiff,.bmp,.gif"
                multiple={false}
                maxFileSize={50}
                className="min-h-80 border-2 border-dashed border-blue-300 dark:border-blue-600 bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-900/20 dark:to-purple-900/20 hover:from-blue-100/70 hover:to-purple-100/70 dark:hover:from-blue-900/30 dark:hover:to-purple-900/30 transition-all duration-300 rounded-2xl"
              />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <FileImage className="h-4 w-4 text-blue-500" />
                  <span>HEIC Support</span>
                </div>
                <div className="flex items-center gap-2">
                  <Layers className="h-4 w-4 text-purple-500" />
                  <span>Advanced Filters</span>
                </div>
                <div className="flex items-center gap-2">
                  <Wand2 className="h-4 w-4 text-pink-500" />
                  <span>AI Enhancement</span>
                </div>
                <div className="flex items-center gap-2">
                  <Settings className="h-4 w-4 text-green-500" />
                  <span>Format Convert</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Editor Interface */}
        {imageData && (
          <div className="grid lg:grid-cols-5 gap-6">
            {/* Preview Panel */}
            <div className="lg:col-span-3 space-y-6">
              {/* Toolbar */}
              <Card className="border-0 shadow-xl bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-3">
                      {isProcessingHEIC ? (
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30 rounded-full text-sm font-medium">
                          <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                          Processing HEIC...
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900/30 dark:to-blue-900/30 rounded-full text-sm font-medium">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                          {Object.keys(currentFilters).length > 0 ? 'Modified' : 'Ready to Edit'}
                        </div>
                      )}
                      {imageData.isHEIC && (
                        <Badge
                          variant="outline"
                          className="bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 border-purple-300"
                        >
                          HEIC {imageData.heicProcessed ? '(Converted)' : '(Original)'}
                        </Badge>
                      )}
                      <Badge
                        variant="secondary"
                        className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                      >
                        {imageData.originalFile.type.split('/')[1].toUpperCase()}
                      </Badge>
                      <Badge variant="outline">{formatFileSize(imageData.originalFile.size)}</Badge>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowPreview(!showPreview)}
                        className="hover:bg-blue-50 dark:hover:bg-blue-900/20"
                      >
                        {showPreview ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        {showPreview ? 'Hide' : 'Show'} Preview
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleReset}
                        disabled={Object.keys(currentFilters).length === 0}
                        className="hover:bg-orange-50 dark:hover:bg-orange-900/20"
                      >
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Reset
                      </Button>
                      <Button
                        onClick={handleDownload}
                        disabled={!imageData.processedBlob}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Export
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Main Preview */}
              <Card className="border-0 shadow-2xl bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl overflow-hidden">
                <CardContent className="p-0">
                  {showPreview && (
                    <div className="relative aspect-[16/10] bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
                      {imageData.processedPreviewUrl ? (
                        // Split view comparison
                        <div className="relative w-full h-full">
                          {/* Original image */}
                          <div
                            className="absolute inset-0 overflow-hidden"
                            style={{ clipPath: `inset(0 ${100 - previewSplit}% 0 0)` }}
                          >
                            <Image
                              src={imageData.originalPreviewUrl}
                              alt="Original"
                              fill
                              className="object-contain"
                              onError={e => {
                                console.warn('Failed to load original image preview');
                                // Hide the failed image
                                (e.target as HTMLImageElement).style.display = 'none';
                              }}
                            />
                          </div>

                          {/* Processed image */}
                          <div
                            className="absolute inset-0 overflow-hidden"
                            style={{ clipPath: `inset(0 0 0 ${previewSplit}%)` }}
                          >
                            <Image
                              src={imageData.processedPreviewUrl}
                              alt="Processed"
                              fill
                              className="object-contain"
                              onError={e => {
                                console.warn('Failed to load processed image preview');
                                // Hide the failed image
                                (e.target as HTMLImageElement).style.display = 'none';
                              }}
                            />
                          </div>

                          {/* Split line */}
                          <div
                            className="absolute top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-purple-500 shadow-2xl z-10"
                            style={{ left: `${previewSplit}%` }}
                          />

                          {/* Labels */}
                          <Badge className="absolute top-6 left-6 bg-white/90 text-gray-700 shadow-lg backdrop-blur">
                            Original
                          </Badge>
                          <Badge className="absolute top-6 right-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
                            Edited
                          </Badge>

                          {/* Split control overlay */}
                          {imageData.processedPreviewUrl && (
                            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-full p-4 shadow-2xl">
                              <div className="flex items-center gap-3 min-w-64">
                                <Label className="text-sm font-medium">Compare</Label>
                                <Slider
                                  value={[previewSplit]}
                                  onValueChange={([value]) => setPreviewSplit(value)}
                                  min={0}
                                  max={100}
                                  step={1}
                                  className="flex-1"
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      ) : (
                        // Single image view
                        <div className="relative w-full h-full">
                          <Image
                            src={imageData.originalPreviewUrl}
                            alt="Original"
                            fill
                            className="object-contain"
                            onError={e => {
                              console.warn('Failed to load single image preview');
                              // Hide the failed image
                              (e.target as HTMLImageElement).style.display = 'none';
                            }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                        </div>
                      )}

                      {isProcessing && (
                        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-20">
                          <div className="text-white text-center bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20">
                            <div className="relative mb-4">
                              <Zap className="h-12 w-12 mx-auto text-blue-400 animate-pulse" />
                              <div className="absolute inset-0 bg-blue-400/20 rounded-full animate-ping" />
                            </div>
                            <p className="text-lg font-medium">Applying Magic...</p>
                            <p className="text-sm text-gray-300 mt-1">Processing your image</p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Progress bar for conversion */}
                  {conversionProgress > 0 && (
                    <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
                      <div className="flex justify-between text-sm mb-3">
                        <span className="font-medium">Converting Format...</span>
                        <span className="text-blue-600 dark:text-blue-400 font-mono">
                          {conversionProgress}%
                        </span>
                      </div>
                      <Progress
                        value={conversionProgress}
                        className="w-full h-2 bg-white dark:bg-gray-800"
                      />
                    </div>
                  )}

                  {/* Quick Actions */}
                  <div className="p-6 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border-t">
                    <div className="flex gap-3 justify-center">
                      <Button
                        variant="outline"
                        onClick={() => {
                          setImageData(null);
                          setCurrentFilters({});
                          setSelectedPreset('None');
                        }}
                        className="flex-1 max-w-48 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                      >
                        <FolderOpen className="h-4 w-4 mr-2" />
                        Load New Image
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Controls Panel */}
            <div className="space-y-6 lg:col-span-2">
              <Card className="border-0 shadow-xl bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl min-h-[700px]">
                <CardHeader className="pb-6">
                  <CardTitle className="flex items-center gap-3">
                    <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl shadow-lg">
                      <Edit3 className="h-6 w-6 text-white" />
                    </div>
                    <span className="text-2xl font-bold">Editor Tools</span>
                  </CardTitle>
                  <p className="text-gray-600 dark:text-gray-400 mt-2">
                    Apply professional filters and adjustments to enhance your image
                  </p>
                </CardHeader>

                <CardContent className="space-y-6 px-6">
                  <Tabs defaultValue="filters" className="w-full">
                    <TabsList className="grid w-full grid-cols-4 bg-gray-100 dark:bg-gray-800 p-1.5 rounded-xl h-12">
                      <TabsTrigger
                        value="filters"
                        className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-lg font-medium text-sm"
                      >
                        <Sparkles className="h-4 w-4 mr-1.5" />
                        Presets
                      </TabsTrigger>
                      <TabsTrigger
                        value="basic"
                        className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-lg font-medium text-sm"
                      >
                        <Sliders className="h-4 w-4 mr-1.5" />
                        Basic
                      </TabsTrigger>
                      <TabsTrigger
                        value="advanced"
                        className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-lg font-medium text-sm"
                      >
                        <Settings className="h-4 w-4 mr-1.5" />
                        Pro
                      </TabsTrigger>
                      <TabsTrigger
                        value="convert"
                        className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-lg font-medium text-sm"
                      >
                        <RefreshCw className="h-4 w-4 mr-1.5" />
                        Convert
                      </TabsTrigger>
                    </TabsList>

                    {/* Presets Tab */}
                    <TabsContent value="filters" className="space-y-4 mt-6">
                      <ScrollArea className="h-[500px]">
                        <div className="grid gap-3 pr-4">
                          {presetFilters.map((preset, index) => (
                            <Button
                              key={preset.name}
                              variant={selectedPreset === preset.name ? 'default' : 'outline'}
                              className={`h-auto p-4 text-left transition-all duration-200 ${
                                selectedPreset === preset.name
                                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                                  : 'hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/20 dark:hover:to-purple-900/20 hover:shadow-md'
                              }`}
                              onClick={() => handlePresetSelect(preset)}
                            >
                              <div className="flex items-center gap-3 w-full">
                                <div
                                  className={`p-2 rounded-lg ${
                                    selectedPreset === preset.name
                                      ? 'bg-white/20'
                                      : 'bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30'
                                  }`}
                                >
                                  <Filter
                                    className={`h-4 w-4 ${
                                      selectedPreset === preset.name
                                        ? 'text-white'
                                        : 'text-blue-600 dark:text-blue-400'
                                    }`}
                                  />
                                </div>
                                <div className="flex-1">
                                  <div className="font-semibold text-base">{preset.name}</div>
                                  <div
                                    className={`text-sm ${
                                      selectedPreset === preset.name
                                        ? 'text-white/80'
                                        : 'text-gray-600 dark:text-gray-400'
                                    }`}
                                  >
                                    {preset.description}
                                  </div>
                                </div>
                              </div>
                            </Button>
                          ))}
                        </div>
                      </ScrollArea>
                    </TabsContent>

                    {/* Basic Controls Tab */}
                    <TabsContent value="basic" className="space-y-4 mt-6">
                      <ScrollArea className="h-[500px]">
                        <div className="space-y-6 pr-4">
                          <FilterSlider
                            label="Brightness"
                            value={currentFilters.brightness || 0}
                            min={-100}
                            max={100}
                            filterKey="brightness"
                            icon={<Sun className="h-4 w-4" />}
                          />
                          <FilterSlider
                            label="Contrast"
                            value={currentFilters.contrast || 0}
                            min={-100}
                            max={100}
                            filterKey="contrast"
                            icon={<Contrast className="h-4 w-4" />}
                          />
                          <FilterSlider
                            label="Saturation"
                            value={currentFilters.saturation || 0}
                            min={-100}
                            max={100}
                            filterKey="saturation"
                            icon={<Palette className="h-4 w-4" />}
                          />
                          <FilterSlider
                            label="Hue"
                            value={currentFilters.hue || 0}
                            min={0}
                            max={360}
                            filterKey="hue"
                            icon={<Palette className="h-4 w-4" />}
                          />
                          <FilterSlider
                            label="Blur"
                            value={currentFilters.blur || 0}
                            min={0}
                            max={20}
                            step={0.1}
                            filterKey="blur"
                            icon={<Eye className="h-4 w-4" />}
                          />

                          <Separator className="my-6" />

                          <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl">
                              <div className="flex items-center gap-3">
                                <div className="p-2 bg-gradient-to-r from-gray-600 to-gray-700 rounded-lg">
                                  <Moon className="h-4 w-4 text-white" />
                                </div>
                                <Label className="font-medium">Black & White</Label>
                              </div>
                              <Switch
                                checked={currentFilters.blackAndWhite || false}
                                onCheckedChange={checked =>
                                  handleFilterChange('blackAndWhite', checked)
                                }
                              />
                            </div>
                            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl">
                              <div className="flex items-center gap-3">
                                <div className="p-2 bg-gradient-to-r from-amber-600 to-orange-600 rounded-lg">
                                  <Camera className="h-4 w-4 text-white" />
                                </div>
                                <Label className="font-medium">Vintage Effect</Label>
                              </div>
                              <Switch
                                checked={currentFilters.vintage || false}
                                onCheckedChange={checked => handleFilterChange('vintage', checked)}
                              />
                            </div>
                          </div>
                        </div>
                      </ScrollArea>
                    </TabsContent>

                    {/* Advanced Controls Tab */}
                    <TabsContent value="advanced" className="space-y-4 mt-6">
                      <ScrollArea className="h-[500px]">
                        <div className="space-y-6 pr-4">
                          <FilterSlider
                            label="Temperature"
                            value={currentFilters.temperature || 0}
                            min={-100}
                            max={100}
                            filterKey="temperature"
                            icon={<Sun className="h-4 w-4" />}
                          />
                          <FilterSlider
                            label="Exposure"
                            value={currentFilters.exposure || 0}
                            min={-100}
                            max={100}
                            filterKey="exposure"
                            icon={<Camera className="h-4 w-4" />}
                          />
                          <FilterSlider
                            label="Shadows"
                            value={currentFilters.shadows || 0}
                            min={-100}
                            max={100}
                            filterKey="shadows"
                            icon={<Moon className="h-4 w-4" />}
                          />
                          <FilterSlider
                            label="Highlights"
                            value={currentFilters.highlights || 0}
                            min={-100}
                            max={100}
                            filterKey="highlights"
                            icon={<Sun className="h-4 w-4" />}
                          />
                          <FilterSlider
                            label="Vignette"
                            value={currentFilters.vignette || 0}
                            min={0}
                            max={100}
                            filterKey="vignette"
                            icon={<Layers className="h-4 w-4" />}
                          />
                          <FilterSlider
                            label="Sharpen"
                            value={currentFilters.sharpen || 0}
                            min={0}
                            max={100}
                            filterKey="sharpen"
                            icon={<Zap className="h-4 w-4" />}
                          />
                          <FilterSlider
                            label="Sepia"
                            value={currentFilters.sepia || 0}
                            min={0}
                            max={100}
                            filterKey="sepia"
                            icon={<Camera className="h-4 w-4" />}
                          />
                        </div>
                      </ScrollArea>
                    </TabsContent>

                    {/* Format Conversion Tab */}
                    <TabsContent value="convert" className="space-y-4 mt-6">
                      <div className="h-[500px] overflow-y-auto pr-4">
                        <FormatConversion
                          file={imageData.originalFile}
                          onProgress={setConversionProgress}
                        />
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>

              {/* Image Stats Card */}
              <Card className="border-0 shadow-xl bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 backdrop-blur-xl">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
                      <FileImage className="h-5 w-5 text-white" />
                    </div>
                    Image Statistics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 text-sm">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                        <span className="text-gray-600 dark:text-gray-400 font-medium">Size:</span>
                        <Badge variant="secondary" className="font-mono">
                          {formatFileSize(imageData.originalFile.size)}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                        <span className="text-gray-600 dark:text-gray-400 font-medium">
                          Format:
                        </span>
                        <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                          {imageData.originalFile.type.split('/')[1].toUpperCase()}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                        <span className="text-gray-600 dark:text-gray-400 font-medium">
                          Status:
                        </span>
                        <Badge
                          variant={Object.keys(currentFilters).length > 0 ? 'default' : 'secondary'}
                          className={
                            Object.keys(currentFilters).length > 0
                              ? 'bg-gradient-to-r from-green-600 to-blue-600 text-white'
                              : ''
                          }
                        >
                          {Object.keys(currentFilters).length > 0 ? 'Enhanced' : 'Original'}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                        <span className="text-gray-600 dark:text-gray-400 font-medium">
                          Filters Applied:
                        </span>
                        <Badge variant="outline" className="font-mono">
                          {Object.keys(currentFilters).length}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
