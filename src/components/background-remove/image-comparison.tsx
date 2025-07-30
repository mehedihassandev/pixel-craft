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
} from "lucide-react";

interface ImageComparisonProps {
    originalImageUrl: string;
    processedImageUrl: string;
    metadata?: {
        format?: string;
        quality?: number;
    };
    onReset?: () => void;
}

export const ImageComparison: React.FC<ImageComparisonProps> = ({
    originalImageUrl,
    processedImageUrl,
    metadata,
    onReset,
}) => {
    const [showComparison, setShowComparison] = useState(true);
    const [comparisonPosition, setComparisonPosition] = useState(50);
    const [activeView, setActiveView] = useState<
        "original" | "processed" | "comparison"
    >("comparison");
    const { toast } = useToast();

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

    return (
        <div className="w-full max-w-4xl mx-auto space-y-6">
            {/* Controls */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <ArrowLeftRight className="h-6 w-6" />
                        Background Removal Results
                    </CardTitle>
                    <CardDescription>
                        Compare your original image with the background-removed
                        version. Use the slider to see the difference.
                    </CardDescription>
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
                            Background Removed
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

                    {/* Metadata */}
                    {metadata && (
                        <div className="flex flex-wrap gap-2">
                            {metadata.format && (
                                <Badge variant="secondary">
                                    Format: {metadata.format.toUpperCase()}
                                </Badge>
                            )}
                            {metadata.quality && metadata.format !== "png" && (
                                <Badge variant="secondary">
                                    Quality: {metadata.quality}%
                                </Badge>
                            )}
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Button
                            onClick={() =>
                                handleDownload(
                                    processedImageUrl,
                                    `background-removed.${
                                        metadata?.format || "png"
                                    }`
                                )
                            }
                            className="flex-1"
                        >
                            <Download className="h-4 w-4 mr-2" />
                            Download Processed Image
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() =>
                                handleDownload(originalImageUrl, "original.png")
                            }
                            className="flex-1"
                        >
                            <Download className="h-4 w-4 mr-2" />
                            Download Original
                        </Button>
                        {onReset && (
                            <Button variant="outline" onClick={onReset}>
                                <RotateCcw className="h-4 w-4 mr-2" />
                                Process New Image
                            </Button>
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
                        {activeView === "original" && (
                            <img
                                src={originalImageUrl}
                                alt="Original"
                                className="relative z-10 max-w-full h-auto max-h-96 mx-auto object-contain"
                            />
                        )}

                        {activeView === "processed" && (
                            <img
                                src={processedImageUrl}
                                alt="Background Removed"
                                className="relative z-10 max-w-full h-auto max-h-96 mx-auto object-contain"
                            />
                        )}

                        {/* Split Comparison View */}
                        {activeView === "comparison" && (
                            <div className="relative max-w-full h-auto max-h-96 mx-auto">
                                {/* Base image (processed) */}
                                <img
                                    src={processedImageUrl}
                                    alt="Background Removed"
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
                        {activeView === "comparison" && (
                            <>
                                <div className="absolute top-2 left-2 z-40">
                                    <Badge variant="secondary">Original</Badge>
                                </div>
                                <div className="absolute top-2 right-2 z-40">
                                    <Badge variant="secondary">
                                        Background Removed
                                    </Badge>
                                </div>
                            </>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};
