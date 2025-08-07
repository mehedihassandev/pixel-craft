'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import {
  OUTPUT_FORMAT_OPTIONS,
  QUALITY_PRESETS,
  GIF_TO_JSON_CONFIG,
} from '@/constants/gif-to-json';
import { ProcessingOptions } from '@/lib/gif-processing';
import { Settings2, X, Info, HardDrive, Zap, FileText, Image as ImageIcon } from 'lucide-react';

interface GifSettingsPanelProps {
  options: ProcessingOptions;
  onOptionsChange: (options: ProcessingOptions) => void;
  isVisible: boolean;
  onToggleVisibility: () => void;
}

export function GifSettingsPanel({
  options,
  onOptionsChange,
  isVisible,
  onToggleVisibility,
}: GifSettingsPanelProps) {
  if (!isVisible) return null;

  const updateOption = <K extends keyof ProcessingOptions>(key: K, value: ProcessingOptions[K]) => {
    onOptionsChange({
      ...options,
      [key]: value,
    });
  };

  const currentQualityPreset = QUALITY_PRESETS.find(preset => preset.quality === options.quality);

  return (
    <Card className="border border-border/50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Settings2 className="h-5 w-5" />
            Processing Settings
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onToggleVisibility} className="h-8 w-8 p-0">
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Output Format Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <HardDrive className="h-4 w-4" />
            <Label className="text-base font-medium">Output Format</Label>
          </div>

          <div className="space-y-3">
            {OUTPUT_FORMAT_OPTIONS.map(format => (
              <div key={format.value} className="flex items-start space-x-3">
                <input
                  type="radio"
                  id={`format-${format.value}`}
                  name="outputFormat"
                  value={format.value}
                  checked={options.outputFormat === format.value}
                  onChange={e => updateOption('outputFormat', e.target.value as 'base64' | 'blob')}
                  className="mt-1"
                />
                <div className="flex-1">
                  <Label htmlFor={`format-${format.value}`} className="font-medium cursor-pointer">
                    {format.label}
                  </Label>
                  <p className="text-sm text-muted-foreground mt-1">{format.description}</p>
                  {format.value === 'base64' && (
                    <Badge variant="outline" className="mt-2">
                      Single JSON file
                    </Badge>
                  )}
                  {format.value === 'blob' && (
                    <Badge variant="outline" className="mt-2">
                      ZIP with separate files
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Quality Settings */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <ImageIcon className="h-4 w-4" />
            <Label className="text-base font-medium">Image Quality</Label>
          </div>

          {/* Quality Presets */}
          <div className="grid grid-cols-3 gap-2">
            {QUALITY_PRESETS.map(preset => (
              <Button
                key={preset.name}
                variant={options.quality === preset.quality ? 'default' : 'outline'}
                size="sm"
                onClick={() => updateOption('quality', preset.quality)}
                className="flex flex-col h-auto p-3"
              >
                <span className="font-medium text-xs">{preset.name}</span>
                <span className="text-xs opacity-70">{Math.round(preset.quality * 100)}%</span>
              </Button>
            ))}
          </div>

          {/* Custom Quality Slider */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-sm">
                Custom Quality: {Math.round(options.quality * 100)}%
              </Label>
              {currentQualityPreset && (
                <Badge variant="secondary" className="text-xs">
                  {currentQualityPreset.name}
                </Badge>
              )}
            </div>
            <Slider
              value={[options.quality]}
              onValueChange={([value]) => updateOption('quality', value)}
              min={0.1}
              max={1}
              step={0.05}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Lower quality, smaller files</span>
              <span>Higher quality, larger files</span>
            </div>
          </div>
        </div>

        <Separator />

        {/* Processing Options */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4" />
            <Label className="text-base font-medium">Processing Options</Label>
          </div>

          <div className="space-y-4">
            {/* Include Metadata */}
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-sm font-medium">Include Metadata</Label>
                <p className="text-xs text-muted-foreground">
                  Add file information, creation date, and processing details
                </p>
              </div>
              <Switch
                checked={options.includeMetadata}
                onCheckedChange={checked => updateOption('includeMetadata', checked)}
              />
            </div>

            {/* Compress Frames */}
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-sm font-medium">Compress Frames</Label>
                <p className="text-xs text-muted-foreground">
                  Apply compression to reduce overall file size
                </p>
              </div>
              <Switch
                checked={options.compressFrames}
                onCheckedChange={checked => updateOption('compressFrames', checked)}
              />
            </div>

            {/* Frame Limit */}
            {options.maxFrames !== undefined && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium">
                    Max Frames: {options.maxFrames || GIF_TO_JSON_CONFIG.MAX_FRAMES}
                  </Label>
                  <Badge variant="outline" className="text-xs">
                    Limit: {GIF_TO_JSON_CONFIG.MAX_FRAMES}
                  </Badge>
                </div>
                <Slider
                  value={[options.maxFrames || GIF_TO_JSON_CONFIG.MAX_FRAMES]}
                  onValueChange={([value]) => updateOption('maxFrames', value)}
                  min={1}
                  max={GIF_TO_JSON_CONFIG.MAX_FRAMES}
                  step={1}
                  className="w-full"
                />
                <p className="text-xs text-muted-foreground">
                  Reduce frame count for faster processing and smaller files
                </p>
              </div>
            )}
          </div>
        </div>

        <Separator />

        {/* Information Section */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Info className="h-4 w-4" />
            <Label className="text-base font-medium">Processing Limits</Label>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="space-y-1">
              <span className="text-muted-foreground">Max File Size:</span>
              <div className="font-medium">{GIF_TO_JSON_CONFIG.MAX_FILE_SIZE}MB</div>
            </div>
            <div className="space-y-1">
              <span className="text-muted-foreground">Max Frames:</span>
              <div className="font-medium">{GIF_TO_JSON_CONFIG.MAX_FRAMES}</div>
            </div>
            <div className="space-y-1">
              <span className="text-muted-foreground">Max Dimensions:</span>
              <div className="font-medium">{GIF_TO_JSON_CONFIG.MAX_DIMENSIONS}px</div>
            </div>
            <div className="space-y-1">
              <span className="text-muted-foreground">Supported Format:</span>
              <div className="font-medium">GIF only</div>
            </div>
          </div>

          <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="text-xs text-blue-700 dark:text-blue-300">
              <strong>Tip:</strong> For large GIFs, consider using lower quality settings or the
              "separate files" format to reduce processing time and memory usage.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
