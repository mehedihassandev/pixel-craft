declare module 'libheif-js' {
  interface HeifError {
    code: number;
    message: string;
  }

  interface LibHEIF {
    heif_init(): Promise<void>;
    heif_context_alloc(): any;
    heif_context_read_from_memory(context: any, data: Uint8Array, size: number): HeifError;
    heif_context_get_primary_image_handle(context: any): any;
    heif_decode_image(handle: any, colorspace: number, chroma: number): any;
    heif_image_get_width(image: any, channel: number): number;
    heif_image_get_height(image: any, channel: number): number;
    heif_image_get_bits_per_pixel(image: any, channel: number): number;
    heif_image_get_plane(image: any, channel: number): Uint8Array;
    heif_image_release(image: any): void;
    heif_image_handle_release(handle: any): void;
    heif_context_free(context: any): void;
    heif_colorspace_RGB: number;
    heif_chroma_interleaved_RGB: number;
    heif_channel_interleaved: number;
  }

  const libheif: LibHEIF;
  export default libheif;
}
