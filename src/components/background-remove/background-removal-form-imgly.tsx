"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import {
    backgroundRemovalFormSchema,
    type BackgroundRemovalFormData,
} from "@/lib/schemas";
import { RhfSelect } from "@/components/ui/rhfSelect/rhf-select";
import { RhfColorField } from "@/components/ui/rhfColorField/rhf-color-field";
import {
    Upload,
    Download,
    RotateCcw,
    Scissors,
    Info,
    Zap,
    Loader2,
} from "lucide-react";

interface BackgroundRemovalFormProps {
    onImageProcessed?: (
        processedImageUrl: string,
        originalImageUrl: string,
        metadata?: {
            format?: string;
            quality?: number;
        }
    ) => void;
}

export const BackgroundRemovalForm: React.FC<BackgroundRemovalFormProps> = ({
    onImageProcessed,
}) => {
    const { toast } = useToast();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const [originalImage, setOriginalImage] = useState<HTMLImageElement | null>(
        null
    );
    const [originalImageUrl, setOriginalImageUrl] = useState<string>("");
    const [processedImageUrl, setProcessedImageUrl] = useState<string>("");
    const [isProcessing, setIsProcessing] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [processingProgress, setProcessingProgress] = useState(0);
    const [originalDimensions, setOriginalDimensions] = useState({
        width: 0,
        height: 0,
    });
    const [isEngineLoaded, setIsEngineLoaded] = useState(false);

    const form = useForm<BackgroundRemovalFormData>({
        resolver: zodResolver(backgroundRemovalFormSchema),
        defaultValues: {
            quality: 90,
            format: "png",
            backgroundColor: "ffffff",
        },
    });

    const { watch, setValue, handleSubmit, control } = form;
    const quality = watch("quality");
    const format = watch("format");
    const backgroundColor = watch("backgroundColor");

    // Initialize the background removal engine
    useEffect(() => {
        const initializeEngine = async () => {
            try {
                // Preload the background removal library
                const { removeBackground } = await import(
                    "@imgly/background-removal"
                );

                // Test with a small image to initialize the models
                const testCanvas = document.createElement("canvas");
                testCanvas.width = 1;
                testCanvas.height = 1;
                const testCtx = testCanvas.getContext("2d");
                if (testCtx) {
                    testCtx.fillStyle = "white";
                    testCtx.fillRect(0, 0, 1, 1);
                    const testDataUrl = testCanvas.toDataURL();

                    // This will download and initialize the models
                    await removeBackground(testDataUrl);
                }

                setIsEngineLoaded(true);

                toast({
                    title: "Background removal engine loaded",
                    description: "Ready to process images.",
                });
            } catch (error) {
                console.error(
                    "Failed to initialize background removal engine:",
                    error
                );
                toast({
                    title: "Initialization failed",
                    description:
                        "Failed to load background removal engine. Please refresh the page.",
                    variant: "destructive",
                });
            }
        };

        initializeEngine();
    }, [toast]);

    const handleFileUpload = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const file = event.target.files?.[0];
            if (!file) return;

            // Validate file type
            if (!file.type.startsWith("image/")) {
                toast({
                    title: "Invalid file type",
                    description: "Please select an image file.",
                    variant: "destructive",
                });
                return;
            }

            // Validate file size (10MB limit)
            if (file.size > 10 * 1024 * 1024) {
                toast({
                    title: "File too large",
                    description: "Please select an image smaller than 10MB.",
                    variant: "destructive",
                });
                return;
            }

            setUploadProgress(0);
            const reader = new FileReader();

            reader.onprogress = (event) => {
                if (event.lengthComputable) {
                    const progress = Math.round(
                        (event.loaded / event.total) * 100
                    );
                    setUploadProgress(progress);
                }
            };

            reader.onload = (event) => {
                const result = event.target?.result as string;
                setOriginalImageUrl(result);

                const img = new Image();
                img.onload = () => {
                    setOriginalImage(img);
                    setOriginalDimensions({
                        width: img.naturalWidth,
                        height: img.naturalHeight,
                    });
                    setUploadProgress(100);

                    toast({
                        title: "Image uploaded successfully",
                        description: `Loaded ${img.naturalWidth}×${img.naturalHeight} image`,
                    });
                };
                img.src = result;
            };

            reader.onerror = () => {
                toast({
                    title: "Upload failed",
                    description: "Failed to read the image file.",
                    variant: "destructive",
                });
            };

            reader.readAsDataURL(file);
        },
        [toast]
    );

    const processImage = useCallback(
        async (formData: BackgroundRemovalFormData) => {
            if (!originalImage || !originalImageUrl) {
                toast({
                    title: "No image selected",
                    description: "Please upload an image first.",
                    variant: "destructive",
                });
                return;
            }

            if (!isEngineLoaded) {
                toast({
                    title: "Processing engine not ready",
                    description:
                        "Please wait for the background removal engine to load.",
                    variant: "destructive",
                });
                return;
            }

            setIsProcessing(true);
            setProcessingProgress(0);

            try {
                // Progress simulation
                const progressInterval = setInterval(() => {
                    setProcessingProgress((prev) => {
                        if (prev >= 85) {
                            clearInterval(progressInterval);
                            return 85;
                        }
                        return prev + Math.random() * 20;
                    });
                }, 400);

                // Import and use the background removal library
                const { removeBackground } = await import(
                    "@imgly/background-removal"
                );

                // Process the image
                const blob = await removeBackground(originalImageUrl, {
                    model: "isnet", // Options: 'isnet', 'isnet_fp16', 'isnet_quint8'
                    output: {
                        format: "image/png",
                        quality: 1.0,
                    },
                    debug: false,
                });

                clearInterval(progressInterval);
                setProcessingProgress(95);

                // Handle format conversion and quality
                const canvas = canvasRef.current;
                if (!canvas) return;

                const ctx = canvas.getContext("2d");
                if (!ctx) return;

                // Set canvas dimensions
                canvas.width = originalDimensions.width;
                canvas.height = originalDimensions.height;

                // If format is not PNG and we have a background color, fill the background
                if (formData.format !== "png" && formData.backgroundColor) {
                    ctx.fillStyle = `#${formData.backgroundColor}`;
                    ctx.fillRect(0, 0, canvas.width, canvas.height);
                }

                // Create an image from the blob and draw it
                const processedImg = new Image();
                const blobUrl = URL.createObjectURL(blob);

                processedImg.onload = () => {
                    ctx.drawImage(processedImg, 0, 0);
                    URL.revokeObjectURL(blobUrl);

                    // Convert to desired format
                    const mimeType = `image/${formData.format}`;
                    const qualityValue =
                        formData.format === "png"
                            ? undefined
                            : formData.quality / 100;

                    canvas.toBlob(
                        (resultBlob) => {
                            if (resultBlob) {
                                const processedUrl =
                                    URL.createObjectURL(resultBlob);
                                setProcessedImageUrl(processedUrl);
                                setProcessingProgress(100);

                                onImageProcessed?.(
                                    processedUrl,
                                    originalImageUrl,
                                    {
                                        format: formData.format,
                                        quality: formData.quality,
                                    }
                                );

                                toast({
                                    title: "Background removed successfully",
                                    description:
                                        "Your image is ready for download.",
                                });
                            }
                        },
                        mimeType,
                        qualityValue
                    );
                };

                processedImg.src = blobUrl;
            } catch (error) {
                console.error("Background removal failed:", error);
                toast({
                    title: "Processing failed",
                    description:
                        "Failed to remove background. Please try again with a different image.",
                    variant: "destructive",
                });
            } finally {
                setIsProcessing(false);
                setProcessingProgress(0);
            }
        },
        [
            originalImage,
            originalImageUrl,
            originalDimensions,
            isEngineLoaded,
            onImageProcessed,
            toast,
        ]
    );

    const handleDownload = useCallback(() => {
        if (!processedImageUrl) return;

        const link = document.createElement("a");
        link.href = processedImageUrl;
        link.download = `background-removed.${format}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        toast({
            title: "Download started",
            description: `Downloading your processed image as ${format.toUpperCase()}.`,
        });
    }, [processedImageUrl, format, toast]);

    const resetForm = useCallback(() => {
        setOriginalImage(null);
        setOriginalImageUrl("");
        setProcessedImageUrl("");
        setUploadProgress(0);
        setProcessingProgress(0);
        setOriginalDimensions({ width: 0, height: 0 });
        form.reset();
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    }, [form]);

    const formatOptions = [
        { value: "png", label: "PNG (Transparent)" },
        { value: "jpg", label: "JPG" },
        { value: "webp", label: "WebP" },
    ];

    return (
        <div className="w-full max-w-4xl mx-auto">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Scissors className="h-6 w-6" />
                        AI Background Removal
                    </CardTitle>
                    <CardDescription>
                        Remove backgrounds from your images automatically using
                        advanced AI. Upload an image and choose your output
                        format.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* Loading status */}
                    {!isEngineLoaded && (
                        <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                            <div className="flex items-center gap-2">
                                <Loader2 className="h-5 w-5 text-blue-600 dark:text-blue-400 animate-spin" />
                                <span className="text-sm text-blue-800 dark:text-blue-200">
                                    Loading AI background removal engine... This
                                    may take a moment on first load.
                                </span>
                            </div>
                        </div>
                    )}

                    {/* File Upload */}
                    <div className="space-y-2">
                        <Label htmlFor="file-upload">Upload Image</Label>
                        <div className="flex items-center gap-4">
                            <Input
                                id="file-upload"
                                type="file"
                                accept="image/*"
                                onChange={handleFileUpload}
                                ref={fileInputRef}
                                className="flex-1"
                                disabled={!isEngineLoaded}
                            />
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => fileInputRef.current?.click()}
                                disabled={!isEngineLoaded}
                            >
                                <Upload className="h-4 w-4 mr-2" />
                                Browse
                            </Button>
                        </div>
                        {uploadProgress > 0 && uploadProgress < 100 && (
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span>Uploading...</span>
                                    <span>{uploadProgress}%</span>
                                </div>
                                <Progress value={uploadProgress} />
                            </div>
                        )}
                    </div>

                    {/* Image Preview */}
                    {originalImageUrl && (
                        <div className="space-y-2">
                            <Label>Original Image</Label>
                            <div className="relative border rounded-lg overflow-hidden bg-gray-50 dark:bg-gray-900">
                                <img
                                    src={originalImageUrl}
                                    alt="Original"
                                    className="max-w-full h-auto max-h-64 mx-auto object-contain"
                                />
                                <Badge
                                    variant="secondary"
                                    className="absolute top-2 right-2"
                                >
                                    {originalDimensions.width} ×{" "}
                                    {originalDimensions.height}
                                </Badge>
                            </div>
                        </div>
                    )}

                    {/* Form */}
                    <Form {...form}>
                        <form
                            onSubmit={handleSubmit(processImage)}
                            className="space-y-6"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Output Format */}
                                <FormField
                                    control={control}
                                    name="format"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Output Format</FormLabel>
                                            <FormControl>
                                                <RhfSelect
                                                    control={control}
                                                    name="format"
                                                    options={formatOptions}
                                                    placeholder="Select format"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Quality */}
                                {format !== "png" && (
                                    <FormField
                                        control={control}
                                        name="quality"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Quality: {quality}%
                                                </FormLabel>
                                                <FormControl>
                                                    <Slider
                                                        value={[field.value]}
                                                        onValueChange={(
                                                            value
                                                        ) =>
                                                            field.onChange(
                                                                value[0]
                                                            )
                                                        }
                                                        max={100}
                                                        min={1}
                                                        step={1}
                                                        className="w-full"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                )}
                            </div>

                            {/* Background Color for non-PNG formats */}
                            {format !== "png" && (
                                <FormField
                                    control={control}
                                    name="backgroundColor"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Background Color
                                            </FormLabel>
                                            <FormControl>
                                                <RhfColorField
                                                    {...field}
                                                    placeholder="ffffff"
                                                    label="Background Color (hex)"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            )}

                            {/* Processing Progress */}
                            {isProcessing && (
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="flex items-center gap-2">
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                            Processing with AI...
                                        </span>
                                        <span>
                                            {Math.round(processingProgress)}%
                                        </span>
                                    </div>
                                    <Progress value={processingProgress} />
                                    <p className="text-xs text-muted-foreground">
                                        AI is analyzing and removing the
                                        background. This may take 10-30 seconds.
                                    </p>
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Button
                                    type="submit"
                                    disabled={
                                        !originalImage ||
                                        isProcessing ||
                                        !isEngineLoaded
                                    }
                                    className="flex-1"
                                >
                                    {isProcessing ? (
                                        <>
                                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                            Processing...
                                        </>
                                    ) : (
                                        <>
                                            <Zap className="h-4 w-4 mr-2" />
                                            Remove Background
                                        </>
                                    )}
                                </Button>

                                {processedImageUrl && (
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={handleDownload}
                                        className="flex-1"
                                    >
                                        <Download className="h-4 w-4 mr-2" />
                                        Download {format.toUpperCase()}
                                    </Button>
                                )}

                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={resetForm}
                                >
                                    <RotateCcw className="h-4 w-4 mr-2" />
                                    Reset
                                </Button>
                            </div>
                        </form>
                    </Form>

                    {/* Help Text */}
                    <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                        <div className="flex items-start gap-2">
                            <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                            <div className="text-sm text-blue-800 dark:text-blue-200">
                                <p className="font-medium mb-1">
                                    Tips for best results:
                                </p>
                                <ul className="list-disc list-inside space-y-1">
                                    <li>
                                        Works best with clear subject-background
                                        contrast
                                    </li>
                                    <li>
                                        Optimal for portraits, products, and
                                        objects with defined edges
                                    </li>
                                    <li>
                                        PNG format preserves transparency for
                                        overlaying on other images
                                    </li>
                                    <li>
                                        JPG/WebP formats require a background
                                        color since they don't support
                                        transparency
                                    </li>
                                    <li>
                                        First-time loading may take longer as AI
                                        models are downloaded
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Hidden canvas for image processing */}
            <canvas ref={canvasRef} style={{ display: "none" }} />
        </div>
    );
};
