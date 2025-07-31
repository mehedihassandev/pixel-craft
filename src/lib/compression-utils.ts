import JSZip from 'jszip';

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
  const baseTime = (totalSize / (1024 * 1024)) * 2;

  // Add overhead for multiple files
  const fileOverhead = files.length * 0.5;

  return Math.max(baseTime + fileOverhead, 1);
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

  const supportedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  const maxFileSize = 50 * 1024 * 1024; // 50MB

  for (let i = 0; i < files.length; i++) {
    const file = files[i];

    if (!supportedTypes.includes(file.type)) {
      invalidFiles.push({
        file,
        reason: `Unsupported file type: ${file.type}. Supported formats: JPG, JPEG, PNG, WEBP`
      });
      continue;
    }

    if (file.size > maxFileSize) {
      invalidFiles.push({
        file,
        reason: `File too large: ${(file.size / (1024 * 1024)).toFixed(1)}MB. Maximum size: 50MB`
      });
      continue;
    }

    if (file.size === 0) {
      invalidFiles.push({
        file,
        reason: 'File is empty'
      });
      continue;
    }

    validFiles.push(file);
  }

  return { validFiles, invalidFiles };
}
