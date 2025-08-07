'use client';

import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import {
  Download,
  Archive,
  RefreshCw,
  Info,
  Zap,
  Settings,
  Image as ImageIcon,
  FileImage,
  Smartphone,
  Monitor,
} from 'lucide-react';
import { ImageConverter } from '@/lib/image-converter';
import { SUPPORTED_FORMATS, ConversionResult, ImageFormat } from '@/types/image-conversion';

interface FormatConversionProps {
  file: File | null;
  onProgress?: (progress: number) => void;
}

export function FormatConversion({ file, onProgress }: FormatConversionProps) {
  const [selectedFormat, setSelectedFormat] = useState<string>('jpeg');
  const [quality, setQuality] = useState<number>(90);
  const [enableResize, setEnableResize] = useState<boolean>(false);
  const [width, setWidth] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [maintainAspectRatio, setMaintainAspectRatio] = useState<boolean>(true);
  const [batchMode, setBatchMode] = useState<boolean>(false);
  const [selectedFormats, setSelectedFormats] = useState<string[]>(['jpeg', 'png', 'webp']);
  const [isConverting, setIsConverting] = useState<boolean>(false);
  const [conversionResults, setConversionResults] = useState<ConversionResult[]>([]);
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);

  const converter = ImageConverter.getInstance();
  const currentFormat = SUPPORTED_FORMATS.find(f => f.value === selectedFormat);
  const supportsQuality = currentFormat?.supportsQuality || false;

  const handleSingleConvert = useCallback(async () => {
    if (!file) return;

    setIsConverting(true);
    onProgress?.(10);

    try {
      const options = {
        format: selectedFormat,
        quality,
        ...(enableResize && width && { width: parseInt(width) }),
        ...(enableResize && height && { height: parseInt(height) }),
      };

      onProgress?.(50);
      const result = await converter.convertImage(file, options);
      onProgress?.(90);

      setConversionResults([result]);
      converter.downloadBlob(result.blob, result.filename);
      onProgress?.(100);
    } catch (error) {
      console.error('Conversion failed:', error);
    } finally {
      setIsConverting(false);
      onProgress?.(0);
    }
  }, [file, selectedFormat, quality, enableResize, width, height, onProgress]);

  const handleBatchConvert = useCallback(async () => {
    if (!file || selectedFormats.length === 0) return;

    setIsConverting(true);
    onProgress?.(10);

    try {
      const results: ConversionResult[] = [];
      const totalFormats = selectedFormats.length;

      for (let i = 0; i < totalFormats; i++) {
        const format = selectedFormats[i];
        const options = {
          format,
          quality,
          ...(enableResize && width && { width: parseInt(width) }),
          ...(enableResize && height && { height: parseInt(height) }),
        };

        const result = await converter.convertImage(file, options);
        results.push(result);

        const progress = 10 + ((i + 1) / totalFormats) * 80;
        onProgress?.(progress);
      }

      setConversionResults(results);

      if (results.length > 1) {
        await converter.downloadAsZip(results, file.name);
      } else if (results.length === 1) {
        converter.downloadBlob(results[0].blob, results[0].filename);
      }

      onProgress?.(100);
    } catch (error) {
      console.error('Batch conversion failed:', error);
    } finally {
      setIsConverting(false);
      onProgress?.(0);
    }
  }, [file, selectedFormats, quality, enableResize, width, height, onProgress]);

  const handleFormatToggle = (format: string, checked: boolean) => {
    if (checked) {
      setSelectedFormats(prev => [...prev, format]);
    } else {
      setSelectedFormats(prev => prev.filter(f => f !== format));
    }
  };

  const getPresetSizes = () => [
    { label: 'Mobile (480px)', width: '480', height: '' },
    { label: 'Tablet (768px)', width: '768', height: '' },
    { label: 'Desktop (1920px)', width: '1920', height: '' },
    { label: 'Thumbnail (200px)', width: '200', height: '200' },
    { label: 'Square (1000px)', width: '1000', height: '1000' },
  ];

  if (!file) {
    return (
      <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileImage className="h-5 w-5" />
            Format Conversion
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-muted-foreground py-8">
            Upload an image to start format conversion
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <FileImage className="h-5 w-5" />
              Format Conversion
            </CardTitle>
            {/* <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => setShowAdvanced(!showAdvanced)}>
                <Settings className="h-4 w-4 mr-2" />
                Advanced
              </Button>
              <Button variant="outline" size="sm" onClick={() => setBatchMode(!batchMode)}>
                <Archive className="h-4 w-4 mr-2" />
                {batchMode ? 'Single' : 'Batch'}
              </Button>
            </div> */}
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {!batchMode ? (
            // Single Format Selection
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Target Format</Label>
                <Select value={selectedFormat} onValueChange={setSelectedFormat}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {SUPPORTED_FORMATS.map(format => (
                      <SelectItem key={format.value} value={format.value}>
                        <div className="flex items-center justify-between w-full">
                          <span>{format.label}</span>
                          <span className="text-xs text-muted-foreground ml-2">
                            {format.description}
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {currentFormat && (
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Info className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium">{currentFormat.label}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{currentFormat.description}</p>
                  {currentFormat.value === 'heic' && (
                    <p className="text-xs text-orange-600 dark:text-orange-400 mt-1">
                      Note: HEIC output will be converted to high-quality JPEG for broader
                      compatibility.
                    </p>
                  )}
                </div>
              )}
            </div>
          ) : (
            // Batch Format Selection
            <div className="space-y-4">
              <Label>Select Formats for Batch Conversion</Label>
              <ScrollArea className="h-48 border rounded-lg p-3">
                <div className="grid grid-cols-2 gap-3">
                  {SUPPORTED_FORMATS.map(format => (
                    <div key={format.value} className="flex items-center space-x-2">
                      <Switch
                        id={format.value}
                        checked={selectedFormats.includes(format.value)}
                        onCheckedChange={checked => handleFormatToggle(format.value, checked)}
                      />
                      <Label htmlFor={format.value} className="text-sm cursor-pointer">
                        {format.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              <div className="text-xs text-muted-foreground">
                Selected: {selectedFormats.length} format{selectedFormats.length !== 1 ? 's' : ''}
              </div>
            </div>
          )}

          {/* Current File Info */}
          <div className="flex items-center gap-4 px-2 py-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
            <ImageIcon className="h-8 w-8 text-muted-foreground" />
            <div className="flex-1">
              <div className="font-medium text-sm">{file.name}</div>
              <div className="text-xs text-muted-foreground">
                {converter.formatFileSize(file.size)} • {file.type}
              </div>
            </div>
          </div>

          {/* Quality Control */}
          {(supportsQuality || batchMode) && (
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label>Quality</Label>
                <span className="text-sm text-muted-foreground">{quality}%</span>
              </div>
              <Slider
                value={[quality]}
                onValueChange={([value]) => setQuality(value)}
                min={10}
                max={100}
                step={5}
                className="w-full"
              />
            </div>
          )}

          {/* Advanced Options */}
          {showAdvanced && (
            <div className="space-y-4 border-t pt-4">
              <div className="flex items-center justify-between">
                <Label>Enable Resize</Label>
                <Switch checked={enableResize} onCheckedChange={setEnableResize} />
              </div>

              {enableResize && (
                <div className="space-y-4 ml-4">
                  {/* Preset Sizes */}
                  <div className="space-y-2">
                    <Label className="text-sm">Preset Sizes</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {getPresetSizes().map(preset => (
                        <Button
                          key={preset.label}
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setWidth(preset.width);
                            setHeight(preset.height);
                          }}
                          className="h-auto p-2 text-xs"
                        >
                          <div className="text-center">
                            <div className="font-medium">{preset.label}</div>
                            {preset.width && preset.height ? (
                              <div className="text-muted-foreground">
                                {preset.width}×{preset.height}
                              </div>
                            ) : (
                              <div className="text-muted-foreground">{preset.width}px wide</div>
                            )}
                          </div>
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Custom Dimensions */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <Label className="text-sm">Width (px)</Label>
                      <Input
                        type="number"
                        placeholder="Auto"
                        value={width}
                        onChange={e => setWidth(e.target.value)}
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-sm">Height (px)</Label>
                      <Input
                        type="number"
                        placeholder="Auto"
                        value={height}
                        onChange={e => setHeight(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Maintain Aspect Ratio</Label>
                    <Switch
                      checked={maintainAspectRatio}
                      onCheckedChange={setMaintainAspectRatio}
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          <Separator />

          {/* Convert Button */}
          <Button
            onClick={batchMode ? handleBatchConvert : handleSingleConvert}
            disabled={isConverting || (batchMode && selectedFormats.length === 0)}
            className="w-full"
            size="lg"
          >
            {isConverting ? (
              <>
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                Converting...
              </>
            ) : (
              <>
                {batchMode ? (
                  <Archive className="h-4 w-4 mr-2" />
                ) : (
                  <Download className="h-4 w-4 mr-2" />
                )}
                {batchMode ? `Convert to ${selectedFormats.length} Formats` : 'Convert & Download'}
              </>
            )}
          </Button>

          {/* Conversion Results */}
          {conversionResults.length > 0 && (
            <div className="space-y-3">
              <Label className="text-sm font-medium">Conversion Results</Label>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {conversionResults.map((result, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <Zap className="h-4 w-4 text-green-600" />
                      <div>
                        <div className="text-sm font-medium">{result.format.toUpperCase()}</div>
                        <div className="text-xs text-muted-foreground">
                          {converter.formatFileSize(result.convertedSize)}({result.compressionRatio}
                          % reduction)
                        </div>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => converter.downloadBlob(result.blob, result.filename)}
                    >
                      <Download className="h-3 w-3 mr-1" />
                      Download
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
