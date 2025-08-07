// Client-side HEIC processing utility - Browser compatible version
export class HEICProcessor {
  private static instance: HEICProcessor;

  static getInstance(): HEICProcessor {
    if (!HEICProcessor.instance) {
      HEICProcessor.instance = new HEICProcessor();
    }
    return HEICProcessor.instance;
  }

  async convertHEICToJPEG(file: File, quality: number = 90): Promise<Blob> {
    try {
      // First try browser's native HEIC support (Safari on iOS/macOS)
      const img = new Image();
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        throw new Error('Canvas context not available');
      }

      // Try native browser support first
      const tryNativeConversion = (): Promise<Blob> => {
        return new Promise<Blob>((resolve, reject) => {
          // Skip native conversion in browsers that don't support HEIC
          const userAgent = navigator.userAgent.toLowerCase();
          const isChrome = userAgent.includes('chrome') && !userAgent.includes('edg');
          const isFirefox = userAgent.includes('firefox');

          if (isChrome || isFirefox) {
            // These browsers typically don't support HEIC natively
            reject(new Error('Browser does not support HEIC format natively'));
            return;
          }

          img.onload = () => {
            try {
              canvas.width = img.naturalWidth;
              canvas.height = img.naturalHeight;
              ctx.drawImage(img, 0, 0);

              canvas.toBlob(
                result => {
                  if (!result) {
                    reject(new Error('Failed to convert HEIC to JPEG'));
                    return;
                  }
                  resolve(result);
                },
                'image/jpeg',
                quality / 100
              );
            } catch (error) {
              reject(error);
            }
          };

          img.onerror = () => {
            reject(new Error('Browser does not support HEIC format natively'));
          };

          try {
            const objectUrl = URL.createObjectURL(file);
            img.src = objectUrl;

            // Clean up object URL after a timeout
            setTimeout(() => URL.revokeObjectURL(objectUrl), 30000);
          } catch (error) {
            reject(error);
          }
        });
      };

      try {
        // Try native conversion first
        return await tryNativeConversion();
      } catch (nativeError) {
        console.log('Native HEIC conversion failed, trying heic2any...', nativeError);

        // Fallback to heic2any
        const heic2any = (await import('heic2any')).default;
        const convertedBlob = await heic2any({
          blob: file,
          toType: 'image/jpeg',
          quality: quality / 100,
        });

        // heic2any might return an array or a single blob
        if (Array.isArray(convertedBlob)) {
          return convertedBlob[0] as Blob;
        }
        return convertedBlob as Blob;
      }
    } catch (error) {
      throw new Error(
        `HEIC conversion failed: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  isHEICFile(file: File): boolean {
    return (
      file.type === 'image/heic' ||
      file.type === 'image/heif' ||
      file.name.toLowerCase().endsWith('.heic') ||
      file.name.toLowerCase().endsWith('.heif')
    );
  }

  async processIfHEIC(file: File, quality: number = 90): Promise<File> {
    if (this.isHEICFile(file)) {
      try {
        const jpegBlob = await this.convertHEICToJPEG(file, quality);
        return new File([jpegBlob], file.name.replace(/\.(heic|heif)$/i, '.jpg'), {
          type: 'image/jpeg',
          lastModified: file.lastModified,
        });
      } catch (error) {
        console.warn('Client-side HEIC conversion failed, will use server-side conversion:', error);
        // Return original file, server will handle conversion
        return file;
      }
    }
    return file;
  }
}
