import { writeEmailPrompt } from '@/prompts/write-email';
import { microEssayPrompt } from '@/prompts/micro-essay';
import { writeSummaryPrompt } from '@/prompts/write-summary';
import { WritingResponse } from '../types';
import { GeminiBase } from './base';
import { emailSchema, essaySchema, summarySchema } from './schemas';

export class WritingHandler extends GeminiBase {
  async handle(
    notes: string,
    mode: string = 'essay',
  ): Promise<WritingResponse> {
    const promptMap = {
      email: writeEmailPrompt,
      essay: microEssayPrompt,
      summary: writeSummaryPrompt,
    } as const;

    const schemaMap = {
      email: emailSchema,
      essay: essaySchema,
      summary: summarySchema,
    } as const;

    const systemPrompt = (
      promptMap[mode as keyof typeof promptMap] || promptMap.essay
    )(notes);

    const schema = schemaMap[mode as keyof typeof schemaMap] || essaySchema;

    const model = this.client.getGenerativeModel({
      model: 'gemini-2.0-flash',
      generationConfig: {
        temperature: 0.7,
        responseMimeType: 'application/json',
        responseSchema: schema,
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
