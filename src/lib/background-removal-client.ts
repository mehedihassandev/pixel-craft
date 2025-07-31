import { removeBackground } from '@imgly/background-removal';

/**
 * Client-side background removal using @imgly/background-removal
 * This is used as a fallback when the server-side API fails
 */
export async function removeBackgroundClientSide(file: File): Promise<Blob> {
  try {
    // Convert File to ImageData or Blob format expected by the library
    const imageBlob = await removeBackground(file, {
      model: 'isnet', // Use isnet model for good quality
      output: {
        format: 'image/png',
        quality: 0.8,
      },
    });

    return imageBlob;
  } catch (error) {
    console.error('Client-side background removal failed:', error);
    throw new Error('Client-side background removal failed. Please try a different image.');
  }
}

/**
 * Check if client-side background removal is supported
 */
export function isClientSideSupported(): boolean {
  // Check if we're in a browser environment and if WebGL is supported
  if (typeof window === 'undefined') return false;

  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    return !!gl;
  } catch (e) {
    return false;
  }
}
