import { writeEmailPrompt } from '@/prompts/write-email';
import { microEssayPrompt } from '@/prompts/micro-essay';
import { writeSummaryPrompt } from '@/prompts/write-summary';
import { WritingResponse } from '../types';
import { OpenAIBase } from './base';
import { emailSchema, essaySchema, summarySchema } from './schemas';

export class WritingHandler extends OpenAIBase {
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

    const response = await this.client.chat.completions.create({
      model: 'gpt-4o-mini',
      temperature: 0.7,
      messages: [
        {
          role: 'system',
          content: systemPrompt,
        },
      ],
      response_format: {
        type: 'json_schema',
        json_schema: schema,
      },
    });

    const content = response.choices[0]?.message.content;
    if (!content) {
      throw new Error('No response content from API');
    }

    console.log('OpenAI Response:', content);
    const parsedContent = JSON.parse(content.trim());
    console.log('Parsed Content:', parsedContent);
    return parsedContent;
  }
}
