import { useState, useCallback } from 'react';
import imageCompression from 'browser-image-compression';

interface CompressionOptions {
  maxSizeMB?: number;
  maxWidthOrHeight?: number;
  useWebWorker?: boolean;
  quality?: number;
}

interface CompressionResult {
  originalFile: File;
  compressedFile: File;
  originalSize: number;
  compressedSize: number;
  compressionRatio: number;
}

interface UseImageCompressorReturn {
  compressImage: (file: File, options?: CompressionOptions) => Promise<CompressionResult>;
  isCompressing: boolean;
  error: string | null;
  clearError: () => void;
}

export const useImageCompressor = (): UseImageCompressorReturn => {
  const [isCompressing, setIsCompressing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const compressImage = useCallback(async (
    file: File,
    options: CompressionOptions = {}
  ): Promise<CompressionResult> => {
    setIsCompressing(true);
    setError(null);

    try {
      // Validate file type
      const supportedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
      if (!supportedTypes.includes(file.type)) {
        throw new Error(`Unsupported file type: ${file.type}. Supported formats: JPG, JPEG, PNG, WEBP`);
      }

      // Default compression options
      const compressionOptions: CompressionOptions = {
        maxSizeMB: 1, // Target file size under 1MB
        maxWidthOrHeight: 1920, // Resize if width or height > 1920px
        useWebWorker: true, // Use web worker for better performance
        quality: 0.75, // Image quality between 0.7-0.8
        ...options,
      };

      const originalSize = file.size;

      // Compress the image
      const compressedFile = await imageCompression(file, compressionOptions);

      const compressedSize = compressedFile.size;
      const compressionRatio = ((originalSize - compressedSize) / originalSize) * 100;

      return {
        originalFile: file,
        compressedFile,
        originalSize,
        compressedSize,
        compressionRatio,
      };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to compress image';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsCompressing(false);
    }
  }, []);

  return {
    compressImage,
    isCompressing,
    error,
    clearError,
  };
};
