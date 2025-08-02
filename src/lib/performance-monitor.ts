/**
 * Performance monitoring utility for image processing operations
 */

interface PerformanceMetrics {
  operationType: string;
  fileSize: number;
  processingTime: number;
  memoryUsage: number;
  userAgent: string;
  timestamp: number;
}

class PerformanceMonitor {
  private metrics: PerformanceMetrics[] = [];
  private maxMetrics = 100; // Keep last 100 operations

  startOperation(operationType: string, fileSize: number): string {
    const operationId = `${operationType}-${Date.now()}-${Math.random()}`;
    performance.mark(`${operationId}-start`);
    return operationId;
  }

  endOperation(operationId: string, operationType: string, fileSize: number): PerformanceMetrics {
    performance.mark(`${operationId}-end`);
    performance.measure(operationId, `${operationId}-start`, `${operationId}-end`);

    const measure = performance.getEntriesByName(operationId)[0];
    const processingTime = measure.duration;

    // Get memory usage if available
    const memoryUsage = (performance as any).memory?.usedJSHeapSize || 0;

    const metric: PerformanceMetrics = {
      operationType,
      fileSize,
      processingTime,
      memoryUsage,
      userAgent: navigator.userAgent,
      timestamp: Date.now(),
    };

    this.addMetric(metric);

    // Clean up performance entries
    performance.clearMarks(`${operationId}-start`);
    performance.clearMarks(`${operationId}-end`);
    performance.clearMeasures(operationId);

    return metric;
  }

  private addMetric(metric: PerformanceMetrics) {
    this.metrics.push(metric);
    if (this.metrics.length > this.maxMetrics) {
      this.metrics.shift();
    }
  }

  getMetrics(): PerformanceMetrics[] {
    return [...this.metrics];
  }

  getAverageProcessingTime(operationType: string): number {
    const typeMetrics = this.metrics.filter(m => m.operationType === operationType);
    if (typeMetrics.length === 0) return 0;

    const totalTime = typeMetrics.reduce((sum, m) => sum + m.processingTime, 0);
    return totalTime / typeMetrics.length;
  }

  exportMetrics(): string {
    return JSON.stringify(this.metrics, null, 2);
  }

  clearMetrics() {
    this.metrics = [];
  }

  // Check if device is low-end based on performance
  isLowEndDevice(): boolean {
    const memory = (navigator as any).deviceMemory;
    const cores = navigator.hardwareConcurrency;

    return (
      (memory && memory <= 2) || // Less than 2GB RAM
      (cores && cores <= 2) || // Less than 2 CPU cores
      this.getAverageProcessingTime('compression') > 10000 // Slow compression
    );
  }

  // Get recommended settings based on device performance
  getRecommendedSettings(operationType: string): any {
    const isLowEnd = this.isLowEndDevice();

    switch (operationType) {
      case 'compression':
        return {
          maxSizeMB: isLowEnd ? 5 : 10,
          maxWidthOrHeight: isLowEnd ? 1280 : 1920,
          useWebWorker: !isLowEnd,
          quality: isLowEnd ? 0.8 : 0.75,
        };
      case 'background-removal':
        return {
          model: isLowEnd ? 'u2net' : 'isnet',
          outputQuality: isLowEnd ? 0.7 : 0.8,
        };
      case 'ocr':
        return {
          psm: isLowEnd ? 6 : 3,
          oem: isLowEnd ? 1 : 3,
        };
      default:
        return {};
    }
  }
}

export const performanceMonitor = new PerformanceMonitor();

// Export for React hook
export function usePerformanceMonitor() {
  return {
    startOperation: performanceMonitor.startOperation.bind(performanceMonitor),
    endOperation: performanceMonitor.endOperation.bind(performanceMonitor),
    getMetrics: performanceMonitor.getMetrics.bind(performanceMonitor),
    getAverageProcessingTime: performanceMonitor.getAverageProcessingTime.bind(performanceMonitor),
    isLowEndDevice: performanceMonitor.isLowEndDevice.bind(performanceMonitor),
    getRecommendedSettings: performanceMonitor.getRecommendedSettings.bind(performanceMonitor),
  };
}
