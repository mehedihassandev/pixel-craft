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
        <div className="container mx-auto px-4 py-8 max-w-7xl space-y-12 relative">
            {/* Background Pattern */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute top-0 left-1/4 w-72 h-72 bg-gradient-to-r from-green-300/20 to-emerald-300/20 rounded-full blur-3xl"></div>
                <div className="absolute top-20 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-300/20 to-indigo-300/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-gradient-to-r from-purple-300/20 to-pink-300/20 rounded-full blur-3xl"></div>
            </div>

            {/* Header */}
            <div className="text-center mb-8 relative">
                <div className="flex items-center justify-center gap-3 mb-4">
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-primary to-green-600 rounded-full blur-md opacity-50 animate-pulse"></div>
                        <div className="relative p-4 bg-gradient-to-br from-primary/20 via-green-500/20 to-emerald-500/20 rounded-full border border-primary/30 backdrop-blur-sm">
                            <Scissors className="h-8 w-8 text-primary" />
                        </div>
                    </div>
                    <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-r from-gray-900 via-green-900 to-emerald-900 dark:from-white dark:via-green-300 dark:to-emerald-300 bg-clip-text text-transparent">
                        Image Resize Tool
                    </h1>
                </div>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                    Resize your images with precision control. Choose from
                    multiple resize methods, adjust quality, and convert between
                    formats.
                </p>
            </div>

            {/* Features Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <Card className="text-center hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group border-0 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm shadow-lg hover:shadow-blue-500/25">
                    <CardContent className="pt-8 pb-6">
                        <div className="flex justify-center mb-4">
                            <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-2xl group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-blue-500/25">
                                <Maximize2 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                            </div>
                        </div>
                        <h3 className="font-bold text-lg mb-3 group-hover:text-primary transition-colors">
                            Multiple Resize Methods
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Stretch, contain, cover, or crop your images to fit
                            perfectly
                        </p>
                    </CardContent>
                </Card>

                <Card className="text-center hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group border-0 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm shadow-lg hover:shadow-green-500/25">
                    <CardContent className="pt-8 pb-6">
                        <div className="flex justify-center mb-4">
                            <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-2xl group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-green-500/25">
                                <Settings className="h-6 w-6 text-green-600 dark:text-green-400" />
                            </div>
                        </div>
                        <h3 className="font-bold text-lg mb-3 group-hover:text-primary transition-colors">
                            Quality Control
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Adjust compression quality and choose output format
                        </p>
                    </CardContent>
                </Card>

                <Card className="text-center hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group border-0 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm shadow-lg hover:shadow-purple-500/25">
                    <CardContent className="pt-8 pb-6">
                        <div className="flex justify-center mb-4">
                            <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-2xl group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-purple-500/25">
                                <Zap className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                            </div>
                        </div>
                        <h3 className="font-bold text-lg mb-3 group-hover:text-primary transition-colors">
                            Instant Processing
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
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
            <Card className="mt-12 border-0 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm shadow-2xl">
                <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-2xl">
                        <div className="p-2 bg-gradient-to-br from-primary/20 via-green-500/20 to-emerald-500/20 rounded-xl border border-primary/30">
                            <ImageIcon className="h-5 w-5 text-primary" />
                        </div>
                        How to Use Image Resize Tool
                    </CardTitle>
                    <CardDescription className="text-lg">
                        Follow these simple steps to resize your images
                        perfectly
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="flex flex-col items-center text-center p-4 border border-dashed border-blue-300 rounded-xl hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-all duration-300 group">
                            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                <span className="text-blue-600 font-bold text-sm">
                                    1
                                </span>
                            </div>
                            <h4 className="font-semibold mb-2 text-sm">
                                Upload Image
                            </h4>
                            <p className="text-xs text-muted-foreground">
                                Select an image file from your device (PNG, JPG,
                                WebP, SVG)
                            </p>
                        </div>
                        <div className="flex flex-col items-center text-center p-4 border border-dashed border-green-300 rounded-xl hover:bg-green-50/50 dark:hover:bg-green-900/10 transition-all duration-300 group">
                            <div className="w-10 h-10 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                <span className="text-green-600 font-bold text-sm">
                                    2
                                </span>
                            </div>
                            <h4 className="font-semibold mb-2 text-sm">
                                Set Dimensions & Method
                            </h4>
                            <p className="text-xs text-muted-foreground">
                                Choose target dimensions and resize method
                                (stretch, contain, cover, crop)
                            </p>
                        </div>
                        <div className="flex flex-col items-center text-center p-4 border border-dashed border-purple-300 rounded-xl hover:bg-purple-50/50 dark:hover:bg-purple-900/10 transition-all duration-300 group">
                            <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                <span className="text-purple-600 font-bold text-sm">
                                    3
                                </span>
                            </div>
                            <h4 className="font-semibold mb-2 text-sm">
                                Adjust Quality & Format
                            </h4>
                            <p className="text-xs text-muted-foreground">
                                Set compression quality and choose output format
                                for optimal results
                            </p>
                        </div>
                        <div className="flex flex-col items-center text-center p-4 border border-dashed border-orange-300 rounded-xl hover:bg-orange-50/50 dark:hover:bg-orange-900/10 transition-all duration-300 group">
                            <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                <span className="text-orange-600 font-bold text-sm">
                                    4
                                </span>
                            </div>
                            <h4 className="font-semibold mb-2 text-sm">
                                Preview & Download
                            </h4>
                            <p className="text-xs text-muted-foreground">
                                Compare original and resized images, then
                                download your result
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Resize Methods Info */}
            <Card className="mt-8 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm shadow-lg">
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
