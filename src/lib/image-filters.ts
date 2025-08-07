/**
 * Advanced image filters and effects using Canvas API
 */

import {
  FILTER_PRESETS,
  FILTER_RANGES,
  IMAGE_PROCESSING,
  IMAGE_PROCESSING_ERRORS,
  IMAGE_MIME_TYPES,
} from '@/constants';

export interface FilterOptions {
  brightness?: number; // -100 to 100
  contrast?: number; // -100 to 100
  saturation?: number; // -100 to 100
  hue?: number; // 0 to 360
  blur?: number; // 0 to 20
  sharpen?: number; // 0 to 100
  sepia?: number; // 0 to 100
  vintage?: boolean;
  blackAndWhite?: boolean;
  vignette?: number; // 0 to 100
  temperature?: number; // -100 to 100 (warm to cool)
  exposure?: number; // -100 to 100
  shadows?: number; // -100 to 100
  highlights?: number; // -100 to 100
}

export interface PresetFilter {
  name: string;
  description: string;
  options: FilterOptions;
  thumbnail?: string;
}

export class ImageProcessor {
  private canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;

  constructor() {
    // Only create canvas on client side
    if (typeof document !== 'undefined') {
      this.canvas = document.createElement('canvas');
      this.ctx = this.canvas.getContext('2d');
    }
  }

  async applyFilters(file: File, options: FilterOptions): Promise<Blob> {
    // Check if we're on the client side and canvas is available
    if (!this.canvas || !this.ctx || typeof document === 'undefined') {
      throw new Error(IMAGE_PROCESSING_ERRORS.CANVAS_NOT_AVAILABLE);
    }

    return new Promise((resolve, reject) => {
      const img = new Image();

      img.onload = () => {
        try {
          // Set canvas size
          this.canvas!.width = img.width;
          this.canvas!.height = img.height;

          // Clear canvas
          this.ctx!.clearRect(0, 0, img.width, img.height);

          // Apply CSS filters first
          this.ctx!.filter = this.buildCSSFilter(options);

          // Draw image with CSS filters
          this.ctx!.drawImage(img, 0, 0);

          // Apply custom effects
          this.applyCustomEffects(options);

          // Convert to blob
          this.canvas!.toBlob(
            blob => {
              if (blob) {
                resolve(blob);
              } else {
                reject(new Error(IMAGE_PROCESSING_ERRORS.FAILED_TO_CREATE_BLOB));
              }
            },
            IMAGE_MIME_TYPES.PNG,
            IMAGE_PROCESSING.DEFAULT_QUALITY
          );
        } catch (error) {
          reject(error);
        }
      };

      img.onerror = () => reject(new Error(IMAGE_PROCESSING_ERRORS.FAILED_TO_LOAD_IMAGE));
      img.src = URL.createObjectURL(file);
    });
  }

  private buildCSSFilter(options: FilterOptions): string {
    const filters: string[] = [];

    if (options.brightness !== undefined) {
      filters.push(`brightness(${100 + options.brightness}%)`);
    }
    if (options.contrast !== undefined) {
      filters.push(`contrast(${100 + options.contrast}%)`);
    }
    if (options.saturation !== undefined) {
      filters.push(`saturate(${100 + options.saturation}%)`);
    }
    if (options.hue !== undefined) {
      filters.push(`hue-rotate(${options.hue}deg)`);
    }
    if (options.blur !== undefined) {
      filters.push(`blur(${options.blur}px)`);
    }
    if (options.sepia !== undefined) {
      filters.push(`sepia(${options.sepia}%)`);
    }
    if (options.blackAndWhite) {
      filters.push(`grayscale(${FILTER_RANGES.SEPIA.max}%)`);
    }

    return filters.join(' ');
  }

