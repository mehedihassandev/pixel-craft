"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Download,
    Copy,
    ExternalLink,
    ImageIcon,
    Eye,
    Maximize2,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ImageComparisonProps {
    originalImageUrl?: string;
    processedImageUrl?: string;
    originalDimensions?: { width: number; height: number };
    targetDimensions?: { width: number; height: number };
    format?: string;
    quality?: number;
}

export const ImageComparison: React.FC<ImageComparisonProps> = ({
    originalImageUrl,
    processedImageUrl,
    originalDimensions,
    targetDimensions,
    format,
    quality,
}) => {
    const { toast } = useToast();

    const copyUrlToClipboard = async (
        url: string,
        type: "original" | "processed"
    ) => {
        try {
            await navigator.clipboard.writeText(url);
            toast({
                title: "URL Copied",
                description: `${
                    type === "original" ? "Original" : "Processed"
                } image URL copied to clipboard.`,
            });
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Copy Failed",
                description: "Failed to copy URL to clipboard.",
            });
        }
    };

    const openInNewTab = (url: string) => {
        window.open(url, "_blank");
    };

    const downloadImage = async (url: string, filename: string) => {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error("Network response was not ok.");

            const blob = await response.blob();
            const downloadUrl = URL.createObjectURL(blob);

            const a = document.createElement("a");
            a.href = downloadUrl;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);

            URL.revokeObjectURL(downloadUrl);

            toast({
                title: "Download Started",
                description: `${filename} is being downloaded.`,
            });
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Download Failed",
                description: "Failed to download the image.",
            });
        }
    };

    const formatFileSize = (bytes: number): string => {
        if (bytes === 0) return "0 Bytes";
        const k = 1024;
        const sizes = ["Bytes", "KB", "MB", "GB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
    };

    const calculateCompressionRatio = (): string => {
        if (!originalDimensions || !targetDimensions) return "N/A";

        const originalPixels =
            originalDimensions.width * originalDimensions.height;
        const targetPixels = targetDimensions.width * targetDimensions.height;
        const ratio = (targetPixels / originalPixels) * 100;

        return `${ratio.toFixed(1)}%`;
    };

    if (!originalImageUrl && !processedImageUrl) {
        return (
            <Card className="w-full">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Eye className="h-5 w-5" />
                        Image Preview
                    </CardTitle>
                    <CardDescription>
                        Upload an image to see the comparison between original
                        and resized versions.
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center min-h-[300px] text-muted-foreground">
                    <ImageIcon className="h-16 w-16 mb-4" />
                    <p>No images to display</p>
                </CardContent>
            </Card>
        );
    }

    return (
        <div className="space-y-6">
            {/* Image Statistics */}
            {originalDimensions && targetDimensions && (
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Maximize2 className="h-5 w-5" />
                            Resize Statistics
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="text-center p-3 bg-muted rounded-lg">
                                <div className="text-sm text-muted-foreground">
                                    Original Size
                                </div>
                                <div className="font-semibold">
                                    {originalDimensions.width}×
                                    {originalDimensions.height}
                                </div>
                            </div>
                            <div className="text-center p-3 bg-muted rounded-lg">
                                <div className="text-sm text-muted-foreground">
                                    Target Size
                                </div>
                                <div className="font-semibold">
                                    {targetDimensions.width}×
                                    {targetDimensions.height}
                                </div>
                            </div>
                            <div className="text-center p-3 bg-muted rounded-lg">
                                <div className="text-sm text-muted-foreground">
                                    Compression
                                </div>
                                <div className="font-semibold">
                                    {calculateCompressionRatio()}
                                </div>
                            </div>
                            <div className="text-center p-3 bg-muted rounded-lg">
                                <div className="text-sm text-muted-foreground">
                                    Quality
                                </div>
                                <div className="font-semibold">{quality}%</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Image Comparison */}
            <div className="flex flex-col gap-6">
                {/* Original Image */}
                {originalImageUrl && (
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center justify-between">
                                <span>Original Image</span>
                                <Badge variant="outline">Original</Badge>
                            </CardTitle>
                            {originalDimensions && (
                                <CardDescription>
                                    {originalDimensions.width}×
                                    {originalDimensions.height} pixels
                                </CardDescription>
                            )}
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="relative bg-checkerboard rounded-lg overflow-hidden">
                                <Image
                                    src={originalImageUrl}
                                    alt="Original image"
                                    width={400}
                                    height={300}
                                    className="w-full h-auto object-contain max-h-[300px]"
                                    unoptimized
                                />
                            </div>
                            <div className="flex gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() =>
                                        copyUrlToClipboard(
                                            originalImageUrl,
                                            "original"
                                        )
                                    }
                                >
                                    <Copy className="h-4 w-4 mr-1" />
                                    Copy URL
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() =>
                                        openInNewTab(originalImageUrl)
                                    }
                                >
                                    <ExternalLink className="h-4 w-4 mr-1" />
                                    Open
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() =>
                                        downloadImage(
                                            originalImageUrl,
                                            "original-image.png"
                                        )
                                    }
                                >
                                    <Download className="h-4 w-4 mr-1" />
                                    Download
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Processed Image */}
                {processedImageUrl && (
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center justify-between">
                                <span>Resized Image</span>
                                <Badge variant="default">Processed</Badge>
                            </CardTitle>
                            {targetDimensions && (
                                <CardDescription>
                                    {targetDimensions.width}×
                                    {targetDimensions.height} pixels •{" "}
                                    {format?.toUpperCase()} • {quality}% quality
                                </CardDescription>
                            )}
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="relative bg-checkerboard rounded-lg overflow-hidden">
                                <Image
                                    src={processedImageUrl}
                                    alt="Resized image"
                                    width={400}
                                    height={300}
                                    className="w-full h-auto object-contain max-h-[300px]"
                                    unoptimized
                                />
                            </div>
                            <div className="flex gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() =>
                                        copyUrlToClipboard(
                                            processedImageUrl,
                                            "processed"
                                        )
                                    }
                                >
                                    <Copy className="h-4 w-4 mr-1" />
                                    Copy URL
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() =>
                                        openInNewTab(processedImageUrl)
                                    }
                                >
                                    <ExternalLink className="h-4 w-4 mr-1" />
                                    Open
                                </Button>
                                <Button
                                    size="sm"
                                    onClick={() =>
                                        downloadImage(
                                            processedImageUrl,
                                            `resized-${targetDimensions?.width}x${targetDimensions?.height}.${format}`
                                        )
                                    }
                                >
                                    <Download className="h-4 w-4 mr-1" />
                                    Download
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
};

export default ImageComparison;
