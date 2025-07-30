"use client";

import { useState, useMemo, useEffect } from "react";
import { ImagePreview } from "@/components/placeholder/image-preview";
import { Skeleton } from "@/components/ui/skeleton";
import { PlaceholderForm } from "@/components/placeholder/placeholder-form";

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
        <div className="flex flex-col py-14">
            <main className="flex-1 grid md:grid-cols-2 gap-8 p-4 md:p-8 items-center max-w-screen-2xl mx-auto">
                <PlaceholderForm options={options} setOptions={setOptions} />
                <ImagePreview options={options} url={imageUrl} />
            </main>
        </div>
    );
};

export default Placeholder;
