'use client';

import { useState } from 'react';
import { BaseInput } from '../base/base-input';
import { BaseCarouselDisplay } from '../base/base-carousel';
import { MessageCirclePlusIcon, AlertCircle } from 'lucide-react';
import { CopyButton } from '../copy-button';

interface GrammarResult {
  correctedText: string;
  explanation: string;
}

type CarouselItem = {
  type: 'correction' | 'explanation';
  content: string;
};

export function GrammarChecker() {
  const [results, setResults] = useState<GrammarResult[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGrammarCheck = async (text: string) => {
    setError(null);
    try {
      const response = await fetch('/api/ask-ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'check-grammar',
          text,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to check grammar');
      }

      const data = await response.json();
      setResults([data]);
      setShowResults(true);
    } catch (error) {
      console.error('Error checking grammar:', error);
      setError(
        error instanceof Error ? error.message : 'Failed to check grammar',
      );
      setShowResults(false);
    }
  };

  const carouselItems: CarouselItem[] = results.length
    ? [
        { type: 'correction', content: results[0].correctedText },
        { type: 'explanation', content: results[0].explanation },
      ]
    : [];

  const renderCarouselItem = (item: CarouselItem) => (
    <div className='space-y-4'>
      <div className='flex items-center justify-between'>
        <h2 className='bg-gradient-to-r from-engineeringOrange to-butterscotch bg-clip-text font-semibold text-transparent md:text-3xl/relaxed'>
          {item.type === 'correction' ? 'Corrected Text' : 'Explanation'}
        </h2>
        {item.type === 'correction' && <CopyButton text={item.content} />}
      </div>
      <div className={`whitespace-pre-wrap text-base text-platinum`}>
        {item.content}
      </div>
    </div>
  );

  return (
    <div className='animate-fadeIn mx-auto space-y-8 text-left'>
      {!showResults ? (
        <>
          <div className='mx-auto max-w-3xl gap-2'>
            <h1 className='text-2xl text-platinum'>
              Improve writing and grammar
            </h1>
          </div>
          <BaseInput
            onSubmit={handleGrammarCheck}
            placeholder='Enter sentence or paragraph...'
            inputComponent='textarea'
          />
          {error && (
            <div className='flex items-center gap-2 rounded-lg bg-red-950/50 p-4 text-red-400'>
              <AlertCircle className='h-5 w-5' />
              <p>{error}</p>
            </div>
          )}
        </>
      ) : (
        <div className='space-y-6'>
          <BaseCarouselDisplay
            items={carouselItems}
            renderItem={renderCarouselItem}
            className='max-w-3xl'
          />
          <button
            onClick={() => {
              setShowResults(false);
              setError(null);
            }}
            className='mx-auto flex items-center gap-2 rounded-lg bg-gray-800 px-6 py-3 text-platinum transition-colors hover:bg-gray-700'
          >
            <MessageCirclePlusIcon className='h-4 w-4' />
            Check another text
          </button>
        </div>
      )}
    </div>
  );
}
