'use client';

import { useState } from 'react';
import { BaseInput } from '../base/base-input';
import { BaseCarouselDisplay } from '../base/base-carousel';
import { BaseContentDisplay } from '../base/base-content-display';
import { MessageCirclePlusIcon } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { safeFetch } from '@/lib/safe-fetch';

type WritingMode = 'email' | 'essay' | 'summary';

interface EmailResult {
  subject: string;
  body: string;
}

interface EssayResult {
  essay: string;
  title: string;
}

interface SummaryResult {
  oneSentence: string;
  mainPoints: string[];
  takeaways: string[];
}

type WritingResult = {
  type: WritingMode;
  content: EmailResult | EssayResult | SummaryResult;
};

export function WriteAssistant() {
  const [results, setResults] = useState<WritingResult | null>(null);
  const [mode, setMode] = useState<WritingMode>('essay');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleWriteContent = async (notes: string) => {
    setError(null);
    setIsLoading(true);
    try {
      const response = await safeFetch('/api/ask-ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ type: 'write', prompt: notes, mode }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate content');
      }

      const data = await response.json();
      setResults({ type: mode, content: data });
    } catch (error) {
      console.error('Error generating content:', error);
      setError(
        error instanceof Error ? error.message : 'Failed to generate content',
      );
      setResults(null);
    } finally {
      setIsLoading(false);
    }
  };

  const renderSummaryResult = (content: string, index: number) => {
    const titles = ['One Sentence Summary', 'Main Points', 'Takeaways'];
    return (
      <div className='text-left'>
        <div className='flex justify-between'>
          <h2 className='mb-4 bg-gradient-to-r from-engineeringOrange to-butterscotch bg-clip-text text-4xl font-bold tracking-tight text-transparent md:text-5xl/relaxed'>
            {titles[index]}
          </h2>
        </div>
        <div className='whitespace-pre-line text-lg text-gray-300'>
          {content}
        </div>
      </div>
    );
  };

  const renderContent = () => {
    if (!results) return null;

    switch (results.type) {
      case 'summary': {
        const summaryContent = results.content as SummaryResult;
        return (
          <>
            <h1 className='text-2xl text-platinum'>Here&apos;s your summary</h1>
            <BaseCarouselDisplay
              items={[
                summaryContent.oneSentence,
                summaryContent.mainPoints
                  .map((point) => `• ${point}`)
                  .join('\n'),
                summaryContent.takeaways
                  .map((takeaway) => `• ${takeaway}`)
                  .join('\n'),
              ]}
              renderItem={renderSummaryResult}
            />
          </>
        );
      }
      case 'email': {
        const emailContent = results.content as EmailResult;
        return (
          <BaseContentDisplay
            type='email'
            content={{
              subject: emailContent.subject,
              body: emailContent.body,
            }}
          />
        );
      }
      case 'essay': {
        const essayContent = results.content as EssayResult;
        return (
          <BaseContentDisplay
            type='essay'
            content={{
              essay: essayContent.essay,
              title: essayContent.title,
            }}
          />
        );
      }
    }
  };

  return (
    <div className='animate-fadeIn mx-auto space-y-8'>
      {!results ? (
        <>
          <div className='mx-auto flex max-w-3xl items-center gap-2'>
            <h1 className='text-2xl text-platinum'>Help me write a </h1>
            <Select
              value={mode}
              onValueChange={(value: WritingMode) => setMode(value)}
            >
              <SelectTrigger className='w-min border-gray-700 bg-transparent text-2xl text-platinum'>
                <SelectValue />
              </SelectTrigger>
              <SelectContent className='border-gray-800 bg-gray-800 text-platinum'>
                <SelectItem value='essay'>mini essay</SelectItem>
                <SelectItem value='email'>email</SelectItem>
                <SelectItem value='summary'>summary</SelectItem>
              </SelectContent>
            </Select>
            {/* <h1 className='text-2xl text-platinum'>based on my notes</h1> */}
          </div>
          <BaseInput
            onSubmit={handleWriteContent}
            placeholder='Enter your notes...'
            inputComponent='textarea'
            disabled={isLoading}
          />
          {error && <p className='text-center text-red-500'>{error}</p>}
        </>
      ) : (
        <div className='mx-auto max-w-3xl space-y-6 text-left'>
          {renderContent()}
          <button
            onClick={() => {
              setResults(null);
              setError(null);
            }}
            className='mt-4 flex items-center gap-2 rounded-lg bg-gray-800 px-6 py-3 text-platinum transition-colors hover:bg-gray-700'
          >
            <MessageCirclePlusIcon className='h-4 w-4' />
            Try with different notes
          </button>
        </div>
      )}
    </div>
  );
}
