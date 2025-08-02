'use server';

import { z } from 'zod';

const SuggestFontSizeInputSchema = z.object({
  width: z.coerce.number().min(1),
  height: z.coerce.number().min(1),
  text: z.string(),
});

export async function handleSuggestFontSize(data: { width: number; height: number; text: string }) {
  const parsed = SuggestFontSizeInputSchema.safeParse(data);

  if (!parsed.success) {
    return { error: 'Invalid input. Width, height, and text are required.' };
  }

  if (parsed.data.text.trim().length === 0) {
    return { error: 'Text cannot be empty to suggest a font size.' };
  }

  try {
    // Dynamically import the AI function to avoid bundling issues during build
    const { suggestFontSize } = await import('@/ai/flows/suggest-font-size');
    const result = await suggestFontSize(parsed.data);
    if (result && typeof result.fontSize === 'number') {
      return { fontSize: result.fontSize };
    }
    return { error: 'AI could not determine a font size.' };
  } catch (e) {
    console.error('Error calling AI service:', e);
    return { error: 'An unexpected error occurred while contacting the AI.' };
  }
}
