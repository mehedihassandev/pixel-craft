"use client";

import { useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    FileText,
    Eye,
    Languages,
    Zap,
    Camera,
    Upload,
    Brain,
    Globe,
    Smartphone,
    Cpu,
    Download,
} from "lucide-react";
import { OcrForm } from "@/components/ocr/ocr-form";
import { BatchOcr } from "@/components/ocr/batch-ocr";

export default function OcrPage() {
    const [activeTab, setActiveTab] = useState("extract");

    const features = [
        {
            icon: <Languages className="h-6 w-6" />,
            title: "Multi-Language Support",
            description:
                "Support for 35+ languages including English, Chinese, Japanese, Arabic, and more",
        },
        {
            icon: <Brain className="h-6 w-6" />,
            title: "AI-Powered Recognition",
            description:
                "Advanced neural network models for high accuracy text recognition",
        },
        {
            icon: <Zap className="h-6 w-6" />,
            title: "Fast Processing",
            description:
                "Real-time OCR processing with optimized WebAssembly engine",
        },
        {
            icon: <Camera className="h-6 w-6" />,
            title: "Camera Integration",
            description: "Capture text directly from your device camera",
        },
        {
            icon: <Upload className="h-6 w-6" />,
            title: "Multiple Formats",
            description:
                "Support for PNG, JPG, WebP, BMP, TIFF and other image formats",
        },
        {
            icon: <Download className="h-6 w-6" />,
            title: "Export Options",
            description: "Export results as TXT, JSON, or hOCR formats",
        },
    ];

    const useCases = [
        {
            title: "Document Digitization",
            description:
                "Convert scanned documents, receipts, and invoices into editable text",
            examples: [
                "Business cards",
                "Receipts",
                "Invoices",
                "Legal documents",
            ],
        },
        {
            title: "Education & Research",
            description:
                "Extract text from textbooks, research papers, and handwritten notes",
            examples: [
                "Textbook pages",
                "Research papers",
                "Handwritten notes",
                "Whiteboards",
            ],
        },
        {
            title: "Accessibility",
            description:
                "Help visually impaired users access text content from images",
            examples: [
                "Street signs",
                "Menu cards",
                "Product labels",
                "Instructions",
            ],
        },
        {
            title: "Content Management",
            description:
                "Organize and search through image-based content libraries",
            examples: [
                "Photo archives",
                "Historical documents",
                "Marketing materials",
                "Screenshots",
            ],
        },
    ];

    const technicalSpecs = [
        {
            feature: "Recognition Engine",
            value: "Tesseract.js v6.0+",
            description: "Google's OCR engine compiled to WebAssembly",
        },
        {
            feature: "Supported Languages",
            value: "35+ Languages",
            description: "Including Latin, Asian, Arabic, and Cyrillic scripts",
        },
        {
            feature: "Image Formats",
            value: "PNG, JPG, WebP, BMP, TIFF",
            description: "All major image formats supported",
        },
        {
            feature: "Maximum File Size",
            value: "10MB",
            description: "Optimized for web performance",
        },
        {
            feature: "Processing Mode",
            value: "Client-side",
            description: "No server upload required - privacy protected",
        },
        {
            feature: "Output Formats",
            value: "TXT, JSON, hOCR",
            description: "Multiple export options with coordinate data",
        },
    ];

    return (
        <div className="container mx-auto px-4 py-8 space-y-8 max-w-7xl">
            {/* Header */}
            <div className="text-center space-y-4">
                <div className="flex justify-center items-center gap-3 mb-4">
                    <div className="p-3 bg-blue-100 rounded-full">
                        <FileText className="h-8 w-8 text-blue-600" />
                    </div>
                    <h1 className="text-4xl font-bold text-gray-900">
                        OCR Text Extractor
                    </h1>
                </div>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                    Extract text from images with advanced AI-powered Optical
                    Character Recognition. Support for 35+ languages, multiple
                    formats, and real-time processing.
                </p>
                <div className="flex justify-center gap-2 flex-wrap">
                    <Badge
                        variant="secondary"
                        className="flex items-center gap-1"
                    >
                        <Globe className="h-3 w-3" />
                        35+ Languages
                    </Badge>
                    <Badge
                        variant="secondary"
                        className="flex items-center gap-1"
                    >
                        <Cpu className="h-3 w-3" />
                        Client-side Processing
                    </Badge>
                    <Badge
                        variant="secondary"
                        className="flex items-center gap-1"
                    >
                        <Smartphone className="h-3 w-3" />
                        Mobile Friendly
                    </Badge>
                    <Badge
                        variant="secondary"
                        className="flex items-center gap-1"
                    >
                        <Eye className="h-3 w-3" />
                        Privacy Protected
                    </Badge>
                </div>
            </div>

            {/* Main Content */}
            <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="space-y-6"
            >
                <TabsList className="grid w-full grid-cols-5">
                    <TabsTrigger value="extract">Extract Text</TabsTrigger>
                    <TabsTrigger value="batch">Batch Process</TabsTrigger>
                    <TabsTrigger value="features">Features</TabsTrigger>
                    <TabsTrigger value="use-cases">Use Cases</TabsTrigger>
                    <TabsTrigger value="technical">Technical</TabsTrigger>
                </TabsList>

                {/* OCR Form Tab */}
                <TabsContent value="extract" className="space-y-6">
                    <OcrForm />
                </TabsContent>

                {/* Batch Processing Tab */}
                <TabsContent value="batch" className="space-y-6">
                    <BatchOcr />
                </TabsContent>

                {/* Features Tab */}
                <TabsContent value="features" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Key Features</CardTitle>
                            <CardDescription>
                                Comprehensive OCR capabilities powered by modern
                                web technologies
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {features.map((feature, index) => (
                                    <div
                                        key={index}
                                        className="flex items-start space-x-3 p-4 border rounded-lg"
                                    >
                                        <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                                            {feature.icon}
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900 mb-1">
                                                {feature.title}
                                            </h3>
                                            <p className="text-sm text-gray-600">
                                                {feature.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Language Support */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Supported Languages</CardTitle>
                            <CardDescription>
                                Wide range of language support for global
                                accessibility
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
                                {[
                                    "English",
                                    "Spanish",
                                    "French",
                                    "German",
                                    "Italian",
                                    "Portuguese",
                                    "Russian",
                                    "Japanese",
                                    "Chinese (Simplified)",
                                    "Chinese (Traditional)",
                                    "Korean",
                                    "Arabic",
                                    "Hindi",
                                    "Thai",
                                    "Vietnamese",
                                    "Hebrew",
                                    "Bengali",
                                    "Tamil",
                                    "Telugu",
                                    "Marathi",
                                    "Gujarati",
                                    "Kannada",
                                    "Oriya",
                                    "Punjabi",
                                    "Assamese",
                                    "Nepali",
                                    "Sinhala",
                                    "Myanmar",
                                    "Khmer",
                                    "Lao",
                                    "Tibetan",
                                    "Urdu",
                                    "Persian",
                                    "Pashto",
                                    "Amharic",
                                ].map((language) => (
                                    <Badge
                                        key={language}
                                        variant="outline"
                                        className="justify-center"
                                    >
                                        {language}
                                    </Badge>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Use Cases Tab */}
                <TabsContent value="use-cases" className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {useCases.map((useCase, index) => (
                            <Card key={index}>
                                <CardHeader>
                                    <CardTitle>{useCase.title}</CardTitle>
                                    <CardDescription>
                                        {useCase.description}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-2">
                                        <h4 className="text-sm font-medium text-gray-700">
                                            Examples:
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {useCase.examples.map(
                                                (example, idx) => (
                                                    <Badge
                                                        key={idx}
                                                        variant="secondary"
                                                    >
                                                        {example}
                                                    </Badge>
                                                )
                                            )}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Tips Card */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Tips for Best Results</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <h4 className="font-medium text-green-700">
                                        ✅ Do
                                    </h4>
                                    <ul className="text-sm space-y-1 text-gray-600">
                                        <li>
                                            • Use high-resolution images (300+
                                            DPI)
                                        </li>
                                        <li>
                                            • Ensure good lighting and contrast
                                        </li>
                                        <li>
                                            • Keep text horizontal and straight
                                        </li>
                                        <li>• Use clear, sharp images</li>
                                        <li>• Select the correct language</li>
                                    </ul>
                                </div>
                                <div className="space-y-2">
                                    <h4 className="font-medium text-red-700">
                                        ❌ Avoid
                                    </h4>
                                    <ul className="text-sm space-y-1 text-gray-600">
                                        <li>• Blurry or low-quality images</li>
                                        <li>
                                            • Handwritten text (unless very
                                            clear)
                                        </li>
                                        <li>• Complex backgrounds</li>
                                        <li>• Rotated or skewed text</li>
                                        <li>• Very small text sizes</li>
                                    </ul>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Technical Tab */}
                <TabsContent value="technical" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Technical Specifications</CardTitle>
                            <CardDescription>
                                Detailed technical information about the OCR
                                engine and capabilities
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {technicalSpecs.map((spec, index) => (
                                    <div
                                        key={index}
                                        className="flex justify-between items-start p-4 border rounded-lg"
                                    >
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-gray-900">
                                                {spec.feature}
                                            </h3>
                                            <p className="text-sm text-gray-600 mt-1">
                                                {spec.description}
                                            </p>
                                        </div>
                                        <Badge
                                            variant="outline"
                                            className="ml-4"
                                        >
                                            {spec.value}
                                        </Badge>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Performance Notes */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Performance & Privacy</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-3">
                                        🚀 Performance
                                    </h4>
                                    <ul className="text-sm space-y-1 text-gray-600">
                                        <li>
                                            • Client-side processing (no server
                                            upload)
                                        </li>
                                        <li>
                                            • WebAssembly for native-like
                                            performance
                                        </li>
                                        <li>
                                            • Progressive loading of language
                                            models
                                        </li>
                                        <li>• Optimized for modern browsers</li>
                                        <li>• Real-time progress tracking</li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-3">
                                        🔒 Privacy
                                    </h4>
                                    <ul className="text-sm space-y-1 text-gray-600">
                                        <li>
                                            • Images never leave your device
                                        </li>
                                        <li>• No data collection or storage</li>
                                        <li>
                                            • No account registration required
                                        </li>
                                        <li>• GDPR compliant by design</li>
                                        <li>• Open source technology</li>
                                    </ul>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Browser Support */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Browser Compatibility</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {[
                                    {
                                        name: "Chrome",
                                        version: "57+",
                                        status: "Full Support",
                                    },
                                    {
                                        name: "Firefox",
                                        version: "52+",
                                        status: "Full Support",
                                    },
                                    {
                                        name: "Safari",
                                        version: "11+",
                                        status: "Full Support",
                                    },
                                    {
                                        name: "Edge",
                                        version: "16+",
                                        status: "Full Support",
                                    },
                                ].map((browser) => (
                                    <div
                                        key={browser.name}
                                        className="text-center p-3 border rounded-lg"
                                    >
                                        <h4 className="font-medium">
                                            {browser.name}
                                        </h4>
                                        <p className="text-sm text-gray-600">
                                            {browser.version}
                                        </p>
                                        <Badge
                                            variant="secondary"
                                            className="mt-1 text-xs"
                                        >
                                            {browser.status}
                                        </Badge>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
