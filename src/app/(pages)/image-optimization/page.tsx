'use client';
import React, { useState } from 'react';
import imageCompression from 'browser-image-compression';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  ImageIcon,
  Zap,
  Download,
  Cloud,
  Shield,
  Gauge,
  Globe,
  CheckCircle,
  Settings,
  FileImage,
  RotateCcw,
} from 'lucide-react';
import { ImageUploadZone } from '@/components/ui/image-upload-zone';

export default function ImageOptimizationPage() {
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [optimizedFile, setOptimizedFile] = useState<Blob | null>(null);
  const [originalSize, setOriginalSize] = useState<number>(0);
  const [optimizedSize, setOptimizedSize] = useState<number>(0);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<string>('');
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string>('');

  const handleFilesSelected = async (files: File[]) => {
    const file = files[0];
    if (!file) return;

    setOriginalFile(file);
    setOriginalSize(file.size);
    setIsOptimizing(true);

    try {
      const options = {
        maxWidthOrHeight: 1920,
        useWebWorker: true,
        fileType: 'image/webp',
        maxSizeMB: 1,
      };
      const compressedBlob = await imageCompression(file, options);
      setOptimizedFile(compressedBlob);
      setOptimizedSize(compressedBlob.size);
      const url = URL.createObjectURL(compressedBlob);
      setPreviewUrl(url);
    } catch (err) {
      console.error('Compression error:', err);
    } finally {
      setIsOptimizing(false);
    }
  };

  const handleUpload = async () => {
    if (!optimizedFile) return;
    setUploadStatus('Uploading...');
    try {
      const formData = new FormData();
      formData.append('file', optimizedFile, originalFile?.name);
      const res = await fetch('/api/image-opt/upload', {
        method: 'POST',
        body: formData,
      });
      const json = await res.json();
      if (json.url) {
        setUploadedImageUrl(json.url);
        setUploadStatus(
          `Upload successful! Original: ${(json.originalSize / 1024).toFixed(2)} KB → Compressed: ${(json.compressedSize / 1024).toFixed(2)} KB`
        );
      } else {
        setUploadStatus(`Upload failed: ${JSON.stringify(json)}`);
      }
    } catch (err) {
      console.error('Upload error:', err);
      setUploadStatus('Upload failed');
    }
  };

  const handleDownload = async () => {
    if (!optimizedFile || !originalFile) return;

    const link = document.createElement('a');
    link.href = URL.createObjectURL(optimizedFile);
    link.download = `optimized_${originalFile.name}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleReset = () => {
    setOriginalFile(null);
    setOptimizedFile(null);
    setOriginalSize(0);
    setOptimizedSize(0);
    setPreviewUrl('');
    setIsOptimizing(false);
    setUploadStatus('');
    setUploadedImageUrl('');

    // Clean up object URLs to prevent memory leaks
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
  };

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
              <ImageIcon className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-r from-gray-900 via-blue-900 to-cyan-900 dark:from-white dark:via-blue-300 dark:to-cyan-300 bg-clip-text text-transparent">
            Image Optimization
          </h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Compress and optimize your images for web with advanced algorithms. Reduce file size by up
          to 90% while maintaining quality with WebP conversion.
        </p>
        <div className="flex justify-center gap-3 flex-wrap mt-6">
          <Badge
            variant="secondary"
            className="flex items-center gap-2 hover:bg-blue-100 dark:hover:bg-blue-900/20 transition-all duration-300 hover:scale-105 px-4 py-2 text-sm"
          >
            <div className="p-1 bg-blue-100 dark:bg-blue-900/20 rounded-full">
              <Zap className="h-3 w-3 text-blue-600" />
            </div>
            Fast Compression
          </Badge>
          <Badge
            variant="secondary"
            className="flex items-center gap-2 hover:bg-green-100 dark:hover:bg-green-900/20 transition-all duration-300 hover:scale-105 px-4 py-2 text-sm"
          >
            <div className="p-1 bg-green-100 dark:bg-green-900/20 rounded-full">
              <Download className="h-3 w-3 text-green-600" />
            </div>
            Download Ready
          </Badge>
          <Badge
            variant="secondary"
            className="flex items-center gap-2 hover:bg-purple-100 dark:hover:bg-purple-900/20 transition-all duration-300 hover:scale-105 px-4 py-2 text-sm"
          >
            <div className="p-1 bg-purple-100 dark:bg-purple-900/20 rounded-full">
              <Cloud className="h-3 w-3 text-purple-600" />
            </div>
            Cloud Upload
          </Badge>
        </div>
      </div>

      {/* Features Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card className="text-center hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group border-0 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm shadow-lg hover:shadow-blue-500/25">
          <CardContent className="pt-8 pb-6">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-2xl group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-blue-500/25">
                <Zap className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <h3 className="font-bold text-lg mb-3 group-hover:text-primary transition-colors">
              WebP Conversion
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Automatic conversion to modern WebP format for optimal compression
            </p>
          </CardContent>
        </Card>

        <Card className="text-center hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group border-0 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm shadow-lg hover:shadow-green-500/25">
          <CardContent className="pt-8 pb-6">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-2xl group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-green-500/25">
                <ImageIcon className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <h3 className="font-bold text-lg mb-3 group-hover:text-primary transition-colors">
              Smart Resize
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Automatically resize images to optimal dimensions (max 1920px)
            </p>
          </CardContent>
        </Card>

        <Card className="text-center hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group border-0 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm shadow-lg hover:shadow-purple-500/25">
          <CardContent className="pt-8 pb-6">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-2xl group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-purple-500/25">
                <Cloud className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
            <h3 className="font-bold text-lg mb-3 group-hover:text-primary transition-colors">
              Cloud Storage
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Upload optimized images to Cloudinary for global CDN delivery
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Form Card */}
      <Card className="border-0 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm shadow-2xl">
        <CardHeader className="text-center pb-6">
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-blue-900 dark:from-white dark:to-blue-300 bg-clip-text text-transparent">
            Upload & Optimize Your Image
          </CardTitle>
          <CardDescription className="text-lg">
            Select an image to compress and optimize for web use
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <ImageUploadZone
            onFilesSelected={handleFilesSelected}
            accept="image/*"
            multiple={false}
            maxFileSize={50}
            title="Click to select image"
            subtitle="Supports JPG, PNG, WebP formats • Max size: 50MB"
            supportedFormats="JPG, PNG, WebP"
            disabled={isOptimizing}
            isProcessing={isOptimizing}
            processingText="Optimizing image..."
            enableDragDrop={true}
          />

          {(originalFile || optimizedFile || uploadStatus || uploadedImageUrl) && (
            <div className="flex justify-center">
              <button
                onClick={handleReset}
                className="flex items-center gap-2 px-4 py-2 text-sm bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-all duration-300 hover:scale-105 shadow-md"
              >
                <RotateCcw className="h-3 w-3" />
                Reset
              </button>
            </div>
          )}

          {originalFile && (
            <Card className="bg-blue-50/50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-800">
              <CardContent className="pt-4">
                <p className="text-sm font-medium">
                  Original size: {(originalSize / 1024).toFixed(2)} KB
                </p>
              </CardContent>
            </Card>
          )}

          {isOptimizing && (
            <Card className="bg-yellow-50/50 dark:bg-yellow-900/10 border-yellow-200 dark:border-yellow-800">
              <CardContent className="pt-4">
                <p className="text-sm font-medium text-yellow-700 dark:text-yellow-300">
                  ⚡ Optimizing image...
                </p>
              </CardContent>
            </Card>
          )}

          {optimizedFile && (
            <Card className="bg-green-50/50 dark:bg-green-900/10 border-green-200 dark:border-green-800">
              <CardContent className="pt-6 space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium text-green-700 dark:text-green-300">
                      Optimized size: {(optimizedSize / 1024).toFixed(2)} KB
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-green-700 dark:text-green-300">
                      Compression:{' '}
                      {(((originalSize - optimizedSize) / originalSize) * 100).toFixed(1)}% smaller
                    </p>
                  </div>
                </div>

                <div className="flex justify-center">
                  <img
                    src={previewUrl}
                    alt="Optimized Preview"
                    className="max-w-full max-h-96 rounded-lg shadow-lg"
                  />
                </div>

                <div className="flex justify-center gap-3 pt-4">
                  <button
                    onClick={handleUpload}
                    className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all duration-300 hover:scale-105 shadow-md hover:shadow-blue-500/25"
                  >
                    <Cloud className="h-3 w-3" />
                    Upload to Cloud
                  </button>
                  <button
                    onClick={handleDownload}
                    className="flex items-center gap-2 px-4 py-2 text-sm bg-green-600 text-white rounded-md hover:bg-green-700 transition-all duration-300 hover:scale-105 shadow-md hover:shadow-green-500/25"
                  >
                    <Download className="h-3 w-3" />
                    Download Optimized
                  </button>
                </div>
              </CardContent>
            </Card>
          )}

          {uploadStatus && (
            <Card className="bg-gray-50/50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700">
              <CardContent className="pt-4">
                <p className="text-sm font-medium">{uploadStatus}</p>
              </CardContent>
            </Card>
          )}

          {uploadedImageUrl && (
            <Card className="bg-purple-50/50 dark:bg-purple-900/10 border-purple-200 dark:border-purple-800">
              <CardContent className="pt-4">
                <p className="text-sm font-medium text-purple-700 dark:text-purple-300 mb-2">
                  Uploaded Image URL:
                </p>
                <a
                  href={uploadedImageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200 underline break-all text-sm"
                >
                  {uploadedImageUrl}
                </a>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>

      {/* How It Works Section */}
      <Card className="border-0 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm shadow-2xl">
        <CardHeader className="text-center pb-6">
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-purple-900 dark:from-white dark:to-purple-300 bg-clip-text text-transparent">
            How Image Optimization Works
          </CardTitle>
          <CardDescription className="text-lg">
            Our advanced compression algorithm in 3 simple steps
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-blue-600">1</span>
                </div>
              </div>
              <h3 className="font-semibold text-lg">Upload & Analyze</h3>
              <p className="text-sm text-muted-foreground">
                We analyze your image dimensions, format, and quality to determine the best
                optimization strategy.
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-green-600">2</span>
                </div>
              </div>
              <h3 className="font-semibold text-lg">Compress & Convert</h3>
              <p className="text-sm text-muted-foreground">
                Smart compression reduces file size while converting to modern WebP format for
                optimal performance.
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-purple-600">3</span>
                </div>
              </div>
              <h3 className="font-semibold text-lg">Download or Upload</h3>
              <p className="text-sm text-muted-foreground">
                Get your optimized image instantly or upload to cloud storage for global CDN
                delivery.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Technical Specifications */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-0 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Settings className="h-5 w-5 text-blue-600" />
              Technical Specifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Max File Size:</span>
                  <span className="font-medium">50MB</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Max Dimensions:</span>
                  <span className="font-medium">1920px</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Output Format:</span>
                  <span className="font-medium">WebP</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Compression:</span>
                  <span className="font-medium">Up to 90%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Processing:</span>
                  <span className="font-medium">Client-side</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Quality:</span>
                  <span className="font-medium">Lossless</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <FileImage className="h-5 w-5 text-green-600" />
              Supported Formats
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {['JPEG', 'PNG', 'WebP', 'HEIC', 'BMP', 'TIFF', 'GIF', 'SVG'].map(format => (
                <div
                  key={format}
                  className="flex items-center gap-2 p-2 bg-green-50/50 dark:bg-green-900/10 rounded-md"
                >
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium">{format}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Benefits */}
      <Card className="border-0 bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-blue-900/10 dark:to-purple-900/10 backdrop-blur-sm shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Performance Benefits
          </CardTitle>
          <CardDescription className="text-lg">
            Why image optimization matters for your website
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center space-y-3">
              <div className="flex justify-center">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-full">
                  <Gauge className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <h3 className="font-semibold text-lg">Faster Loading</h3>
              <p className="text-sm text-muted-foreground">
                Optimized images load up to 5x faster, improving user experience and reducing bounce
                rates.
              </p>
            </div>
            <div className="text-center space-y-3">
              <div className="flex justify-center">
                <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-full">
                  <Shield className="h-6 w-6 text-green-600" />
                </div>
              </div>
              <h3 className="font-semibold text-lg">Better SEO</h3>
              <p className="text-sm text-muted-foreground">
                Faster loading images improve Core Web Vitals scores, boosting your search engine
                rankings.
              </p>
            </div>
            <div className="text-center space-y-3">
              <div className="flex justify-center">
                <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-full">
                  <Globe className="h-6 w-6 text-purple-600" />
                </div>
              </div>
              <h3 className="font-semibold text-lg">Global CDN</h3>
              <p className="text-sm text-muted-foreground">
                Cloudinary CDN ensures your optimized images load quickly worldwide with 99.9%
                uptime.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tips & Best Practices */}
      <Card className="border-0 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-green-900 dark:from-white dark:to-green-300 bg-clip-text text-transparent">
            Optimization Tips & Best Practices
          </CardTitle>
          <CardDescription>Get the most out of your image optimization</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-lg flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                Best Practices
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                  Use high-quality source images for better compression results
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                  Choose appropriate dimensions based on your use case
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                  WebP format provides the best compression-to-quality ratio
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                  Use CDN delivery for global performance optimization
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold text-lg flex items-center gap-2">
                <Zap className="h-5 w-5 text-yellow-600" />
                Pro Tips
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></span>
                  Batch process multiple images for efficiency
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></span>
                  Test different quality settings for your specific needs
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></span>
                  Monitor Core Web Vitals after optimization
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></span>
                  Use lazy loading for below-the-fold images
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
