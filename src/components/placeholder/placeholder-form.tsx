"use client";

import type { Dispatch, SetStateAction } from "react";
import { useTransition, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Wand2,
    Loader2,
    Palette,
    Grid3X3,
    Type,
    FileImage,
} from "lucide-react";
import { handleSuggestFontSize } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";
import { placeholderFormSchema, type PlaceholderFormData } from "@/lib/schemas";
import RhfTextField from "../ui/rhfTextfield/rhf-textfield";
import RhfSelect from "../ui/rhfSelect/rhf-select";
import { PlaceholdrOptions } from "@/app/(pages)/placeholder/page";

interface PlaceholdrFormProps {
    options: PlaceholdrOptions;
    setOptions: Dispatch<SetStateAction<PlaceholdrOptions>>;
}

export const PlaceholderForm = ({
    options,
    setOptions,
}: PlaceholdrFormProps) => {
    const { toast } = useToast();
    const [isPending, startTransition] = useTransition();

    // Format options for the select dropdown
    const formatOptions = [
        { value: "png", label: "PNG" },
        { value: "jpg", label: "JPG" },
        { value: "webp", label: "WebP" },
    ];

    // Initialize React Hook Form
    const form = useForm<PlaceholderFormData>({
        resolver: zodResolver(placeholderFormSchema),
        defaultValues: {
            width: options.width || 600,
            height: options.height || 400,
            text: options.text || "",
            bgColor: options.bgColor || "c0c0c0",
            textColor: options.textColor || "F0F8FF",
            format: options.format || "png",
            fontSize: options.fontSize,
        },
        mode: "onChange", // Validate on change for better UX
    });

    const {
        control,
        watch,
        setValue,
        handleSubmit,
        reset,
        formState: { errors },
    } = form;

    // Watch individual form values to prevent infinite re-renders
    const width = watch("width");
    const height = watch("height");
    const text = watch("text");
    const bgColor = watch("bgColor");
    const textColor = watch("textColor");
    const format = watch("format");
    const fontSize = watch("fontSize");

    // Update parent state when individual values change
    useEffect(() => {
        // Ensure we always have valid numbers
        const validWidth = width && !isNaN(width) && width > 0 ? width : 600;
        const validHeight =
            height && !isNaN(height) && height > 0 ? height : 400;

        setOptions((prev: PlaceholdrOptions) => ({
            ...prev,
            width: validWidth,
            height: validHeight,
            text: text || "",
            bgColor: bgColor || "c0c0c0",
            textColor: textColor || "F0F8FF",
            format: format || "png",
            fontSize:
                fontSize && !isNaN(fontSize) && fontSize > 0 ? fontSize : null,
        }));
    }, [width, height, text, bgColor, textColor, format, fontSize, setOptions]);

    const onSuggestFontSize = () => {
        startTransition(async () => {
            const result = await handleSuggestFontSize({
                width,
                height,
                text: text || "",
            });

            if (result.error) {
                toast({
                    variant: "destructive",
                    title: "AI Suggestion Failed",
                    description: result.error,
                });
            } else if (result.fontSize) {
                setValue("fontSize", result.fontSize);
                toast({
                    title: "AI Suggestion Applied!",
                    description: `Font size set to ${result.fontSize}px.`,
                });
            }
        });
    };

    const handleColorChange = (key: "bgColor" | "textColor", value: string) => {
        const cleanValue = value.startsWith("#") ? value.substring(1) : value;
        if (/^[0-9a-fA-F]{0,6}$/.test(cleanValue)) {
            setValue(key, cleanValue);
        }
    };

    return (
        <div className="space-y-6">
            {/* Dimensions Card */}
            <Card className="border-0 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm shadow-lg">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Grid3X3 className="h-5 w-5" />
                        Dimensions
                    </CardTitle>
                    <CardDescription>
                        Set the width and height of your placeholder image
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <RhfTextField
                            control={control}
                            name="width"
                            label="Width (px)"
                            type="number"
                            min={1}
                            max={5000}
                        />
                        <RhfTextField
                            control={control}
                            name="height"
                            label="Height (px)"
                            type="number"
                            min={1}
                            max={5000}
                        />
                    </div>

                    {/* Quick Dimension Presets */}
                    <div className="space-y-2">
                        <Label className="text-sm">Quick Presets</Label>
                        <div className="flex flex-wrap gap-2">
                            {[
                                { label: "Square", w: 500, h: 500 },
                                { label: "16:9", w: 1920, h: 1080 },
                                { label: "4:3", w: 800, h: 600 },
                                { label: "Social", w: 1200, h: 630 },
                            ].map(({ label, w, h }) => (
                                <Button
                                    key={label}
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {
                                        setValue("width", w);
                                        setValue("height", h);
                                    }}
                                    type="button"
                                >
                                    {label} ({w}×{h})
                                </Button>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Colors Card */}
            <Card className="border-0 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm shadow-lg">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Palette className="h-5 w-5" />
                        Colors
                    </CardTitle>
                    <CardDescription>
                        Customize background and text colors using hex codes
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Background Color</Label>
                            <div className="flex gap-2">
                                <RhfTextField
                                    control={control}
                                    name="bgColor"
                                    placeholder="c0c0c0"
                                    maxLength={6}
                                    className="font-mono"
                                    onCustomChange={(event) =>
                                        handleColorChange(
                                            "bgColor",
                                            event.target.value
                                        )
                                    }
                                />
                                <div
                                    className="w-10 h-10 rounded border border-border shrink-0"
                                    style={{ backgroundColor: `#${bgColor}` }}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Text Color</Label>
                            <div className="flex gap-2">
                                <RhfTextField
                                    control={control}
                                    name="textColor"
                                    placeholder="F0F8FF"
                                    maxLength={6}
                                    className="font-mono"
                                    onCustomChange={(event) =>
                                        handleColorChange(
                                            "textColor",
                                            event.target.value
                                        )
                                    }
                                />
                                <div
                                    className="w-10 h-10 rounded border border-border shrink-0"
                                    style={{ backgroundColor: `#${textColor}` }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Color Presets */}
                    <div className="space-y-2">
                        <Label className="text-sm">Color Presets</Label>
                        <div className="flex flex-wrap gap-2">
                            {[
                                {
                                    label: "Light",
                                    bg: "f5f5f5",
                                    text: "333333",
                                },
                                { label: "Dark", bg: "1a1a1a", text: "ffffff" },
                                { label: "Blue", bg: "3b82f6", text: "ffffff" },
                                {
                                    label: "Green",
                                    bg: "10b981",
                                    text: "ffffff",
                                },
                                {
                                    label: "Purple",
                                    bg: "8b5cf6",
                                    text: "ffffff",
                                },
                            ].map(({ label, bg, text }) => (
                                <Button
                                    key={label}
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {
                                        setValue("bgColor", bg);
                                        setValue("textColor", text);
                                    }}
                                    type="button"
                                    className="flex items-center gap-2"
                                >
                                    <div className="flex gap-1">
                                        <div
                                            className="w-3 h-3 rounded-sm border"
                                            style={{
                                                backgroundColor: `#${bg}`,
                                            }}
                                        />
                                        <div
                                            className="w-3 h-3 rounded-sm border"
                                            style={{
                                                backgroundColor: `#${text}`,
                                            }}
                                        />
                                    </div>
                                    {label}
                                </Button>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Text & Typography Card */}
            <Card className="border-0 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm shadow-lg">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Type className="h-5 w-5" />
                        Text & Typography
                    </CardTitle>
                    <CardDescription>
                        Add custom text and control font sizing
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <RhfTextField
                        control={control}
                        name="text"
                        label="Text Content"
                        placeholder="Enter your text (optional)"
                    />

                    <div className="space-y-2">
                        <div className="flex justify-between items-center">
                            <Label htmlFor="fontSize">
                                Font Size (px, optional)
                            </Label>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={onSuggestFontSize}
                                disabled={isPending || !text}
                                className="text-primary hover:text-primary shrink-0"
                                type="button"
                            >
                                {isPending ? (
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                ) : (
                                    <Wand2 className="mr-2 h-4 w-4" />
                                )}
                                <span className="hidden sm:inline">
                                    AI Suggest
                                </span>
                                <Badge variant="secondary" className="ml-2">
                                    AI
                                </Badge>
                            </Button>
                        </div>
                        <RhfTextField
                            control={control}
                            name="fontSize"
                            type="number"
                            placeholder="Auto-calculated or AI suggested"
                            min={1}
                            max={500}
                        />
                        {text && !fontSize && (
                            <p className="text-xs text-muted-foreground">
                                Leave empty for auto-calculated font size based
                                on dimensions
                            </p>
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* Output Settings Card */}
            <Card className="border-0 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm shadow-lg">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <FileImage className="h-5 w-5" />
                        Output Settings
                    </CardTitle>
                    <CardDescription>
                        Choose the output format for your placeholder image
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <RhfSelect
                        control={control}
                        name="format"
                        label="Image Format"
                        options={formatOptions}
                        placeholder="Select format"
                    />

                    {/* Format Information */}
                    <div className="mt-4 p-3 bg-muted rounded-lg">
                        <div className="text-sm space-y-1">
                            <div className="font-medium">Format Guide:</div>
                            <div className="grid grid-cols-1 gap-1 text-muted-foreground">
                                <div>
                                    • <span className="font-medium">PNG:</span>{" "}
                                    Best quality, supports transparency
                                </div>
                                <div>
                                    • <span className="font-medium">JPG:</span>{" "}
                                    Smaller file size, good for photos
                                </div>
                                <div>
                                    • <span className="font-medium">WebP:</span>{" "}
                                    Modern format, excellent compression
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default PlaceholderForm;
