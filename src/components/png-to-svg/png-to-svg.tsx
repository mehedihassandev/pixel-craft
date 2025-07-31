"use client";

import React, { useState, useRef } from "react";
import ImageTracer from "imagetracerjs";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Loader2, ImageIcon, Download } from "lucide-react";

export const PngToSvgConverter: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [svg, setSvg] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [numColors, setNumColors] = useState<number>(16);
    const [scale, setScale] = useState<number>(1);
    const [threshold, setThreshold] = useState<number>(32);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileInputClick = () => fileInputRef.current?.click();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const f = e.target.files?.[0];
        if (f) {
            setFile(f);
            setSvg("");
        }
    };

    const handleConvert = () => {
        if (!file) return;
        setLoading(true);
        const reader = new FileReader();
        reader.onload = () => {
            const dataUrl = reader.result as string;
            ImageTracer.imageToSVG(
                dataUrl,
                (svgStr: string) => {
                    setSvg(svgStr);
                    setLoading(false);
                },
                { numberofcolors: numColors, scale: scale, ltres: threshold }
            );
        };
        reader.readAsDataURL(file);
    };

    const handleDownload = () => {
        if (!svg) return;
        const blob = new Blob([svg], { type: "image/svg+xml" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = file?.name.replace(/\.[^/.]+$/, "") + ".svg";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    return (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 space-y-6 xl:space-y-0">
            {/* Controls Card */}
            <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm shadow-lg">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <ImageIcon className="h-5 w-5" /> PNG to SVG Converter
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {/* File Selection */}
                    <div className="flex flex-col space-y-2">
                        <Button onClick={handleFileInputClick}>
                            Select PNG Image
                        </Button>
                        <input
                            type="file"
                            accept="image/png"
                            className="hidden"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                        />
                        {file && <span className="text-sm">{file.name}</span>}
                    </div>
                    {/* Settings */}
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <Label>Colors: {numColors}</Label>
                            <Slider
                                value={[numColors]}
                                onValueChange={(v) => setNumColors(v[0])}
                                min={2}
                                max={256}
                                step={1}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Scale: {scale.toFixed(1)}x</Label>
                            <Slider
                                value={[scale]}
                                onValueChange={(v) => setScale(v[0])}
                                min={0.1}
                                max={4}
                                step={0.1}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Threshold: {threshold}</Label>
                            <Slider
                                value={[threshold]}
                                onValueChange={(v) => setThreshold(v[0])}
                                min={1}
                                max={100}
                                step={1}
                            />
                        </div>
                    </div>
                    {/* Action Buttons */}
                    <div className="flex gap-2 pt-8">
                        <Button
                            onClick={handleConvert}
                            disabled={!file || loading}
                        >
                            {loading ? (
                                <Loader2 className="animate-spin h-4 w-4" />
                            ) : (
                                "Convert"
                            )}
                        </Button>
                        <Button
                            variant="outline"
                            onClick={handleDownload}
                            disabled={!svg}
                        >
                            <Download className="mr-2 h-4 w-4" /> Download SVG
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Preview Card */}
            <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm shadow-lg">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <ImageIcon className="h-5 w-5" /> Preview
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex justify-center items-center min-h-[200px]">
                        {loading && (
                            <Loader2 className="animate-spin h-8 w-8" />
                        )}
                        {!loading && svg && (
                            <div
                                className="border p-2"
                                dangerouslySetInnerHTML={{ __html: svg }}
                            />
                        )}
                        {!loading && !svg && (
                            <p className="text-muted-foreground">
                                No preview available
                            </p>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};
