"use client";

import { useState, useCallback, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Tesseract from "tesseract.js";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import {
    FileText,
    Upload,
    Camera,
    Download,
    Copy,
    Settings,
    Image as ImageIcon,
    Eye,
    EyeOff,
    Trash2,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ocrFormSchema, type OcrFormData } from "@/lib/schemas";
import { OcrVisualizer } from "./ocr-visualizer";

// Language options for OCR
const LANGUAGE_OPTIONS = [
    { value: "eng", label: "English" },
    { value: "spa", label: "Spanish" },
    { value: "fra", label: "French" },
    { value: "deu", label: "German" },
    { value: "ita", label: "Italian" },
    { value: "por", label: "Portuguese" },
    { value: "rus", label: "Russian" },
    { value: "jpn", label: "Japanese" },
    { value: "chi_sim", label: "Chinese (Simplified)" },
    { value: "chi_tra", label: "Chinese (Traditional)" },
    { value: "kor", label: "Korean" },
    { value: "ara", label: "Arabic" },
    { value: "hin", label: "Hindi" },
    { value: "tha", label: "Thai" },
    { value: "vie", label: "Vietnamese" },
    { value: "heb", label: "Hebrew" },
    { value: "ben", label: "Bengali" },
    { value: "tam", label: "Tamil" },
    { value: "tel", label: "Telugu" },
    { value: "mar", label: "Marathi" },
    { value: "guj", label: "Gujarati" },
    { value: "kan", label: "Kannada" },
    { value: "ori", label: "Oriya" },
    { value: "pan", label: "Punjabi" },
    { value: "asm", label: "Assamese" },
    { value: "nep", label: "Nepali" },
    { value: "sin", label: "Sinhala" },
    { value: "mya", label: "Myanmar" },
    { value: "khm", label: "Khmer" },
    { value: "lao", label: "Lao" },
    { value: "tib", label: "Tibetan" },
    { value: "urd", label: "Urdu" },
    { value: "fas", label: "Persian" },
    { value: "pus", label: "Pashto" },
    { value: "tir", label: "Tigrinya" },
    { value: "amh", label: "Amharic" },
];

// PSM (Page Segmentation Mode) options
const PSM_OPTIONS = [
    { value: "0", label: "OSD only" },
    { value: "1", label: "Automatic page segmentation with OSD" },
    { value: "2", label: "Automatic page segmentation, no OSD" },
    { value: "3", label: "Fully automatic page segmentation (Default)" },
    { value: "4", label: "Assume a single column of text" },
    {
        value: "5",
        label: "Assume a single uniform block of vertically aligned text",
    },
    { value: "6", label: "Assume a single uniform block of text" },
    { value: "7", label: "Treat the image as a single text line" },
    { value: "8", label: "Treat the image as a single word" },
    { value: "9", label: "Treat the image as a single word in a circle" },
    { value: "10", label: "Treat the image as a single character" },
    { value: "11", label: "Sparse text. Find as much text as possible" },
    { value: "12", label: "Sparse text with OSD" },
    { value: "13", label: "Raw line. Treat the image as a single text line" },
];

// OEM (OCR Engine Mode) options
const OEM_OPTIONS = [
    { value: "0", label: "Legacy engine only" },
    { value: "1", label: "Neural nets LSTM engine only" },
    { value: "2", label: "Legacy + LSTM engines" },
    { value: "3", label: "Default, based on what is available (Recommended)" },
];

interface OcrResult {
    text: string;
    confidence: number;
    words?: Array<{
        text: string;
        confidence: number;
        bbox: { x0: number; y0: number; x1: number; y1: number };
    }>;
    blocks?: Array<{
        text: string;
        confidence: number;
        bbox: { x0: number; y0: number; x1: number; y1: number };
    }>;
    hocr?: string;
}

export const OcrForm = () => {
    const { toast } = useToast();
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [progress, setProgress] = useState(0);
    const [result, setResult] = useState<OcrResult | null>(null);
    const [showAdvanced, setShowAdvanced] = useState(false);
    const [worker, setWorker] = useState<Tesseract.Worker | null>(null);
    const [currentStatus, setCurrentStatus] = useState<string>("");
    const fileInputRef = useRef<HTMLInputElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
        control,
    } = useForm<OcrFormData>({
        resolver: zodResolver(ocrFormSchema),
        defaultValues: {
            language: "eng",
            outputFormat: "text",
            preserveLineBreaks: true,
            removeExtra: false,
            confidence: 70,
            psm: 3,
            oem: 3,
        },
    });

    const watchedValues = watch();

    // Handle file selection and auto-process
    const handleFileSelect = useCallback(
        async (file: File) => {
            if (!file.type.startsWith("image/")) {
                toast({
                    title: "Invalid file type",
                    description:
                        "Please select an image file (PNG, JPG, WebP, etc.)",
                    variant: "destructive",
                });
                return;
            }

            if (file.size > 10 * 1024 * 1024) {
                // 10MB limit
                toast({
                    title: "File too large",
                    description: "Please select an image smaller than 10MB",
                    variant: "destructive",
                });
                return;
            }

            setSelectedImage(file);

            // Create preview
            const reader = new FileReader();
            reader.onload = async (e) => {
                setImagePreview(e.target?.result as string);

                // Auto-start OCR processing after image is loaded
                await autoProcessOcr(file);
            };
            reader.readAsDataURL(file);

            // Reset previous results
            setResult(null);
            setProgress(0);
        },
        [toast, watchedValues]
    );

    // Handle drag and drop
    const handleDrop = useCallback(
        (e: React.DragEvent<HTMLDivElement>) => {
            e.preventDefault();
            const files = Array.from(e.dataTransfer.files);
            if (files.length > 0) {
                handleFileSelect(files[0]);
            }
        },
        [handleFileSelect]
    );

    const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    }, []);

    // Capture from camera (for mobile/desktop with camera)
    const captureFromCamera = useCallback(async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: "environment" }, // Use back camera on mobile
            });

            // Create a video element to capture frame
            const video = document.createElement("video");
            video.srcObject = stream;
            video.play();

            video.onloadedmetadata = () => {
                const canvas = document.createElement("canvas");
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                const ctx = canvas.getContext("2d");

                // Capture frame after a short delay
                setTimeout(() => {
                    ctx?.drawImage(video, 0, 0);
                    canvas.toBlob(
                        (blob) => {
                            if (blob) {
                                const file = new File(
                                    [blob],
                                    "camera-capture.jpg",
                                    { type: "image/jpeg" }
                                );
                                handleFileSelect(file);
                            }
                        },
                        "image/jpeg",
                        0.9
                    );

                    // Stop camera
                    stream.getTracks().forEach((track) => track.stop());
                }, 1000);
            };
        } catch (error) {
            toast({
                title: "Camera access denied",
                description:
                    "Please allow camera access or select an image file",
                variant: "destructive",
            });
        }
    }, [handleFileSelect, toast]);

    // Initialize worker
    const initializeWorker = useCallback(async () => {
        if (worker) {
            await worker.terminate();
        }

        const newWorker = await Tesseract.createWorker(
            watchedValues.language,
            watchedValues.oem,
            {
                logger: (m) => {
                    setCurrentStatus(m.status);
                    if (m.progress) {
                        setProgress(Math.round(m.progress * 100));
                    }
                },
            }
        );

        await newWorker.setParameters({
            tessedit_pageseg_mode: watchedValues.psm as any,
            tessedit_ocr_engine_mode: watchedValues.oem as any,
        });

        setWorker(newWorker);
        return newWorker;
    }, [worker, watchedValues.language, watchedValues.oem, watchedValues.psm]);

    // Auto-process OCR with current form settings
    const autoProcessOcr = async (file: File) => {
        const currentData = {
            language: watchedValues.language,
            outputFormat: watchedValues.outputFormat,
            preserveLineBreaks: watchedValues.preserveLineBreaks,
            removeExtra: watchedValues.removeExtra,
            confidence: watchedValues.confidence,
            psm: watchedValues.psm,
            oem: watchedValues.oem,
        };

        setIsProcessing(true);
        setProgress(0);
        setCurrentStatus("Initializing...");

        try {
            const currentWorker = await initializeWorker();

            const { data: ocrData } = await currentWorker.recognize(file);
            const ocrResult = ocrData as any; // Type assertion for accessing nested properties

            // Process results based on output format
            let processedResult: OcrResult = {
                text: ocrResult.text,
                confidence: ocrResult.confidence,
            };

            if (currentData.outputFormat === "json") {
                if (ocrResult.words) {
                    processedResult.words = ocrResult.words.map(
                        (word: any) => ({
                            text: word.text,
                            confidence: word.confidence,
                            bbox: word.bbox,
                        })
                    );
                }
                if (ocrResult.blocks) {
                    processedResult.blocks = ocrResult.blocks.map(
                        (block: any) => ({
                            text: block.text,
                            confidence: block.confidence,
                            bbox: block.bbox,
                        })
                    );
                }
            }

            if (currentData.outputFormat === "hocr" && ocrResult.hocr) {
                processedResult.hocr = ocrResult.hocr;
            }

            // Apply text processing options
            if (currentData.removeExtra) {
                processedResult.text = processedResult.text
                    .replace(/\s+/g, " ")
                    .trim();
            }

            if (!currentData.preserveLineBreaks) {
                processedResult.text = processedResult.text.replace(/\n/g, " ");
            }

            // Filter by confidence
            if (processedResult.words) {
                processedResult.words = processedResult.words.filter(
                    (word) => word.confidence >= currentData.confidence
                );
            }

            setResult(processedResult);

            toast({
                title: "OCR completed successfully",
                description: `Extracted text with ${processedResult.confidence.toFixed(
                    1
                )}% confidence`,
            });
        } catch (error) {
            console.error("OCR Error:", error);
            toast({
                title: "OCR failed",
                description: "An error occurred while processing the image",
                variant: "destructive",
            });
        } finally {
            setIsProcessing(false);
            setProgress(0);
            setCurrentStatus("");
        }
    };

    // Reprocess with current settings
    const reprocessOcr = async () => {
        if (!selectedImage) {
            toast({
                title: "No image selected",
                description: "Please select an image to reprocess",
                variant: "destructive",
            });
            return;
        }
        await autoProcessOcr(selectedImage);
    };

    // Copy text to clipboard
    const copyToClipboard = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            toast({
                title: "Copied to clipboard",
                description: "Text has been copied to your clipboard",
            });
        } catch (error) {
            toast({
                title: "Copy failed",
                description: "Failed to copy text to clipboard",
                variant: "destructive",
            });
        }
    };

    // Download result
    const downloadResult = (format: "txt" | "json" | "hocr") => {
        if (!result) return;

        let content = "";
        let filename = "";
        let mimeType = "";

        switch (format) {
            case "txt":
                content = result.text;
                filename = "ocr-result.txt";
                mimeType = "text/plain";
                break;
            case "json":
                content = JSON.stringify(result, null, 2);
                filename = "ocr-result.json";
                mimeType = "application/json";
                break;
            case "hocr":
                content = result.hocr || "";
                filename = "ocr-result.hocr";
                mimeType = "text/html";
                break;
        }

        const blob = new Blob([content], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    // Reset form
    const resetForm = () => {
        setSelectedImage(null);
        setImagePreview(null);
        setResult(null);
        setProgress(0);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    return (
        <div className="space-y-6">
            {/* Top Configuration */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border-0 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm shadow-lg">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Settings className="h-5 w-5" />
                            OCR Configuration
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-gray-400 transition-colors">
                            <form className="space-y-4">
                                {/* Basic Settings */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="language">
                                            Language
                                        </Label>
                                        <Select
                                            value={watchedValues.language}
                                            onValueChange={(value) =>
                                                setValue("language", value)
                                            }
                                        >
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {LANGUAGE_OPTIONS.map(
                                                    (lang) => (
                                                        <SelectItem
                                                            key={lang.value}
                                                            value={lang.value}
                                                        >
                                                            {lang.label}
                                                        </SelectItem>
                                                    )
                                                )}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div>
                                        <Label htmlFor="outputFormat">
                                            Output Format
                                        </Label>
                                        <Select
                                            value={watchedValues.outputFormat}
                                            onValueChange={(value) =>
                                                setValue(
                                                    "outputFormat",
                                                    value as
                                                        | "text"
                                                        | "json"
                                                        | "hocr"
                                                )
                                            }
                                        >
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="text">
                                                    Plain Text
                                                </SelectItem>
                                                <SelectItem value="json">
                                                    JSON (with coordinates)
                                                </SelectItem>
                                                <SelectItem value="hocr">
                                                    hOCR (HTML)
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                {/* Text Processing Options */}
                                <div className="space-y-3">
                                    <div className="flex items-center space-x-2">
                                        <Switch
                                            id="preserveLineBreaks"
                                            checked={
                                                watchedValues.preserveLineBreaks
                                            }
                                            onCheckedChange={(checked) =>
                                                setValue(
                                                    "preserveLineBreaks",
                                                    checked
                                                )
                                            }
                                        />
                                        <Label htmlFor="preserveLineBreaks">
                                            Preserve line breaks
                                        </Label>
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <Switch
                                            id="removeExtra"
                                            checked={watchedValues.removeExtra}
                                            onCheckedChange={(checked) =>
                                                setValue("removeExtra", checked)
                                            }
                                        />
                                        <Label htmlFor="removeExtra">
                                            Remove extra whitespace
                                        </Label>
                                    </div>
                                </div>

                                {/* Confidence Filter */}
                                <div className="space-y-2">
                                    <Label>
                                        Minimum Confidence:{" "}
                                        {watchedValues.confidence}%
                                    </Label>
                                    <Slider
                                        value={[watchedValues.confidence]}
                                        onValueChange={(value) =>
                                            setValue("confidence", value[0])
                                        }
                                        max={100}
                                        min={0}
                                        step={5}
                                        className="w-full"
                                    />
                                </div>
                            </form>
                        </div>
                    </CardContent>
                </Card>

                {/* Advanced Settings Card */}
                <Card className="border-0 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm shadow-lg">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Settings className="h-5 w-5" />
                            Advanced Settings
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setShowAdvanced(!showAdvanced)}
                                className="ml-auto"
                            >
                                {showAdvanced ? (
                                    <EyeOff className="h-4 w-4" />
                                ) : (
                                    <Eye className="h-4 w-4" />
                                )}
                                {showAdvanced
                                    ? "Hide Advanced"
                                    : "Show Advanced"}
                            </Button>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {/* Advanced Settings Fields */}
                            {showAdvanced && (
                                <div className="space-y-4 pt-4 border-t">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="psm">
                                                Page Segmentation Mode (PSM)
                                            </Label>
                                            <Select
                                                value={watchedValues.psm.toString()}
                                                onValueChange={(value) =>
                                                    setValue(
                                                        "psm",
                                                        parseInt(value)
                                                    )
                                                }
                                            >
                                                <SelectTrigger>
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {PSM_OPTIONS.map(
                                                        (option) => (
                                                            <SelectItem
                                                                key={
                                                                    option.value
                                                                }
                                                                value={
                                                                    option.value
                                                                }
                                                            >
                                                                {option.value}:{" "}
                                                                {option.label}
                                                            </SelectItem>
                                                        )
                                                    )}
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div>
                                            <Label htmlFor="oem">
                                                OCR Engine Mode (OEM)
                                            </Label>
                                            <Select
                                                value={watchedValues.oem.toString()}
                                                onValueChange={(value) =>
                                                    setValue(
                                                        "oem",
                                                        parseInt(value)
                                                    )
                                                }
                                            >
                                                <SelectTrigger>
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {OEM_OPTIONS.map(
                                                        (option) => (
                                                            <SelectItem
                                                                key={
                                                                    option.value
                                                                }
                                                                value={
                                                                    option.value
                                                                }
                                                            >
                                                                {option.value}:{" "}
                                                                {option.label}
                                                            </SelectItem>
                                                        )
                                                    )}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Image Upload and Settings Side by Side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Image Upload Card */}
                <Card className="border-0 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm shadow-lg">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <ImageIcon className="h-5 w-5" />
                            Image Upload
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {/* Upload Area */}
                        <div
                            className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-gray-400 transition-colors"
                            onDrop={handleDrop}
                            onDragOver={handleDragOver}
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                            <p className="text-lg font-medium text-gray-600 mb-2">
                                Drop an image here or click to select
                            </p>
                            <p className="text-sm text-gray-500">
                                Supports PNG, JPG, WebP, BMP, TIFF (max 10MB) -
                                OCR starts automatically
                            </p>
                        </div>

                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) handleFileSelect(file);
                            }}
                        />

                        {/* Action Buttons */}
                        <div className="flex gap-2 justify-center">
                            <Button
                                variant="outline"
                                onClick={() => fileInputRef.current?.click()}
                                className="flex items-center gap-2"
                            >
                                <Upload className="h-4 w-4" />
                                Select File
                            </Button>
                            <Button
                                variant="outline"
                                onClick={captureFromCamera}
                                className="flex items-center gap-2"
                            >
                                <Camera className="h-4 w-4" />
                                Capture Photo
                            </Button>
                            {selectedImage && (
                                <Button
                                    variant="outline"
                                    onClick={resetForm}
                                    className="flex items-center gap-2"
                                >
                                    <Trash2 className="h-4 w-4" />
                                    Reset
                                </Button>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Preview */}
                {imagePreview && (
                    <Card className="border-0 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm shadow-lg">
                        <CardHeader>
                            <CardTitle>Preview</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <img
                                src={imagePreview}
                                alt="Preview"
                                className="w-full object-contain"
                            />
                        </CardContent>
                    </Card>
                )}
            </div>

            {/* Results */}
            {result && (
                <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <FileText className="h-5 w-5" />
                            OCR Results
                            <Badge variant="secondary" className="ml-auto">
                                Confidence: {result.confidence.toFixed(1)}%
                            </Badge>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Tabs defaultValue="text" className="space-y-4">
                            <TabsList>
                                <TabsTrigger value="text">Text</TabsTrigger>
                                {result.words && (
                                    <TabsTrigger value="json">JSON</TabsTrigger>
                                )}
                                {result.hocr && (
                                    <TabsTrigger value="hocr">hOCR</TabsTrigger>
                                )}
                                {result.words && imagePreview && (
                                    <TabsTrigger value="visualizer">
                                        Visualizer
                                    </TabsTrigger>
                                )}
                            </TabsList>

                            <TabsContent value="text" className="space-y-3">
                                <div className="flex gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() =>
                                            copyToClipboard(result.text)
                                        }
                                        className="flex items-center gap-2"
                                    >
                                        <Copy className="h-4 w-4" />
                                        Copy
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => downloadResult("txt")}
                                        className="flex items-center gap-2"
                                    >
                                        <Download className="h-4 w-4" />
                                        Download TXT
                                    </Button>
                                </div>
                                <Textarea
                                    value={result.text}
                                    readOnly
                                    rows={10}
                                    className="resize-none"
                                />
                            </TabsContent>

                            {result.words && (
                                <TabsContent value="json" className="space-y-3">
                                    <div className="flex gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() =>
                                                copyToClipboard(
                                                    JSON.stringify(
                                                        result,
                                                        null,
                                                        2
                                                    )
                                                )
                                            }
                                            className="flex items-center gap-2"
                                        >
                                            <Copy className="h-4 w-4" />
                                            Copy JSON
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() =>
                                                downloadResult("json")
                                            }
                                            className="flex items-center gap-2"
                                        >
                                            <Download className="h-4 w-4" />
                                            Download JSON
                                        </Button>
                                    </div>
                                    <pre className="bg-gray-100 p-4 rounded-lg overflow-auto max-h-96 text-sm">
                                        {JSON.stringify(result, null, 2)}
                                    </pre>
                                </TabsContent>
                            )}

                            {result.hocr && (
                                <TabsContent value="hocr" className="space-y-3">
                                    <div className="flex gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() =>
                                                copyToClipboard(
                                                    result.hocr || ""
                                                )
                                            }
                                            className="flex items-center gap-2"
                                        >
                                            <Copy className="h-4 w-4" />
                                            Copy hOCR
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() =>
                                                downloadResult("hocr")
                                            }
                                            className="flex items-center gap-2"
                                        >
                                            <Download className="h-4 w-4" />
                                            Download hOCR
                                        </Button>
                                    </div>
                                    <pre className="bg-gray-100 p-4 rounded-lg overflow-auto max-h-96 text-sm">
                                        {result.hocr}
                                    </pre>
                                </TabsContent>
                            )}

                            {result.words && imagePreview && (
                                <TabsContent
                                    value="visualizer"
                                    className="space-y-3"
                                >
                                    <OcrVisualizer
                                        imageUrl={imagePreview}
                                        words={result.words}
                                        blocks={result.blocks}
                                        confidence={result.confidence}
                                    />
                                </TabsContent>
                            )}
                        </Tabs>
                    </CardContent>
                </Card>
            )}
        </div>
    );
};
