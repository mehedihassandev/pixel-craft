'use client';

import React, { useState, useRef, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ImageUploadZone } from '@/components/ui/image-upload-zone';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { resizeFormSchema, type ResizeFormData } from '@/lib/schemas';
import { RhfTextField } from '@/components/ui/rhfTextfield/rhf-textfield';
import { RhfSelect } from '@/components/ui/rhfSelect/rhf-select';
import {
  Upload,
  Download,
  RotateCcw,
  Maximize2,
  Link,
  Unlink,
  Info,
  Zap,
  Trash2,
} from 'lucide-react';

interface ImageResizeFormProps {
  onImageProcessed?: (
    processedImageUrl: string,
    originalImageUrl: string,
    metadata?: {
      originalDimensions?: { width: number; height: number };
      targetDimensions?: { width: number; height: number };
      format?: string;
      quality?: number;
    }
  ) => void;
}

export const ImageResizeForm: React.FC<ImageResizeFormProps> = ({ onImageProcessed }) => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [originalImage, setOriginalImage] = useState<HTMLImageElement | null>(null);
  const [originalImageUrl, setOriginalImageUrl] = useState<string>('');
  const [processedImageUrl, setProcessedImageUrl] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [originalDimensions, setOriginalDimensions] = useState({
    width: 0,
    height: 0,
  });

  const form = useForm<ResizeFormData>({
    resolver: zodResolver(resizeFormSchema),
    defaultValues: {
      targetWidth: 800,
      targetHeight: 600,
      maintainAspectRatio: true,
      quality: 90,
      format: 'png',
      resizeMethod: 'stretch',
      backgroundColor: 'ffffff',
    },
  });

  const { watch, setValue, handleSubmit, control } = form;
  const targetWidth = watch('targetWidth');
  const targetHeight = watch('targetHeight');
  const maintainAspectRatio = watch('maintainAspectRatio');
  const quality = watch('quality');
  const format = watch('format');
  const resizeMethod = watch('resizeMethod');

  const handleFileSelect = useCallback(
    (files: File[]) => {
      const file = files[0];
      if (!file) return;

      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast({
          variant: 'destructive',
          title: 'Invalid File Type',
          description: 'Please select a valid image file.',
        });
        return;
      }

      setUploadProgress(0);
      const reader = new FileReader();

      reader.onprogress = e => {
        if (e.lengthComputable) {
          setUploadProgress((e.loaded / e.total) * 100);
        }
      };

      reader.onload = e => {
        const imageUrl = e.target?.result as string;
        setOriginalImageUrl(imageUrl);

        const img = new window.Image();
        img.onload = () => {
          setOriginalImage(img);
          setOriginalDimensions({
            width: img.width,
            height: img.height,
          });

          // Set initial form values based on original image
          setValue('targetWidth', img.width);
          setValue('targetHeight', img.height);

          setUploadProgress(100);

          toast({
            title: 'Image Uploaded Successfully',
            description: `Original size: ${img.width}x${img.height}px`,
          });
        };
        img.src = imageUrl;
      };

      reader.onerror = () => {
        toast({
          variant: 'destructive',
          title: 'Upload Failed',
          description: 'Failed to read the image file.',
        });
      };

      reader.readAsDataURL(file);
    },
    [setValue, toast]
  );

  const updateDimensions = useCallback(
    (width: number, height: number, isWidthChange: boolean) => {
      if (!maintainAspectRatio || !originalImage) return;

      const aspectRatio = originalImage.width / originalImage.height;

      if (isWidthChange) {
        const newHeight = Math.round(width / aspectRatio);
        setValue('targetHeight', newHeight);
      } else {
        const newWidth = Math.round(height * aspectRatio);
        setValue('targetWidth', newWidth);
      }
    },
    [maintainAspectRatio, originalImage, setValue]
  );

  const processImage = useCallback(
    async (formData: ResizeFormData) => {
      if (!originalImage || !canvasRef.current) return;

      setIsProcessing(true);

      try {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) throw new Error('Could not get canvas context');

        canvas.width = formData.targetWidth;
        canvas.height = formData.targetHeight;

        // Set background color for transparent images
        if (formData.format === 'jpg' || formData.backgroundColor !== 'ffffff') {
          ctx.fillStyle = `#${formData.backgroundColor}`;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

        // Calculate dimensions based on resize method
        let drawWidth = formData.targetWidth;
        let drawHeight = formData.targetHeight;
        let drawX = 0;
        let drawY = 0;

        switch (formData.resizeMethod) {
          case 'stretch':
            // Default values already set
            break;
          case 'contain':
            const containScale = Math.min(
              formData.targetWidth / originalImage.width,
              formData.targetHeight / originalImage.height
            );
            drawWidth = originalImage.width * containScale;
            drawHeight = originalImage.height * containScale;
            drawX = (formData.targetWidth - drawWidth) / 2;
            drawY = (formData.targetHeight - drawHeight) / 2;
            break;
          case 'cover':
            const coverScale = Math.max(
              formData.targetWidth / originalImage.width,
              formData.targetHeight / originalImage.height
            );
            drawWidth = originalImage.width * coverScale;
            drawHeight = originalImage.height * coverScale;
            drawX = (formData.targetWidth - drawWidth) / 2;
            drawY = (formData.targetHeight - drawHeight) / 2;
            break;
          case 'crop':
            const cropScale = Math.min(
              originalImage.width / formData.targetWidth,
              originalImage.height / formData.targetHeight
            );
            const cropWidth = formData.targetWidth * cropScale;
            const cropHeight = formData.targetHeight * cropScale;
            const cropX = (originalImage.width - cropWidth) / 2;
            const cropY = (originalImage.height - cropHeight) / 2;

            ctx.drawImage(
              originalImage,
              cropX,
              cropY,
              cropWidth,
              cropHeight,
              0,
              0,
              formData.targetWidth,
              formData.targetHeight
            );
            break;
        }

        if (formData.resizeMethod !== 'crop') {
          ctx.drawImage(originalImage, drawX, drawY, drawWidth, drawHeight);
        }

        // Convert to blob with specified quality and format
        const blob = await new Promise<Blob>(resolve => {
          canvas.toBlob(blob => resolve(blob!), `image/${formData.format}`, formData.quality / 100);
        });

        const processedUrl = URL.createObjectURL(blob);
        setProcessedImageUrl(processedUrl);

        if (onImageProcessed) {
          onImageProcessed(processedUrl, originalImageUrl, {
            originalDimensions: {
              width: originalImage.width,
              height: originalImage.height,
            },
            targetDimensions: {
              width: formData.targetWidth,
              height: formData.targetHeight,
            },
            format: formData.format,
            quality: formData.quality,
          });
        }

        toast({
          title: 'Image Processed Successfully',
          description: `Resized to ${formData.targetWidth}x${formData.targetHeight}px`,
        });
      } catch (error) {
        console.error('Image processing failed:', error);
        toast({
          variant: 'destructive',
          title: 'Processing Failed',
          description: 'Failed to process the image. Please try again.',
        });
      } finally {
        setIsProcessing(false);
      }
    },
    [originalImage, originalImageUrl, onImageProcessed, toast]
  );

  const downloadImage = useCallback(() => {
    if (!processedImageUrl) return;

    const a = document.createElement('a');
    a.href = processedImageUrl;
    a.download = `resized-image-${targetWidth}x${targetHeight}.${format}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }, [processedImageUrl, targetWidth, targetHeight, format]);

  const resetForm = useCallback(() => {
    setOriginalImage(null);
    setOriginalImageUrl('');
    setProcessedImageUrl('');
    setOriginalDimensions({ width: 0, height: 0 });
    form.reset();
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, [form]);

  return (
    <div className="space-y-6">
      <Card className=" bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Upload Image
          </CardTitle>
          <CardDescription>
            Select an image to resize. Supported formats: PNG, JPG, WebP. Max size: 10MB.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {!originalImage && (
              <ImageUploadZone
                onFilesSelected={handleFileSelect}
                accept=".jpg,.jpeg,.png,.webp,.svg"
                multiple={false}
                maxFileSize={10}
                disabled={uploadProgress > 0 && uploadProgress < 100}
                isProcessing={uploadProgress > 0 && uploadProgress < 100}
                processingText="Uploading Image..."
                progress={uploadProgress}
                title="Upload Image to Resize"
                subtitle="Drag and drop your image here, or click to browse"
                supportedFormats="PNG, JPG, WebP, SVG"
                enableDragDrop={true}
              />
            )}

            {originalImage && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Info className="h-4 w-4" />
                  Original dimensions: {originalDimensions.width}x{originalDimensions.height}px
                </div>

                {/* Show uploaded image preview */}
                <div className="relative">
                  <Image
                    src={originalImageUrl}
                    alt="Original"
                    width={400}
                    height={160}
                    className="w-full max-h-40 object-contain rounded-lg border bg-muted/50"
                    unoptimized
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setOriginalImage(null);
                      setOriginalImageUrl('');
                      setOriginalDimensions({ width: 0, height: 0 });
                      setUploadProgress(0);
                      form.reset();
                    }}
                    className="absolute top-2 right-2 h-8 w-8 p-0"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {originalImage && (
        <Form {...form}>
          <form onSubmit={handleSubmit(processImage)} className="space-y-6">
            <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Maximize2 className="h-5 w-5" />
                  Resize Settings
                </CardTitle>
                <CardDescription>Configure how you want to resize your image.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Dimensions */}
                <div className="grid grid-cols-2 gap-4">
                  <RhfTextField
                    control={control}
                    name="targetWidth"
                    label="Width (px)"
                    type="number"
                    min={1}
                    max={5000}
                    onCustomChange={e => {
                      const value = parseInt(e.target.value);
                      updateDimensions(value, targetHeight, true);
                    }}
                  />
                  <RhfTextField
                    control={control}
                    name="targetHeight"
                    label="Height (px)"
                    type="number"
                    min={1}
                    max={5000}
                    onCustomChange={e => {
                      const value = parseInt(e.target.value);
                      updateDimensions(targetWidth, value, false);
                    }}
                  />
                </div>

                {/* Aspect Ratio Lock */}
                <FormField
                  control={control}
                  name="maintainAspectRatio"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="flex items-center gap-2">
                          {field.value ? (
                            <Link className="h-4 w-4" />
                          ) : (
                            <Unlink className="h-4 w-4" />
                          )}
                          Maintain aspect ratio
                        </FormLabel>
                      </div>
                    </FormItem>
                  )}
                />

                {/* Resize Method */}
                <RhfSelect
                  control={control}
                  name="resizeMethod"
                  label="Resize Method"
                  placeholder="Select resize method"
                  options={[
                    {
                      value: 'stretch',
                      label: 'Stretch - Fill entire canvas',
                    },
                    {
                      value: 'contain',
                      label: 'Contain - Fit within canvas',
                    },
                    {
                      value: 'cover',
                      label: 'Cover - Fill canvas, crop if needed',
                    },
                    {
                      value: 'crop',
                      label: 'Crop - Center crop to exact size',
                    },
                  ]}
                />

                {/* Quality Slider */}
                <FormField
                  control={control}
                  name="quality"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center justify-between">
                        <FormLabel>Quality: {field.value}%</FormLabel>
                        <Badge variant="outline">
                          {field.value > 80 ? 'High' : field.value > 60 ? 'Medium' : 'Low'}
                        </Badge>
                      </div>
                      <FormControl>
                        <Slider
                          min={1}
                          max={100}
                          step={1}
                          value={[field.value]}
                          onValueChange={value => field.onChange(value[0])}
                          className="w-full"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Format Selection */}
                <RhfSelect
                  control={control}
                  name="format"
                  label="Output Format"
                  placeholder="Select format"
                  options={[
                    {
                      value: 'png',
                      label: 'PNG - Best quality, larger file',
                    },
                    {
                      value: 'jpg',
                      label: 'JPG - Good quality, smaller file',
                    },
                    {
                      value: 'webp',
                      label: 'WebP - Modern format, smallest file',
                    },
                  ]}
                />

                {/* Background Color for JPG */}
                {format === 'jpg' && (
                  <div className="space-y-2">
                    <Label>Background Color (for JPG)</Label>
                    <div className="flex gap-2">
                      <RhfTextField
                        control={control}
                        name="backgroundColor"
                        placeholder="ffffff"
                        className="font-mono"
                        maxLength={6}
                      />
                      <div
                        className="w-10 h-10 rounded border"
                        style={{
                          backgroundColor: `#${watch('backgroundColor')}`,
                        }}
                      />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button type="submit" disabled={isProcessing} className="flex-1">
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Zap className="h-4 w-4 mr-2" />
                    Resize Image
                  </>
                )}
              </Button>

              {processedImageUrl && (
                <Button type="button" variant="outline" onClick={downloadImage}>
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              )}

              <Button type="button" variant="outline" onClick={resetForm}>
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset
              </Button>
            </div>
          </form>
        </Form>
      )}

      {/* Hidden canvas for image processing */}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};
