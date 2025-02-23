'use client';

import { useState } from 'react';
import { BaseInput } from '../base/base-input';
import { BaseCarouselDisplay } from '../base/base-carousel';
import { MessageCirclePlusIcon } from 'lucide-react';
import { CopyButton } from '../copy-button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { safeFetch } from '@/app/lib/safe-fetch';

interface Glint {
  word: string;
  glint: string[];
  sentence: string[];
  mode: 'creative' | 'standard' | 'opposite';
}

export function SynonymFinder() {
  const [results, setResults] = useState<Glint | null>(null);
  const [mode, setMode] = useState<'creative' | 'standard' | 'opposite'>(
    'standard',
  );

  const handleFindSynonym = async (word: string) => {
    try {
      const response = await safeFetch('/api/ask-ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: word, mode }),
      });
      const data = await response.json();
      setResults({ ...data, mode });
    } catch (error) {
      console.error('Error finding glint:', error);
    }
  };

  const renderGlintResult = (glintWord: string, index: number) => (
    <div className='text-left'>
      <div className='flex justify-between'>
        <h2 className='from-engineeringOrange to-butterscotch mb-4 bg-gradient-to-r bg-clip-text text-4xl font-bold tracking-tight text-transparent md:text-5xl/relaxed'>
          {glintWord}
        </h2>
        <CopyButton text={glintWord} />
      </div>
      <p className='text-lg italic text-gray-300'>{results?.sentence[index]}</p>
    </div>
  );

  return (
    <div className='animate-fadeIn mx-auto space-y-8'>
      {!results ? (
        <>
          <div className='mx-auto flex max-w-xl items-center gap-2'>
            <h1 className='text-platinum text-2xl'>Find a</h1>
            <Select
              value={mode}
              onValueChange={(value: 'creative' | 'standard' | 'opposite') =>
                setMode(value)
              }
            >
              <SelectTrigger className='text-platinum w-min border-gray-700 bg-transparent text-2xl'>
                <SelectValue />
              </SelectTrigger>
              <SelectContent className='text-platinum border-gray-800 bg-gray-800'>
                <SelectItem value='standard'>different</SelectItem>
                <SelectItem value='creative'>creative</SelectItem>
                <SelectItem value='opposite'>opposite</SelectItem>
              </SelectContent>
            </Select>
            <h1 className='text-platinum text-2xl'>way to say</h1>
          </div>
          <BaseInput
            onSubmit={handleFindSynonym}
            placeholder='Enter a word or phrase'
          />
        </>
      ) : (
        <div className='mx-auto max-w-3xl space-y-6'>
          <p className='mb-6 text-2xl text-gray-300 md:pl-14'>
            A {results.mode === 'creative' ? 'creative' : 'different'} way to
            say{' '}
            <span className='text-engineeringOrange font-bold underline'>
              {results.word}
            </span>{' '}
            is
          </p>
          <BaseCarouselDisplay
            items={results.glint}
            renderItem={renderGlintResult}
          />
          <button
            onClick={() => setResults(null)}
            className='text-platinum mt-4 flex items-center gap-2 rounded-lg bg-gray-800 px-6 py-3 transition-colors hover:bg-gray-700 md:ml-14'
          >
            <MessageCirclePlusIcon className='h-4 w-4' />
            Try another word
          </button>
        </div>
      )}
    </div>
  );
}
