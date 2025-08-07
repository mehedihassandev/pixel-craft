'use client';

import React, { useState, useCallback } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ImageUploadZone } from '@/components/ui/image-upload-zone';
import { useToast } from '@/hooks/use-toast';
import {
  convertGifToJson,
  downloadJsonFile,
  downloadFramesAsZip,
  estimateProcessingTime,
  createGifPreview,
  validateGifFile,
  type GifJsonData,
  type ProcessingOptions,
} from '@/lib/gif-processing';
import { GIF_TO_JSON_CONFIG } from '@/constants/gif-to-json';
import { GifSettingsPanel } from './gif-settings-panel';
import { formatFileSize } from '@/lib/utils';
import {
  Upload,
  Download,
  FileText,
  Image as ImageIcon,
  Play,
  Pause,
  RotateCcw,
  Settings2,
  CheckCircle,
  AlertCircle,
  Loader2,
  Archive,
  Clock,
  Info,
  Trash2,
  Eye,
} from 'lucide-react';

interface ProcessedGifData {
  originalFile: File;
  jsonData: GifJsonData;
  previewFrames: string[];
  processingTime: number;
}

export function GifToJsonForm() {
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [processedGif, setProcessedGif] = useState<ProcessedGifData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [estimatedTime, setEstimatedTime] = useState<number>(0);
  const [showSettings, setShowSettings] = useState(false);
  const [previewPlaying, setPreviewPlaying] = useState(false);
  const [currentPreviewFrame, setCurrentPreviewFrame] = useState(0);

  // Processing options
  const [processingOptions, setProcessingOptions] = useState<ProcessingOptions>({
    outputFormat: 'base64',
    quality: 0.9,
    includeMetadata: true,
    compressFrames: true,
  });

  const handleFileSelect = useCallback(
    async (files: File[]) => {
      if (!files || files.length === 0) return;

      const file = files[0];
      setError(null);
      setProcessedGif(null);

      // Validate file
      const validation = validateGifFile(file);
      if (!validation.isValid) {
        setError(validation.error || 'Invalid file');
        return;
      }

      // Show warnings if any
      if (validation.warnings) {
        validation.warnings.forEach(warning => {
          toast({
            title: 'Warning',
            description: warning,
            variant: 'default',
          });
        });
      }

      // Estimate processing time
      const estimated = estimateProcessingTime(file);
      setEstimatedTime(estimated);

      setIsProcessing(true);
      setProgress(0);

      try {
        const startTime = Date.now();

        // Simulate progress updates
        const progressInterval = setInterval(
          () => {
            setProgress(prev => {
              if (prev >= 90) {
                clearInterval(progressInterval);
                return 90;
              }
              return prev + 10;
            });
          },
          (estimated * 1000) / 9
        );

        // Process GIF
        const jsonData = await convertGifToJson(file, processingOptions);

        // Create preview frames
        const previewFrames = await createGifPreview(
          jsonData,
          GIF_TO_JSON_CONFIG.PREVIEW_CONFIG.MAX_PREVIEW_FRAMES
        );

        const processingTime = Date.now() - startTime;

        setProcessedGif({
          originalFile: file,
          jsonData,
          previewFrames,
          processingTime,
        });

        setProgress(100);
        clearInterval(progressInterval);

        toast({
          title: 'Success!',
          description: GIF_TO_JSON_CONFIG.MESSAGES.SUCCESS,
        });
      } catch (err) {
        console.error('Error processing GIF:', err);
        setError(err instanceof Error ? err.message : GIF_TO_JSON_CONFIG.MESSAGES.ERROR);

        toast({
          title: 'Processing Failed',
          description: err instanceof Error ? err.message : GIF_TO_JSON_CONFIG.MESSAGES.ERROR,
          variant: 'destructive',
        });
      } finally {
        setIsProcessing(false);
        setTimeout(() => setProgress(0), 1000);
      }
    },
    [processingOptions, toast]
  );

  const handleDownloadJson = useCallback(() => {
    if (!processedGif) return;
    downloadJsonFile(processedGif.jsonData);
  }, [processedGif]);

  const handleDownloadFrames = useCallback(async () => {
    if (!processedGif) return;
    try {
      await downloadFramesAsZip(processedGif.jsonData);
      toast({
        title: 'Download Started',
        description: 'Frames are being packaged into a ZIP file...',
      });
    } catch (err) {
      toast({
        title: 'Download Failed',
        description: 'Failed to create ZIP file. Please try again.',
        variant: 'destructive',
      });
    }
  }, [processedGif, toast]);

  const handleReset = useCallback(() => {
    setProcessedGif(null);
    setError(null);
    setProgress(0);
    setCurrentPreviewFrame(0);
    setPreviewPlaying(false);
  }, []);

  // Preview animation logic
  React.useEffect(() => {
    if (!previewPlaying || !processedGif) return;

    const interval = setInterval(() => {
      setCurrentPreviewFrame(prev => {
        const nextFrame = (prev + 1) % processedGif.previewFrames.length;
        return nextFrame;
      });
    }, 500); // 500ms per frame for preview

    return () => clearInterval(interval);
  }, [previewPlaying, processedGif]);

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Upload Area */}
      <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                GIF to JSON Converter
              </CardTitle>
              <CardDescription>
                Extract frame data from animated GIFs and convert to JSON format. Perfect for custom
                animation players or frame analysis.
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
          <GifSettingsPanel
            options={processingOptions}
            onOptionsChange={setProcessingOptions}
            isVisible={showSettings}
            onToggleVisibility={() => setShowSettings(false)}
          />

          <ImageUploadZone
            onFilesSelected={handleFileSelect}
            accept=".gif"
            multiple={false}
            maxFileSize={GIF_TO_JSON_CONFIG.MAX_FILE_SIZE}
            disabled={isProcessing}
            isProcessing={isProcessing}
            processingText={GIF_TO_JSON_CONFIG.MESSAGES.PROCESSING}
            progress={progress}
            estimatedTime={estimatedTime}
            title={GIF_TO_JSON_CONFIG.MESSAGES.UPLOAD_TITLE}
            subtitle={GIF_TO_JSON_CONFIG.MESSAGES.UPLOAD_SUBTITLE}
            supportedFormats="GIF files only"
          />

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Results Section */}
      {processedGif && (
        <div className="space-y-6">
          {/* Success Alert */}
          <Alert className="border-green-200 bg-green-50 dark:bg-green-900/20">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800 dark:text-green-200">
              {GIF_TO_JSON_CONFIG.MESSAGES.SUCCESS} Processing completed in{' '}
              {processedGif.processingTime}ms.
            </AlertDescription>
          </Alert>

          {/* Processing Summary */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Info className="h-5 w-5" />
                  Processing Results
                </CardTitle>
                <div className="flex gap-2">
                  <Button onClick={handleDownloadJson} className="flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    Download JSON
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleDownloadFrames}
                    className="flex items-center gap-2"
                  >
                    <Archive className="h-4 w-4" />
                    Download Frames ZIP
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleReset}>
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* GIF Information */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Original File:</span>
                  <div className="font-medium">{processedGif.originalFile.name}</div>
                </div>
                <div>
                  <span className="text-muted-foreground">File Size:</span>
                  <div className="font-medium">
                    {formatFileSize(processedGif.originalFile.size)}
                  </div>
                </div>
                <div>
                  <span className="text-muted-foreground">Dimensions:</span>
                  <div className="font-medium">
                    {processedGif.jsonData.width} × {processedGif.jsonData.height}px
                  </div>
                </div>
                <div>
                  <span className="text-muted-foreground">Frame Count:</span>
                  <div className="font-medium">
                    <Badge variant="secondary">{processedGif.jsonData.frameCount}</Badge>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Preview Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium flex items-center gap-2">
                    <Eye className="h-4 w-4" />
                    Frame Preview
                  </h4>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPreviewPlaying(!previewPlaying)}
                      className="flex items-center gap-2"
                    >
                      {previewPlaying ? (
                        <Pause className="h-4 w-4" />
                      ) : (
                        <Play className="h-4 w-4" />
                      )}
                      {previewPlaying ? 'Pause' : 'Play'} Preview
                    </Button>
                    <span className="text-sm text-muted-foreground">
                      Frame {currentPreviewFrame + 1} of {processedGif.previewFrames.length}
                    </span>
                  </div>
                </div>

                <div className="flex justify-center">
                  <div className="relative w-48 h-48 bg-gray-100 rounded-lg overflow-hidden border">
                    {processedGif.previewFrames[currentPreviewFrame] && (
                      <Image
                        src={processedGif.previewFrames[currentPreviewFrame]}
                        alt={`Frame ${currentPreviewFrame + 1}`}
                        fill
                        className="object-contain"
                        unoptimized
                      />
                    )}
                  </div>
                </div>

                {/* Frame Navigation */}
                <div className="flex justify-center space-x-2">
                  {processedGif.previewFrames.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentPreviewFrame(index)}
                      className={`w-3 h-3 rounded-full border-2 transition-colors ${
                        index === currentPreviewFrame
                          ? 'bg-primary border-primary'
                          : 'bg-gray-200 border-gray-300 hover:bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <Separator />

              {/* JSON Preview */}
              <div className="space-y-4">
                <h4 className="font-medium flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  JSON Structure Preview
                </h4>
                <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 text-sm font-mono overflow-x-auto">
                  <pre className="text-xs">
                    {JSON.stringify(
                      {
                        width: processedGif.jsonData.width,
                        height: processedGif.jsonData.height,
                        frameCount: processedGif.jsonData.frameCount,
                        duration: processedGif.jsonData.duration,
                        frames: [
                          {
                            index: 0,
                            delay: processedGif.jsonData.frames[0]?.delay || 100,
                            image: 'data:image/png;base64,iVBORw0KGgo...',
                            width:
                              processedGif.jsonData.frames[0]?.width || processedGif.jsonData.width,
                            height:
                              processedGif.jsonData.frames[0]?.height ||
                              processedGif.jsonData.height,
                            '...': `${processedGif.jsonData.frameCount - 1} more frames`,
                          },
                        ],
                        metadata: processedGif.jsonData.metadata,
                      },
                      null,
                      2
                    )}
                  </pre>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
