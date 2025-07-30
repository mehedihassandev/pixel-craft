"use client";

import Image from "next/image";
import type { PlaceholdrOptions } from "@/app/page";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Copy, Download, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ImagePreviewProps {
    options: PlaceholdrOptions;
    url: string;
}

export const ImagePreview = ({ options, url }: ImagePreviewProps) => {
    const { toast } = useToast();

    const handleDownload = async () => {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error("Network response was not ok.");
            const blob = await response.blob();
            const objectUrl = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = objectUrl;
            a.download = `placeholdr-${options.width}x${options.height}.${options.format}`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(objectUrl);
        } catch (error) {
            console.error("Download failed:", error);
            toast({
                variant: "destructive",
                title: "Download Failed",
                description:
                    "Could not download the image. Try opening the URL in a new tab and saving from there.",
            });
        }
    };

    return (
        <Card className="w-full shadow-lg sticky top-24 border-2 border-transparent hover:border-primary/20 transition-all duration-300">
            <CardHeader>
                <CardTitle>Live Preview</CardTitle>
                <CardDescription>
                    Your generated placeholder image updates in real-time.
                </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center items-center rounded-lg p-4 min-h-[200px]">
                <Image
                    key={url}
                    src={url}
                    alt={`Placeholder image with text: ${options.text}`}
                    width={options.width > 800 ? 800 : options.width}
                    height={options.height > 600 ? 600 : options.height}
                    className="rounded-md shadow-md object-contain transition-all duration-300"
                    style={{
                        maxWidth: "100%",
                        height: "auto",
                        aspectRatio: `${options.width} / ${options.height}`,
                        backgroundColor: `#${options.bgColor}`,
                    }}
                    unoptimized
                    data-ai-hint="abstract background"
                />
            </CardContent>
            <CardFooter className="flex-col items-start gap-4 pt-2">
                <div className="flex flex-wrap gap-2">
                    <Button
                        onClick={handleDownload}
                        className="transition-transform duration-200 hover:scale-105"
                    >
                        <Download className="mr-2 h-4 w-4" />
                        Download
                    </Button>
                    <Button
                        variant="secondary"
                        asChild
                        className="transition-transform duration-200 hover:scale-105"
                    >
                        <a href={url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="mr-2 h-4 w-4" />
                            Open in New Tab
                        </a>
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
};

export default ImagePreview;
