'use client';

import React, { useState, useCallback, useRef } from 'react';
import Image from 'next/image';
import { useImageCompressor } from '@/hooks/use-image-compressor';
import { formatFileSize, createFilePreviewUrl, revokeFilePreviewUrl } from '@/lib/utils';
import {
  validateFiles,
  estimateCompressionTime,
  downloadCompressedImagesZip,
} from '@/lib/compression-utils';
import { CompressionSettingsPanel } from './compression-settings-panel';
import { ImageUploadZone } from '@/components/ui/image-upload-zone';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Upload,
  Image as ImageIcon,
  Download,
  Trash2,
  CheckCircle,
  AlertCircle,
  Loader2,
  Settings2,
  DownloadCloud,
  Eye,
  Archive,
  Clock,
} from 'lucide-react';

interface CompressedImageData {
  originalFile: File;
  compressedFile: File;
  originalSize: number;
  compressedSize: number;
  compressionRatio: number;
  originalPreviewUrl: string;
  compressedPreviewUrl: string;
}

interface CompressionSettings {
  quality: number;
  maxSizeMB: number;
  maxWidthOrHeight: number;
  useWebWorker: boolean;
  outputFormat: 'preserve' | 'jpeg' | 'png' | 'webp';
  preserveMetadata: boolean;
}

