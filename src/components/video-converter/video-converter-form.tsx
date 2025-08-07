'use client';

import React, { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { VIDEO_CONVERTER_CONFIG, VIDEO_CONVERTER_MESSAGES } from '@/constants/video-converter';
import {
  Upload,
  Video,
  Download,
  Settings,
  FileVideo,
  Loader2,
  CheckCircle,
  AlertCircle,
  Info,
  Trash2,
} from 'lucide-react';

const videoConverterSchema = z.object({
  format: z.string().min(1, 'Please select an output format'),
  resolution: z.string().optional(),
  quality: z.enum(['high', 'medium', 'low']).optional(),
  frameRate: z.string().optional(),
  duration: z.number().optional(),
});

type VideoConverterFormData = z.infer<typeof videoConverterSchema>;

interface ConversionProgress {
  percent: number;
  stage: 'uploading' | 'processing' | 'downloading' | 'complete';
  message: string;
}

export default function VideoConverterForm() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [progress, setProgress] = useState<ConversionProgress | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [videoInfo, setVideoInfo] = useState<any>(null);
  const { toast } = useToast();

  const form = useForm<VideoConverterFormData>({
    resolver: zodResolver(videoConverterSchema),
    defaultValues: {
      format: '',
      resolution: 'original',
      quality: 'medium',
      frameRate: 'original',
    },
  });

  const watchedFormat = form.watch('format');

  const handleFileSelect = useCallback(
    (files: File[]) => {
      if (files.length > 0) {
        const file = files[0];

        // Validate file size
        if (file.size > VIDEO_CONVERTER_CONFIG.MAX_FILE_SIZE) {
          toast({
            title: 'File too large',
            description: VIDEO_CONVERTER_MESSAGES.FILE_TOO_LARGE,
            variant: 'destructive',
          });
          return;
        }

        // Validate file format
        const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
        if (!VIDEO_CONVERTER_CONFIG.ACCEPTED_FORMATS.includes(fileExtension)) {
          toast({
            title: 'Invalid format',
            description: VIDEO_CONVERTER_MESSAGES.INVALID_FORMAT,
            variant: 'destructive',
          });
          return;
        }

        setSelectedFile(file);
        setDownloadUrl(null);
        setProgress(null);

        // Extract video info (simplified for demo)
        const url = URL.createObjectURL(file);
        const video = document.createElement('video');
        video.src = url;
        video.onloadedmetadata = () => {
          setVideoInfo({
            duration: video.duration,
            width: video.videoWidth,
            height: video.videoHeight,
          });
          URL.revokeObjectURL(url);
        };

        toast({
          title: 'File selected',
          description: VIDEO_CONVERTER_MESSAGES.UPLOAD_SUCCESS,
        });
      }
    },
    [toast]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setDragActive(false);

      const files = Array.from(e.dataTransfer.files);
      handleFileSelect(files);
    },
    [handleFileSelect]
  );

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
  }, []);

  const onSubmit = async (data: VideoConverterFormData) => {
    if (!selectedFile) {
      toast({
        title: 'No file selected',
        description: 'Please select a video file to convert',
        variant: 'destructive',
      });
      return;
    }

    setIsConverting(true);
    setProgress({ percent: 0, stage: 'uploading', message: 'Preparing upload...' });

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('format', data.format);
      if (data.resolution) formData.append('resolution', data.resolution);
      if (data.quality) formData.append('quality', data.quality);
      if (data.frameRate) formData.append('frameRate', data.frameRate);
      if (data.duration) formData.append('duration', data.duration.toString());

      setProgress({ percent: 10, stage: 'uploading', message: 'Uploading video...' });

      const response = await fetch('/api/video-converter', {
        method: 'POST',
        body: formData,
      });

      setProgress({
        percent: 50,
        stage: 'processing',
        message: VIDEO_CONVERTER_MESSAGES.PROCESSING,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Conversion failed');
      }

      setProgress({ percent: 90, stage: 'downloading', message: 'Preparing download...' });

      // Check if response is JSON (cloud processing) or blob (local processing)
      const contentType = response.headers.get('content-type');

      if (contentType && contentType.includes('application/json')) {
        // Cloud processing response (Vercel/Cloudinary)
        const result = await response.json();

        if (result.downloadUrl) {
          setDownloadUrl(result.downloadUrl);
          setProgress({
            percent: 100,
            stage: 'complete',
            message: VIDEO_CONVERTER_MESSAGES.CONVERSION_SUCCESS,
          });

          toast({
            title: 'Success!',
            description: VIDEO_CONVERTER_MESSAGES.DOWNLOAD_READY,
          });
        } else {
          throw new Error('No download URL received from cloud processing');
        }
      } else {
        // Local processing response (Docker/FFmpeg)
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setDownloadUrl(url);

        setProgress({
          percent: 100,
          stage: 'complete',
          message: VIDEO_CONVERTER_MESSAGES.CONVERSION_SUCCESS,
        });

        toast({
          title: 'Success!',
          description: VIDEO_CONVERTER_MESSAGES.DOWNLOAD_READY,
        });
      }
    } catch (error) {
      console.error('Conversion error:', error);
      setProgress(null);
      toast({
        title: 'Conversion failed',
        description:
          error instanceof Error ? error.message : VIDEO_CONVERTER_MESSAGES.CONVERSION_ERROR,
        variant: 'destructive',
      });
    } finally {
      setIsConverting(false);
    }
  };

  const getOutputFileName = () => {
    if (!selectedFile || !watchedFormat) return 'converted-video';
    const baseName = selectedFile.name.split('.')[0];
    const formatConfig = VIDEO_CONVERTER_CONFIG.OUTPUT_FORMATS.find(f => f.value === watchedFormat);
    return `${baseName}_converted${formatConfig?.extension || '.mp4'}`;
  };

  const formatFileSize = (bytes: number) => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 Byte';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round((bytes / Math.pow(1024, i)) * 100) / 100 + ' ' + sizes[i];
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      <Card className="border-0 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm shadow-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-xl">
            <div className="p-2 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-xl border border-blue-500/30">
              <Upload className="h-5 w-5 text-blue-600" />
            </div>
            Upload Video File
          </CardTitle>
          <CardDescription className="text-base">
            Select a video file to convert. Maximum size:{' '}
            {formatFileSize(VIDEO_CONVERTER_CONFIG.MAX_FILE_SIZE)}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div
            className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
              dragActive
                ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-900/10 scale-[1.02]'
                : 'border-muted-foreground/25 hover:border-blue-300 hover:bg-blue-50/25 dark:hover:bg-blue-900/5'
            }`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            {selectedFile ? (
              <div className="space-y-6">
                <div className="flex items-center justify-center gap-3 text-green-600">
                  <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-full">
                    <CheckCircle className="h-6 w-6" />
                  </div>
                  <span className="font-semibold text-lg">Video Selected</span>
                </div>
                <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/10 dark:to-blue-900/10 p-6 rounded-xl border border-green-200 dark:border-green-800">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                      <FileVideo className="h-5 w-5 text-blue-600" />
                    </div>
                    <span className="font-semibold text-lg">{selectedFile.name}</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-3 bg-white/70 dark:bg-gray-800/70 rounded-lg">
                      <p className="text-sm text-muted-foreground">File Size</p>
                      <p className="font-semibold">{formatFileSize(selectedFile.size)}</p>
                    </div>
                    {videoInfo && (
                      <>
                        <div className="text-center p-3 bg-white/70 dark:bg-gray-800/70 rounded-lg">
                          <p className="text-sm text-muted-foreground">Duration</p>
                          <p className="font-semibold">{formatDuration(videoInfo.duration)}</p>
                        </div>
                        <div className="text-center p-3 bg-white/70 dark:bg-gray-800/70 rounded-lg">
                          <p className="text-sm text-muted-foreground">Resolution</p>
                          <p className="font-semibold">
                            {videoInfo.width}x{videoInfo.height}
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </div>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedFile(null);
                    setVideoInfo(null);
                    setDownloadUrl(null);
                    setProgress(null);
                  }}
                  className="hover:bg-red-50 hover:text-red-600 hover:border-red-300 dark:hover:bg-red-900/10"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Choose Different File
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center justify-center">
                  <div className="p-4 bg-blue-100 dark:bg-blue-900/20 rounded-full">
                    <Upload className="h-12 w-12 text-blue-600" />
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-xl font-semibold">Drop your video file here</p>
                  <p className="text-muted-foreground">or click to browse your files</p>
                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <span>Supported formats:</span>
                    <div className="flex gap-1">
                      {VIDEO_CONVERTER_CONFIG.ACCEPTED_FORMATS.slice(0, 4).map((format, index) => (
                        <Badge key={format} variant="secondary" className="text-xs">
                          {format.replace('.', '').toUpperCase()}
                        </Badge>
                      ))}
                      {VIDEO_CONVERTER_CONFIG.ACCEPTED_FORMATS.length > 4 && (
                        <Badge variant="secondary" className="text-xs">
                          +{VIDEO_CONVERTER_CONFIG.ACCEPTED_FORMATS.length - 4} more
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                <Input
                  type="file"
                  accept={VIDEO_CONVERTER_CONFIG.ACCEPTED_FORMATS.join(',')}
                  onChange={e => handleFileSelect(Array.from(e.target.files || []))}
                  className="hidden"
                  id="video-upload"
                />
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  <label htmlFor="video-upload" className="cursor-pointer">
                    <Upload className="h-5 w-5 mr-2" />
                    Browse Files
                  </label>
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {selectedFile && (
        <Card className="border-0 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm shadow-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-xl">
              <div className="p-2 bg-gradient-to-br from-purple-500/20 via-blue-500/20 to-pink-500/20 rounded-xl border border-purple-500/30">
                <Settings className="h-5 w-5 text-purple-600" />
              </div>
              Conversion Settings
            </CardTitle>
            <CardDescription className="text-base">
              Customize the output format and quality settings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <Tabs defaultValue="basic" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="basic">Basic Settings</TabsTrigger>
                    <TabsTrigger value="advanced">Advanced Settings</TabsTrigger>
                  </TabsList>

                  <TabsContent value="basic" className="space-y-4">
                    <FormField
                      control={form.control}
                      name="format"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Output Format</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select output format" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {VIDEO_CONVERTER_CONFIG.OUTPUT_FORMATS.map(format => (
                                <SelectItem key={format.value} value={format.value}>
                                  <div className="flex items-center gap-2">
                                    <span>{format.label}</span>
                                    <Badge variant="secondary">{format.extension}</Badge>
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="quality"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Quality</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select quality" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {VIDEO_CONVERTER_CONFIG.QUALITY_LEVELS.map(quality => (
                                <SelectItem key={quality.value} value={quality.value}>
                                  {quality.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TabsContent>

                  <TabsContent value="advanced" className="space-y-4">
                    <FormField
                      control={form.control}
                      name="resolution"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Resolution</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select resolution" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {VIDEO_CONVERTER_CONFIG.RESOLUTIONS.map(resolution => (
                                <SelectItem key={resolution.value} value={resolution.value}>
                                  {resolution.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="frameRate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Frame Rate</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select frame rate" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {VIDEO_CONVERTER_CONFIG.FRAME_RATES.map(frameRate => (
                                <SelectItem key={frameRate.value} value={frameRate.value}>
                                  {frameRate.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {watchedFormat === 'gif' && (
                      <FormField
                        control={form.control}
                        name="duration"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Duration (seconds) - Max {VIDEO_CONVERTER_CONFIG.MAX_GIF_DURATION}s
                              for GIF
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                min="1"
                                max={VIDEO_CONVERTER_CONFIG.MAX_GIF_DURATION}
                                placeholder="Enter duration in seconds"
                                onChange={e =>
                                  field.onChange(parseInt(e.target.value) || undefined)
                                }
                                value={field.value || ''}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                  </TabsContent>
                </Tabs>

                {watchedFormat === 'gif' && (
                  <Alert>
                    <Info className="h-4 w-4" />
                    <AlertDescription>
                      {VIDEO_CONVERTER_MESSAGES.GIF_DURATION_WARNING}
                    </AlertDescription>
                  </Alert>
                )}

                <Separator />

                <div className="flex gap-4">
                  <Button
                    type="submit"
                    disabled={isConverting || !watchedFormat}
                    size="lg"
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    {isConverting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Converting Video...
                      </>
                    ) : (
                      <>
                        <Video className="mr-2 h-4 w-4" />
                        Convert Video
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      )}

      {progress && (
        <Card className="border-0 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm shadow-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-xl">
              <div className="p-2 bg-gradient-to-br from-orange-500/20 via-yellow-500/20 to-red-500/20 rounded-xl border border-orange-500/30">
                <Loader2 className="h-5 w-5 animate-spin text-orange-600" />
              </div>
              Conversion Progress
            </CardTitle>
            <CardDescription className="text-base">Your video is being processed</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">
                  {progress.message}
                </span>
                <span className="text-sm font-bold">{Math.round(progress.percent)}%</span>
              </div>
              <Progress value={progress.percent} className="w-full h-3" />
            </div>
            <div className="grid grid-cols-4 gap-2 text-center">
              {['uploading', 'processing', 'downloading', 'complete'].map((stage, index) => (
                <div
                  key={stage}
                  className={`p-2 rounded-lg text-xs font-medium transition-colors ${
                    progress.stage === stage
                      ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                      : index <
                          ['uploading', 'processing', 'downloading', 'complete'].indexOf(
                            progress.stage
                          )
                        ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
                        : 'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400'
                  }`}
                >
                  {stage.charAt(0).toUpperCase() + stage.slice(1)}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {downloadUrl && !isConverting && (
        <Card className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/10 dark:to-blue-900/10 backdrop-blur-sm shadow-2xl border border-green-200 dark:border-green-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-xl text-green-700 dark:text-green-300">
              <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-full">
                <CheckCircle className="h-6 w-6" />
              </div>
              Conversion Complete!
            </CardTitle>
            <CardDescription className="text-base text-green-600 dark:text-green-400">
              Your video has been successfully converted and is ready for download.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              asChild
              size="lg"
              className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 shadow-lg"
            >
              <a href={downloadUrl} download={getOutputFileName()}>
                <Download className="mr-2 h-5 w-5" />
                Download Converted Video
              </a>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
