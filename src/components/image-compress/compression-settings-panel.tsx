'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { Settings2, RotateCcw } from 'lucide-react';

const compressionSettingsSchema = z.object({
  quality: z.number().min(0.1).max(1),
  maxSizeMB: z.number().min(0.1).max(50),
  maxWidthOrHeight: z.number().min(100).max(4000),
  useWebWorker: z.boolean(),
  outputFormat: z.enum(['preserve', 'jpeg', 'png', 'webp']),
  preserveMetadata: z.boolean(),
});

type CompressionSettings = z.infer<typeof compressionSettingsSchema>;

interface CompressionSettingsPanelProps {
  onSettingsChange: (settings: CompressionSettings) => void;
  isVisible: boolean;
  onToggleVisibility: () => void;
}

export function CompressionSettingsPanel({
  onSettingsChange,
  isVisible,
  onToggleVisibility,
}: CompressionSettingsPanelProps) {
  const form = useForm<CompressionSettings>({
    resolver: zodResolver(compressionSettingsSchema),
    defaultValues: {
      quality: 0.75,
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
      outputFormat: 'preserve',
      preserveMetadata: false,
    },
  });

  const watchedValues = form.watch();

  // Use a ref to store the previous settings to prevent unnecessary calls
  const prevSettingsRef = React.useRef<CompressionSettings>();

  useEffect(() => {
    // Only call onSettingsChange if the settings have actually changed
    if (JSON.stringify(watchedValues) !== JSON.stringify(prevSettingsRef.current)) {
      prevSettingsRef.current = watchedValues;
      onSettingsChange(watchedValues);
    }
  }, [watchedValues, onSettingsChange]);

  const handleResetToDefaults = useCallback(() => {
    form.reset({
      quality: 0.75,
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
      outputFormat: 'preserve',
      preserveMetadata: false,
    });
  }, [form]);

  const qualityLabels = {
    0.1: 'Very Low',
    0.3: 'Low',
    0.5: 'Medium',
    0.7: 'Good',
    0.8: 'High',
    0.9: 'Very High',
    1.0: 'Maximum',
  };

  const getQualityLabel = (value: number) => {
    const closestKey = Object.keys(qualityLabels)
      .map(Number)
      .reduce((prev, curr) => (Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev));
    return qualityLabels[closestKey as keyof typeof qualityLabels];
  };

  return (
    <Card
      className={`transition-all duration-300 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none absolute'}`}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="space-y-1">
          <CardTitle className="text-lg flex items-center gap-2">
            <Settings2 className="h-4 w-4" />
            Compression Settings
          </CardTitle>
          <CardDescription>
            Fine-tune your compression parameters for optimal results
          </CardDescription>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleResetToDefaults}
            className="flex items-center gap-2"
          >
            <RotateCcw className="h-4 w-4" />
            Reset
          </Button>

          <Button variant="ghost" size="sm" onClick={onToggleVisibility}>
            ×
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <Form {...form}>
          {/* Quality Setting */}
          <FormField
            control={form.control}
            name="quality"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <div className="flex justify-between items-center">
                  <FormLabel>Image Quality</FormLabel>
                  <div className="text-sm text-muted-foreground">
                    {Math.round(field.value * 100)}% ({getQualityLabel(field.value)})
                  </div>
                </div>
                <FormControl>
                  <Slider
                    value={[field.value]}
                    onValueChange={values => field.onChange(values[0])}
                    min={0.1}
                    max={1}
                    step={0.05}
                    className="w-full"
                  />
                </FormControl>
                <FormDescription>
                  Higher quality preserves more detail but results in larger file sizes
                </FormDescription>
              </FormItem>
            )}
          />

          <Separator />

          {/* File Size Limit */}
          <FormField
            control={form.control}
            name="maxSizeMB"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <div className="flex justify-between items-center">
                  <FormLabel>Target File Size (MB)</FormLabel>
                  <div className="text-sm text-muted-foreground">{field.value} MB</div>
                </div>
                <FormControl>
                  <Slider
                    value={[field.value]}
                    onValueChange={values => field.onChange(values[0])}
                    min={0.1}
                    max={10}
                    step={0.1}
                    className="w-full"
                  />
                </FormControl>
                <FormDescription>Maximum target file size after compression</FormDescription>
              </FormItem>
            )}
          />

          <Separator />

          {/* Dimension Limit */}
          <FormField
            control={form.control}
            name="maxWidthOrHeight"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <div className="flex justify-between items-center">
                  <FormLabel>Max Dimension (px)</FormLabel>
                  <div className="text-sm text-muted-foreground">{field.value}px</div>
                </div>
                <FormControl>
                  <Slider
                    value={[field.value]}
                    onValueChange={values => field.onChange(values[0])}
                    min={480}
                    max={4000}
                    step={80}
                    className="w-full"
                  />
                </FormControl>
                <FormDescription>
                  Images larger than this will be resized proportionally
                </FormDescription>
              </FormItem>
            )}
          />

          <Separator />

          {/* Output Format */}
          <FormField
            control={form.control}
            name="outputFormat"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Output Format</FormLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="preserve">Preserve Original</SelectItem>
                    <SelectItem value="jpeg">JPEG (Smaller size)</SelectItem>
                    <SelectItem value="png">PNG (Transparency)</SelectItem>
                    <SelectItem value="webp">WebP (Best compression)</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>Choose the output format for compressed images</FormDescription>
              </FormItem>
            )}
          />

          <Separator />

          {/* Advanced Options */}
          <div className="space-y-4">
            <h4 className="font-medium">Advanced Options</h4>

            <FormField
              control={form.control}
              name="useWebWorker"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                  <div className="space-y-0.5">
                    <FormLabel>Use Web Worker</FormLabel>
                    <FormDescription>
                      Process images in background thread for better performance
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="preserveMetadata"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                  <div className="space-y-0.5">
                    <FormLabel>Preserve Metadata</FormLabel>
                    <FormDescription>
                      Keep EXIF data, camera info, and other metadata
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </Form>
      </CardContent>
    </Card>
  );
}
