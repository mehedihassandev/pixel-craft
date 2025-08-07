declare module 'gifuct-js' {
  export interface ParsedFrame {
    delay: number;
    disposalType: number;
    dims: {
      left: number;
      top: number;
      width: number;
      height: number;
    };
    patch: Uint8ClampedArray;
  }

  export interface ParsedGif {
    lsd: {
      width: number;
      height: number;
    };
    gct: any;
  }

  export function parseGIF(buffer: ArrayBuffer): ParsedGif;
  export function decompressFrames(gif: ParsedGif, buildPatch: boolean): ParsedFrame[];
}
