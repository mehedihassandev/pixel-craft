import { IMenus } from "@/models/menus";
import { ROUTER } from "./router";

export const menus: IMenus[] = [
    {
        id: "placeholder",
        label: "Placeholder",
        href: ROUTER.PLACEHOLDER,
        icon: "ImageIcon",
    },
    {
        id: "resize",
        label: "Resize",
        href: ROUTER.RESIZE,
        icon: "Maximize",
    },
    {
        id: "background-remove",
        label: "Background Remove",
        href: ROUTER.BACKGROUND_REMOVE,
        icon: "Eraser",
    },
    // {
    //     id: "image-optimization",
    //     label: "Image Optimization",
    //     href: ROUTER.IMAGE_OPTIMIZATION,
    //     icon: "Zap",
    // },
    {
        id: "image-compress",
        label: "Image Compress",
        href: ROUTER.IMAGE_COMPRESS,
        icon: "Archive",
    },
    // {
    //     id: "add-background-ai",
    //     label: "Add Background with AI",
    //     href: ROUTER.ADD_BACKGROUND_AI,
    //     icon: "Sparkles",
    // },
    {
        id: "ocr",
        label: "OCR Text Extract",
        href: ROUTER.OCR,
        icon: "FileText",
    },
    {
        id: "png-to-svg",
        label: "PNG to SVG",
        href: ROUTER.PNG_TO_SVG,
        icon: "Layers",
    },
];
