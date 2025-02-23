'use client';

import { useState } from 'react';
import { BaseInput } from '../base/base-input';
import { BaseCarouselDisplay } from '../base/base-carousel';
import { MessageCirclePlusIcon } from 'lucide-react';
import { CopyButton } from '../copy-button';

interface GrammarResult {
  correctedText: string;
  explanation: string;
}

export function GrammarChecker() {
  const [results, setResults] = useState<GrammarResult[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleGrammarCheck = async (text: string) => {
    try {
      const response = await fetch('/api/check-grammar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });
      const data = await response.json();
      setResults([data]); // Assuming the API returns a single correction
      setShowResults(true);
    } catch (error) {
      console.error('Error checking grammar:', error);
    }
  };

  const renderGrammarResult = (result: GrammarResult) => (
    <div className='space-y-4'>
      <div className='flex items-center justify-between'>
        <h2 className='text-platinum text-2xl font-semibold'>Corrected Text</h2>
        <CopyButton text={result.correctedText} />
      </div>
      <div className='text-platinum whitespace-pre-wrap text-lg'>
        {result.correctedText}
      </div>
      <div className='mt-4'>
        <h3 className='mb-2 text-sm font-medium text-gray-400'>Explanation</h3>
        <p className='text-sm italic text-gray-300'>{result.explanation}</p>
      </div>
    </div>
  );

  return (
    <div className='animate-fadeIn mx-auto space-y-8 text-left'>
      {!showResults ? (
        <>
          <div className='mx-auto max-w-xl gap-2'>
            <h1 className='text-platinum text-2xl'>
              Check and improve your grammar
            </h1>
          </div>
          <BaseInput
            onSubmit={handleGrammarCheck}
            placeholder='Enter your text to check grammar...'
            inputComponent='textarea'
          />
        </>
      ) : (
        <div className='space-y-6'>
          <BaseCarouselDisplay
            items={results}
            renderItem={renderGrammarResult}
          />
          <button
            onClick={() => setShowResults(false)}
            className='text-platinum mx-auto flex items-center gap-2 rounded-lg bg-gray-800 px-6 py-3 transition-colors hover:bg-gray-700'
          >
            <MessageCirclePlusIcon className='h-4 w-4' />
            Check another text
          </button>
        </div>
      )}
    </div>
  );
}
