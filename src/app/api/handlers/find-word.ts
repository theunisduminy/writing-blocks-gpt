import OpenAI from 'openai';
import { creativePrompt } from '@/prompts/creative';
import { differentPrompt } from '@/prompts/different';
import { oppositePrompt } from '@/prompts/opposite';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function handleFindWord(
  prompt: string,
  mode: string = 'different',
) {
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

  const response = await openai.chat.completions.create({
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
      json_schema: {
        name: 'glint_response',
        strict: true,
        schema: {
          type: 'object',
          properties: {
            word: {
              type: 'array',
              items: { type: 'string' },
            },
            glint: {
              type: 'array',
              items: { type: 'string' },
            },
            sentence: {
              type: 'array',
              items: { type: 'string' },
            },
          },
          required: ['word', 'glint', 'sentence'],
          additionalProperties: false,
        },
      },
    },
  });

  const content = response.choices[0]?.message.content;
  if (!content) {
    throw new Error('No response content from OpenAI');
  }

  return JSON.parse(content);
}
