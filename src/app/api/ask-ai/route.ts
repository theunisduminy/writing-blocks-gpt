import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { creativePrompt } from '@/prompts/creative';
import { standardPrompt } from '@/prompts/standard';
import { oppositePrompt } from '@/prompts/opposite';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const POST = async (req: NextRequest) => {
  try {
    const { prompt, mode = 'standard' } = await req.json();

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json(
        { error: 'Invalid prompt provided' },
        { status: 400 },
      );
    }

    const promptMap = {
      standard: standardPrompt,
      creative: creativePrompt,
      opposite: oppositePrompt,
    } as const;

    const systemPrompt = (
      promptMap[mode as keyof typeof promptMap] || promptMap.standard
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

    const parsedContent = JSON.parse(content);

    console.log(parsedContent);

    return NextResponse.json(parsedContent, { status: 200 });
  } catch (error) {
    console.error('Error in Glint Finder API:', error);
    return NextResponse.json(
      { error: 'Failed to generate glints' },
      { status: 500 },
    );
  }
};
