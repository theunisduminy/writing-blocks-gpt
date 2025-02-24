import OpenAI from 'openai';
import { grammarPrompt } from '@/prompts/grammar';
import { creativePrompt } from '@/prompts/creative';
import { differentPrompt } from '@/prompts/different';
import { oppositePrompt } from '@/prompts/opposite';
import { writeEmailPrompt } from '@/prompts/write-email';
import { microEssayPrompt } from '@/prompts/micro-essay';
import { writeSummaryPrompt } from '@/prompts/write-summary';
import {
  AIHandler,
  FindWordResponse,
  GrammarResponse,
  WritingResponse,
} from '../types';

export class OpenAIHandler implements AIHandler {
  private client: OpenAI;

  constructor() {
    this.client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async handleGrammarCheck(text: string): Promise<GrammarResponse> {
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
      throw new Error('No response content from API');
    }

    return JSON.parse(content);
  }

  async handleFindWord(
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
      throw new Error('No response content from API');
    }

    return JSON.parse(content);
  }

  async handleWriting(
    notes: string,
    mode: string = 'essay',
  ): Promise<WritingResponse> {
    const promptMap = {
      email: writeEmailPrompt,
      essay: microEssayPrompt,
      summary: writeSummaryPrompt,
    } as const;

    const systemPrompt = (
      promptMap[mode as keyof typeof promptMap] || promptMap.essay
    )(notes);

    const response = await this.client.chat.completions.create({
      model: 'gpt-4o-mini',
      temperature: 0.7,
      messages: [
        {
          role: 'system',
          content: systemPrompt,
        },
      ],
      response_format: { type: 'json_object' },
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
