import OpenAI from 'openai';
import { writeEmailPrompt } from '@/prompts/write-email';
import { microEssayPrompt } from '@/prompts/micro-essay';
import { writeSummaryPrompt } from '@/prompts/write-summary';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function handleWriting(notes: string, mode: string = 'essay') {
  const promptMap = {
    email: writeEmailPrompt,
    essay: microEssayPrompt,
    summary: writeSummaryPrompt,
  } as const;

  const systemPrompt = (
    promptMap[mode as keyof typeof promptMap] || promptMap.essay
  )(notes);

  const response = await openai.chat.completions.create({
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
    throw new Error('No response content from OpenAI');
  }

  console.log('OpenAI Response:', content);
  const parsedContent = JSON.parse(content.trim());
  console.log('Parsed Content:', parsedContent);

  return parsedContent;
}
