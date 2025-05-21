import { grammarPrompt } from '@/prompts/grammar';
import { GrammarResponse } from '../types';
import { GeminiBase } from './base';
import { grammarSchema } from './schemas';

export class GrammarHandler extends GeminiBase {
  async handle(text: string): Promise<GrammarResponse> {
    if (!text || typeof text !== 'string') {
      throw new Error('Invalid text provided');
    }

    const systemPrompt = grammarPrompt(text);
    const model = this.client.getGenerativeModel({
      model: 'gemini-2.5-flash-preview-05-20',
      generationConfig: {
        temperature: 0.3,
        responseMimeType: 'application/json',
        responseSchema: grammarSchema,
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
