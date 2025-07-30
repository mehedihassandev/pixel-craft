"use client";

import { useState, useMemo, useEffect } from "react";
import { ImagePreview } from "@/components/placeholder/image-preview";
import { Skeleton } from "@/components/ui/skeleton";
import { PlaceholderForm } from "@/components/placeholder/placeholder-form";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    ImageIcon,
    Palette,
    Type,
    Settings,
    Zap,
    Download,
    Sparkles,
    Layers,
    Grid3X3,
} from "lucide-react";

export interface PlaceholdrOptions {
    width: number;
    height: number;
    text: string;
    bgColor: string;
    textColor: string;
    format: "png" | "jpg" | "webp";
    fontSize: number | null;
}

export const Placeholder = () => {
    const [options, setOptions] = useState<PlaceholdrOptions>({
        width: 600,
        height: 400,
        text: "",
        bgColor: "c0c0c0",
        textColor: "F0F8FF",
        format: "png",
        fontSize: null,
    });

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const imageUrl = useMemo(() => {
        const { width, height, text, bgColor, textColor, format, fontSize } =
            options;
        if (!mounted) {
            return `https://placehold.co/600x400/EFEFEF/AAAAAA.png?text=Loading...`;
        }

        // Ensure width and height are valid numbers with fallbacks
        const validWidth = width && width > 0 ? width : 600;
        const validHeight = height && height > 0 ? height : 400;

        const cleanBgColor = bgColor.replace("#", "");
        const cleanTextColor = textColor.replace("#", "");
        let url = `https://placehold.co/${validWidth}x${validHeight}/${cleanBgColor}/${cleanTextColor}.${format}?text=${encodeURIComponent(
            text
        )}`;
        if (fontSize && fontSize > 0) {
            url += `&fontSize=${fontSize}`;
        }
        return url;
    }, [options, mounted]);

    if (!mounted) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Skeleton className="w-full max-w-md h-64" />
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-7xl">
            {/* Header */}
            <div className="text-center mb-8">
                <div className="flex items-center justify-center gap-3 mb-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                        <ImageIcon className="h-8 w-8 text-primary" />
                    </div>
                    <h1 className="text-4xl font-bold tracking-tight">
                        Placeholder Generator
                    </h1>
                </div>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Create custom placeholder images with full control over
                    dimensions, colors, text, and format. Perfect for mockups,
                    wireframes, and development.
                </p>
            </div>

            {/* Features Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <Card className="text-center">
                    <CardContent className="pt-6">
                        <div className="flex justify-center mb-3">
                            <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                                <Grid3X3 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                            </div>
                        </div>
                        <h3 className="font-semibold mb-2">
                            Custom Dimensions
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            Set any width and height up to 5000px
                        </p>
                    </CardContent>
                </Card>

                <Card className="text-center">
                    <CardContent className="pt-6">
                        <div className="flex justify-center mb-3">
                            <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                                <Palette className="h-6 w-6 text-green-600 dark:text-green-400" />
                            </div>
                        </div>
                        <h3 className="font-semibold mb-2">Color Control</h3>
                        <p className="text-sm text-muted-foreground">
                            Customize background and text colors
                        </p>
                    </CardContent>
                </Card>

                <Card className="text-center">
                    <CardContent className="pt-6">
                        <div className="flex justify-center mb-3">
                            <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                                <Type className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                            </div>
                        </div>
                        <h3 className="font-semibold mb-2">
                            Text & Typography
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            Add custom text with AI-suggested font sizes
                        </p>
                    </CardContent>
                </Card>

                <Card className="text-center">
                    <CardContent className="pt-6">
                        <div className="flex justify-center mb-3">
                            <div className="p-2 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
                                <Layers className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                            </div>
                        </div>
                        <h3 className="font-semibold mb-2">Multiple Formats</h3>
                        <p className="text-sm text-muted-foreground">
                            Export as PNG, JPG, or WebP formats
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                {/* Left Column - Form */}
                <div className="space-y-6">
                    <PlaceholderForm
                        options={options}
                        setOptions={setOptions}
                    />
                </div>

                {/* Right Column - Preview */}
                <div className="space-y-6">
                    <ImagePreview options={options} url={imageUrl} />
                </div>
            </div>

            {/* How to Use Section */}
            <Card className="mt-12">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Settings className="h-5 w-5" />
                        How to Use
                    </CardTitle>
                    <CardDescription>
                        Follow these simple steps to create your perfect
                        placeholder image
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="flex flex-col items-center text-center space-y-3">
                            <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-full">
                                <span className="text-sm font-semibold text-primary">
                                    1
                                </span>
                            </div>
                            <h4 className="font-medium">Set Dimensions</h4>
                            <p className="text-sm text-muted-foreground">
                                Enter your desired width and height in pixels
                            </p>
                        </div>

                        <div className="flex flex-col items-center text-center space-y-3">
                            <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-full">
                                <span className="text-sm font-semibold text-primary">
                                    2
                                </span>
                            </div>
                            <h4 className="font-medium">Choose Colors</h4>
                            <p className="text-sm text-muted-foreground">
                                Select background and text colors using hex
                                codes
                            </p>
                        </div>

                        <div className="flex flex-col items-center text-center space-y-3">
                            <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-full">
                                <span className="text-sm font-semibold text-primary">
                                    3
                                </span>
                            </div>
                            <h4 className="font-medium">Add Text</h4>
                            <p className="text-sm text-muted-foreground">
                                Optionally add custom text with AI-suggested
                                sizing
                            </p>
                        </div>

                        <div className="flex flex-col items-center text-center space-y-3">
                            <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-full">
                                <span className="text-sm font-semibold text-primary">
                                    4
                                </span>
                            </div>
                            <h4 className="font-medium">Download & Use</h4>
                            <p className="text-sm text-muted-foreground">
                                Preview in real-time and download in your
                                preferred format
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Features & Tips */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Sparkles className="h-5 w-5" />
                            Smart Features
                        </CardTitle>
                        <CardDescription>
                            Advanced capabilities to enhance your workflow
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-start gap-3">
                            <Badge variant="outline" className="mt-1">
                                AI
                            </Badge>
                            <div>
                                <h4 className="font-medium">
                                    Smart Font Sizing
                                </h4>
                                <p className="text-sm text-muted-foreground">
                                    Get AI-powered font size suggestions based
                                    on your image dimensions for optimal
                                    readability.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <Badge variant="outline" className="mt-1">
                                Live
                            </Badge>
                            <div>
                                <h4 className="font-medium">
                                    Real-time Preview
                                </h4>
                                <p className="text-sm text-muted-foreground">
                                    See your changes instantly with live preview
                                    that updates as you modify settings.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <Badge variant="outline" className="mt-1">
                                Fast
                            </Badge>
                            <div>
                                <h4 className="font-medium">
                                    Instant Generation
                                </h4>
                                <p className="text-sm text-muted-foreground">
                                    No waiting time - placeholders are generated
                                    instantly using optimized APIs.
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Zap className="h-5 w-5" />
                            Pro Tips
                        </CardTitle>
                        <CardDescription>
                            Make the most out of your placeholder images
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-3">
                            <div>
                                <h4 className="font-medium text-sm">
                                    Common Dimensions
                                </h4>
                                <p className="text-sm text-muted-foreground">
                                    Use standard ratios like 16:9 (1920x1080),
                                    4:3 (800x600), or 1:1 (500x500) for better
                                    compatibility.
                                </p>
                            </div>

                            <div>
                                <h4 className="font-medium text-sm">
                                    Color Contrast
                                </h4>
                                <p className="text-sm text-muted-foreground">
                                    Ensure good contrast between background and
                                    text colors for readability (WCAG
                                    guidelines).
                                </p>
                            </div>

                            <div>
                                <h4 className="font-medium text-sm">
                                    Format Selection
                                </h4>
                                <p className="text-sm text-muted-foreground">
                                    Use PNG for transparency support, JPG for
                                    smaller file sizes, WebP for modern
                                    browsers.
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Use Cases */}
            <Card className="mt-8">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Download className="h-5 w-5" />
                        Perfect for
                    </CardTitle>
                    <CardDescription>
                        Common use cases for placeholder images
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center p-4 bg-muted/50 rounded-lg">
                            <h4 className="font-medium mb-1">
                                Web Development
                            </h4>
                            <p className="text-xs text-muted-foreground">
                                Mockups & wireframes
                            </p>
                        </div>
                        <div className="text-center p-4 bg-muted/50 rounded-lg">
                            <h4 className="font-medium mb-1">UI/UX Design</h4>
                            <p className="text-xs text-muted-foreground">
                                Prototypes & layouts
                            </p>
                        </div>
                        <div className="text-center p-4 bg-muted/50 rounded-lg">
                            <h4 className="font-medium mb-1">
                                Content Creation
                            </h4>
                            <p className="text-xs text-muted-foreground">
                                Blog posts & articles
                            </p>
                        </div>
                        <div className="text-center p-4 bg-muted/50 rounded-lg">
                            <h4 className="font-medium mb-1">Testing</h4>
                            <p className="text-xs text-muted-foreground">
                                Image loading tests
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default Placeholder;
