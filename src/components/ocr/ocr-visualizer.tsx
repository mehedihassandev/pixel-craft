"use client";

import { useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Download, Palette } from "lucide-react";

interface Word {
    text: string;
    confidence: number;
    bbox: { x0: number; y0: number; x1: number; y1: number };
}

interface Block {
    text: string;
    confidence: number;
    bbox: { x0: number; y0: number; x1: number; y1: number };
}

interface OcrVisualizerProps {
    imageUrl: string;
    words?: Word[];
    blocks?: Block[];
    confidence: number;
}

export const OcrVisualizer = ({
    imageUrl,
    words,
    blocks,
    confidence,
}: OcrVisualizerProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);
    const [showWords, setShowWords] = useState(true);
    const [showBlocks, setShowBlocks] = useState(false);
    const [confidenceThreshold, setConfidenceThreshold] = useState(confidence);
    const [highlightColor, setHighlightColor] = useState("#3b82f6");
    const [imageLoaded, setImageLoaded] = useState(false);
    const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });

    useEffect(() => {
        if (imageLoaded && canvasRef.current && imageRef.current) {
            drawCanvas();
        }
    }, [
        imageLoaded,
        showWords,
        showBlocks,
        confidenceThreshold,
        highlightColor,
        words,
        blocks,
    ]);

    const handleImageLoad = () => {
        if (imageRef.current && canvasRef.current) {
            const img = imageRef.current;
            const canvas = canvasRef.current;

            // Calculate display size while maintaining aspect ratio
            const maxWidth = 800;
            const maxHeight = 600;
            let { width, height } = img;

            if (width > maxWidth) {
                height = (height * maxWidth) / width;
                width = maxWidth;
            }

            if (height > maxHeight) {
                width = (width * maxHeight) / height;
                height = maxHeight;
            }

            canvas.width = width;
            canvas.height = height;
            setCanvasSize({ width, height });
            setImageLoaded(true);
        }
    };

    const drawCanvas = () => {
        const canvas = canvasRef.current;
        const image = imageRef.current;
        if (!canvas || !image) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw image
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

        // Calculate scale factors
        const scaleX = canvas.width / image.naturalWidth;
        const scaleY = canvas.height / image.naturalHeight;

        // Draw word boundaries
        if (showWords && words) {
            ctx.strokeStyle = highlightColor;
            ctx.lineWidth = 2;
            ctx.fillStyle = highlightColor + "20"; // 20% opacity

            words
                .filter((word) => word.confidence >= confidenceThreshold)
                .forEach((word) => {
                    const x = word.bbox.x0 * scaleX;
                    const y = word.bbox.y0 * scaleY;
                    const width = (word.bbox.x1 - word.bbox.x0) * scaleX;
                    const height = (word.bbox.y1 - word.bbox.y0) * scaleY;

                    ctx.fillRect(x, y, width, height);
                    ctx.strokeRect(x, y, width, height);

                    // Add confidence text
                    ctx.fillStyle = highlightColor;
                    ctx.font = "12px Arial";
                    ctx.fillText(`${Math.round(word.confidence)}%`, x, y - 2);
                });
        }

        // Draw block boundaries
        if (showBlocks && blocks) {
            ctx.strokeStyle = "#ef4444";
            ctx.lineWidth = 3;
            ctx.fillStyle = "#ef444420"; // 20% opacity

            blocks
                .filter((block) => block.confidence >= confidenceThreshold)
                .forEach((block) => {
                    const x = block.bbox.x0 * scaleX;
                    const y = block.bbox.y0 * scaleY;
                    const width = (block.bbox.x1 - block.bbox.x0) * scaleX;
                    const height = (block.bbox.y1 - block.bbox.y0) * scaleY;

                    ctx.fillRect(x, y, width, height);
                    ctx.strokeRect(x, y, width, height);

                    // Add confidence text
                    ctx.fillStyle = "#ef4444";
                    ctx.font = "14px Arial";
                    ctx.fillText(
                        `Block: ${Math.round(block.confidence)}%`,
                        x,
                        y - 5
                    );
                });
        }
    };

    const downloadVisualization = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const link = document.createElement("a");
        link.download = "ocr-visualization.png";
        link.href = canvas.toDataURL();
        link.click();
    };

    const getFilteredStats = () => {
        const filteredWords =
            words?.filter((word) => word.confidence >= confidenceThreshold) ||
            [];
        const filteredBlocks =
            blocks?.filter(
                (block) => block.confidence >= confidenceThreshold
            ) || [];

        const avgWordConfidence =
            filteredWords.length > 0
                ? filteredWords.reduce(
                      (sum, word) => sum + word.confidence,
                      0
                  ) / filteredWords.length
                : 0;

        const avgBlockConfidence =
            filteredBlocks.length > 0
                ? filteredBlocks.reduce(
                      (sum, block) => sum + block.confidence,
                      0
                  ) / filteredBlocks.length
                : 0;

        return {
            wordsCount: filteredWords.length,
            blocksCount: filteredBlocks.length,
            avgWordConfidence,
            avgBlockConfidence,
            totalWords: words?.length || 0,
            totalBlocks: blocks?.length || 0,
        };
    };

    const stats = getFilteredStats();

    return (
        <div className="space-y-4">
            {/* Controls */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Eye className="h-5 w-5" />
                        Visualization Controls
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {/* Show/Hide Controls */}
                        <div className="space-y-3">
                            <div className="flex items-center space-x-2">
                                <Switch
                                    id="showWords"
                                    checked={showWords}
                                    onCheckedChange={setShowWords}
                                />
                                <Label htmlFor="showWords">Show Words</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Switch
                                    id="showBlocks"
                                    checked={showBlocks}
                                    onCheckedChange={setShowBlocks}
                                />
                                <Label htmlFor="showBlocks">Show Blocks</Label>
                            </div>
                        </div>

                        {/* Confidence Threshold */}
                        <div className="space-y-2">
                            <Label>
                                Confidence Threshold: {confidenceThreshold}%
                            </Label>
                            <Slider
                                value={[confidenceThreshold]}
                                onValueChange={(value) =>
                                    setConfidenceThreshold(value[0])
                                }
                                max={100}
                                min={0}
                                step={5}
                                className="w-full"
                            />
                        </div>

                        {/* Color Picker */}
                        <div className="space-y-2">
                            <Label>Highlight Color</Label>
                            <div className="flex items-center space-x-2">
                                <input
                                    type="color"
                                    value={highlightColor}
                                    onChange={(e) =>
                                        setHighlightColor(e.target.value)
                                    }
                                    className="w-8 h-8 rounded border"
                                />
                                <span className="text-sm text-gray-600">
                                    {highlightColor}
                                </span>
                            </div>
                        </div>

                        {/* Download Button */}
                        <div className="flex items-end">
                            <Button
                                onClick={downloadVisualization}
                                className="flex items-center gap-2"
                                variant="outline"
                            >
                                <Download className="h-4 w-4" />
                                Download
                            </Button>
                        </div>
                    </div>

                    {/* Statistics */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-blue-600">
                                {stats.wordsCount}/{stats.totalWords}
                            </div>
                            <div className="text-sm text-gray-600">
                                Words Shown
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-red-600">
                                {stats.blocksCount}/{stats.totalBlocks}
                            </div>
                            <div className="text-sm text-gray-600">
                                Blocks Shown
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-green-600">
                                {stats.avgWordConfidence.toFixed(1)}%
                            </div>
                            <div className="text-sm text-gray-600">
                                Avg Word Confidence
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-purple-600">
                                {stats.avgBlockConfidence.toFixed(1)}%
                            </div>
                            <div className="text-sm text-gray-600">
                                Avg Block Confidence
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Visualization Canvas */}
            <Card>
                <CardHeader>
                    <CardTitle>OCR Result Visualization</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="relative">
                        <img
                            ref={imageRef}
                            src={imageUrl}
                            alt="OCR Source"
                            className="hidden"
                            onLoad={handleImageLoad}
                        />
                        <canvas
                            ref={canvasRef}
                            className="w-full border rounded-lg shadow-sm"
                            style={{ maxWidth: "100%", height: "auto" }}
                        />
                        {!imageLoaded && (
                            <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
                                <div className="text-gray-500">
                                    Loading image...
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Legend */}
                    <div className="mt-4 flex flex-wrap gap-4 text-sm">
                        {showWords && (
                            <div className="flex items-center gap-2">
                                <div
                                    className="w-4 h-4 border-2 rounded"
                                    style={{
                                        borderColor: highlightColor,
                                        backgroundColor: highlightColor + "20",
                                    }}
                                />
                                <span>Word Boundaries</span>
                            </div>
                        )}
                        {showBlocks && (
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 border-2 border-red-500 bg-red-500 bg-opacity-20 rounded" />
                                <span>Text Block Boundaries</span>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* Word List */}
            {showWords && words && words.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle>Detected Words</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="max-h-64 overflow-auto">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                                {words
                                    .filter(
                                        (word) =>
                                            word.confidence >=
                                            confidenceThreshold
                                    )
                                    .sort((a, b) => b.confidence - a.confidence)
                                    .map((word, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center justify-between p-2 border rounded"
                                        >
                                            <span className="text-sm truncate">
                                                {word.text}
                                            </span>
                                            <Badge
                                                variant={
                                                    word.confidence >= 80
                                                        ? "default"
                                                        : word.confidence >= 60
                                                        ? "secondary"
                                                        : "destructive"
                                                }
                                                className="ml-2"
                                            >
                                                {Math.round(word.confidence)}%
                                            </Badge>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
};
