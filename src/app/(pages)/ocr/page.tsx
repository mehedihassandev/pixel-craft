
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText } from "lucide-react";
import { OcrForm } from "@/components/ocr/ocr-form";
import { BatchOcr } from "@/components/ocr/batch-ocr";
import {
    ocrFeatures,
    ocrUseCases,
    ocrTechnicalSpecs,
    ocrSupportedLanguages,
    ocrBrowserSupport,
    ocrHeaderBadges,
    ocrTips,
    ocrPerformanceFeatures,
} from "@/constants/ocr";

export default function OcrPage() {
    return (
        <div className="container mx-auto px-4 py-8 space-y-12 max-w-7xl relative">
            {/* Background Pattern */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute top-0 left-1/4 w-72 h-72 bg-gradient-to-r from-blue-300/20 to-cyan-300/20 rounded-full blur-3xl"></div>
                <div className="absolute top-20 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-300/20 to-pink-300/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-gradient-to-r from-green-300/20 to-emerald-300/20 rounded-full blur-3xl"></div>
            </div>

            {/* Header */}
            <div className="text-center space-y-4 relative">
                <div className="flex justify-center items-center gap-3 mb-4">
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full blur-md opacity-50 animate-pulse"></div>
                        <div className="relative p-4 bg-gradient-to-br from-blue-500/20 via-cyan-500/20 to-purple-500/20 rounded-full border border-blue-500/30 backdrop-blur-sm">
                            <FileText className="h-8 w-8 text-blue-600" />
                        </div>
                    </div>
                    <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-r from-gray-900 via-blue-900 to-cyan-900 dark:from-white dark:via-blue-300 dark:to-cyan-300 bg-clip-text text-transparent">
                        OCR Text Extractor
                    </h1>
                </div>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                    Extract text from images with advanced AI-powered Optical
                    Character Recognition. Support for 35+ languages, multiple
                    formats, and real-time processing.
                </p>
                <div className="flex justify-center gap-3 flex-wrap mt-6">
                    {ocrHeaderBadges.map((badge) => {
                        const IconComponent = badge.icon;
                        return (
                            <Badge
                                key={badge.label}
                                variant="secondary"
                                className="flex items-center gap-2 hover:bg-blue-100 dark:hover:bg-blue-900/20 transition-all duration-300 hover:scale-105 px-4 py-2 text-sm"
                            >
                                <div className="p-1 bg-blue-100 dark:bg-blue-900/20 rounded-full">
                                    <IconComponent className="h-3 w-3 text-blue-600" />
                                </div>
                                {badge.label}
                            </Badge>
                        );
                    })}
                </div>
            </div>

            {/* Features Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <Card className="text-center hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group border-0 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm shadow-lg hover:shadow-blue-500/25">
                    <CardContent className="pt-8 pb-6">
                        <div className="flex justify-center mb-4">
                            <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-2xl group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-blue-500/25">
                                <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                            </div>
                        </div>
                        <h3 className="font-bold text-lg mb-3 group-hover:text-primary transition-colors">
                            35+ Languages
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Extract text from images in multiple languages with
                            high accuracy
                        </p>
                    </CardContent>
                </Card>

                <Card className="text-center hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group border-0 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm shadow-lg hover:shadow-green-500/25">
                    <CardContent className="pt-8 pb-6">
                        <div className="flex justify-center mb-4">
                            <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-2xl group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-green-500/25">
                                <FileText className="h-5 w-5 text-green-600 dark:text-green-400" />
                            </div>
                        </div>
                        <h3 className="font-bold text-lg mb-3 group-hover:text-primary transition-colors">
                            Batch Processing
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Process multiple images at once for efficient text
                            extraction
                        </p>
                    </CardContent>
                </Card>

                <Card className="text-center hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group border-0 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm shadow-lg hover:shadow-purple-500/25">
                    <CardContent className="pt-8 pb-6">
                        <div className="flex justify-center mb-4">
                            <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-2xl group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-purple-500/25">
                                <FileText className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                            </div>
                        </div>
                        <h3 className="font-bold text-lg mb-3 group-hover:text-primary transition-colors">
                            Real-time Preview
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            See extracted text instantly with confidence scores
                            and regions
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Main Content */}
            <div className="relative space-y-12">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-cyan-500/5 to-purple-500/5 rounded-3xl blur-xl"></div>
                <div className="relative space-y-12">
                    {/* OCR Form Section */}
                    <div className="space-y-6">
                        <div className="text-center">
                            <h2 className="text-3xl font-bold mb-2">
                                Extract Text from Image
                            </h2>
                            <p className="text-muted-foreground">
                                Upload an image and extract text using advanced
                                OCR technology
                            </p>
                        </div>
                        <OcrForm />
                    </div>

                    {/* Batch Processing Section */}
                    <div className="space-y-6">
                        <div className="text-center">
                            <h2 className="text-3xl font-bold mb-2">
                                Batch Processing
                            </h2>
                            <p className="text-muted-foreground">
                                Process multiple images at once for efficient
                                text extraction
                            </p>
                        </div>
                        <BatchOcr />
                    </div>

                    {/* How to Use Section */}
                    <Card className="mb-8 border-0 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm shadow-2xl">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-3 text-2xl">
                                <div className="p-2 bg-gradient-to-br from-blue-500/20 via-cyan-500/20 to-purple-500/20 rounded-xl border border-blue-500/30">
                                    <FileText className="h-5 w-5 text-blue-600" />
                                </div>
                                How to Use OCR Text Extractor
                            </CardTitle>
                            <CardDescription className="text-lg">
                                Follow these simple steps to extract text from
                                your images
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                <div className="flex flex-col items-center text-center p-4 border border-dashed border-blue-300 rounded-xl hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-all duration-300 group">
                                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                        <span className="text-blue-600 font-bold text-sm">
                                            1
                                        </span>
                                    </div>
                                    <h4 className="font-semibold mb-2 text-sm">
                                        Upload Image
                                    </h4>
                                    <p className="text-xs text-muted-foreground">
                                        Select or drag & drop your image file
                                        (JPG, PNG, WEBP)
                                    </p>
                                </div>
                                <div className="flex flex-col items-center text-center p-4 border border-dashed border-green-300 rounded-xl hover:bg-green-50/50 dark:hover:bg-green-900/10 transition-all duration-300 group">
                                    <div className="w-10 h-10 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                        <span className="text-green-600 font-bold text-sm">
                                            2
                                        </span>
                                    </div>
                                    <h4 className="font-semibold mb-2 text-sm">
                                        Select Language
                                    </h4>
                                    <p className="text-xs text-muted-foreground">
                                        Choose the language of text in your
                                        image for better accuracy
                                    </p>
                                </div>
                                <div className="flex flex-col items-center text-center p-4 border border-dashed border-purple-300 rounded-xl hover:bg-purple-50/50 dark:hover:bg-purple-900/10 transition-all duration-300 group">
                                    <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                        <span className="text-purple-600 font-bold text-sm">
                                            3
                                        </span>
                                    </div>
                                    <h4 className="font-semibold mb-2 text-sm">
                                        Extract Text
                                    </h4>
                                    <p className="text-xs text-muted-foreground">
                                        Click "Extract Text" and see results
                                        with confidence scores
                                    </p>
                                </div>
                                <div className="flex flex-col items-center text-center p-4 border border-dashed border-orange-300 rounded-xl hover:bg-orange-50/50 dark:hover:bg-orange-900/10 transition-all duration-300 group">
                                    <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                        <span className="text-orange-600 font-bold text-sm">
                                            4
                                        </span>
                                    </div>
                                    <h4 className="font-semibold mb-2 text-sm">
                                        Copy & Export
                                    </h4>
                                    <p className="text-xs text-muted-foreground">
                                        Copy text to clipboard or export as
                                        TXT/JSON file
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Features Section */}
                    <div className="space-y-6">
                        <div className="text-center">
                            <h2 className="text-3xl font-bold mb-2">
                                Key Features
                            </h2>
                            <p className="text-muted-foreground">
                                Comprehensive OCR capabilities powered by modern
                                web technologies
                            </p>
                        </div>
                        <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm border-0 shadow-2xl">
                            <CardContent className="pt-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {ocrFeatures.map((feature, index) => {
                                        const IconComponent = feature.icon;
                                        return (
                                            <div
                                                key={index}
                                                className="flex items-start space-x-3 p-6 border rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group bg-white/50 dark:bg-gray-800/50 shadow-md hover:shadow-blue-500/20"
                                            >
                                                <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-xl text-blue-600 group-hover:scale-110 transition-transform shadow-md shadow-blue-500/25">
                                                    <IconComponent className="h-6 w-6" />
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 transition-colors">
                                                        {feature.title}
                                                    </h3>
                                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                                        {feature.description}
                                                    </p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Language Support */}
                        <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm border-0 shadow-2xl">
                            <CardHeader>
                                <CardTitle>Supported Languages</CardTitle>
                                <CardDescription>
                                    Wide range of language support for global
                                    accessibility
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
                                    {ocrSupportedLanguages.map((language) => (
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
                    </div>

                    {/* Use Cases Section */}
                    <div className="space-y-6">
                        <div className="text-center">
                            <h2 className="text-3xl font-bold mb-2">
                                Use Cases
                            </h2>
                            <p className="text-muted-foreground">
                                Discover the various applications of OCR
                                technology
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {ocrUseCases.map((useCase, index) => (
                                <Card
                                    key={index}
                                    className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm border-0 shadow-2xl"
                                >
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
                        <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm border-0 shadow-2xl">
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
                                            {ocrTips.do.map((tip, index) => (
                                                <li key={index}>• {tip}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="space-y-2">
                                        <h4 className="font-medium text-red-700">
                                            ❌ Avoid
                                        </h4>
                                        <ul className="text-sm space-y-1 text-gray-600">
                                            {ocrTips.avoid.map((tip, index) => (
                                                <li key={index}>• {tip}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Technical Section */}
                    <div className="space-y-6">
                        <div className="text-center">
                            <h2 className="text-3xl font-bold mb-2">
                                Technical Specifications
                            </h2>
                            <p className="text-muted-foreground">
                                Detailed technical information about the OCR
                                engine and capabilities
                            </p>
                        </div>
                        <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm border-0 shadow-2xl">
                            <CardContent className="pt-8">
                                <div className="space-y-4">
                                    {ocrTechnicalSpecs.map((spec, index) => (
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
                        <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm border-0 shadow-2xl">
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
                                            {ocrPerformanceFeatures.performance.map(
                                                (feature, index) => (
                                                    <li key={index}>
                                                        • {feature}
                                                    </li>
                                                )
                                            )}
                                        </ul>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900 mb-3">
                                            🔒 Privacy
                                        </h4>
                                        <ul className="text-sm space-y-1 text-gray-600">
                                            {ocrPerformanceFeatures.privacy.map(
                                                (feature, index) => (
                                                    <li key={index}>
                                                        • {feature}
                                                    </li>
                                                )
                                            )}
                                        </ul>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Browser Support */}
                        <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm border-0 shadow-2xl">
                            <CardHeader>
                                <CardTitle>Browser Compatibility</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {ocrBrowserSupport.map((browser) => (
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
                    </div>
                </div>
            </div>
        </div>
    );
}
