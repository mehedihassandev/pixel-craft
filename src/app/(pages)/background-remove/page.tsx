"use client";

import React, { useState } from "react";
import { BackgroundRemovalForm } from "@/components/background-remove/background-removal-form";
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
    Layers,
    Settings,
    Download,
} from "lucide-react";

interface IProcessedImageData {
    processedImageUrl: string;
    originalImageUrl: string;
    format?: string;
    quality?: number;
}

export default function BackgroundRemovePage() {
    const [imageData, setImageData] = useState<IProcessedImageData | null>(
        null
    );

    const handleImageProcessed = (
        processedImageUrl: string,
        originalImageUrl: string,
        metadata?: {
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

    const handleReset = () => {
        setImageData(null);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
            <div className="container mx-auto px-4 py-8 max-w-7xl">
                {/* Hero Section */}
                <div className="text-center mb-12">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full">
                            <Scissors className="h-8 w-8 text-white" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            Background Remover
                        </h1>
                    </div>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-6">
                        Remove backgrounds from your images instantly with
                        AI-powered technology. Perfect for product photos,
                        portraits, and creative projects.
                    </p>

                    {/* Feature badges */}
                    <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
                        <Badge variant="secondary" className="gap-1">
                            <Zap className="h-3 w-3" />
                            AI-Powered
                        </Badge>
                        <Badge variant="secondary" className="gap-1">
                            <ImageIcon className="h-3 w-3" />
                            High Quality
                        </Badge>
                        <Badge variant="secondary" className="gap-1">
                            <Layers className="h-3 w-3" />
                            Transparent Background
                        </Badge>
                        <Badge variant="secondary" className="gap-1">
                            <Download className="h-3 w-3" />
                            Multiple Formats
                        </Badge>
                    </div>
                </div>

                {/* Features Overview */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <Card className="text-center">
                        <CardHeader>
                            <div className="mx-auto w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-2">
                                <Zap className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                            </div>
                            <CardTitle className="text-lg">
                                Instant Processing
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription>
                                Advanced AI algorithms remove backgrounds
                                automatically in seconds
                            </CardDescription>
                        </CardContent>
                    </Card>

                    <Card className="text-center">
                        <CardHeader>
                            <div className="mx-auto w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mb-2">
                                <Settings className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                            </div>
                            <CardTitle className="text-lg">
                                Customizable Output
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription>
                                Choose from PNG, JPG, or WebP formats with
                                adjustable quality
                            </CardDescription>
                        </CardContent>
                    </Card>

                    <Card className="text-center">
                        <CardHeader>
                            <div className="mx-auto w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-2">
                                <ImageIcon className="h-6 w-6 text-green-600 dark:text-green-400" />
                            </div>
                            <CardTitle className="text-lg">
                                High Precision
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription>
                                Professional-grade results with clean edges and
                                preserved details
                            </CardDescription>
                        </CardContent>
                    </Card>
                </div>

                {/* Main Content */}
                <div className="space-y-8">
                    {!imageData ? (
                        <BackgroundRemovalForm
                            onImageProcessed={handleImageProcessed}
                        />
                    ) : (
                        <ImageComparison
                            type="background-remove"
                            originalImageUrl={imageData.originalImageUrl}
                            processedImageUrl={imageData.processedImageUrl}
                            metadata={{
                                format: imageData.format,
                                quality: imageData.quality,
                            }}
                            onReset={handleReset}
                        />
                    )}
                </div>

                {/* How it works section */}
                <div className="mt-16">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-center text-2xl">
                                How It Works
                            </CardTitle>
                            <CardDescription className="text-center">
                                Remove backgrounds from your images in three
                                simple steps
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                <div className="text-center">
                                    <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                            1
                                        </span>
                                    </div>
                                    <h3 className="font-semibold mb-2">
                                        Upload Your Image
                                    </h3>
                                    <p className="text-muted-foreground text-sm">
                                        Select an image from your device.
                                        Supports JPG, PNG, and WebP formats up
                                        to 10MB.
                                    </p>
                                </div>
                                <div className="text-center">
                                    <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                                            2
                                        </span>
                                    </div>
                                    <h3 className="font-semibold mb-2">
                                        AI Processing
                                    </h3>
                                    <p className="text-muted-foreground text-sm">
                                        Our advanced AI automatically detects
                                        and removes the background with
                                        precision.
                                    </p>
                                </div>
                                <div className="text-center">
                                    <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                                            3
                                        </span>
                                    </div>
                                    <h3 className="font-semibold mb-2">
                                        Download Result
                                    </h3>
                                    <p className="text-muted-foreground text-sm">
                                        Download your processed image with
                                        transparent background in your preferred
                                        format.
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
