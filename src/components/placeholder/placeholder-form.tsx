"use client";

import type { Dispatch, SetStateAction } from "react";
import { useTransition, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { PlaceholdrOptions } from "@/app/page";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Wand2, Loader2 } from "lucide-react";
import { handleSuggestFontSize } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";
import { placeholderFormSchema, type PlaceholderFormData } from "@/lib/schemas";
import RhfTextField from "../ui/rhfTextfield/rhf-textfield";
import RhfSelect from "../ui/rhfSelect/rhf-select";

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

        setOptions((prev) => ({
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
        <Card className="w-full shadow-lg border-2 border-transparent hover:border-primary/20 transition-all duration-300">
            <CardHeader>
                <CardTitle className="text-2xl font-headline">
                    Customize Your Placeholder
                </CardTitle>
                <CardDescription>
                    Adjust the settings below to generate your image.
                </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
                <div className="grid md:grid-cols-2 gap-4">
                    <RhfTextField
                        control={control}
                        name="width"
                        label="Width (px)"
                        type="number"
                        min={1}
                    />
                    <RhfTextField
                        control={control}
                        name="height"
                        label="Height (px)"
                        type="number"
                        min={1}
                    />
                </div>

                <RhfSelect
                    control={control}
                    name="format"
                    label="Format"
                    options={formatOptions}
                    placeholder="Select format"
                />

                <div className="grid md:grid-cols-2 gap-4">
                    <RhfTextField
                        control={control}
                        name="bgColor"
                        label="Background Color"
                        placeholder="c0c0c0"
                        maxLength={6}
                        className="font-mono"
                        onCustomChange={(event) =>
                            handleColorChange("bgColor", event.target.value)
                        }
                    />
                    <RhfTextField
                        control={control}
                        name="textColor"
                        label="Text Color"
                        placeholder="F0F8FF"
                        maxLength={6}
                        className="font-mono"
                        onCustomChange={(event) =>
                            handleColorChange("bgColor", event.target.value)
                        }
                    />
                </div>

                <RhfTextField
                    control={control}
                    name="text"
                    label="Optional Text"
                    placeholder="Enter text..."
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
                            disabled={isPending}
                            className="text-primary hover:text-primary shrink-0"
                        >
                            {isPending ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                                <Wand2 className="mr-2 h-4 w-4" />
                            )}
                            AI Suggest
                        </Button>
                    </div>
                    <RhfTextField
                        control={control}
                        name="fontSize"
                        type="number"
                        placeholder="Auto or AI suggested"
                        min={1}
                    />
                </div>
            </CardContent>
        </Card>
    );
};

export default PlaceholderForm;
