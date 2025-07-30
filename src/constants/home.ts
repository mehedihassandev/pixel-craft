import { ROUTER } from "@/navigation/router";
import {
    Archive,
    Eraser,
    FileText,
    ImageIcon,
    Layers,
    Maximize,
    Sparkles,
    Zap,
} from "lucide-react";

export const features = [
    {
        id: "placeholder",
        title: "Placeholder Generator",
        description:
            "Create custom placeholder images with various dimensions, colors, and text for your projects.",
        icon: ImageIcon,
        href: ROUTER.PLACEHOLDER,
        color: "bg-blue-500",
        gradient: "from-blue-500 to-blue-600",
        popular: true,
    },
    {
        id: "resize",
        title: "Image Resize",
        description:
            "Resize images to specific dimensions while maintaining quality and aspect ratio.",
        icon: Maximize,
        href: ROUTER.RESIZE,
        color: "bg-green-500",
        gradient: "from-green-500 to-green-600",
    },
    {
        id: "background-remove",
        title: "Background Remove",
        description:
            "Remove backgrounds from images automatically using advanced AI technology.",
        icon: Eraser,
        href: ROUTER.BACKGROUND_REMOVE,
        color: "bg-red-500",
        gradient: "from-red-500 to-red-600",
        aiPowered: true,
    },
    {
        id: "image-compress",
        title: "Image Compress",
        description:
            "Reduce file size without compromising quality. Perfect for web optimization.",
        icon: Archive,
        href: ROUTER.IMAGE_COMPRESS,
        color: "bg-purple-500",
        gradient: "from-purple-500 to-purple-600",
    },
    {
        id: "image-optimize",
        title: "Image Optimize",
        description:
            "Optimize images for web performance with advanced compression algorithms.",
        icon: Zap,
        href: ROUTER.IMAGE_OPTIMIZATION,
        color: "bg-yellow-500",
        gradient: "from-yellow-500 to-yellow-600",
    },
    {
        id: "add-background-ai",
        title: "AI Background",
        description:
            "Add stunning backgrounds to your images using artificial intelligence.",
        icon: Sparkles,
        href: ROUTER.ADD_BACKGROUND_AI,
        color: "bg-pink-500",
        gradient: "from-pink-500 to-pink-600",
        aiPowered: true,
        new: true,
    },
    {
        id: "ocr",
        title: "OCR Text Extract",
        description:
            "Extract text from images with high accuracy using optical character recognition.",
        icon: FileText,
        href: ROUTER.OCR,
        color: "bg-indigo-500",
        gradient: "from-indigo-500 to-indigo-600",
        aiPowered: true,
    },
    {
        id: "png-to-svg",
        title: "PNG to SVG",
        description:
            "Convert PNG images to scalable SVG format with AI-powered vectorization.",
        icon: Layers,
        href: ROUTER.PNG_TO_SVG,
        color: "bg-teal-500",
        gradient: "from-teal-500 to-teal-600",
        aiPowered: true,
    },
];
