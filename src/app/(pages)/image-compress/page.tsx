"use client";

import { useState } from "react";
import { ImageCompressionForm } from '@/components/image-compress/image-compression-form';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Archive } from "lucide-react";
import {
    compressionFeatures,
    compressionUseCases,
    compressionTechnicalSpecs,
    compressionHeaderBadges,
    compressionTips,
    compressionPerformanceFeatures,
} from "@/constants/image-compress";

export default function ImageCompressPage() {
    return (
        <div className="container mx-auto px-4 py-8 space-y-12 max-w-7xl relative">
            {/* Background Pattern */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute top-0 left-1/4 w-72 h-72 bg-gradient-to-r from-orange-300/20 to-red-300/20 rounded-full blur-3xl"></div>
                <div className="absolute top-20 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-300/20 to-pink-300/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-gradient-to-r from-blue-300/20 to-cyan-300/20 rounded-full blur-3xl"></div>
            </div>

            {/* Header */}
            <div className="text-center space-y-4 relative">
                <div className="flex justify-center items-center gap-3 mb-4">
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-600 rounded-full blur-md opacity-50 animate-pulse"></div>
                        <div className="relative p-4 bg-gradient-to-br from-orange-500/20 via-red-500/20 to-purple-500/20 rounded-full border border-orange-500/30 backdrop-blur-sm">
                            <Archive className="h-8 w-8 text-orange-600" />
                        </div>
                    </div>
                    <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-r from-gray-900 via-orange-900 to-red-900 dark:from-white dark:via-orange-300 dark:to-red-300 bg-clip-text text-transparent">
                        Image Compression
                    </h1>
                </div>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                    Reduce your image file sizes without compromising quality. Advanced compression
                    algorithms with support for multiple formats, batch processing, and real-time preview.
                </p>
                <div className="flex justify-center gap-3 flex-wrap mt-6">
                    {compressionHeaderBadges.map((badge) => {
                        const IconComponent = badge.icon;
                        return (
                            <Badge
                                key={badge.label}
                                variant="secondary"
                                className="flex items-center gap-2 hover:bg-orange-100 dark:hover:bg-orange-900/20 transition-all duration-300 hover:scale-105 px-4 py-2 text-sm"
                            >
                                <div className="p-1 bg-orange-100 dark:bg-orange-900/20 rounded-full">
                                    <IconComponent className="h-3 w-3 text-orange-600" />
                                </div>
                                {badge.label}
                            </Badge>
                        );
                    })}
                </div>
            </div>

            {/* Features Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <Card className="text-center hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group border-0 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm shadow-lg hover:shadow-orange-500/25">
                    <CardContent className="pt-8 pb-6">
                        <div className="flex justify-center mb-4">
                            <div className="p-3 bg-orange-100 dark:bg-orange-900/20 rounded-2xl group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-orange-500/25">
                                <Archive className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                            </div>
                        </div>
                        <h3 className="font-bold text-lg mb-3 group-hover:text-primary transition-colors">
                            Fast Compression
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Lightning-fast compression with Web Worker support for optimal performance
                        </p>
                    </CardContent>
                </Card>

                <Card className="text-center hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group border-0 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm shadow-lg hover:shadow-green-500/25">
                    <CardContent className="pt-8 pb-6">
                        <div className="flex justify-center mb-4">
                            <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-2xl group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-green-500/25">
                                <Archive className="h-5 w-5 text-green-600 dark:text-green-400" />
                            </div>
                        </div>
                        <h3 className="font-bold text-lg mb-3 group-hover:text-primary transition-colors">
                            Batch Processing
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Process multiple images at once with bulk download options
                        </p>
                    </CardContent>
                </Card>

                <Card className="text-center hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group border-0 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm shadow-lg hover:shadow-purple-500/25">
                    <CardContent className="pt-8 pb-6">
                        <div className="flex justify-center mb-4">
                            <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-2xl group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-purple-500/25">
                                <Archive className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                            </div>
                        </div>
                        <h3 className="font-bold text-lg mb-3 group-hover:text-primary transition-colors">
                            Quality Preserved
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Maintain visual quality while reducing file size by up to 80%
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Main Content */}
            <div className="relative space-y-12">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 via-red-500/5 to-purple-500/5 rounded-3xl blur-xl"></div>
                <div className="relative space-y-12">
                    {/* Compression Form Section */}
                    <div className="space-y-6">
                        <div className="text-center">
                            <h2 className="text-3xl font-bold mb-2">
                                Compress Your Images
                            </h2>
                            <p className="text-muted-foreground">
                                Upload images and compress them with advanced algorithms while preserving quality
                            </p>
                        </div>
                        <ImageCompressionForm />
                    </div>

                    {/* How to Use Section */}
                    <Card className="mb-8 border-0 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm shadow-2xl">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-3 text-2xl">
                                <div className="p-2 bg-gradient-to-br from-orange-500/20 via-red-500/20 to-purple-500/20 rounded-xl border border-orange-500/30">
                                    <Archive className="h-5 w-5 text-orange-600" />
                                </div>
                                How to Use Image Compression
                            </CardTitle>
                            <CardDescription className="text-lg">
                                Follow these simple steps to compress your images efficiently
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                <div className="flex flex-col items-center text-center p-4 border border-dashed border-orange-300 rounded-xl hover:bg-orange-50/50 dark:hover:bg-orange-900/10 transition-all duration-300 group">
                                    <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                        <span className="text-orange-600 font-bold text-sm">1</span>
                                    </div>
                                    <h4 className="font-semibold mb-2 text-sm">Upload Images</h4>
                                    <p className="text-xs text-muted-foreground">
                                        Select or drag & drop your image files (JPG, PNG, WebP)
                                    </p>
                                </div>
                                <div className="flex flex-col items-center text-center p-4 border border-dashed border-green-300 rounded-xl hover:bg-green-50/50 dark:hover:bg-green-900/10 transition-all duration-300 group">
                                    <div className="w-10 h-10 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                        <span className="text-green-600 font-bold text-sm">2</span>
                                    </div>
                                    <h4 className="font-semibold mb-2 text-sm">Adjust Settings</h4>
                                    <p className="text-xs text-muted-foreground">
                                        Configure quality, size limits, and output format preferences
                                    </p>
                                </div>
                                <div className="flex flex-col items-center text-center p-4 border border-dashed border-purple-300 rounded-xl hover:bg-purple-50/50 dark:hover:bg-purple-900/10 transition-all duration-300 group">
                                    <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                        <span className="text-purple-600 font-bold text-sm">3</span>
                                    </div>
                                    <h4 className="font-semibold mb-2 text-sm">Process Images</h4>
                                    <p className="text-xs text-muted-foreground">
                                        Watch real-time compression with progress tracking
                                    </p>
                                </div>
                                <div className="flex flex-col items-center text-center p-4 border border-dashed border-blue-300 rounded-xl hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-all duration-300 group">
                                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                        <span className="text-blue-600 font-bold text-sm">4</span>
                                    </div>
                                    <h4 className="font-semibold mb-2 text-sm">Download Results</h4>
                                    <p className="text-xs text-muted-foreground">
                                        Download individual files or bulk ZIP archive
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Features Section */}
            <Card className="border-0 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm shadow-2xl">
                <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-2xl">
                        <div className="p-2 bg-gradient-to-br from-orange-500/20 via-red-500/20 to-purple-500/20 rounded-xl border border-orange-500/30">
                            <Archive className="h-5 w-5 text-orange-600" />
                        </div>
                        Compression Features
                    </CardTitle>
                    <CardDescription className="text-lg">
                        Advanced image compression capabilities designed for modern workflows
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {compressionFeatures.map((feature, index) => {
                            const IconComponent = feature.icon;
                            return (
                                <div
                                    key={index}
                                    className="flex items-start gap-4 p-4 rounded-xl hover:bg-orange-50/50 dark:hover:bg-orange-900/10 transition-all duration-300 group"
                                >
                                    <div className="p-2 bg-orange-100 dark:bg-orange-900/20 rounded-lg group-hover:scale-110 transition-transform">
                                        <IconComponent className="h-5 w-5 text-orange-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                                            {feature.title}
                                        </h3>
                                        <p className="text-sm text-muted-foreground leading-relaxed">
                                            {feature.description}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </CardContent>
            </Card>

            {/* Use Cases */}
            <Card className="border-0 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm shadow-2xl">
                <CardHeader>
                    <CardTitle className="text-2xl">Perfect For</CardTitle>
                    <CardDescription className="text-lg">
                        Common use cases where image compression makes a difference
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {compressionUseCases.map((useCase, index) => {
                            const IconComponent = useCase.icon;
                            return (
                                <div
                                    key={index}
                                    className="flex items-start gap-4 p-4 rounded-xl hover:bg-gradient-to-r hover:from-orange-50/50 hover:to-red-50/50 dark:hover:from-orange-900/10 dark:hover:to-red-900/10 transition-all duration-300 group"
                                >
                                    <div className="p-2 bg-gradient-to-br from-orange-100 to-red-100 dark:from-orange-900/20 dark:to-red-900/20 rounded-lg group-hover:scale-110 transition-transform">
                                        <IconComponent className="h-5 w-5 text-orange-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                                            {useCase.title}
                                        </h3>
                                        <p className="text-sm text-muted-foreground leading-relaxed">
                                            {useCase.description}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </CardContent>
            </Card>

            {/* Technical Specifications */}
            <Card className="border-0 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm shadow-2xl">
                <CardHeader>
                    <CardTitle className="text-2xl">Technical Specifications</CardTitle>
                    <CardDescription className="text-lg">
                        Detailed capabilities and supported formats
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {compressionTechnicalSpecs.map((spec, index) => (
                            <div key={index}>
                                <h3 className="font-semibold mb-4 text-orange-600 dark:text-orange-400">
                                    {spec.category}
                                </h3>
                                <ul className="space-y-2">
                                    {spec.specs.map((item, itemIndex) => (
                                        <li
                                            key={itemIndex}
                                            className="text-sm text-muted-foreground flex items-start gap-2"
                                        >
                                            <span className="text-orange-500 mt-1">•</span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Tips */}
            <Card className="border-0 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm shadow-2xl">
                <CardHeader>
                    <CardTitle className="text-2xl">Optimization Tips</CardTitle>
                    <CardDescription className="text-lg">
                        Get the best results from your image compression workflow
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {compressionTips.map((tipCategory, index) => (
                            <div key={index}>
                                <h3 className="font-semibold mb-4 text-orange-600 dark:text-orange-400">
                                    {tipCategory.category}
                                </h3>
                                <ul className="space-y-3">
                                    {tipCategory.tips.map((tip, tipIndex) => (
                                        <li
                                            key={tipIndex}
                                            className="text-sm text-muted-foreground flex items-start gap-3 hover:text-foreground transition-colors"
                                        >
                                            <span className="text-orange-500 mt-1 text-xs">▶</span>
                                            {tip}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}