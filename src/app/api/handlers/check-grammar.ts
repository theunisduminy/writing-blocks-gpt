import OpenAI from 'openai';
import { grammarPrompt } from '@/prompts/grammar';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function handleGrammarCheck(text: string) {
  if (!text || typeof text !== 'string') {
    throw new Error('Invalid text provided');
  }

  const systemPrompt = grammarPrompt(text);

  const response = await openai.chat.completions.create({
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
      json_schema: {
        name: 'grammar_response',
        strict: true,
        schema: {
          type: 'object',
          properties: {
            correctedText: {
              type: 'string',
              description:
                'The corrected and improved version of the input text',
            },
            explanation: {
              type: 'string',
              description: 'Brief explanation of the major changes made',
            },
          },
          required: ['correctedText', 'explanation'],
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
