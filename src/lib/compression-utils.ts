import JSZip from 'jszip';
import {
  SUPPORTED_IMAGE_TYPES,
  FILE_SIZE_LIMITS,
  ERROR_MESSAGES,
  PERFORMANCE_METRICS,
} from '@/constants';

/**
 * Create a ZIP file containing all compressed images
 */
export async function createCompressedImagesZip(
  compressedImages: Array<{
    compressedFile: File;
    originalFile: { name: string };
  }>
): Promise<Blob> {
  const zip = new JSZip();

  for (const image of compressedImages) {
    const fileName = `compressed-${image.originalFile.name}`;
    zip.file(fileName, image.compressedFile);
  }

  return await zip.generateAsync({ type: 'blob' });
}

/**
 * Download a ZIP file with all compressed images
 */
export async function downloadCompressedImagesZip(
  compressedImages: Array<{
    compressedFile: File;
    originalFile: { name: string };
  }>
): Promise<void> {
  const zipBlob = await createCompressedImagesZip(compressedImages);

  const url = URL.createObjectURL(zipBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `compressed-images-${new Date().toISOString().split('T')[0]}.zip`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Estimate compression time based on file size and count
 */
export function estimateCompressionTime(files: FileList): number {
  let totalSize = 0;
  for (let i = 0; i < files.length; i++) {
    totalSize += files[i].size;
  }

  // Rough estimation: 1MB takes about 2 seconds
  const baseTime = (totalSize / (1024 * 1024)) * PERFORMANCE_METRICS.COMPRESSION_TIME_PER_MB;

  // Add overhead for multiple files
  const fileOverhead = files.length * PERFORMANCE_METRICS.FILE_PROCESSING_OVERHEAD;

  return Math.max(baseTime + fileOverhead, PERFORMANCE_METRICS.MIN_PROCESSING_TIME);
}

/**
 * Validate files before compression
 */
export interface FileValidationResult {
  validFiles: File[];
  invalidFiles: Array<{ file: File; reason: string }>;
}

export function validateFiles(files: FileList): FileValidationResult {
  const validFiles: File[] = [];
  const invalidFiles: Array<{ file: File; reason: string }> = [];

  for (let i = 0; i < files.length; i++) {
    const file = files[i];

    if (!SUPPORTED_IMAGE_TYPES.includes(file.type as any)) {
      invalidFiles.push({
        file,
        reason: ERROR_MESSAGES.UNSUPPORTED_FILE_TYPE(file.type),
      });
      continue;
    }

    if (file.size > FILE_SIZE_LIMITS.MAX_FILE_SIZE) {
      invalidFiles.push({
        file,
        reason: ERROR_MESSAGES.FILE_TOO_LARGE(file.size),
      });
      continue;
    }

    if (file.size === 0) {
      invalidFiles.push({
        file,
        reason: ERROR_MESSAGES.EMPTY_FILE,
      });
      continue;
    }

    validFiles.push(file);
  }

  return { validFiles, invalidFiles };
}
