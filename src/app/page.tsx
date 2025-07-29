"use client";

import { useState, useMemo, useEffect } from "react";
import Header from "@/components/header";
import PlaceholdrForm from "@/components/placeholdr-form";
import ImagePreview from "@/components/image-preview";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export interface PlaceholdrOptions {
    width: number;
    height: number;
    text: string;
    bgColor: string;
    textColor: string;
    format: "png" | "jpg" | "webp";
    fontSize: number | null;
}

export default function Home() {
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
            <div className="flex flex-col min-h-screen bg-background">
                <Header />
                <main className="flex-1 grid md:grid-cols-2 gap-8 p-4 md:p-8 items-start">
                    <Card className="w-full shadow-lg">
                        <CardHeader>
                            <Skeleton className="h-8 w-3/4" />
                            <Skeleton className="h-4 w-1/2" />
                        </CardHeader>
                        <CardContent className="grid gap-6">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Skeleton className="h-6 w-1/4" />
                                    <Skeleton className="h-10 w-full" />
                                </div>
                                <div className="space-y-2">
                                    <Skeleton className="h-6 w-1/4" />
                                    <Skeleton className="h-10 w-full" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Skeleton className="h-6 w-1/4" />
                                <Skeleton className="h-10 w-full" />
                            </div>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Skeleton className="h-6 w-1/4" />
                                    <Skeleton className="h-10 w-full" />
                                </div>
                                <div className="space-y-2">
                                    <Skeleton className="h-6 w-1/4" />
                                    <Skeleton className="h-10 w-full" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Skeleton className="h-6 w-1/4" />
                                <Skeleton className="h-10 w-full" />
                            </div>
                            <div className="space-y-2">
                                <Skeleton className="h-6 w-1/4" />
                                <Skeleton className="h-10 w-full" />
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="w-full shadow-lg sticky top-24">
                        <CardHeader>
                            <Skeleton className="h-8 w-1/2" />
                            <Skeleton className="h-4 w-1/3" />
                        </CardHeader>
                        <CardContent className="flex justify-center items-center bg-muted/50 rounded-lg p-4 min-h-[400px]">
                            <Skeleton className="w-full h-[250px]" />
                        </CardContent>
                        <CardFooter className="flex-col items-start gap-4 pt-6">
                            <Skeleton className="h-6 w-1/4" />
                            <div className="flex gap-2 w-full">
                                <Skeleton className="h-10 flex-1" />
                                <Skeleton className="h-10 w-10" />
                            </div>
                            <div className="flex gap-2">
                                <Skeleton className="h-10 w-32" />
                                <Skeleton className="h-10 w-40" />
                            </div>
                        </CardFooter>
                    </Card>
                </main>
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen bg-background">
            <Header />
            <main className="flex-1 grid md:grid-cols-2 gap-8 p-4 md:p-8 items-start max-w-screen-2xl mx-auto">
                <PlaceholdrForm options={options} setOptions={setOptions} />
                <ImagePreview options={options} url={imageUrl} />
            </main>
        </div>
    );
}
