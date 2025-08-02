import { z } from 'zod';
import {
  IMAGE_DIMENSIONS,
  QUALITY_SETTINGS,
  FONT_SETTINGS,
  COLOR_VALIDATION,
  OCR_SETTINGS,
} from '@/constants';

export const placeholderFormSchema = z.object({
  width: z.coerce
    .number()
    .min(IMAGE_DIMENSIONS.MIN_WIDTH, `Width must be at least ${IMAGE_DIMENSIONS.MIN_WIDTH} pixel`)
    .max(IMAGE_DIMENSIONS.MAX_WIDTH, `Width cannot exceed ${IMAGE_DIMENSIONS.MAX_WIDTH} pixels`),
  height: z.coerce
    .number()
    .min(
      IMAGE_DIMENSIONS.MIN_HEIGHT,
      `Height must be at least ${IMAGE_DIMENSIONS.MIN_HEIGHT} pixel`
    )
    .max(IMAGE_DIMENSIONS.MAX_HEIGHT, `Height cannot exceed ${IMAGE_DIMENSIONS.MAX_HEIGHT} pixels`),
  text: z.string().optional(),
  bgColor: z
    .string()
    .regex(
      COLOR_VALIDATION.HEX_PATTERN,
      'Background color must be a valid hex color (6 characters)'
    ),
  textColor: z
    .string()
    .regex(COLOR_VALIDATION.HEX_PATTERN, 'Text color must be a valid hex color (6 characters)'),
  format: z.enum(['png', 'jpg', 'webp']),
  fontSize: z.coerce
    .number()
    .min(
      FONT_SETTINGS.MIN_FONT_SIZE,
      `Font size must be at least ${FONT_SETTINGS.MIN_FONT_SIZE} pixel`
    )
    .max(
      FONT_SETTINGS.MAX_FONT_SIZE,
      `Font size cannot exceed ${FONT_SETTINGS.MAX_FONT_SIZE} pixels`
    )
    .nullable()
    .optional()
    .transform(val => (val === 0 ? null : val)), // Transform 0 to null
});

export type PlaceholderFormData = z.infer<typeof placeholderFormSchema>;

export const resizeFormSchema = z.object({
  targetWidth: z.coerce
    .number()
    .min(IMAGE_DIMENSIONS.MIN_WIDTH, `Width must be at least ${IMAGE_DIMENSIONS.MIN_WIDTH} pixel`)
    .max(IMAGE_DIMENSIONS.MAX_WIDTH, `Width cannot exceed ${IMAGE_DIMENSIONS.MAX_WIDTH} pixels`),
  targetHeight: z.coerce
    .number()
    .min(
      IMAGE_DIMENSIONS.MIN_HEIGHT,
      `Height must be at least ${IMAGE_DIMENSIONS.MIN_HEIGHT} pixel`
    )
    .max(IMAGE_DIMENSIONS.MAX_HEIGHT, `Height cannot exceed ${IMAGE_DIMENSIONS.MAX_HEIGHT} pixels`),
  maintainAspectRatio: z.boolean().default(true),
  quality: z.coerce
    .number()
    .min(QUALITY_SETTINGS.MIN_QUALITY, `Quality must be at least ${QUALITY_SETTINGS.MIN_QUALITY}`)
    .max(QUALITY_SETTINGS.MAX_QUALITY, `Quality cannot exceed ${QUALITY_SETTINGS.MAX_QUALITY}`)
    .default(QUALITY_SETTINGS.DEFAULT_QUALITY),
  format: z.enum(['png', 'jpg', 'webp']).default('png'),
  resizeMethod: z.enum(['stretch', 'crop', 'contain', 'cover']).default('stretch'),
  backgroundColor: z
    .string()
    .regex(
      COLOR_VALIDATION.HEX_PATTERN,
      'Background color must be a valid hex color (6 characters)'
    )
    .default(COLOR_VALIDATION.DEFAULT_BG_COLOR),
});

export type ResizeFormData = z.infer<typeof resizeFormSchema>;

export const backgroundRemovalFormSchema = z.object({
  format: z.enum(['png', 'jpg', 'webp']).default('png'),
  quality: z.coerce
    .number()
    .min(QUALITY_SETTINGS.MIN_QUALITY, `Quality must be at least ${QUALITY_SETTINGS.MIN_QUALITY}`)
    .max(QUALITY_SETTINGS.MAX_QUALITY, `Quality cannot exceed ${QUALITY_SETTINGS.MAX_QUALITY}`)
    .default(QUALITY_SETTINGS.DEFAULT_QUALITY),
  backgroundColor: z
    .string()
    .regex(
      COLOR_VALIDATION.HEX_PATTERN,
      'Background color must be a valid hex color (6 characters)'
    )
    .default(COLOR_VALIDATION.DEFAULT_BG_COLOR)
    .optional(),
  model: z.enum(['isnet', 'isnet_fp16', 'isnet_quint8']).default('isnet'),
});

export type BackgroundRemovalFormData = z.infer<typeof backgroundRemovalFormSchema>;

export const ocrFormSchema = z.object({
  language: z.string().default(OCR_SETTINGS.DEFAULT_LANGUAGE),
  outputFormat: z.enum(OCR_SETTINGS.OUTPUT_FORMATS).default('text'),
  preserveLineBreaks: z.boolean().default(true),
  removeExtra: z.boolean().default(false),
  confidence: z.coerce
    .number()
    .min(OCR_SETTINGS.MIN_CONFIDENCE, `Confidence must be at least ${OCR_SETTINGS.MIN_CONFIDENCE}`)
    .max(OCR_SETTINGS.MAX_CONFIDENCE, `Confidence cannot exceed ${OCR_SETTINGS.MAX_CONFIDENCE}`)
    .default(OCR_SETTINGS.DEFAULT_CONFIDENCE),
  psm: z.coerce
    .number()
    .min(0, 'PSM must be at least 0')
    .max(13, 'PSM cannot exceed 13')
    .default(3),
  oem: z.coerce.number().min(0, 'OEM must be at least 0').max(3, 'OEM cannot exceed 3').default(3),
});

export type OcrFormData = z.infer<typeof ocrFormSchema>;
