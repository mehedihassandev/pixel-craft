'use server';

/**
 * @fileOverview This file defines a Genkit flow to suggest an appropriate font size for placeholder text based on image dimensions.
 *
 * - suggestFontSize - A function that suggests the font size.
 * - SuggestFontSizeInput - The input type for the suggestFontSize function.
 * - SuggestFontSizeOutput - The return type for the suggestFontSize function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const SuggestFontSizeInputSchema = z.object({
  width: z.number().describe('The width of the image in pixels.'),
  height: z.number().describe('The height of the image in pixels.'),
  text: z.string().describe('The text to be displayed on the image.'),
});
export type SuggestFontSizeInput = z.infer<typeof SuggestFontSizeInputSchema>;

const SuggestFontSizeOutputSchema = z.object({
  fontSize: z.number().describe('The suggested font size for the text, in pixels.'),
});
export type SuggestFontSizeOutput = z.infer<typeof SuggestFontSizeOutputSchema>;

export async function suggestFontSize(input: SuggestFontSizeInput): Promise<SuggestFontSizeOutput> {
  return suggestFontSizeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestFontSizePrompt',
  input: { schema: SuggestFontSizeInputSchema },
  output: { schema: SuggestFontSizeOutputSchema },
  prompt: `You are an expert in typography and image design. Your task is to suggest an appropriate font size for text that will be displayed on an image.

  Consider the following factors:
  - The dimensions of the image (width: {{width}} pixels, height: {{height}} pixels).
  - The length of the text: {{text}}
  - The goal is to make the text as large as possible while ensuring it remains legible and does not overflow the image boundaries.

  Provide ONLY the font size in pixels. Do not provide any other explanation. The font size must be a number.
`,
});

const suggestFontSizeFlow = ai.defineFlow(
  {
    name: 'suggestFontSizeFlow',
    inputSchema: SuggestFontSizeInputSchema,
    outputSchema: SuggestFontSizeOutputSchema,
  },
  async input => {
    const { output } = await prompt(input);
    return output!;
  }
);
