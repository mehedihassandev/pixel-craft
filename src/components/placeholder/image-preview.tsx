'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Copy,
  Download,
  ExternalLink,
  Eye,
  Palette,
  Grid3X3,
  Type,
  FileImage,
  Maximize2,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { PlaceholdrOptions } from '@/app/(pages)/placeholder/page';
import { useState, useEffect, useMemo } from 'react';

interface ImagePreviewProps {
  options: PlaceholdrOptions;
  url: string;
}

export const ImagePreview = ({ options, url }: ImagePreviewProps) => {
  const { toast } = useToast();
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const [currentUrl, setCurrentUrl] = useState(url);
  const [fallbackAttempt, setFallbackAttempt] = useState(0);
  const [showCanvas, setShowCanvas] = useState(false);
  const [canvasRef, setCanvasRef] = useState<HTMLCanvasElement | null>(null);
  const [blobUrl, setBlobUrl] = useState<string | null>(null);

  // Reset loading state when URL changes
  useEffect(() => {
    setImageLoading(true);
    setImageError(false);
    setCurrentUrl(url);
    setFallbackAttempt(0);
    setShowCanvas(false);
    setCanvasRef(null);
    // Cleanup any blob URLs on URL change
    if (blobUrl) {
      URL.revokeObjectURL(blobUrl);
      setBlobUrl(null);
    }
  }, [url]);

  useEffect(() => {
    // Revoke blob URL on unmount
    return () => {
      if (blobUrl) URL.revokeObjectURL(blobUrl);
    };
  }, [blobUrl]);

  // Wrap external URLs with our same-origin proxy to avoid COEP/CORS issues
  const proxiedUrl = useMemo(() => {
    try {
      const u = new URL(currentUrl);
      const allowed = ['placehold.co', 'via.placeholder.com', 'placeholder.com', 'picsum.photos'];
      if (allowed.includes(u.hostname)) {
        return `/api/image-proxy?url=${encodeURIComponent(currentUrl)}`;
      }
      return currentUrl;
    } catch {
      return currentUrl;
    }
  }, [currentUrl]);

  // Generate canvas-based placeholder
  const generateCanvasPlaceholder = () => {
    const { width, height, text, bgColor, textColor } = options;
    const validWidth = width && width > 0 ? width : 600;
    const validHeight = height && height > 0 ? height : 400;

    const canvas = document.createElement('canvas');
    canvas.width = validWidth;
    canvas.height = validHeight;
    canvas.className = 'rounded-md shadow-md max-w-full h-auto';
    canvas.style.aspectRatio = `${validWidth} / ${validHeight}`;

    const ctx = canvas.getContext('2d');

    if (!ctx) return null;

    // Fill background
    ctx.fillStyle = `#${bgColor.replace('#', '')}`;
    ctx.fillRect(0, 0, validWidth, validHeight);

    // Add border
    ctx.strokeStyle = `#${textColor.replace('#', '')}`;
    ctx.lineWidth = 2;
    ctx.strokeRect(1, 1, validWidth - 2, validHeight - 2);

    // Add text
    ctx.fillStyle = `#${textColor.replace('#', '')}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    if (text) {
      const fontSize = Math.min(validWidth, validHeight) / 10;
      ctx.font = `bold ${fontSize}px Arial, sans-serif`;
      ctx.fillText(text, validWidth / 2, validHeight / 2 - 20);
    }

    // Add dimensions
    const dimFontSize = Math.min(validWidth, validHeight) / 20;
    ctx.font = `${dimFontSize}px Arial, sans-serif`;
    ctx.fillText(`${validWidth} × ${validHeight}`, validWidth / 2, validHeight / 2 + 20);

    return canvas;
  };

  const handleImageError = () => {
    console.error('Image failed to load:', currentUrl, 'Attempt:', fallbackAttempt);

    const { width, height, bgColor, textColor, text } = options;
    const validWidth = width && width > 0 ? width : 600;
    const validHeight = height && height > 0 ? height : 400;
    const cleanBgColor = bgColor.replace('#', '');
    const cleanTextColor = textColor.replace('#', '');

    let fallbackUrl = null;
    let nextAttempt = fallbackAttempt + 1;

    if (fallbackAttempt === 0) {
      // First fallback: via.placeholder.com with color/text support
      const cleanBg = cleanBgColor;
      const cleanText = cleanTextColor;
      // Force PNG for best compatibility across services
      fallbackUrl = `https://via.placeholder.com/${validWidth}x${validHeight}/${cleanBg}/${cleanText}.png`;
      if (text) fallbackUrl += `?text=${encodeURIComponent(text)}`;
      console.log('Trying first fallback:', fallbackUrl);
    } else if (fallbackAttempt === 1) {
      // Second fallback: picsum.photos (no colors/text control)
      fallbackUrl = `https://picsum.photos/${validWidth}/${validHeight}`;
      console.log('Trying second fallback:', fallbackUrl);
    } else if (fallbackAttempt === 2) {
      // Final fallback: Generate canvas image (this should always work)
      const canvas = generateCanvasPlaceholder();
      console.log('Generating canvas fallback');

      // Canvas generation should always succeed, so directly set it
      if (canvas) {
        setCanvasRef(canvas);
        setShowCanvas(true);
        setFallbackAttempt(nextAttempt);
        setImageLoading(false); // Canvas is immediately available
        setImageError(false);
        return;
      }
    }

    // For network-based fallbacks (attempts 0 and 1)
    if (fallbackUrl && fallbackAttempt < 2) {
      setTimeout(() => {
        setCurrentUrl(fallbackUrl);
        setFallbackAttempt(nextAttempt);
        setImageLoading(true);
        setImageError(false);
      }, 500); // Small delay to show loading state
      return;
    }

    // Only show error if all fallbacks including canvas failed
    setImageLoading(false);
    setImageError(true);
    toast({
      variant: 'destructive',
      title: 'Image Load Error',
      description: 'All image services failed including local generation.',
    });
  };
  const handleImageLoad = () => {
    console.log('Image loaded successfully:', currentUrl);
    setImageLoading(false);
    setImageError(false);
  };
  const handleDownload = async () => {
    try {
      let blob;

      if (showCanvas && canvasRef) {
        // Download canvas image
        const dataUrl = canvasRef.toDataURL(`image/${options.format === 'jpg' ? 'jpeg' : 'png'}`);
        const response = await fetch(dataUrl);
        blob = await response.blob();
      } else {
        // Download from same-origin proxy URL to avoid CORS/COEP issues
        const response = await fetch(proxiedUrl);
        if (!response.ok) throw new Error('Network response was not ok.');
        blob = await response.blob();
      }

      const objectUrl = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = objectUrl;
      a.download = `placeholdr-${options.width}x${options.height}.${options.format}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(objectUrl);

      toast({
        title: 'Download Started',
        description: `Placeholder image (${options.width}x${options.height}) is being downloaded.`,
      });
    } catch (error) {
      console.error('Download failed:', error);
      toast({
        variant: 'destructive',
        title: 'Download Failed',
        description:
          'Could not download the image. Try opening the URL in a new tab and saving from there.',
      });
    }
  };

  const openInNewTab = () => {
    if (showCanvas && canvasRef) {
      const dataUrl = canvasRef.toDataURL(`image/${options.format === 'jpg' ? 'jpeg' : 'png'}`);
      try {
        const arr = dataUrl.split(',');
        const mime = arr[0].match(/:(.*?);/)?.[1] || 'image/png';
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) u8arr[n] = bstr.charCodeAt(n);
        const blob = new Blob([u8arr], { type: mime });
        const url = URL.createObjectURL(blob);
        setBlobUrl(url);
        window.open(url, '_blank', 'noopener,noreferrer');
      } catch {
        window.open(dataUrl, '_blank', 'noopener,noreferrer');
      }
    } else {
      window.open(currentUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const copyUrlToClipboard = async () => {
    try {
      let textToCopy;

      if (showCanvas && canvasRef) {
        // Copy canvas data URL
        textToCopy = canvasRef.toDataURL(`image/${options.format === 'jpg' ? 'jpeg' : 'png'}`);
      } else {
        // Copy current URL
        textToCopy = currentUrl;
      }

      await navigator.clipboard.writeText(textToCopy);
      toast({
        title: 'URL Copied',
        description: showCanvas
          ? 'Canvas image data copied to clipboard.'
          : 'Image URL copied to clipboard.',
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Copy Failed',
        description: 'Failed to copy URL to clipboard.',
      });
    }
  };

  const getAspectRatio = () => {
    const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
    const divisor = gcd(options.width, options.height);
    return `${options.width / divisor}:${options.height / divisor}`;
  };

  const getEstimatedFileSize = () => {
    const pixels = options.width * options.height;
    let bytes: number;

    switch (options.format) {
      case 'png':
        bytes = pixels * 3; // Rough estimate for PNG
        break;
      case 'jpg':
        bytes = pixels * 0.5; // Rough estimate for JPG with moderate compression
        break;
      case 'webp':
        bytes = pixels * 0.3; // Rough estimate for WebP
        break;
      default:
        bytes = pixels * 2;
    }

    if (bytes < 1024) return `${Math.round(bytes)} B`;
    if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
    return `${Math.round(bytes / (1024 * 1024))} MB`;
  };

  return (
    <div className="space-y-6">
      {/* Image Statistics */}
      <Card className="border-0 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Maximize2 className="h-5 w-5" />
            Image Details
          </CardTitle>
          <CardDescription>Current placeholder specifications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-muted rounded-lg">
              <div className="text-sm text-muted-foreground mb-1">Dimensions</div>
              <div className="font-semibold">
                {options.width}×{options.height}
              </div>
            </div>
            <div className="text-center p-3 bg-muted rounded-lg">
              <div className="text-sm text-muted-foreground mb-1">Aspect Ratio</div>
              <div className="font-semibold">{getAspectRatio()}</div>
            </div>
            <div className="text-center p-3 bg-muted rounded-lg">
              <div className="text-sm text-muted-foreground mb-1">Format</div>
              <div className="font-semibold">{options.format.toUpperCase()}</div>
            </div>
            <div className="text-center p-3 bg-muted rounded-lg">
              <div className="text-sm text-muted-foreground mb-1">Est. Size</div>
              <div className="font-semibold">{getEstimatedFileSize()}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Image Preview */}
      <Card className="w-full shadow-lg border-2 border-transparent hover:border-primary/20 transition-all duration-300">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              Live Preview
            </span>
            <Badge variant="outline">
              <FileImage className="h-3 w-3 mr-1" />
              {options.format.toUpperCase()}
            </Badge>
          </CardTitle>
          <CardDescription>Your generated placeholder image updates in real-time.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Color Preview */}
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Palette className="h-4 w-4" />
              <span>Colors:</span>
            </div>
            <div className="flex items-center gap-2">
              <div
                className="w-6 h-6 rounded border border-border"
                style={{
                  backgroundColor: `#${options.bgColor}`,
                }}
              />
              <span className="font-mono text-xs">#{options.bgColor}</span>
            </div>
            <div className="flex items-center gap-2">
              <div
                className="w-6 h-6 rounded border border-border"
                style={{
                  backgroundColor: `#${options.textColor}`,
                }}
              />
              <span className="font-mono text-xs">#{options.textColor}</span>
            </div>
          </div>

          {/* Image Container */}
          <div className="flex justify-center items-center bg-checkerboard rounded-lg p-4 min-h-[200px] relative">
            {imageLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-muted/50 rounded-lg z-10 backdrop-blur-sm">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-sm text-muted-foreground">
                    {fallbackAttempt === 0
                      ? 'Loading image...'
                      : fallbackAttempt === 1
                        ? 'Trying backup service...'
                        : fallbackAttempt === 2
                          ? 'Trying alternative...'
                          : 'Generating placeholder...'}
                  </span>
                  {fallbackAttempt > 0 && (
                    <span className="text-xs text-muted-foreground">
                      Attempt {fallbackAttempt + 1} of 4
                    </span>
                  )}
                </div>
              </div>
            )}
            {imageError ? (
              <div className="flex flex-col items-center gap-2 text-muted-foreground">
                <FileImage className="h-12 w-12" />
                <p className="text-sm">Failed to load image</p>
                <p className="text-xs text-center max-w-xs break-all">{currentUrl}</p>
                <button
                  onClick={() => {
                    setImageError(false);
                    setImageLoading(true);
                    setFallbackAttempt(0);
                    setCurrentUrl(url);
                    setShowCanvas(false);
                    setCanvasRef(null);
                  }}
                  className="text-xs text-primary hover:underline mt-2"
                >
                  Try again
                </button>
              </div>
            ) : showCanvas && canvasRef ? (
              <div
                ref={div => {
                  if (div && canvasRef && !div.contains(canvasRef)) {
                    div.appendChild(canvasRef);
                  }
                }}
                className="flex justify-center items-center"
              />
            ) : (
              <Image
                key={proxiedUrl}
                src={proxiedUrl}
                alt={`Placeholder image with text: ${options.text || 'No text'}`}
                width={options.width > 800 ? 800 : options.width}
                height={options.height > 600 ? 600 : options.height}
                className="rounded-md shadow-md object-contain transition-all duration-300 max-w-full h-auto"
                style={{
                  aspectRatio: `${options.width} / ${options.height}`,
                  opacity: imageLoading ? 0.3 : 1,
                }}
                unoptimized={true}
                priority={false}
                onError={handleImageError}
                onLoad={handleImageLoad}
                data-ai-hint="abstract background"
              />
            )}
          </div>

          {/* Text Information */}
          {options.text && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Type className="h-4 w-4" />
              <span>Text: "{options.text}"</span>
              {options.fontSize && <span>• Size: {options.fontSize}px</span>}
            </div>
          )}
        </CardContent>

        <CardFooter className="flex-col items-start gap-4 pt-2">
          {/* URL Display */}
          <div className="w-full space-y-2">
            <Label htmlFor="url-input" className="text-sm font-medium">
              Image URL
            </Label>
            <div className="flex gap-2">
              <Input
                id="url-input"
                value={currentUrl}
                readOnly
                className="font-mono text-xs bg-muted"
              />
              <Button variant="outline" size="sm" onClick={copyUrlToClipboard}>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2 w-full">
            <Button
              onClick={handleDownload}
              className="transition-transform duration-200 hover:scale-105"
            >
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
            <Button
              variant="secondary"
              onClick={openInNewTab}
              className="transition-transform duration-200 hover:scale-105"
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              Open in New Tab
            </Button>
            <Button variant="outline" onClick={copyUrlToClipboard}>
              <Copy className="mr-2 h-4 w-4" />
              Copy URL
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ImagePreview;
