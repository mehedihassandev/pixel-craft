/**
 * GIF to JSON conversion utilities
 * Handles GIF frame extraction and JSON generation
 */

import { decompressFrames, parseGIF } from 'gifuct-js';
import { GIF_TO_JSON_CONFIG } from '@/constants/gif-to-json';
import { GifProcessingMonitor, MemoryManager } from './gif-performance';

export interface GifFrame {
  index: number;
  delay: number;
  image: string; // base64 encoded
  width: number;
  height: number;
  x: number;
  y: number;
  disposal: number;
}

export interface GifJsonData {
  width: number;
  height: number;
  frameCount: number;
  duration: number;
  loopCount: number;
  frames: GifFrame[];
  metadata: {
    size: number;
    created: string;
    format: string;
    filename: string;
  };
}

export interface ProcessingOptions {
  outputFormat: 'base64' | 'blob';
  quality: number;
  maxFrames?: number;
  includeMetadata: boolean;
  compressFrames: boolean;
}

export interface ValidationResult {
  isValid: boolean;
  error?: string;
  warnings?: string[];
}

/**
 * Validates a GIF file before processing
 */
export function validateGifFile(file: File): ValidationResult {
  const warnings: string[] = [];

  // Check file type
  if (!file.type.includes('gif')) {
    return {
      isValid: false,
      error: GIF_TO_JSON_CONFIG.MESSAGES.INVALID_FORMAT,
    };
  }

  // Check file size
  const fileSizeMB = file.size / (1024 * 1024);
  if (fileSizeMB > GIF_TO_JSON_CONFIG.MAX_FILE_SIZE) {
    return {
      isValid: false,
      error: GIF_TO_JSON_CONFIG.MESSAGES.FILE_TOO_LARGE,
    };
  }

  // Add warnings for large files
  if (fileSizeMB > 10) {
    warnings.push('Large file size may result in slower processing');
  }

  return {
    isValid: true,
    warnings: warnings.length > 0 ? warnings : undefined,
  };
}

/**
 * Extracts frames from GIF file and converts to JSON
 */
export async function convertGifToJson(
  file: File,
  options: ProcessingOptions = {
    outputFormat: 'base64',
    quality: 0.9,
    includeMetadata: true,
    compressFrames: true,
  }
): Promise<GifJsonData> {
  const monitor = new GifProcessingMonitor();
  monitor.start();

  try {
    // Validate file first
    const validation = validateGifFile(file);
    if (!validation.isValid) {
      throw new Error(validation.error);
    }

    // Convert file to array buffer
    const arrayBuffer = await file.arrayBuffer();

    // Parse GIF data
    const gif = parseGIF(arrayBuffer);
    const frames = decompressFrames(gif, true);

    // Validate frame count
    if (frames.length > (options.maxFrames || GIF_TO_JSON_CONFIG.MAX_FRAMES)) {
      throw new Error(GIF_TO_JSON_CONFIG.MESSAGES.TOO_MANY_FRAMES);
    }

    // Validate dimensions
    if (
      gif.lsd.width > GIF_TO_JSON_CONFIG.MAX_DIMENSIONS ||
      gif.lsd.height > GIF_TO_JSON_CONFIG.MAX_DIMENSIONS
    ) {
      throw new Error(GIF_TO_JSON_CONFIG.MESSAGES.DIMENSIONS_TOO_LARGE);
    }

    // Process frames
    const processedFrames: GifFrame[] = [];
    let totalDuration = 0;

    for (let i = 0; i < frames.length; i++) {
      const frameStartTime = performance.now();
      const frame = frames[i];

      // Use memory-managed canvas
      const canvas = MemoryManager.getCanvas(frame.dims.width, frame.dims.height);
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        throw new Error('Failed to create canvas context');
      }

      // Create image data from frame
      const imageData = ctx.createImageData(frame.dims.width, frame.dims.height);
      imageData.data.set(frame.patch);
      ctx.putImageData(imageData, 0, 0);

      // Convert to base64
      const base64Image = await canvasToBase64(canvas, options.quality);

      const delay = frame.delay || 100; // Default 100ms if no delay specified
      totalDuration += delay;

      processedFrames.push({
        index: i,
        delay,
        image: base64Image,
        width: frame.dims.width,
        height: frame.dims.height,
        x: frame.dims.left,
        y: frame.dims.top,
        disposal: frame.disposalType || 0,
      });

      // Record frame processing time
      monitor.recordFrameProcessing(frameStartTime);
    }

    // Clean up memory pool periodically
    if (frames.length > 50) {
      MemoryManager.clearPool();
    }

    // Prepare result
    const result: GifJsonData = {
      width: gif.lsd.width,
      height: gif.lsd.height,
      frameCount: frames.length,
      duration: totalDuration,
      loopCount: gif.gct ? gif.gct.length : 0,
      frames: processedFrames,
      metadata: {
        size: file.size,
        created: new Date().toISOString(),
        format: 'gif',
        filename: file.name,
      },
    };

    // Log performance metrics
    const metrics = monitor.finish(file.size, frames.length, {
      width: gif.lsd.width,
      height: gif.lsd.height,
    });
    console.log('GIF Processing Metrics:', GifProcessingMonitor.formatMetrics(metrics));

    return result;
  } catch (error) {
    console.error('Error converting GIF to JSON:', error);
    throw new Error(error instanceof Error ? error.message : GIF_TO_JSON_CONFIG.MESSAGES.ERROR);
  }
}

