"use client";

import React, { useState } from "react";
import { ImageResizeForm } from "@/components/resize/image-resize-form";
import { ImageComparison } from "@/components/ui/image-comparison";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Scissors,
    Zap,
    ImageIcon,
    Maximize2,
    Settings,
    Download,
} from "lucide-react";

interface IProcessedImageData {
    processedImageUrl: string;
    originalImageUrl: string;
    originalDimensions?: { width: number; height: number };
    targetDimensions?: { width: number; height: number };
    format?: string;
    quality?: number;
}

export default function ResizePage() {
    const [imageData, setImageData] = useState<IProcessedImageData | null>(
        null
    );

    const handleImageProcessed = (
        processedImageUrl: string,
        originalImageUrl: string,
        metadata?: {
            originalDimensions?: { width: number; height: number };
            targetDimensions?: { width: number; height: number };
            format?: string;
            quality?: number;
        }
    ) => {
        setImageData({
            processedImageUrl,
            originalImageUrl,
            ...metadata,
        });
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-7xl">
            {/* Header */}
            <div className="text-center mb-8">
                <div className="flex items-center justify-center gap-3 mb-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                        <Scissors className="h-8 w-8 text-primary" />
                    </div>
                    <h1 className="text-4xl font-bold tracking-tight">
                        Image Resize Tool
                    </h1>
                </div>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Resize your images with precision control. Choose from
                    multiple resize methods, adjust quality, and convert between
                    formats.
                </p>
            </div>

            {/* Features Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <Card className="text-center">
                    <CardContent className="pt-6">
                        <div className="flex justify-center mb-3">
                            <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                                <Maximize2 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                            </div>
                        </div>
                        <h3 className="font-semibold mb-2">
                            Multiple Resize Methods
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            Stretch, contain, cover, or crop your images to fit
                            perfectly
                        </p>
                    </CardContent>
                </Card>

                <Card className="text-center">
                    <CardContent className="pt-6">
                        <div className="flex justify-center mb-3">
                            <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                                <Settings className="h-6 w-6 text-green-600 dark:text-green-400" />
                            </div>
                        </div>
                        <h3 className="font-semibold mb-2">Quality Control</h3>
                        <p className="text-sm text-muted-foreground">
                            Adjust compression quality and choose output format
                        </p>
                    </CardContent>
                </Card>

                <Card className="text-center">
                    <CardContent className="pt-6">
                        <div className="flex justify-center mb-3">
                            <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                                <Zap className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                            </div>
                        </div>
                        <h3 className="font-semibold mb-2">
                            Instant Processing
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            Real-time preview and instant download of resized
                            images
                        </p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                {/* Left Column - Resize Form */}
                <div className="space-y-6">
                    <ImageResizeForm
                        onImageProcessed={(
                            processedUrl,
                            originalUrl,
                            metadata
                        ) => {
                            handleImageProcessed(
                                processedUrl,
                                originalUrl,
                                metadata
                            );
                        }}
                    />
                </div>

                {/* Right Column - Image Comparison */}
                <div className="space-y-6">
                    <ImageComparison
                        type="resize"
                        originalImageUrl={imageData?.originalImageUrl}
                        processedImageUrl={imageData?.processedImageUrl}
                        originalDimensions={imageData?.originalDimensions}
                        targetDimensions={imageData?.targetDimensions}
                        format={imageData?.format}
                        quality={imageData?.quality}
                    />
                </div>
            </div>

            {/* Help Section */}
            <Card className="mt-12">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <ImageIcon className="h-5 w-5" />
                        How to Use
                    </CardTitle>
                    <CardDescription>
                        Follow these simple steps to resize your images
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="flex flex-col items-center text-center space-y-3">
                            <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-full">
                                <span className="text-sm font-semibold text-primary">
                                    1
                                </span>
                            </div>
                            <h4 className="font-medium">Upload Image</h4>
                            <p className="text-sm text-muted-foreground">
                                Select an image file from your device (PNG, JPG,
                                WebP)
                            </p>
                        </div>

                        <div className="flex flex-col items-center text-center space-y-3">
                            <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-full">
                                <span className="text-sm font-semibold text-primary">
                                    2
                                </span>
                            </div>
                            <h4 className="font-medium">Set Dimensions</h4>
                            <p className="text-sm text-muted-foreground">
                                Enter target width and height, optionally
                                maintain aspect ratio
                            </p>
                        </div>

                        <div className="flex flex-col items-center text-center space-y-3">
                            <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-full">
                                <span className="text-sm font-semibold text-primary">
                                    3
                                </span>
                            </div>
                            <h4 className="font-medium">Configure Settings</h4>
                            <p className="text-sm text-muted-foreground">
                                Choose resize method, quality, and output format
                            </p>
                        </div>

                        <div className="flex flex-col items-center text-center space-y-3">
                            <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-full">
                                <span className="text-sm font-semibold text-primary">
                                    4
                                </span>
                            </div>
                            <h4 className="font-medium">Download Result</h4>
                            <p className="text-sm text-muted-foreground">
                                Preview the result and download your resized
                                image
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Resize Methods Info */}
            <Card className="mt-8">
                <CardHeader>
                    <CardTitle>Resize Methods Explained</CardTitle>
                    <CardDescription>
                        Understanding different resize methods and when to use
                        them
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <Badge variant="outline" className="mt-1">
                                    Stretch
                                </Badge>
                                <div>
                                    <h4 className="font-medium">
                                        Stretch to Fill
                                    </h4>
                                    <p className="text-sm text-muted-foreground">
                                        Stretches the image to fill the exact
                                        dimensions, may distort aspect ratio.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <Badge variant="outline" className="mt-1">
                                    Contain
                                </Badge>
                                <div>
                                    <h4 className="font-medium">
                                        Contain Within
                                    </h4>
                                    <p className="text-sm text-muted-foreground">
                                        Scales image to fit within dimensions
                                        while maintaining aspect ratio.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <Badge variant="outline" className="mt-1">
                                    Cover
                                </Badge>
                                <div>
                                    <h4 className="font-medium">
                                        Cover Canvas
                                    </h4>
                                    <p className="text-sm text-muted-foreground">
                                        Scales image to cover entire canvas,
                                        crops overflow if needed.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <Badge variant="outline" className="mt-1">
                                    Crop
                                </Badge>
                                <div>
                                    <h4 className="font-medium">Center Crop</h4>
                                    <p className="text-sm text-muted-foreground">
                                        Crops from center to exact dimensions
                                        without scaling.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
