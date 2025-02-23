import { NextRequest, NextResponse } from 'next/server';
import { rateLimiter } from '@/app/lib/rate-limiter';
import { handleFindWord } from '../handlers/find-word';
import { handleGrammarCheck } from '../handlers/check-grammar';

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

    const body = await req.json();
    const { type = 'find-word' } = body;

    let result;

    if (type === 'find-word') {
      const { prompt, mode = 'different' } = body;
      result = await handleFindWord(prompt, mode);
    } else if (type === 'check-grammar') {
      const { text } = body;
      result = await handleGrammarCheck(text);
    } else {
      return NextResponse.json(
        { error: 'Invalid request type' },
        { status: 400 },
      );
    }

    const remainingRequests = rateLimiter.getRemainingRequests(ip);

    return NextResponse.json(result, {
      status: 200,
      headers: {
        'X-RateLimit-Remaining': remainingRequests.toString(),
        'X-RateLimit-Reset': rateLimiter.getResetTime(ip).toString(),
      },
    });
  } catch (error) {
    console.error('Error in API:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 },
    );
  }
};
