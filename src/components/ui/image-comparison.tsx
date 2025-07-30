"use client";

import React, { useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";
import {
    Download,
    RotateCcw,
    Eye,
    EyeOff,
    Layers,
    ArrowLeftRight,
    Copy,
    ExternalLink,
    Maximize2,
} from "lucide-react";

interface ImageComparisonProps {
    originalImageUrl?: string;
    processedImageUrl?: string;
    // For background removal
    metadata?: {
        format?: string;
        quality?: number;
    };
    // For resize functionality
    originalDimensions?: { width: number; height: number };
    targetDimensions?: { width: number; height: number };
    // Common props
    type: "background-remove" | "resize";
    onReset?: () => void;
    format?: string;
    quality?: number;
}

export const ImageComparison: React.FC<ImageComparisonProps> = ({
    originalImageUrl,
    processedImageUrl,
    metadata,
    originalDimensions,
    targetDimensions,
    type,
    onReset,
    format,
    quality,
}) => {
    const [comparisonPosition, setComparisonPosition] = useState(50);
    const [activeView, setActiveView] = useState<
        "original" | "processed" | "comparison"
    >("comparison");
    const { toast } = useToast();

    // Get the format and quality from either metadata or direct props
    const imageFormat = metadata?.format || format;
    const imageQuality = metadata?.quality || quality;

    const handleDownload = (imageUrl: string, filename: string) => {
        const link = document.createElement("a");
        link.href = imageUrl;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        toast({
            title: "Download started",
            description: `Downloading ${filename}`,
        });
    };

    const copyUrlToClipboard = async (
        url: string,
        imageType: "original" | "processed"
    ) => {
        try {
            await navigator.clipboard.writeText(url);
            toast({
                title: "URL Copied",
                description: `${
                    imageType === "original" ? "Original" : "Processed"
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

    const getTitle = () => {
        switch (type) {
            case "background-remove":
                return "Background Removal Results";
            case "resize":
                return "Image Resize Results";
            default:
                return "Image Processing Results";
        }
    };

    const getDescription = () => {
        switch (type) {
            case "background-remove":
                return "Compare your original image with the background-removed version. Use the slider to see the difference.";
            case "resize":
                return "Compare your original image with the resized version. View both images side by side or use the split comparison.";
            default:
                return "Compare your original and processed images.";
        }
    };

    const getProcessedLabel = () => {
        switch (type) {
            case "background-remove":
                return "Background Removed";
            case "resize":
                return "Resized";
            default:
                return "Processed";
        }
    };

    const calculateCompressionRatio = (): string => {
        if (!originalDimensions || !targetDimensions) return "N/A";

        const originalPixels =
            originalDimensions.width * originalDimensions.height;
        const targetPixels = targetDimensions.width * targetDimensions.height;
        const ratio = (targetPixels / originalPixels) * 100;

        return `${ratio.toFixed(1)}%`;
    };

    // Don't render if no images are provided
    if (!originalImageUrl && !processedImageUrl) {
        return null;
    }

    return (
        <div className="w-full max-w-4xl mx-auto space-y-6">
            {/* Controls */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <ArrowLeftRight className="h-6 w-6" />
                        {getTitle()}
                    </CardTitle>
                    <CardDescription>{getDescription()}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {/* View Toggle Buttons */}
                    <div className="flex flex-wrap gap-2">
                        <Button
                            variant={
                                activeView === "original"
                                    ? "default"
                                    : "outline"
                            }
                            size="sm"
                            onClick={() => setActiveView("original")}
                        >
                            <Eye className="h-4 w-4 mr-2" />
                            Original
                        </Button>
                        <Button
                            variant={
                                activeView === "processed"
                                    ? "default"
                                    : "outline"
                            }
                            size="sm"
                            onClick={() => setActiveView("processed")}
                        >
                            <Layers className="h-4 w-4 mr-2" />
                            {getProcessedLabel()}
                        </Button>
                        <Button
                            variant={
                                activeView === "comparison"
                                    ? "default"
                                    : "outline"
                            }
                            size="sm"
                            onClick={() => setActiveView("comparison")}
                        >
                            <ArrowLeftRight className="h-4 w-4 mr-2" />
                            Split Comparison
                        </Button>
                    </div>

                    {/* Comparison Slider (only show in comparison mode) */}
                    {activeView === "comparison" && (
                        <div className="space-y-2">
                            <label className="text-sm font-medium">
                                Comparison Position: {comparisonPosition}%
                            </label>
                            <Slider
                                value={[comparisonPosition]}
                                onValueChange={(value) =>
                                    setComparisonPosition(value[0])
                                }
                                max={100}
                                min={0}
                                step={1}
                                className="w-full"
                            />
                        </div>
                    )}

                    {/* Resize Statistics (only for resize type) */}
                    {type === "resize" &&
                        originalDimensions &&
                        targetDimensions && (
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
                                    <div className="font-semibold">
                                        {imageQuality}%
                                    </div>
                                </div>
                            </div>
                        )}

                    {/* Metadata */}
                    {imageFormat && (
                        <div className="flex flex-wrap gap-2">
                            <Badge variant="secondary">
                                Format: {imageFormat.toUpperCase()}
                            </Badge>
                            {imageQuality && imageFormat !== "png" && (
                                <Badge variant="secondary">
                                    Quality: {imageQuality}%
                                </Badge>
                            )}
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        {processedImageUrl && (
                            <Button
                                onClick={() => {
                                    const filename =
                                        type === "background-remove"
                                            ? `background-removed.${
                                                  imageFormat || "png"
                                              }`
                                            : `resized-${targetDimensions?.width}x${targetDimensions?.height}.${imageFormat}`;
                                    handleDownload(processedImageUrl, filename);
                                }}
                                className="flex-1"
                            >
                                <Download className="h-4 w-4 mr-2" />
                                Download Processed Image
                            </Button>
                        )}
                        {originalImageUrl && (
                            <Button
                                variant="outline"
                                onClick={() =>
                                    handleDownload(
                                        originalImageUrl,
                                        "original.png"
                                    )
                                }
                                className="flex-1"
                            >
                                <Download className="h-4 w-4 mr-2" />
                                Download Original
                            </Button>
                        )}
                        {onReset && (
                            <Button variant="outline" onClick={onReset}>
                                <RotateCcw className="h-4 w-4 mr-2" />
                                Process New Image
                            </Button>
                        )}
                    </div>

                    {/* Additional Action Buttons */}
                    <div className="flex flex-wrap gap-2">
                        {originalImageUrl && (
                            <>
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
                                    Copy Original URL
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() =>
                                        openInNewTab(originalImageUrl)
                                    }
                                >
                                    <ExternalLink className="h-4 w-4 mr-1" />
                                    Open Original
                                </Button>
                            </>
                        )}
                        {processedImageUrl && (
                            <>
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
                                    Copy Processed URL
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() =>
                                        openInNewTab(processedImageUrl)
                                    }
                                >
                                    <ExternalLink className="h-4 w-4 mr-1" />
                                    Open Processed
                                </Button>
                            </>
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* Image Display */}
            <Card>
                <CardContent className="p-6">
                    <div className="relative rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-900">
                        {/* Checkerboard pattern for transparency preview */}
                        <div
                            className="absolute inset-0"
                            style={{
                                backgroundImage: `url("data:image/svg+xml,%3csvg width='20' height='20' xmlns='http://www.w3.org/2000/svg'%3e%3cg fill='%23e5e7eb' fill-opacity='0.5'%3e%3cpath d='M0 0h10v10H0zM10 10h10v10H10z'/%3e%3c/g%3e%3c/svg%3e")`,
                                backgroundSize: "20px 20px",
                            }}
                        />

                        {/* Single Image View */}
                        {activeView === "original" && originalImageUrl && (
                            <img
                                src={originalImageUrl}
                                alt="Original"
                                className="relative z-10 max-w-full h-auto max-h-96 mx-auto object-contain"
                            />
                        )}

                        {activeView === "processed" && processedImageUrl && (
                            <img
                                src={processedImageUrl}
                                alt={getProcessedLabel()}
                                className="relative z-10 max-w-full h-auto max-h-96 mx-auto object-contain"
                            />
                        )}

                        {/* Split Comparison View */}
                        {activeView === "comparison" &&
                            originalImageUrl &&
                            processedImageUrl && (
                                <div className="relative max-w-full h-auto max-h-96 mx-auto">
                                    {/* Base image (processed) */}
                                    <img
                                        src={processedImageUrl}
                                        alt={getProcessedLabel()}
                                        className="relative z-10 max-w-full h-auto mx-auto object-contain"
                                    />

                                    {/* Overlay image (original) with clip-path */}
                                    <img
                                        src={originalImageUrl}
                                        alt="Original"
                                        className="absolute top-0 left-0 z-20 max-w-full h-auto mx-auto object-contain"
                                        style={{
                                            clipPath: `inset(0 ${
                                                100 - comparisonPosition
                                            }% 0 0)`,
                                        }}
                                    />

                                    {/* Divider line */}
                                    <div
                                        className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg z-30"
                                        style={{
                                            left: `${comparisonPosition}%`,
                                            transform: "translateX(-50%)",
                                        }}
                                    >
                                        {/* Drag handle */}
                                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg border-2 border-gray-300 flex items-center justify-center">
                                            <div className="w-1 h-4 bg-gray-400 rounded"></div>
                                            <div className="w-1 h-4 bg-gray-400 rounded ml-1"></div>
                                        </div>
                                    </div>
                                </div>
                            )}

                        {/* Labels for comparison mode */}
                        {activeView === "comparison" &&
                            originalImageUrl &&
                            processedImageUrl && (
                                <>
                                    <div className="absolute top-2 left-2 z-40">
                                        <Badge variant="secondary">
                                            Original
                                        </Badge>
                                    </div>
                                    <div className="absolute top-2 right-2 z-40">
                                        <Badge variant="secondary">
                                            {getProcessedLabel()}
                                        </Badge>
                                    </div>
                                </>
                            )}

                        {/* Show message when no images */}
                        {!originalImageUrl && !processedImageUrl && (
                            <div className="flex flex-col items-center justify-center min-h-[200px] text-muted-foreground">
                                <Eye className="h-16 w-16 mb-4" />
                                <p>No images to display</p>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default ImageComparison;
