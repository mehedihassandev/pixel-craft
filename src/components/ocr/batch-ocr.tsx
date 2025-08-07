'use client';

import { useState, useCallback, useRef } from 'react';
import Tesseract from 'tesseract.js';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ImageUploadZone } from '@/components/ui/image-upload-zone';
import { SUPPORTED_FORMATS_DISPLAY } from '@/constants/file-validation';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Upload,
  Trash2,
  Download,
  FileText,
  Loader2,
  CheckCircle,
  XCircle,
  Play,
  Pause,
  RotateCcw,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface BatchFile {
  id: string;
  file: File;
  status: 'pending' | 'processing' | 'completed' | 'error';
  progress: number;
  result?: string;
  confidence?: number;
  error?: string;
}

interface BatchOcrProps {
  language?: string;
}

export const BatchOcr = ({ language = 'eng' }: BatchOcrProps) => {
  const { toast } = useToast();
  const [files, setFiles] = useState<BatchFile[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentFileIndex, setCurrentFileIndex] = useState(0);
  const [overallProgress, setOverallProgress] = useState(0);
  const [selectedLanguage, setSelectedLanguage] = useState(language);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const workerRef = useRef<Tesseract.Worker | null>(null);

  const handleFileSelect = useCallback(
    (selectedFiles: File[]) => {
      const newFiles: BatchFile[] = selectedFiles
        .filter(file => file.type.startsWith('image/'))
        .map(file => ({
          id: Math.random().toString(36).substr(2, 9),
          file,
          status: 'pending',
          progress: 0,
        }));

      if (newFiles.length !== selectedFiles.length) {
        toast({
          title: 'Some files skipped',
          description: 'Only image files are supported for OCR',
          variant: 'destructive',
        });
      }

      setFiles(prev => [...prev, ...newFiles]);
    },
    [toast]
  );

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id));
  };

  const clearAll = () => {
    setFiles([]);
    setCurrentFileIndex(0);
    setOverallProgress(0);
  };

  const startBatchProcessing = async () => {
    if (files.length === 0) return;

    setIsProcessing(true);
    setCurrentFileIndex(0);

    try {
      // Initialize worker
      const worker = await Tesseract.createWorker(selectedLanguage, 3, {
        logger: m => {
          if (m.progress && currentFileIndex < files.length) {
            const fileProgress = Math.round(m.progress * 100);
            setFiles(prev =>
              prev.map((file, index) =>
                index === currentFileIndex
                  ? {
                      ...file,
                      progress: fileProgress,
                      status: 'processing',
                    }
                  : file
              )
            );
          }
        },
      });

      workerRef.current = worker;

      // Process each file
      for (let i = 0; i < files.length; i++) {
        if (!isProcessing) break; // Allow stopping

        setCurrentFileIndex(i);
        const file = files[i];

        try {
          // Update status to processing
          setFiles(prev =>
            prev.map((f, index) => (index === i ? { ...f, status: 'processing', progress: 0 } : f))
          );

          const { data } = await worker.recognize(file.file);

          // Update with results
          setFiles(prev =>
            prev.map((f, index) =>
              index === i
                ? {
                    ...f,
                    status: 'completed',
                    progress: 100,
                    result: data.text,
                    confidence: data.confidence,
                  }
                : f
            )
          );

          // Update overall progress
          setOverallProgress(Math.round(((i + 1) / files.length) * 100));
        } catch (error) {
          // Update with error
          setFiles(prev =>
            prev.map((f, index) =>
              index === i
                ? {
                    ...f,
                    status: 'error',
                    error: error instanceof Error ? error.message : 'Unknown error',
                  }
                : f
            )
          );
        }
      }

      await worker.terminate();
      workerRef.current = null;

      toast({
        title: 'Batch processing completed',
        description: `Processed ${files.length} images`,
      });
    } catch (error) {
      toast({
        title: 'Batch processing failed',
        description: 'An error occurred during batch processing',
        variant: 'destructive',
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const stopProcessing = async () => {
    setIsProcessing(false);
    if (workerRef.current) {
      await workerRef.current.terminate();
      workerRef.current = null;
    }
  };

  const retryFile = async (fileId: string) => {
    const fileIndex = files.findIndex(f => f.id === fileId);
    if (fileIndex === -1) return;

    const file = files[fileIndex];
    if (!file) return;

    try {
      // Reset file status
      setFiles(prev =>
        prev.map(f =>
          f.id === fileId
            ? {
                ...f,
                status: 'processing',
                progress: 0,
                error: undefined,
              }
            : f
        )
      );

      const worker = await Tesseract.createWorker(selectedLanguage, 3, {
        logger: m => {
          if (m.progress) {
            const fileProgress = Math.round(m.progress * 100);
            setFiles(prev =>
              prev.map(f => (f.id === fileId ? { ...f, progress: fileProgress } : f))
            );
          }
        },
      });

      const { data } = await worker.recognize(file.file);

      setFiles(prev =>
        prev.map(f =>
          f.id === fileId
            ? {
                ...f,
                status: 'completed',
                progress: 100,
                result: data.text,
                confidence: data.confidence,
              }
            : f
        )
      );

      await worker.terminate();

      toast({
        title: 'File reprocessed successfully',
        description: file.file.name,
      });
    } catch (error) {
      setFiles(prev =>
        prev.map(f =>
          f.id === fileId
            ? {
                ...f,
                status: 'error',
                error: error instanceof Error ? error.message : 'Unknown error',
              }
            : f
        )
      );

      toast({
        title: 'Retry failed',
        description: 'Failed to reprocess the file',
        variant: 'destructive',
      });
    }
  };

  const exportResults = () => {
    const completedFiles = files.filter(f => f.status === 'completed' && f.result);

    if (completedFiles.length === 0) {
      toast({
        title: 'No results to export',
        description: 'Complete OCR processing first',
        variant: 'destructive',
      });
      return;
    }

    const exportData = completedFiles.map(file => ({
      filename: file.file.name,
      text: file.result,
      confidence: file.confidence,
      timestamp: new Date().toISOString(),
    }));

    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: 'application/json',
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `batch-ocr-results-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const exportAsText = () => {
    const completedFiles = files.filter(f => f.status === 'completed' && f.result);

    if (completedFiles.length === 0) {
      toast({
        title: 'No results to export',
        description: 'Complete OCR processing first',
        variant: 'destructive',
      });
      return;
    }

    const textContent = completedFiles
      .map(
        file =>
          `=== ${file.file.name} (Confidence: ${file.confidence?.toFixed(1)}%) ===\n${
            file.result
          }\n`
      )
      .join('\n');

    const blob = new Blob([textContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `batch-ocr-text-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getStatusIcon = (status: BatchFile['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'error':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'processing':
        return <Loader2 className="h-4 w-4 text-blue-500 animate-spin" />;
      default:
        return <div className="h-4 w-4 rounded-full bg-gray-300" />;
    }
  };

  const completedCount = files.filter(f => f.status === 'completed').length;
  const errorCount = files.filter(f => f.status === 'error').length;
  const pendingCount = files.filter(f => f.status === 'pending').length;

  return (
    <div className="space-y-6">
      {/* File Upload */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Batch OCR Processing
          </CardTitle>
          <CardDescription>
            Upload multiple images to extract text from all of them at once
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Language Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="batch-language">Language</Label>
              <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="eng">English</SelectItem>
                  <SelectItem value="spa">Spanish</SelectItem>
                  <SelectItem value="fra">French</SelectItem>
                  <SelectItem value="deu">German</SelectItem>
                  <SelectItem value="chi_sim">Chinese (Simplified)</SelectItem>
                  <SelectItem value="jpn">Japanese</SelectItem>
                  <SelectItem value="kor">Korean</SelectItem>
                  <SelectItem value="ara">Arabic</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Upload Section */}
          <ImageUploadZone
            onFilesSelected={handleFileSelect}
            accept="image/*"
            multiple={true}
            maxFileSize={10}
            disabled={isProcessing}
            title="Drop your images here, or browse files"
            subtitle="Upload multiple images to extract text from all of them"
            supportedFormats={SUPPORTED_FORMATS_DISPLAY}
          />

          <div className="flex gap-2 pt-4">
            <Button
              variant="outline"
              onClick={clearAll}
              disabled={isProcessing}
              className="flex items-center gap-2"
            >
              <Trash2 className="h-4 w-4" />
              Clear All
            </Button>
          </div>

          {/* Overall Progress */}
          {isProcessing && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Overall Progress</span>
                <span>{overallProgress}%</span>
              </div>
              <Progress value={overallProgress} className="w-full" />
              <p className="text-sm text-muted-foreground">
                Processing file {currentFileIndex + 1} of {files.length}
              </p>
            </div>
          )}

          {/* Control Buttons */}
          {files.length > 0 && (
            <div className="flex gap-2">
              {!isProcessing ? (
                <Button onClick={startBatchProcessing} className="flex items-center gap-2">
                  <Play className="h-4 w-4" />
                  Start Processing
                </Button>
              ) : (
                <Button
                  onClick={stopProcessing}
                  variant="destructive"
                  className="flex items-center gap-2"
                >
                  <Pause className="h-4 w-4" />
                  Stop Processing
                </Button>
              )}

              {completedCount > 0 && (
                <>
                  <Button
                    onClick={exportResults}
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    <Download className="h-4 w-4" />
                    Export JSON
                  </Button>
                  <Button
                    onClick={exportAsText}
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    <FileText className="h-4 w-4" />
                    Export TXT
                  </Button>
                </>
              )}
            </div>
          )}

          {/* Statistics */}
          {files.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{files.length}</div>
                <div className="text-sm text-gray-600">Total Files</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{completedCount}</div>
                <div className="text-sm text-gray-600">Completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-600">{pendingCount}</div>
                <div className="text-sm text-gray-600">Pending</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">{errorCount}</div>
                <div className="text-sm text-gray-600">Errors</div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* File List */}
      {files.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Processing Queue</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Status</TableHead>
                  <TableHead>File Name</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead>Confidence</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {files.map(file => (
                  <TableRow key={file.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(file.status)}
                        <Badge
                          variant={
                            file.status === 'completed'
                              ? 'default'
                              : file.status === 'error'
                                ? 'destructive'
                                : file.status === 'processing'
                                  ? 'secondary'
                                  : 'outline'
                          }
                        >
                          {file.status}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">
                      {file.file.name}
                      {file.error && <div className="text-xs text-red-500 mt-1">{file.error}</div>}
                    </TableCell>
                    <TableCell>
                      {file.status === 'processing' || file.status === 'completed' ? (
                        <div className="space-y-1">
                          <Progress value={file.progress} className="w-20" />
                          <span className="text-xs text-gray-500">{file.progress}%</span>
                        </div>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {file.confidence ? (
                        <Badge variant={file.confidence >= 80 ? 'default' : 'secondary'}>
                          {file.confidence.toFixed(1)}%
                        </Badge>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        {file.status === 'error' && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => retryFile(file.id)}
                            className="flex items-center gap-1"
                          >
                            <RotateCcw className="h-3 w-3" />
                            Retry
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => removeFile(file.id)}
                          disabled={isProcessing}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Results Preview */}
      {completedCount > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Extracted Text Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-96 overflow-auto">
              {files
                .filter(f => f.status === 'completed' && f.result)
                .map(file => (
                  <div key={file.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-sm">{file.file.name}</h4>
                      <Badge>{file.confidence?.toFixed(1)}% confidence</Badge>
                    </div>
                    <Textarea
                      value={file.result}
                      readOnly
                      rows={3}
                      className="resize-none text-sm"
                    />
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