/**
 * Converts canvas to base64 with quality control
 */
async function canvasToBase64(canvas: HTMLCanvasElement, quality: number): Promise<string> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      blob => {
        if (blob) {
          blobToBase64(blob).then(resolve).catch(reject);
        } else {
          reject(new Error('Failed to convert canvas to blob'));
        }
      },
      'image/png',
      quality
    );
  });
}

/**
 * Converts blob to base64 string
 */
async function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

/**
 * Downloads JSON data as file
 */
export function downloadJsonFile(data: GifJsonData, filename?: string): void {
  const jsonString = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = filename || `${data.metadata.filename.replace('.gif', '')}-frames.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  // Clean up
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/**
 * Downloads frames as separate PNG files in a ZIP
 */
export async function downloadFramesAsZip(data: GifJsonData): Promise<void> {
  // This would require JSZip which is already available in the project
  const JSZip = (await import('jszip')).default;
  const zip = new JSZip();

  // Add metadata JSON
  const metadata = {
    ...data,
    frames: data.frames.map(frame => ({
      ...frame,
      image: `frame-${frame.index.toString().padStart(3, '0')}.png`,
    })),
  };
  zip.file('metadata.json', JSON.stringify(metadata, null, 2));

  // Add frame images
  for (const frame of data.frames) {
    // Convert base64 to blob
    const response = await fetch(frame.image);
    const blob = await response.blob();
    const filename = `frame-${frame.index.toString().padStart(3, '0')}.png`;
    zip.file(filename, blob);
  }

  // Generate and download ZIP
  const zipBlob = await zip.generateAsync({ type: 'blob' });
  const url = URL.createObjectURL(zipBlob);

  const link = document.createElement('a');
  link.href = url;
  link.download = `${data.metadata.filename.replace('.gif', '')}-frames.zip`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  // Clean up
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/**
 * Estimates processing time based on file size and frame count
 */
export function estimateProcessingTime(file: File): number {
  const fileSizeMB = file.size / (1024 * 1024);
  // Rough estimate: 1MB = ~2 seconds processing time
  return Math.max(1, Math.ceil(fileSizeMB * 2));
}

/**
 * Creates a preview of the first few frames for UI display
 */
export async function createGifPreview(
  data: GifJsonData,
  maxFrames: number = 5
): Promise<string[]> {
  const previewFrames = data.frames.slice(0, maxFrames);
  return previewFrames.map(frame => frame.image);
}
