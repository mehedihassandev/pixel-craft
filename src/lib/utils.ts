import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { BYTE_UNITS, BYTE_CONVERSION } from '@/constants';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format file size in bytes to human readable format
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return `0 ${BYTE_UNITS[0]}`;

  const k = BYTE_CONVERSION.BYTES_TO_KB;
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + BYTE_UNITS[i];
}

/**
 * Create a preview URL from a File object
 */
export function createFilePreviewUrl(file: File): string {
  return URL.createObjectURL(file);
}

/**
 * Revoke a preview URL to free up memory
 */
export function revokeFilePreviewUrl(url: string): void {
  URL.revokeObjectURL(url);
}