export function ImageCompressionForm() {
  const { compressImage, isCompressing, error, clearError } = useImageCompressor();
  const [compressedImages, setCompressedImages] = useState<CompressedImageData[]>([]);
  const [showSettings, setShowSettings] = useState(false);
  const [compressionSettings, setCompressionSettings] = useState<CompressionSettings>({
    quality: 0.75,
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
    outputFormat: 'preserve',
    preserveMetadata: false,
  });
  const [compressionProgress, setCompressionProgress] = useState(0);
  const [estimatedTime, setEstimatedTime] = useState<number>(0);
  const [validationErrors, setValidationErrors] = useState<Array<{ file: File; reason: string }>>(
    []
  );

  const handleFileSelect = useCallback(
    async (files: File[]) => {
      if (!files || files.length === 0) return;

      clearError();
      setCompressionProgress(0);
      setValidationErrors([]);

      // Convert to FileList-like array for validation
      const fileList = files as any;
      fileList.length = files.length;

      // Validate files
      const { validFiles, invalidFiles } = validateFiles(fileList);

      if (invalidFiles.length > 0) {
        setValidationErrors(invalidFiles);
      }

      if (validFiles.length === 0) return;

      // Estimate compression time
      const estimated = estimateCompressionTime(fileList);
      setEstimatedTime(estimated);

      const newCompressedImages: CompressedImageData[] = [];
      const totalFiles = validFiles.length;

      for (let i = 0; i < validFiles.length; i++) {
        const file = validFiles[i];

        try {
          // Convert settings to compression options
          const options = {
            maxSizeMB: compressionSettings.maxSizeMB,
            maxWidthOrHeight: compressionSettings.maxWidthOrHeight,
            useWebWorker: compressionSettings.useWebWorker,
            quality: compressionSettings.quality,
          };

          const result = await compressImage(file, options);

          const originalPreviewUrl = createFilePreviewUrl(result.originalFile);
          const compressedPreviewUrl = createFilePreviewUrl(result.compressedFile);

          newCompressedImages.push({
            ...result,
            originalPreviewUrl,
            compressedPreviewUrl,
          });

          // Update progress
          setCompressionProgress(((i + 1) / totalFiles) * 100);
        } catch (err) {
          console.error('Failed to compress image:', file.name, err);
        }
      }

      setCompressedImages(prev => [...prev, ...newCompressedImages]);
      setCompressionProgress(0);
      setEstimatedTime(0);
    },
    [compressImage, clearError, compressionSettings]
  );

  const handleDownload = useCallback((compressedFile: File, originalFileName: string) => {
    const url = createFilePreviewUrl(compressedFile);
    const link = document.createElement('a');
    link.href = url;
    link.download = `compressed-${originalFileName}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    revokeFilePreviewUrl(url);
  }, []);

  const handleDownloadAll = useCallback(() => {
    compressedImages.forEach((image, index) => {
      setTimeout(() => {
        handleDownload(image.compressedFile, image.originalFile.name);
      }, index * 100); // Stagger downloads to avoid browser blocking
    });
  }, [compressedImages, handleDownload]);

  const handleDownloadZip = useCallback(async () => {
    try {
      await downloadCompressedImagesZip(compressedImages);
    } catch (err) {
      console.error('Failed to create ZIP file:', err);
    }
  }, [compressedImages]);

  const handleRemove = useCallback((index: number) => {
    setCompressedImages(prev => {
      const newImages = [...prev];
      const removed = newImages.splice(index, 1)[0];

      // Clean up preview URLs
      revokeFilePreviewUrl(removed.originalPreviewUrl);
      revokeFilePreviewUrl(removed.compressedPreviewUrl);

      return newImages;
    });
  }, []);

  const handleClearAll = useCallback(() => {
    // Clean up all preview URLs
    compressedImages.forEach(image => {
      revokeFilePreviewUrl(image.originalPreviewUrl);
      revokeFilePreviewUrl(image.compressedPreviewUrl);
    });

    setCompressedImages([]);
    setValidationErrors([]);
    clearError();
  }, [compressedImages, clearError]);

  const totalOriginalSize = compressedImages.reduce((sum, img) => sum + img.originalSize, 0);
  const totalCompressedSize = compressedImages.reduce((sum, img) => sum + img.compressedSize, 0);
  const totalSavings = totalOriginalSize - totalCompressedSize;
  const overallCompressionRatio =
    totalOriginalSize > 0 ? (totalSavings / totalOriginalSize) * 100 : 0;

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Upload Area */}
      <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <ImageIcon className="h-5 w-5" />
                Image Compression
              </CardTitle>
              <CardDescription>
                Compress your images to reduce file size while maintaining quality. Supports JPG,
                JPEG, PNG, and WEBP formats.
              </CardDescription>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowSettings(!showSettings)}
              className="flex items-center gap-2"
            >
              <Settings2 className="h-4 w-4" />
              Settings
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Settings Panel */}
          {showSettings && (
            <CompressionSettingsPanel
              onSettingsChange={setCompressionSettings}
              isVisible={showSettings}
              onToggleVisibility={() => setShowSettings(false)}
            />
          )}

          <ImageUploadZone
            onFilesSelected={handleFileSelect}
            accept=".jpg,.jpeg,.png,.webp"
            multiple={true}
            maxFileSize={50}
            disabled={isCompressing}
            isProcessing={isCompressing}
            processingText="Compressing images..."
            progress={compressionProgress}
            estimatedTime={estimatedTime}
            validationErrors={validationErrors.map(error => ({
              file: error.file.name,
              error: error.reason,
            }))}
            supportedFormats="JPG, JPEG, PNG, WEBP"
          />

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Summary Stats */}
      {compressedImages.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Compression Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold">{compressedImages.length}</div>
                <div className="text-sm text-muted-foreground">Images Processed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">
                  {formatFileSize(totalOriginalSize)}
                </div>
                <div className="text-sm text-muted-foreground">Original Size</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {formatFileSize(totalCompressedSize)}
                </div>
                <div className="text-sm text-muted-foreground">Compressed Size</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {overallCompressionRatio.toFixed(1)}%
                </div>
                <div className="text-sm text-muted-foreground">Space Saved</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Results */}
      {compressedImages.length > 0 && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Compression Results</CardTitle>
              <CardDescription>
                {compressedImages.length} image{compressedImages.length !== 1 ? 's' : ''} compressed
                • Saved {formatFileSize(totalSavings)} total
              </CardDescription>
            </div>

            <div className="flex items-center gap-2">
              <Button
                onClick={handleDownloadZip}
                variant="outline"
                className="flex items-center gap-2"
              >
                <Archive className="h-4 w-4" />
                Download ZIP
              </Button>

              <Button onClick={handleDownloadAll} className="flex items-center gap-2">
                <DownloadCloud className="h-4 w-4" />
                Download All
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={handleClearAll}
                className="flex items-center gap-2"
              >
                <Trash2 className="h-4 w-4" />
                Clear
              </Button>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            {compressedImages.map((image, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="font-medium truncate max-w-xs">{image.originalFile.name}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      onClick={() => handleDownload(image.compressedFile, image.originalFile.name)}
                      className="flex items-center gap-2"
                    >
                      <Download className="h-4 w-4" />
                      Download
                    </Button>

                    <Button variant="outline" size="sm" onClick={() => handleRemove(index)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Compression Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Original Size:</span>
                    <div className="font-medium">{formatFileSize(image.originalSize)}</div>
                  </div>

                  <div>
                    <span className="text-muted-foreground">Compressed Size:</span>
                    <div className="font-medium text-green-600">
                      {formatFileSize(image.compressedSize)}
                    </div>
                  </div>

                  <div>
                    <span className="text-muted-foreground">Reduction:</span>
                    <div className="font-medium">
                      <Badge variant="secondary">{image.compressionRatio.toFixed(1)}%</Badge>
                    </div>
                  </div>

                  <div>
                    <span className="text-muted-foreground">Savings:</span>
                    <div className="font-medium text-green-600">
                      {formatFileSize(image.originalSize - image.compressedSize)}
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Image Previews */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm flex items-center gap-2">
                      <Eye className="h-4 w-4" />
                      Original
                    </h4>
                    <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
                      <Image
                        src={image.originalPreviewUrl}
                        alt="Original"
                        fill
                        className="object-contain"
                        unoptimized
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium text-sm flex items-center gap-2">
                      <Eye className="h-4 w-4" />
                      Compressed
                    </h4>
                    <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
                      <Image
                        src={image.compressedPreviewUrl}
                        alt="Compressed"
                        fill
                        className="object-contain"
                        unoptimized
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
