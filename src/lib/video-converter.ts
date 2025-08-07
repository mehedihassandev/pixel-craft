import ffmpeg from 'fluent-ffmpeg';
import { promises as fs } from 'fs';
import { join } from 'path';
import { VIDEO_CONVERTER_CONFIG } from '@/constants/video-converter';

export interface ConversionOptions {
  format: string;
  resolution?: string;
  quality?: 'high' | 'medium' | 'low';
  frameRate?: string;
  duration?: number; // For GIF conversion
}

export interface ConversionProgress {
  percent: number;
  currentKbps: number;
  targetSize: number;
  timemark: string;
}

export class VideoConverter {
  private static tempDir = join(process.cwd(), 'tmp', 'video-conversions');

  static async ensureTempDir() {
    try {
      await fs.access(this.tempDir);
    } catch {
      await fs.mkdir(this.tempDir, { recursive: true });
    }
  }

  static async convertVideo(
    inputPath: string,
    outputPath: string,
    options: ConversionOptions,
    onProgress?: (progress: ConversionProgress) => void
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      let command = ffmpeg(inputPath);

      // Set resolution
      if (options.resolution && options.resolution !== 'original') {
        command = command.size(options.resolution);
      }

      // Set frame rate
      if (options.frameRate && options.frameRate !== 'original') {
        command = command.fps(parseInt(options.frameRate));
      }

      // Configure based on output format
      switch (options.format) {
        case 'mp4':
          command = this.configureMP4(command, options);
          break;
        case 'webm':
          command = this.configureWebM(command, options);
          break;
        case 'mov':
          command = this.configureMOV(command, options);
          break;
        case 'avi':
          command = this.configureAVI(command, options);
          break;
        case 'flv':
          command = this.configureFLV(command, options);
          break;
        case 'wmv':
          command = this.configureWMV(command, options);
          break;
        case 'gif':
          command = this.configureGIF(command, options);
          break;
        default:
          return reject(new Error(`Unsupported format: ${options.format}`));
      }

      command
        .output(outputPath)
        .on('progress', progress => {
          if (onProgress) {
            onProgress({
              percent: progress.percent || 0,
              currentKbps: progress.currentKbps || 0,
              targetSize: progress.targetSize || 0,
              timemark: progress.timemark || '00:00:00',
            });
          }
        })
        .on('end', () => {
          resolve();
        })
        .on('error', err => {
          reject(err);
        })
        .run();
    });
  }

  private static configureMP4(command: ffmpeg.FfmpegCommand, options: ConversionOptions) {
    const qualityConfig = VIDEO_CONVERTER_CONFIG.QUALITY_LEVELS.find(
      q => q.value === options.quality
    );
    const crf = qualityConfig?.crf || 23;

    return command
      .videoCodec('libx264')
      .audioCodec('aac')
      .addOption('-preset', 'medium')
      .addOption('-crf', crf.toString())
      .format('mp4');
  }

  private static configureWebM(command: ffmpeg.FfmpegCommand, options: ConversionOptions) {
    return command
      .videoCodec('libvpx-vp9')
      .audioCodec('libopus')
      .addOption('-b:v', '1M')
      .format('webm');
  }

  private static configureMOV(command: ffmpeg.FfmpegCommand, options: ConversionOptions) {
    return command
      .videoCodec('prores')
      .audioCodec('pcm_s16le')
      .addOption('-profile:v', '3')
      .format('mov');
  }

  private static configureAVI(command: ffmpeg.FfmpegCommand, options: ConversionOptions) {
    return command.videoCodec('msmpeg4v2').audioCodec('mp3').format('avi');
  }

  private static configureFLV(command: ffmpeg.FfmpegCommand, options: ConversionOptions) {
    return command.videoCodec('flv1').audioCodec('mp3').format('flv');
  }

  private static configureWMV(command: ffmpeg.FfmpegCommand, options: ConversionOptions) {
    return command.videoCodec('wmv2').audioCodec('wmav2').format('wmv');
  }

  private static configureGIF(command: ffmpeg.FfmpegCommand, options: ConversionOptions) {
    let gifCommand = command;

    // Limit duration for GIF
    if (options.duration && options.duration > 0) {
      const maxDuration = Math.min(options.duration, VIDEO_CONVERTER_CONFIG.MAX_GIF_DURATION);
      gifCommand = gifCommand.duration(maxDuration);
    } else {
      gifCommand = gifCommand.duration(VIDEO_CONVERTER_CONFIG.MAX_GIF_DURATION);
    }

    return gifCommand.addOption('-vf', 'fps=10,scale=320:-1:flags=lanczos').format('gif');
  }

  static async cleanupFile(filePath: string): Promise<void> {
    try {
      await fs.unlink(filePath);
    } catch (error) {
      console.warn('Failed to cleanup file:', filePath, error);
    }
  }

  static async getVideoInfo(filePath: string): Promise<any> {
    return new Promise((resolve, reject) => {
      ffmpeg.ffprobe(filePath, (err, metadata) => {
        if (err) {
          reject(err);
        } else {
          resolve(metadata);
        }
      });
    });
  }

  static generateUniqueFilename(originalName: string, format: string): string {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 8);
    const baseName = originalName.split('.')[0];
    const formatConfig = VIDEO_CONVERTER_CONFIG.OUTPUT_FORMATS.find(f => f.value === format);
    const extension = formatConfig?.extension || `.${format}`;

    return `${baseName}_${timestamp}_${random}${extension}`;
  }
}
