import { ConversionOptions, ConversionResult, SUPPORTED_FORMATS } from '@/types/image-conversion';
import { HEICProcessor } from '@/lib/heic-processor';

export class ImageConverter {
  private static instance: ImageConverter;
  private heicProcessor: HEICProcessor;

  constructor() {
    this.heicProcessor = HEICProcessor.getInstance();
  }

  static getInstance(): ImageConverter {
    if (!ImageConverter.instance) {
      ImageConverter.instance = new ImageConverter();
    }
    return ImageConverter.instance;
  }

  async convertImage(file: File, options: ConversionOptions): Promise<ConversionResult> {
    // Handle HEIC files on client-side first
    let processedFile = file;
    if (this.heicProcessor.isHEICFile(file)) {
      try {
        processedFile = await this.heicProcessor.processIfHEIC(file, options.quality);
      } catch (error) {
        console.warn('Client-side HEIC processing failed, falling back to server:', error);
      }
    }

    const formData = new FormData();
    formData.append('file', processedFile);
    formData.append('targetFormat', options.format);
    formData.append('quality', options.quality.toString());

    if (options.width) {
      formData.append('width', options.width.toString());
    }
    if (options.height) {
      formData.append('height', options.height.toString());
    }

    const response = await fetch('/api/image-convert', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Conversion failed');
    }

    const blob = await response.blob();
    const originalSize = parseInt(response.headers.get('X-Original-Size') || '0');
    const convertedSize = parseInt(response.headers.get('X-Converted-Size') || '0');
    const compressionRatio = response.headers.get('X-Compression-Ratio') || '0';
    const formatNote = response.headers.get('X-Format-Note');

    const format = SUPPORTED_FORMATS.find(f => f.value === options.format);
    let filename = `converted-${Date.now()}.${format?.extension || 'jpg'}`;

    // Handle HEIC special case
    if (options.format === 'heic' && formatNote) {
      filename = `converted-heic-${Date.now()}.jpg`;
    }

    return {
      blob,
      originalSize: file.size, // Use original file size for accurate stats
      convertedSize,
      compressionRatio,
      format: options.format,
      filename,
    };
  }
  async convertToBatch(
    file: File,
    formats: string[],
    quality: number = 90
  ): Promise<ConversionResult[]> {
    const results: ConversionResult[] = [];

    for (const format of formats) {
      try {
        const result = await this.convertImage(file, { format, quality });
        results.push(result);
      } catch (error) {
        console.error(`Failed to convert to ${format}:`, error);
      }
    }

    return results;
  }

  downloadBlob(blob: Blob, filename: string): void {
    if (typeof window === 'undefined') return;

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  async downloadAsZip(results: ConversionResult[], originalFilename: string): Promise<void> {
    if (typeof window === 'undefined') return;

    const JSZip = (await import('jszip')).default;
    const zip = new JSZip();

    const baseFilename = originalFilename.replace(/\.[^/.]+$/, '');

    for (const result of results) {
      const format = SUPPORTED_FORMATS.find(f => f.value === result.format);
      const filename = `${baseFilename}.${format?.extension || 'jpg'}`;
      zip.file(filename, result.blob);
    }

    const zipBlob = await zip.generateAsync({ type: 'blob' });
    this.downloadBlob(zipBlob, `${baseFilename}-converted.zip`);
  }

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  getFormatInfo(format: string) {
    return SUPPORTED_FORMATS.find(f => f.value === format);
  }

  isValidFormat(format: string): boolean {
    return SUPPORTED_FORMATS.some(f => f.value === format);
  }
}