  private applyCustomEffects(options: FilterOptions) {
    if (!this.canvas || !this.ctx) return;

    const imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
    const data = imageData.data;

    // Apply vintage effect
    if (options.vintage) {
      this.applyVintageEffect(data);
    }

    // Apply vignette
    if (options.vignette && options.vignette > 0) {
      this.applyVignette(data, options.vignette);
    }

    // Apply temperature adjustment
    if (options.temperature !== undefined) {
      this.applyTemperature(data, options.temperature);
    }

    // Apply exposure adjustment
    if (options.exposure !== undefined) {
      this.applyExposure(data, options.exposure);
    }

    // Apply sharpen effect
    if (options.sharpen && options.sharpen > 0) {
      this.applySharpen(options.sharpen);
      return; // Sharpen requires separate processing
    }

    this.ctx.putImageData(imageData, 0, 0);
  }

  private applyVintageEffect(data: Uint8ClampedArray) {
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];

      // Vintage color transformation
      data[i] = Math.min(255, r * 1.2 + g * 0.1); // Red channel
      data[i + 1] = Math.min(255, r * 0.1 + g * 1.1); // Green channel
      data[i + 2] = Math.min(255, b * 0.8); // Blue channel
    }
  }

  private applyVignette(data: Uint8ClampedArray, intensity: number) {
    if (!this.canvas) return;

    const centerX = this.canvas.width / 2;
    const centerY = this.canvas.height / 2;
    const maxDistance = Math.sqrt(centerX * centerX + centerY * centerY);

    for (let y = 0; y < this.canvas.height; y++) {
      for (let x = 0; x < this.canvas.width; x++) {
        const distance = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);
        const vignetteFactor = 1 - (distance / maxDistance) * (intensity / 100);

        const pixelIndex = (y * this.canvas.width + x) * 4;
        data[pixelIndex] *= vignetteFactor; // Red
        data[pixelIndex + 1] *= vignetteFactor; // Green
        data[pixelIndex + 2] *= vignetteFactor; // Blue
      }
    }
  }

  private applyTemperature(data: Uint8ClampedArray, temperature: number) {
    const factor = temperature / 100;

    for (let i = 0; i < data.length; i += 4) {
      if (factor > 0) {
        // Warm (more red/yellow)
        data[i] = Math.min(255, data[i] * (1 + factor * 0.3)); // Red
        data[i + 1] = Math.min(255, data[i + 1] * (1 + factor * 0.1)); // Green
      } else {
        // Cool (more blue)
        data[i + 2] = Math.min(255, data[i + 2] * (1 + Math.abs(factor) * 0.3)); // Blue
      }
    }
  }

  private applyExposure(data: Uint8ClampedArray, exposure: number) {
    const factor = Math.pow(2, exposure / 100);

    for (let i = 0; i < data.length; i += 4) {
      data[i] = Math.min(255, data[i] * factor); // Red
      data[i + 1] = Math.min(255, data[i + 1] * factor); // Green
      data[i + 2] = Math.min(255, data[i + 2] * factor); // Blue
    }
  }

  private applySharpen(intensity: number) {
    if (!this.canvas || !this.ctx) return;

    const imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
    const data = imageData.data;
    const width = this.canvas.width;
    const height = this.canvas.height;

    const sharpenKernel = IMAGE_PROCESSING.SHARPEN_KERNEL;

    const factor = intensity / FILTER_RANGES.SHARPEN.max;
    const tempData = new Uint8ClampedArray(data);

    for (let y = 1; y < height - 1; y++) {
      for (let x = 1; x < width - 1; x++) {
        for (let c = 0; c < 3; c++) {
          // RGB channels only
          let sum = 0;
          for (let ky = -1; ky <= 1; ky++) {
            for (let kx = -1; kx <= 1; kx++) {
              const pixelIndex = ((y + ky) * width + (x + kx)) * 4 + c;
              sum += tempData[pixelIndex] * sharpenKernel[(ky + 1) * 3 + (kx + 1)];
            }
          }

          const pixelIndex = (y * width + x) * 4 + c;
          data[pixelIndex] = Math.min(
            255,
            Math.max(0, tempData[pixelIndex] * (1 - factor) + sum * factor)
          );
        }
      }
    }

    this.ctx.putImageData(imageData, 0, 0);
  }
}

// Export preset filters from constants (readonly)
export { FILTER_PRESETS as presetFilters } from '@/constants';

export const imageProcessor = new ImageProcessor();
