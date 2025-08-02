'use client';

import React, { useState, useCallback, useRef } from 'react';
import Image from 'next/image';
import { usePerformanceMonitor } from '@/lib/performance-monitor';
import { formatFileSize, createFilePreviewUrl, revokeFilePreviewUrl } from '@/lib/utils';
import { ImageUploadZone } from '@/components/ui/image-upload-zone';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Upload,
  Settings,
  Play,
  Pause,
  Download,
  Trash2,
  CheckCircle,
  AlertCircle,
  Loader2,
  Archive,
  FileText,
  Clock,
  Zap,
} from 'lucide-react';
import JSZip from 'jszip';

interface BatchOperation {
  id: string;
  type: 'resize' | 'compress' | 'format-convert' | 'watermark' | 'rename';
  name: string;
  settings: any;
  enabled: boolean;
}

interface ProcessingItem {
  id: string;
  file: File;
  originalName: string;
  previewUrl: string;
  status: 'pending' | 'processing' | 'completed' | 'error';
  progress: number;
  processedBlob?: Blob;
  processedName?: string;
  error?: string;
  originalSize: number;
  processedSize?: number;
}

export function BatchImageProcessor() {
  const [items, setItems] = useState<ProcessingItem[]>([]);
  const [operations, setOperations] = useState<BatchOperation[]>([
    {
      id: 'resize',
      type: 'resize',
      name: 'Resize Images',
      enabled: false,
      settings: {
        width: 1920,
        height: 1080,
        maintainAspectRatio: true,
        method: 'fit', // fit, fill, cover
      },
    },
    {
      id: 'compress',
      type: 'compress',
      name: 'Compress Images',
      enabled: true,
      settings: {
        quality: 0.8,
        maxSizeMB: 5,
        useWebWorker: true,
      },
    },
    {
      id: 'format',
      type: 'format-convert',
      name: 'Convert Format',
      enabled: false,
      settings: {
        format: 'webp', // jpeg, png, webp
        quality: 0.8,
      },
    },
    {
      id: 'rename',
      type: 'rename',
      name: 'Rename Files',
      enabled: false,
      settings: {
        pattern: '{name}_{index}',
        prefix: '',
        suffix: '',
        startIndex: 1,
      },
    },
  ]);

  const [isProcessing, setIsProcessing] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [overallProgress, setOverallProgress] = useState(0);
  const [estimatedTime, setEstimatedTime] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);

  const { startOperation, endOperation } = usePerformanceMonitor();
  const processingRef = useRef<boolean>(false);

  const handleFileSelect = useCallback((files: File[]) => {
    const newItems: ProcessingItem[] = files.map((file, index) => ({
      id: `${Date.now()}-${index}`,
      file,
      originalName: file.name,
      previewUrl: createFilePreviewUrl(file),
      status: 'pending',
      progress: 0,
      originalSize: file.size,
    }));

    setItems(prev => [...prev, ...newItems]);
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems(prev => {
      const item = prev.find(i => i.id === id);
      if (item) {
        revokeFilePreviewUrl(item.previewUrl);
      }
      return prev.filter(i => i.id !== id);
    });
  }, []);

  const clearAll = useCallback(() => {
    items.forEach(item => {
      revokeFilePreviewUrl(item.previewUrl);
    });
    setItems([]);
    setOverallProgress(0);
    setEstimatedTime(0);
  }, [items]);

  const updateOperation = useCallback((id: string, updates: Partial<BatchOperation>) => {
    setOperations(prev => prev.map(op => (op.id === id ? { ...op, ...updates } : op)));
  }, []);

  // Processing functions
  const resizeImage = async (file: File, settings: any): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d')!;
      const img = document.createElement('img');

      img.onload = () => {
        const { width: targetWidth, height: targetHeight, maintainAspectRatio, method } = settings;

        let { width, height } = img;

        if (maintainAspectRatio) {
          const aspectRatio = width / height;
          if (method === 'fit') {
            if (width > height) {
              width = targetWidth;
              height = targetWidth / aspectRatio;
            } else {
              height = targetHeight;
              width = targetHeight * aspectRatio;
            }
          } else if (method === 'fill') {
            width = targetWidth;
            height = targetHeight;
          }
        } else {
          width = targetWidth;
          height = targetHeight;
        }

        canvas.width = width;
        canvas.height = height;

        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          blob => {
            if (blob) resolve(blob);
            else reject(new Error('Failed to resize image'));
          },
          file.type,
          0.9
        );
      };

      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = URL.createObjectURL(file);
    });
  };

  const compressImage = async (file: File, settings: any): Promise<Blob> => {
    // Use browser-image-compression library
    const imageCompression = (await import('browser-image-compression')).default;

    return imageCompression(file, {
      maxSizeMB: settings.maxSizeMB,
      useWebWorker: settings.useWebWorker,
    });
  };

  const convertFormat = async (file: File, settings: any): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d')!;
      const img = document.createElement('img');

      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        const mimeType = `image/${settings.format}`;
        canvas.toBlob(
          blob => {
            if (blob) resolve(blob);
            else reject(new Error('Failed to convert format'));
          },
          mimeType,
          settings.quality
        );
      };

      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = URL.createObjectURL(file);
    });
  };

  const processItem = useCallback(
    async (item: ProcessingItem): Promise<ProcessingItem> => {
      let processedBlob = new Blob([await item.file.arrayBuffer()], { type: item.file.type });
      let processedName = item.originalName;

      const enabledOps = operations.filter(op => op.enabled);

      for (let i = 0; i < enabledOps.length; i++) {
        const operation = enabledOps[i];

        try {
          switch (operation.type) {
            case 'resize':
              processedBlob = await resizeImage(
                new File([processedBlob], processedName),
                operation.settings
              );
              break;
            case 'compress':
              processedBlob = await compressImage(
                new File([processedBlob], processedName),
                operation.settings
              );
              break;
            case 'format-convert':
              processedBlob = await convertFormat(
                new File([processedBlob], processedName),
                operation.settings
              );
              processedName = processedName.replace(/\.[^/.]+$/, `.${operation.settings.format}`);
              break;
            case 'rename':
              const { pattern, prefix, suffix, startIndex } = operation.settings;
              const index = items.findIndex(i => i.id === item.id) + startIndex;
              const baseName = item.originalName.replace(/\.[^/.]+$/, '');
              const extension = item.originalName.split('.').pop();

              processedName =
                pattern
                  .replace('{name}', baseName)
                  .replace('{index}', index.toString().padStart(3, '0'))
                  .replace('{prefix}', prefix)
                  .replace('{suffix}', suffix) + `.${extension}`;
              break;
          }

          // Update progress for this operation
          const operationProgress = ((i + 1) / enabledOps.length) * 100;
          setItems(prev =>
            prev.map(p => (p.id === item.id ? { ...p, progress: operationProgress } : p))
          );
        } catch (error) {
          throw new Error(`${operation.name} failed: ${error}`);
        }
      }

      return {
        ...item,
        status: 'completed',
        progress: 100,
        processedBlob,
        processedName,
        processedSize: processedBlob.size,
      };
    },
    [operations, items, resizeImage, compressImage, convertFormat]
  );

  const startProcessing = useCallback(async () => {
    if (processingRef.current) return;

    processingRef.current = true;
    setIsProcessing(true);
    setIsPaused(false);
    setStartTime(Date.now());

    const operationId = startOperation(
      'batch-processing',
      items.reduce((sum, item) => sum + item.originalSize, 0)
    );

    const pendingItems = items.filter(item => item.status === 'pending');
    let completedCount = 0;

    for (const item of pendingItems) {
      if (!processingRef.current || isPaused) break;

      // Update item status to processing
      setItems(prev =>
        prev.map(p => (p.id === item.id ? { ...p, status: 'processing' as const } : p))
      );

      try {
        const processedItem = await processItem(item);

        setItems(prev => prev.map(p => (p.id === item.id ? processedItem : p)));

        completedCount++;

        // Update overall progress
        const overallProg = (completedCount / pendingItems.length) * 100;
        setOverallProgress(overallProg);

        // Estimate remaining time
        if (startTime) {
          const elapsed = Date.now() - startTime;
          const avgTimePerItem = elapsed / completedCount;
          const remaining = (pendingItems.length - completedCount) * avgTimePerItem;
          setEstimatedTime(remaining);
        }
      } catch (error) {
        setItems(prev =>
          prev.map(p =>
            p.id === item.id
              ? {
                  ...p,
                  status: 'error' as const,
                  error: error instanceof Error ? error.message : 'Unknown error',
                }
              : p
          )
        );
        completedCount++;
      }
    }

    endOperation(
      operationId,
      'batch-processing',
      items.reduce((sum, item) => sum + item.originalSize, 0)
    );

    processingRef.current = false;
    setIsProcessing(false);
    setEstimatedTime(0);
  }, [items, operations, startOperation, endOperation, startTime, isPaused, processItem]);

  const pauseProcessing = useCallback(() => {
    setIsPaused(true);
    processingRef.current = false;
  }, []);

  const downloadAll = useCallback(async () => {
    const completedItems = items.filter(item => item.status === 'completed' && item.processedBlob);

    if (completedItems.length === 0) return;

    const zip = new JSZip();

    completedItems.forEach(item => {
      zip.file(item.processedName || item.originalName, item.processedBlob!);
    });

    const zipBlob = await zip.generateAsync({ type: 'blob' });
    const url = URL.createObjectURL(zipBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `processed-images-${Date.now()}.zip`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [items]);

  const completedItems = items.filter(item => item.status === 'completed');
  const errorItems = items.filter(item => item.status === 'error');
  const totalOriginalSize = items.reduce((sum, item) => sum + item.originalSize, 0);
  const totalProcessedSize = completedItems.reduce(
    (sum, item) => sum + (item.processedSize || 0),
    0
  );
  const compressionRatio =
    totalOriginalSize > 0
      ? ((totalOriginalSize - totalProcessedSize) / totalOriginalSize) * 100
      : 0;

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Batch Image Processor
          </CardTitle>
          <CardDescription>
            Process multiple images with automated operations like resizing, compression, format
            conversion, and renaming.
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Operations Settings */}
        <div className="space-y-4">
          <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Operations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {operations.map(operation => (
                <div key={operation.id} className="space-y-3 p-3 border rounded-lg">
                  <div className="flex items-center justify-between">
                    <Label className="font-medium">{operation.name}</Label>
                    <Switch
                      checked={operation.enabled}
                      onCheckedChange={enabled => updateOperation(operation.id, { enabled })}
                    />
                  </div>

                  {operation.enabled && (
                    <div className="space-y-2 text-sm">
                      {operation.type === 'resize' && (
                        <>
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <Label>Width</Label>
                              <Input
                                type="number"
                                value={operation.settings.width}
                                onChange={e =>
                                  updateOperation(operation.id, {
                                    settings: {
                                      ...operation.settings,
                                      width: parseInt(e.target.value),
                                    },
                                  })
                                }
                              />
                            </div>
                            <div>
                              <Label>Height</Label>
                              <Input
                                type="number"
                                value={operation.settings.height}
                                onChange={e =>
                                  updateOperation(operation.id, {
                                    settings: {
                                      ...operation.settings,
                                      height: parseInt(e.target.value),
                                    },
                                  })
                                }
                              />
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <Label>Maintain Aspect Ratio</Label>
                            <Switch
                              checked={operation.settings.maintainAspectRatio}
                              onCheckedChange={checked =>
                                updateOperation(operation.id, {
                                  settings: { ...operation.settings, maintainAspectRatio: checked },
                                })
                              }
                            />
                          </div>
                        </>
                      )}

                      {operation.type === 'compress' && (
                        <>
                          <div>
                            <Label>Quality ({operation.settings.quality})</Label>
                            <Input
                              type="range"
                              min="0.1"
                              max="1"
                              step="0.1"
                              value={operation.settings.quality}
                              onChange={e =>
                                updateOperation(operation.id, {
                                  settings: {
                                    ...operation.settings,
                                    quality: parseFloat(e.target.value),
                                  },
                                })
                              }
                            />
                          </div>
                          <div>
                            <Label>Max Size (MB)</Label>
                            <Input
                              type="number"
                              value={operation.settings.maxSizeMB}
                              onChange={e =>
                                updateOperation(operation.id, {
                                  settings: {
                                    ...operation.settings,
                                    maxSizeMB: parseFloat(e.target.value),
                                  },
                                })
                              }
                            />
                          </div>
                        </>
                      )}

                      {operation.type === 'format-convert' && (
                        <>
                          <div>
                            <Label>Format</Label>
                            <Select
                              value={operation.settings.format}
                              onValueChange={format =>
                                updateOperation(operation.id, {
                                  settings: { ...operation.settings, format },
                                })
                              }
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="jpeg">JPEG</SelectItem>
                                <SelectItem value="png">PNG</SelectItem>
                                <SelectItem value="webp">WebP</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </>
                      )}

                      {operation.type === 'rename' && (
                        <>
                          <div>
                            <Label>Pattern</Label>
                            <Input
                              placeholder="{name}_{index}"
                              value={operation.settings.pattern}
                              onChange={e =>
                                updateOperation(operation.id, {
                                  settings: { ...operation.settings, pattern: e.target.value },
                                })
                              }
                            />
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Use {'{name}'} for original name, {'{index}'} for number
                          </div>
                        </>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Statistics */}
          {items.length > 0 && (
            <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle className="text-sm">Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Total Files:</span>
                  <span>{items.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Completed:</span>
                  <span className="text-green-600">{completedItems.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Errors:</span>
                  <span className="text-red-600">{errorItems.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Original Size:</span>
                  <span>{formatFileSize(totalOriginalSize)}</span>
                </div>
                {totalProcessedSize > 0 && (
                  <>
                    <div className="flex justify-between">
                      <span>Processed Size:</span>
                      <span>{formatFileSize(totalProcessedSize)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Space Saved:</span>
                      <span className="text-green-600">{compressionRatio.toFixed(1)}%</span>
                    </div>
                  </>
                )}
                {estimatedTime > 0 && (
                  <div className="flex justify-between">
                    <span>Est. Time:</span>
                    <span>{Math.round(estimatedTime / 1000)}s</span>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>

        {/* File List and Processing */}
        <div className="lg:col-span-2 space-y-4">
          {/* Upload Area */}
          <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5" />
                  Upload Images
                </CardTitle>
                <div className="flex gap-2">
                  {!isProcessing ? (
                    <Button
                      onClick={startProcessing}
                      disabled={items.length === 0 || !operations.some(op => op.enabled)}
                      className="flex items-center gap-2"
                    >
                      <Play className="h-4 w-4" />
                      Start Processing
                    </Button>
                  ) : (
                    <Button
                      onClick={pauseProcessing}
                      variant="outline"
                      className="flex items-center gap-2"
                    >
                      <Pause className="h-4 w-4" />
                      Pause
                    </Button>
                  )}

                  <Button
                    onClick={downloadAll}
                    disabled={completedItems.length === 0}
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    <Archive className="h-4 w-4" />
                    Download All
                  </Button>

                  <Button onClick={clearAll} variant="outline" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              {items.length === 0 ? (
                <ImageUploadZone
                  onFilesSelected={handleFileSelect}
                  accept=".jpg,.jpeg,.png,.webp"
                  multiple={true}
                  maxFileSize={50}
                  className="min-h-32"
                />
              ) : (
                <div className="space-y-4">
                  {/* Overall Progress */}
                  {isProcessing && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Overall Progress</span>
                        <span>{overallProgress.toFixed(0)}%</span>
                      </div>
                      <Progress value={overallProgress} className="w-full" />
                    </div>
                  )}

                  {/* File List */}
                  <ScrollArea className="h-96">
                    <div className="space-y-2">
                      {items.map(item => (
                        <div
                          key={item.id}
                          className="flex items-center gap-3 p-3 border rounded-lg"
                        >
                          <div className="w-12 h-12 relative flex-shrink-0">
                            <Image
                              src={item.previewUrl}
                              alt={item.originalName}
                              fill
                              className="object-cover rounded"
                            />
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium truncate">
                              {item.processedName || item.originalName}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {formatFileSize(item.originalSize)}
                              {item.processedSize && <> → {formatFileSize(item.processedSize)}</>}
                            </div>

                            {item.status === 'processing' && (
                              <Progress value={item.progress} className="w-full mt-1" />
                            )}

                            {item.error && (
                              <div className="text-xs text-red-600 mt-1">{item.error}</div>
                            )}
                          </div>

                          <div className="flex items-center gap-2">
                            {item.status === 'pending' && (
                              <Clock className="h-4 w-4 text-gray-400" />
                            )}
                            {item.status === 'processing' && (
                              <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
                            )}
                            {item.status === 'completed' && (
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            )}
                            {item.status === 'error' && (
                              <AlertCircle className="h-4 w-4 text-red-500" />
                            )}

                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeItem(item.id)}
                              disabled={item.status === 'processing'}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>

                  {/* Add More Files */}
                  <Button
                    variant="outline"
                    onClick={() => {
                      const input = document.createElement('input');
                      input.type = 'file';
                      input.multiple = true;
                      input.accept = '.jpg,.jpeg,.png,.webp';
                      input.onchange = e => {
                        const files = Array.from((e.target as HTMLInputElement).files || []);
                        handleFileSelect(files);
                      };
                      input.click();
                    }}
                    className="w-full"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Add More Images
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
