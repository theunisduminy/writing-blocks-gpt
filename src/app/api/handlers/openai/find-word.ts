import { creativePrompt } from '@/prompts/creative';
import { differentPrompt } from '@/prompts/different';
import { oppositePrompt } from '@/prompts/opposite';
import { FindWordResponse } from '../types';
import { OpenAIBase } from './base';
import { findWordSchema } from './schemas';

export class FindWordHandler extends OpenAIBase {
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

    const response = await this.client.chat.completions.create({
      model: 'gpt-4o-mini',
      temperature: 0.9,
      messages: [
        {
          role: 'system',
          content: systemPrompt,
        },
      ],
      response_format: {
        type: 'json_schema',
        json_schema: findWordSchema,
      },
    });

    const content = response.choices[0]?.message.content;
    if (!content) {
      throw new Error('No response content from API');
    }

    return JSON.parse(content);
  }
}
