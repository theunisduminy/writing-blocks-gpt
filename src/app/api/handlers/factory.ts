import { AIHandler } from './types';
import { OpenAIHandler } from './openai';
import { GeminiHandler } from './gemini';

export function createAIHandler(): AIHandler {
  return process.env.USE_MODEL === 'GEMINI'
    ? new GeminiHandler()
    : new OpenAIHandler();
}
