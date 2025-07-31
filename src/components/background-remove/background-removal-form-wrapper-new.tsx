"use client";

import React, { useState, useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { ImageComparison } from "@/components/ui/image-comparison";
import {
    Upload,
    Image as ImageIcon,
    Download,
    Trash2,
    CheckCircle,
    AlertCircle,
    Loader2,
    Eraser,
    Eye,
    RotateCcw,
} from "lucide-react";

interface ProcessedImageData {
    originalFile: File;
    originalPreviewUrl: string;
    processedPreviewUrl: string;
    processedBlob: Blob;
}

export default function BackgroundRemovalFormWrapper() {
    const [isDragOver, setIsDragOver] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [processedImage, setProcessedImage] = useState<ProcessedImageData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [progress, setProgress] = useState(0);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileSelect = useCallback(async (files: FileList | null) => {
        if (!files || files.length === 0) return;

        const file = files[0];

        // Validate file type
        if (!file.type.startsWith('image/')) {
            setError('Please select a valid image file (JPG, PNG, WebP)');
            return;
        }

        // Validate file size (10MB limit)
        if (file.size > 10 * 1024 * 1024) {
            setError('File size must be less than 10MB');
            return;
        }

        setError(null);
        setIsProcessing(true);
        setProgress(0);

        try {
            // Create original preview URL
            const originalPreviewUrl = URL.createObjectURL(file);

            // Simulate progress
            const progressInterval = setInterval(() => {
                setProgress(prev => {
                    if (prev >= 90) {
                        clearInterval(progressInterval);
                        return 90;
                    }
                    return prev + 10;
                });
            }, 200);

            // Call the API
            const formData = new FormData();
            formData.append('file', file);

            const response = await fetch('/api/background-remove', {
                method: 'POST',
                body: formData,
            });

            clearInterval(progressInterval);

            if (!response.ok) {
                let errorMessage = 'Failed to remove background';

                try {
                    // Check if response is JSON
                    const contentType = response.headers.get('content-type');
                    if (contentType && contentType.includes('application/json')) {
                        const errorData = await response.json();
                        errorMessage = errorData.error || errorMessage;
                    } else {
                        // If not JSON, it might be an HTML error page
                        const textError = await response.text();
                        if (textError.includes('Request Entity Too Large')) {
                            errorMessage = 'Image file is too large. Please use a smaller image.';
                        } else if (response.status >= 500) {
                            errorMessage = 'Server error. Please try again later.';
                        } else if (response.status === 402) {
                            errorMessage = 'Service quota exceeded. Please try again later.';
                        } else if (response.status === 403) {
                            errorMessage = 'Access denied. Please contact support.';
                        }
                    }
                } catch (parseError) {
                    console.error('Error parsing response:', parseError);
                    // Provide user-friendly error messages based on status code
                    if (response.status >= 500) {
                        errorMessage = 'Server error. Please try again later.';
                    } else if (response.status === 413) {
                        errorMessage = 'Image file is too large. Please use a smaller image.';
                    } else {
                        errorMessage = 'Service temporarily unavailable. Please try again.';
                    }
                }

                throw new Error(errorMessage);
            }

            const processedBlob = await response.blob();
            const processedPreviewUrl = URL.createObjectURL(processedBlob);

            setProcessedImage({
                originalFile: file,
                originalPreviewUrl,
                processedPreviewUrl,
                processedBlob,
            });

            setProgress(100);
        } catch (err) {
            console.error('Background removal failed:', err);

            let errorMessage = 'Failed to remove background';

            if (err instanceof Error) {
                if (err.message.includes('timeout') || err.message.includes('408')) {
                    errorMessage = 'Request timeout. Please try again with a smaller image.';
                } else if (err.message.includes('Network') || err.message.includes('fetch')) {
                    errorMessage = 'Network error. Please check your connection and try again.';
                } else {
                    errorMessage = err.message;
                }
            }

            setError(errorMessage);
        } finally {
            setIsProcessing(false);
            setTimeout(() => setProgress(0), 1000);
        }
    }, []);

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);
        handleFileSelect(e.dataTransfer.files);
    }, [handleFileSelect]);

    const handleFileInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        handleFileSelect(e.target.files);
    }, [handleFileSelect]);

    const handleDownload = useCallback(() => {
        if (!processedImage) return;

        const link = document.createElement('a');
        link.href = processedImage.processedPreviewUrl;
        link.download = `background-removed-${processedImage.originalFile.name.replace(/\.[^/.]+$/, '')}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }, [processedImage]);

    const handleReset = useCallback(() => {
        if (processedImage) {
            URL.revokeObjectURL(processedImage.originalPreviewUrl);
            URL.revokeObjectURL(processedImage.processedPreviewUrl);
        }
        setProcessedImage(null);
        setError(null);
        setProgress(0);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    }, [processedImage]);

    return (
        <div className="space-y-6">
            {/* Upload Section */}
            {!processedImage && (
                <Card className="border-2 border-dashed transition-colors duration-300 hover:border-primary/50">
                    <CardContent className="p-8">
                        <div
                            className={`relative border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300 ${
                                isDragOver
                                    ? 'border-primary bg-primary/5 scale-[1.02]'
                                    : 'border-gray-300 hover:border-primary/50 hover:bg-gray-50/50 dark:hover:bg-gray-800/50'
                            }`}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                        >
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                onChange={handleFileInputChange}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                disabled={isProcessing}
                            />

                            <div className="space-y-4">
                                <div className="flex justify-center">
                                    <div className="p-4 bg-primary/10 rounded-full">
                                        {isProcessing ? (
                                            <Loader2 className="h-12 w-12 text-primary animate-spin" />
                                        ) : isDragOver ? (
                                            <Download className="h-12 w-12 text-primary" />
                                        ) : (
                                            <Upload className="h-12 w-12 text-primary" />
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-xl font-semibold mb-2">
                                        {isProcessing
                                            ? 'Processing Image...'
                                            : isDragOver
                                            ? 'Drop your image here'
                                            : 'Upload Image to Remove Background'}
                                    </h3>
                                    <p className="text-muted-foreground mb-4">
                                        {isProcessing
                                            ? 'Our AI is removing the background from your image'
                                            : 'Drag and drop your image here, or click to browse'}
                                    </p>
                                </div>

                                {!isProcessing && (
                                    <Button size="lg" disabled={isProcessing}>
                                        <Upload className="h-4 w-4 mr-2" />
                                        Choose Image
                                    </Button>
                                )}

                                <div className="flex justify-center gap-2 flex-wrap">
                                    <Badge variant="secondary">JPG</Badge>
                                    <Badge variant="secondary">PNG</Badge>
                                    <Badge variant="secondary">WebP</Badge>
                                    <Badge variant="secondary">Max 10MB</Badge>
                                </div>
                            </div>
                        </div>

                        {isProcessing && (
                            <div className="mt-6 space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span>Processing...</span>
                                    <span>{progress}%</span>
                                </div>
                                <Progress value={progress} className="h-2" />
                            </div>
                        )}
                    </CardContent>
                </Card>
            )}

            {/* Error Alert */}
            {error && (
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}

            {/* Results Section */}
            {processedImage && (
                <div className="space-y-6">
                    {/* Success Alert */}
                    <Alert className="border-green-200 bg-green-50 dark:bg-green-900/20">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <AlertDescription className="text-green-800 dark:text-green-200">
                            Background removed successfully! You can now download your image with transparent background.
                        </AlertDescription>
                    </Alert>

                    {/* Image Comparison */}
                    <ImageComparison
                        originalImageUrl={processedImage.originalPreviewUrl}
                        processedImageUrl={processedImage.processedPreviewUrl}
                        type="background-remove"
                        onReset={handleReset}
                        format="png"
                    />

                    {/* Action Buttons */}
                    <div className="flex justify-center gap-4 flex-wrap">
                        <Button onClick={handleDownload} size="lg" className="gap-2">
                            <Download className="h-4 w-4" />
                            Download PNG
                        </Button>
                        <Button onClick={handleReset} variant="outline" size="lg" className="gap-2">
                            <RotateCcw className="h-4 w-4" />
                            Process Another Image
                        </Button>
                    </div>

                    {/* Image Info */}
                    <Card className="bg-muted/50">
                        <CardContent className="pt-6">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                                <div>
                                    <p className="text-sm text-muted-foreground">Original Format</p>
                                    <p className="font-semibold">{processedImage.originalFile.type.split('/')[1].toUpperCase()}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Output Format</p>
                                    <p className="font-semibold">PNG</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">File Size</p>
                                    <p className="font-semibold">{(processedImage.originalFile.size / 1024 / 1024).toFixed(2)} MB</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Background</p>
                                    <p className="font-semibold">Transparent</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    );
}
