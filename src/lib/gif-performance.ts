/**
 * Performance monitoring utilities for GIF processing
 */

export interface PerformanceMetrics {
  fileSize: number;
  frameCount: number;
  dimensions: { width: number; height: number };
  processingTime: number;
  memoryUsage?: number;
  avgFrameProcessingTime: number;
}

export class GifProcessingMonitor {
  private startTime: number = 0;
  private frameProcessingTimes: number[] = [];

  start() {
    this.startTime = performance.now();
    this.frameProcessingTimes = [];
  }

  recordFrameProcessing(startTime: number) {
    const endTime = performance.now();
    this.frameProcessingTimes.push(endTime - startTime);
  }

  finish(
    fileSize: number,
    frameCount: number,
    dimensions: { width: number; height: number }
  ): PerformanceMetrics {
    const endTime = performance.now();
    const totalProcessingTime = endTime - this.startTime;

    return {
      fileSize,
      frameCount,
      dimensions,
      processingTime: totalProcessingTime,
      avgFrameProcessingTime:
        this.frameProcessingTimes.length > 0
          ? this.frameProcessingTimes.reduce((a, b) => a + b, 0) / this.frameProcessingTimes.length
          : 0,
      memoryUsage: this.getMemoryUsage(),
    };
  }

  private getMemoryUsage(): number | undefined {
    if ('memory' in performance && performance.memory) {
      return (performance.memory as any).usedJSHeapSize;
    }
    return undefined;
  }

  static formatMetrics(metrics: PerformanceMetrics): string {
    const parts = [
      `File: ${(metrics.fileSize / 1024 / 1024).toFixed(2)}MB`,
      `Frames: ${metrics.frameCount}`,
      `Dimensions: ${metrics.dimensions.width}×${metrics.dimensions.height}`,
      `Processing: ${metrics.processingTime.toFixed(0)}ms`,
      `Avg/Frame: ${metrics.avgFrameProcessingTime.toFixed(2)}ms`,
    ];

    if (metrics.memoryUsage) {
      parts.push(`Memory: ${(metrics.memoryUsage / 1024 / 1024).toFixed(2)}MB`);
    }

    return parts.join(' | ');
  }
}

/**
 * Memory optimization utilities
 */
export class MemoryManager {
  private static canvases: HTMLCanvasElement[] = [];
  private static maxCanvasPool = 5;

  static getCanvas(width: number, height: number): HTMLCanvasElement {
    // Try to reuse an existing canvas
    const existingCanvas = this.canvases.find(
      canvas => canvas.width === width && canvas.height === height
    );

    if (existingCanvas) {
      // Clear the canvas
      const ctx = existingCanvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, width, height);
      }
      return existingCanvas;
    }

    // Create new canvas
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;

    // Add to pool if there's space
    if (this.canvases.length < this.maxCanvasPool) {
      this.canvases.push(canvas);
    }

    return canvas;
  }

  static releaseCanvas(canvas: HTMLCanvasElement) {
    // Canvas is returned to pool automatically
    // No need to explicitly release unless we want to limit memory
  }

  static clearPool() {
    this.canvases = [];
  }

  static getPoolInfo() {
    return {
      poolSize: this.canvases.length,
      maxSize: this.maxCanvasPool,
      canvases: this.canvases.map(c => ({ width: c.width, height: c.height })),
    };
  }
}

/**
 * Processing queue for handling multiple GIFs
 */
export class ProcessingQueue {
  private queue: Array<{
    id: string;
    file: File;
    options: any;
    resolve: (result: any) => void;
    reject: (error: Error) => void;
  }> = [];

  private isProcessing = false;
  private maxConcurrent = 1; // Process one at a time to avoid memory issues

  async add<T>(
    id: string,
    file: File,
    options: any,
    processor: (file: File, options: any) => Promise<T>
  ): Promise<T> {
    return new Promise((resolve, reject) => {
      this.queue.push({ id, file, options, resolve, reject });
      this.processNext(processor);
    });
  }

  private async processNext<T>(processor: (file: File, options: any) => Promise<T>) {
    if (this.isProcessing || this.queue.length === 0) return;

    this.isProcessing = true;
    const item = this.queue.shift()!;

    try {
      const result = await processor(item.file, item.options);
      item.resolve(result);
    } catch (error) {
      item.reject(error instanceof Error ? error : new Error('Processing failed'));
    } finally {
      this.isProcessing = false;
      // Process next item in queue
      if (this.queue.length > 0) {
        this.processNext(processor);
      }
    }
  }

  getQueueStatus() {
    return {
      queueLength: this.queue.length,
      isProcessing: this.isProcessing,
      items: this.queue.map(item => ({
        id: item.id,
        filename: item.file.name,
        size: item.file.size,
      })),
    };
  }

  clear() {
    // Reject all pending items
    this.queue.forEach(item => {
      item.reject(new Error('Queue cleared'));
    });
    this.queue = [];
  }
}
