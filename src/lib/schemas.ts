import { z } from "zod";

export const placeholderFormSchema = z.object({
    width: z.coerce
        .number()
        .min(1, "Width must be at least 1 pixel")
        .max(5000, "Width cannot exceed 5000 pixels"),
    height: z.coerce
        .number()
        .min(1, "Height must be at least 1 pixel")
        .max(5000, "Height cannot exceed 5000 pixels"),
    text: z.string().optional(),
    bgColor: z
        .string()
        .regex(
            /^[0-9a-fA-F]{6}$/,
            "Background color must be a valid hex color (6 characters)"
        ),
    textColor: z
        .string()
        .regex(
            /^[0-9a-fA-F]{6}$/,
            "Text color must be a valid hex color (6 characters)"
        ),
    format: z.enum(["png", "jpg", "webp"]),
    fontSize: z.coerce
        .number()
        .min(1, "Font size must be at least 1 pixel")
        .max(500, "Font size cannot exceed 500 pixels")
        .nullable()
        .optional()
        .transform((val) => (val === 0 ? null : val)), // Transform 0 to null
});

export type PlaceholderFormData = z.infer<typeof placeholderFormSchema>;
