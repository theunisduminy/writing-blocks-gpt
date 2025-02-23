import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { creativePrompt } from '@/prompts/creative';
import { standardPrompt } from '@/prompts/standard';
import { oppositePrompt } from '@/prompts/opposite';
import { rateLimiter } from '@/app/lib/rate-limiter';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const POST = async (req: NextRequest) => {
  try {
    // Get IP address from X-Forwarded-For header or fallback to default
    const ip =
      req.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown-ip';

    // Check rate limit
    if (rateLimiter.isRateLimited(ip)) {
      const resetTime = rateLimiter.getResetTime(ip);
      return NextResponse.json(
        {
          error: 'Rate limit exceeded',
          resetInMs: resetTime,
        },
        {
          status: 429,
          headers: {
            'X-RateLimit-Reset': resetTime.toString(),
            'X-RateLimit-Remaining': '0',
          },
        },
      );
    }

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
    const remainingRequests = rateLimiter.getRemainingRequests(ip);

    console.log(remainingRequests);

    return NextResponse.json(parsedContent, {
      status: 200,
      headers: {
        'X-RateLimit-Remaining': remainingRequests.toString(),
        'X-RateLimit-Reset': rateLimiter.getResetTime(ip).toString(),
      },
    });
  } catch (error) {
    console.error('Error in Glint Finder API:', error);
    return NextResponse.json(
      { error: 'Failed to generate glints' },
      { status: 500 },
    );
  }
};
