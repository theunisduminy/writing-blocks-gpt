import { creativePrompt } from '@/prompts/creative';
import { differentPrompt } from '@/prompts/different';
import { oppositePrompt } from '@/prompts/opposite';
import { FindWordResponse } from '../types';
import { GeminiBase } from './base';
import { findWordSchema } from './schemas';

export class FindWordHandler extends GeminiBase {
  async handle(
    prompt: string,
    mode: string = 'different',
  ): Promise<FindWordResponse> {
    if (!prompt || typeof prompt !== 'string') {
      throw new Error('Invalid prompt provided');
    }

    const promptMap = {
      different: differentPrompt,
      creative: creativePrompt,
      opposite: oppositePrompt,
    } as const;

    const systemPrompt = (
      promptMap[mode as keyof typeof promptMap] || promptMap.different
    )(prompt);

    const model = this.client.getGenerativeModel({
      model: 'gemini-2.0-flash',
      generationConfig: {
        temperature: 0.9,
        responseMimeType: 'application/json',
        responseSchema: findWordSchema,
      },
    });

    const result = await model.generateContent(systemPrompt);
    const content = result.response.text();

    try {
      console.log('Gemini Response:', content);
      const parsedContent = JSON.parse(content.trim());
      console.log('Parsed Content:', parsedContent);
      return parsedContent;
    } catch (error) {
      console.error('Failed to parse Gemini response:', content, error);
      throw new Error('Invalid JSON response from API');
    }
  }
}
