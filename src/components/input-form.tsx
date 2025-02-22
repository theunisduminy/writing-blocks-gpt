import { useState } from 'react';
import { safeFetch } from '../app/lib/safeFetch';
import { Glint } from './types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface InputFormProps {
  onGlintFound: (glint: Glint) => void;
}

export function InputForm({ onGlintFound }: InputFormProps) {
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<'creative' | 'standard'>('creative');
  const [loading, setLoading] = useState(false);

  const findGlint = async (
    word: string,
    selectedMode: 'creative' | 'standard',
  ) => {
    try {
      const response = await safeFetch('/api/ask-ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: word, mode: selectedMode }),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error finding glint:', error);
      return 'Error finding glint';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      setLoading(true);
      try {
        const glintData = await findGlint(input, mode);
        onGlintFound(glintData);
      } finally {
        setLoading(false);
        setInput('');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-4'>
      <div className='mx-auto flex max-w-md items-center gap-2 pb-6'>
        <h1 className='text-2xl text-white'>Find a</h1>
        <Select
          value={mode}
          onValueChange={(value: 'creative' | 'standard') => setMode(value)}
        >
          <SelectTrigger className='w-min border-gray-700 bg-transparent text-2xl text-white'>
            <SelectValue />
          </SelectTrigger>
          <SelectContent className='border-gray-800 bg-gray-800 text-white'>
            <SelectItem value='standard'>different</SelectItem>
            <SelectItem value='creative'>creative</SelectItem>
          </SelectContent>
        </Select>
        <h1 className='text-2xl text-white'>way to say</h1>
      </div>
      <div className='relative'>
        <input
          type='text'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='Enter the word or phrase'
          className='focus:ring-engineeringOrange w-full max-w-md rounded-lg border border-gray-700 bg-gray-800/50 p-4 text-white placeholder-gray-400 transition-all focus:outline-none focus:ring-2'
          disabled={loading}
        />
      </div>
      <button
        type='submit'
        className='bg-engineeringOrange hover:bg-engineeringOrange/70 w-full max-w-md rounded-lg p-4 font-medium text-white transition-colors disabled:cursor-not-allowed disabled:opacity-50'
        disabled={loading}
      >
        {loading ? 'Finding Glint...' : 'Find Glint'}
      </button>
    </form>
  );
}
