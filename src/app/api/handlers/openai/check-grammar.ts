import { grammarPrompt } from '@/prompts/grammar';
import { GrammarResponse } from '../types';
import { OpenAIBase } from './base';
import { grammarSchema } from './schemas';

export class GrammarHandler extends OpenAIBase {
  async handle(text: string): Promise<GrammarResponse> {
    if (!text || typeof text !== 'string') {
      throw new Error('Invalid text provided');
    }

    const systemPrompt = grammarPrompt(text);
    const response = await this.client.chat.completions.create({
      model: 'gpt-4o-mini',
      temperature: 0.3,
      messages: [
        {
          role: 'system',
          content: systemPrompt,
        },
      ],
      response_format: {
        type: 'json_schema',
        json_schema: grammarSchema,
      },
    });

    const content = response.choices[0]?.message.content;
    if (!content) {
      throw new Error('No response content from API');
    }

    return JSON.parse(content);
  }
}
