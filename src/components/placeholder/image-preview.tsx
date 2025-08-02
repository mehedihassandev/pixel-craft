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

interface ImagePreviewProps {
  options: PlaceholdrOptions;
  url: string;
}

export const ImagePreview = ({ options, url }: ImagePreviewProps) => {
  const { toast } = useToast();

  const handleDownload = async () => {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Network response was not ok.');
      const blob = await response.blob();
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

  const copyUrlToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast({
        title: 'URL Copied',
        description: 'Image URL copied to clipboard.',
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
          <div className="flex justify-center items-center bg-checkerboard rounded-lg p-4 min-h-[200px]">
            <Image
              key={url}
              src={url}
              alt={`Placeholder image with text: ${options.text || 'No text'}`}
              width={options.width > 800 ? 800 : options.width}
              height={options.height > 600 ? 600 : options.height}
              className="rounded-md shadow-md object-contain transition-all duration-300 max-w-full h-auto"
              style={{
                aspectRatio: `${options.width} / ${options.height}`,
              }}
              unoptimized
              data-ai-hint="abstract background"
            />
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
              <Input id="url-input" value={url} readOnly className="font-mono text-xs bg-muted" />
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
              asChild
              className="transition-transform duration-200 hover:scale-105"
            >
              <a href={url} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" />
                Open in New Tab
              </a>
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
