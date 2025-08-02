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
} from 'lucide-react';

interface ProcessedImageData {
  originalFile: File;
  originalPreviewUrl: string;
  processedPreviewUrl?: string;
  processedBlob?: Blob;
  appliedFilters: FilterOptions;
}

export function AdvancedPhotoEditor() {
  const [imageData, setImageData] = useState<ProcessedImageData | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentFilters, setCurrentFilters] = useState<FilterOptions>({});
  const [selectedPreset, setSelectedPreset] = useState<string>('None');
  const [showPreview, setShowPreview] = useState(true);
  const [previewSplit, setPreviewSplit] = useState(50); // For before/after split view
  const { startOperation, endOperation, getRecommendedSettings } = usePerformanceMonitor();

  const handleFileSelect = useCallback(async (files: File[]) => {
    if (!files || files.length === 0) return;

    const file = files[0];

    if (!file.type.startsWith('image/')) {
      console.error('Please select a valid image file');
      return;
    }

    const originalPreviewUrl = createFilePreviewUrl(file);

    setImageData({
      originalFile: file,
      originalPreviewUrl,
      appliedFilters: {},
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
    if (!imageData?.processedBlob) return;

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
  }: {
    label: string;
    value: number;
    min: number;
    max: number;
    step?: number;
    filterKey: keyof FilterOptions;
  }) => (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <Label className="text-sm">{label}</Label>
        <span className="text-xs text-muted-foreground">{value}</span>
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
    <div className="w-full max-w-7xl mx-auto space-y-6">
      {/* Upload Area */}
      {!imageData && (
        <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5" />
              Advanced Photo Editor
            </CardTitle>
            <CardDescription>
              Upload your image and apply professional filters, adjustments, and effects. Supports
              JPG, PNG, WebP formats.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ImageUploadZone
              onFilesSelected={handleFileSelect}
              accept=".jpg,.jpeg,.png,.webp"
              multiple={false}
              maxFileSize={50}
              className="min-h-64"
            />
          </CardContent>
        </Card>
      )}

      {/* Editor Interface */}
      {imageData && (
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Preview Panel */}
          <div className="lg:col-span-2 space-y-4">
            <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm shadow-lg">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="h-5 w-5" />
                    Preview
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowPreview(!showPreview)}
                    >
                      {showPreview ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      {showPreview ? 'Hide' : 'Show'} Preview
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleReset}
                      disabled={Object.keys(currentFilters).length === 0}
                    >
                      <RotateCcw className="h-4 w-4 mr-2" />
                      Reset
                    </Button>
                  </div>
                </div>

                {/* Split view slider */}
                {showPreview && imageData.processedPreviewUrl && (
                  <div className="space-y-2">
                    <Label className="text-sm">Before/After Split</Label>
                    <Slider
                      value={[previewSplit]}
                      onValueChange={([value]) => setPreviewSplit(value)}
                      min={0}
                      max={100}
                      step={1}
                      className="w-full"
                    />
                  </div>
                )}
              </CardHeader>

              <CardContent>
                {showPreview && (
                  <div className="relative aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
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
                          />
                        </div>

                        {/* Split line */}
                        <div
                          className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg"
                          style={{ left: `${previewSplit}%` }}
                        />

                        {/* Labels */}
                        <Badge className="absolute top-4 left-4">Original</Badge>
                        <Badge className="absolute top-4 right-4" variant="secondary">
                          Edited
                        </Badge>
                      </div>
                    ) : (
                      // Single image view
                      <Image
                        src={imageData.originalPreviewUrl}
                        alt="Original"
                        fill
                        className="object-contain"
                      />
                    )}

                    {isProcessing && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <div className="text-white text-center">
                          <Zap className="h-8 w-8 animate-spin mx-auto mb-2" />
                          <p>Applying filters...</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Action buttons */}
                <div className="flex gap-2 mt-4">
                  <Button
                    onClick={handleDownload}
                    disabled={!imageData.processedBlob}
                    className="flex-1"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download Edited Image
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setImageData(null);
                      setCurrentFilters({});
                      setSelectedPreset('None');
                    }}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    New Image
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Controls Panel */}
          <div className="space-y-4">
            <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sliders className="h-5 w-5" />
                  Controls
                </CardTitle>
              </CardHeader>

              <CardContent>
                <Tabs defaultValue="presets" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="presets">Presets</TabsTrigger>
                    <TabsTrigger value="basic">Basic</TabsTrigger>
                    <TabsTrigger value="advanced">Advanced</TabsTrigger>
                  </TabsList>

                  {/* Presets Tab */}
                  <TabsContent value="presets" className="space-y-4">
                    <ScrollArea className="h-80">
                      <div className="grid grid-cols-2 gap-2">
                        {presetFilters.map(preset => (
                          <Button
                            key={preset.name}
                            variant={selectedPreset === preset.name ? 'default' : 'outline'}
                            className="h-auto p-3 text-left"
                            onClick={() => handlePresetSelect(preset)}
                          >
                            <div>
                              <div className="font-medium text-sm">{preset.name}</div>
                              <div className="text-xs text-muted-foreground">
                                {preset.description}
                              </div>
                            </div>
                          </Button>
                        ))}
                      </div>
                    </ScrollArea>
                  </TabsContent>

                  {/* Basic Controls Tab */}
                  <TabsContent value="basic" className="space-y-4">
                    <ScrollArea className="h-80">
                      <div className="space-y-4">
                        <FilterSlider
                          label="Brightness"
                          value={currentFilters.brightness || 0}
                          min={-100}
                          max={100}
                          filterKey="brightness"
                        />
                        <FilterSlider
                          label="Contrast"
                          value={currentFilters.contrast || 0}
                          min={-100}
                          max={100}
                          filterKey="contrast"
                        />
                        <FilterSlider
                          label="Saturation"
                          value={currentFilters.saturation || 0}
                          min={-100}
                          max={100}
                          filterKey="saturation"
                        />
                        <FilterSlider
                          label="Hue"
                          value={currentFilters.hue || 0}
                          min={0}
                          max={360}
                          filterKey="hue"
                        />
                        <FilterSlider
                          label="Blur"
                          value={currentFilters.blur || 0}
                          min={0}
                          max={20}
                          step={0.1}
                          filterKey="blur"
                        />

                        <Separator />

                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <Label>Black & White</Label>
                            <Switch
                              checked={currentFilters.blackAndWhite || false}
                              onCheckedChange={checked =>
                                handleFilterChange('blackAndWhite', checked)
                              }
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <Label>Vintage Effect</Label>
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
                  <TabsContent value="advanced" className="space-y-4">
                    <ScrollArea className="h-80">
                      <div className="space-y-4">
                        <FilterSlider
                          label="Temperature"
                          value={currentFilters.temperature || 0}
                          min={-100}
                          max={100}
                          filterKey="temperature"
                        />
                        <FilterSlider
                          label="Exposure"
                          value={currentFilters.exposure || 0}
                          min={-100}
                          max={100}
                          filterKey="exposure"
                        />
                        <FilterSlider
                          label="Shadows"
                          value={currentFilters.shadows || 0}
                          min={-100}
                          max={100}
                          filterKey="shadows"
                        />
                        <FilterSlider
                          label="Highlights"
                          value={currentFilters.highlights || 0}
                          min={-100}
                          max={100}
                          filterKey="highlights"
                        />
                        <FilterSlider
                          label="Vignette"
                          value={currentFilters.vignette || 0}
                          min={0}
                          max={100}
                          filterKey="vignette"
                        />
                        <FilterSlider
                          label="Sharpen"
                          value={currentFilters.sharpen || 0}
                          min={0}
                          max={100}
                          filterKey="sharpen"
                        />
                        <FilterSlider
                          label="Sepia"
                          value={currentFilters.sepia || 0}
                          min={0}
                          max={100}
                          filterKey="sepia"
                        />
                      </div>
                    </ScrollArea>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Image Info */}
            {imageData && (
              <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm shadow-lg">
                <CardHeader>
                  <CardTitle className="text-sm">Image Info</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>File Size:</span>
                    <span>{formatFileSize(imageData.originalFile.size)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Format:</span>
                    <span>{imageData.originalFile.type.split('/')[1].toUpperCase()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Status:</span>
                    <Badge
                      variant={Object.keys(currentFilters).length > 0 ? 'default' : 'secondary'}
                    >
                      {Object.keys(currentFilters).length > 0 ? 'Modified' : 'Original'}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
