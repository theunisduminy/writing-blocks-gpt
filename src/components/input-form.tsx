import { useState } from 'react';
import { safeFetch } from '../app/lib/safe-fetch';
import { Glint } from './types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { SearchIcon, Disc3Icon } from 'lucide-react';

interface InputFormProps {
  onGlintFound: (glint: Glint) => void;
}

export function InputForm({ onGlintFound }: InputFormProps) {
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<'creative' | 'standard' | 'opposite'>(
    'standard',
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const findGlint = async (
    word: string,
    selectedMode: 'creative' | 'standard' | 'opposite',
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
      return { ...data, mode: selectedMode };
    } catch (error) {
      console.error('Error finding glint:', error);
      return 'Error finding glint';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (input.trim() === '') {
      setError(true);
      return;
    }

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
    <form
      onSubmit={handleSubmit}
      className='animate-fadeIn mx-auto max-w-xl space-y-4'
    >
      <div className='flex items-center gap-2 pb-6'>
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
      <div className='mx-auto flex gap-x-2'>
        <input
          type='text'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='Enter a word or phrase'
          onClick={() => setError(false)}
          className='focus:ring-butterscotch text-platinum w-full max-w-md rounded-lg border border-gray-700 bg-gray-800/50 p-4 placeholder-gray-400 transition-all focus:outline-none focus:ring-2'
          disabled={loading}
        />

        <button
          type='submit'
          className='bg-butterscotch/90 hover:bg-butterscotch/80 text-platinum rounded-lg p-4 font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50'
          disabled={loading}
        >
          {loading ? <Disc3Icon className='animate-spin' /> : <SearchIcon />}
        </button>
      </div>
      <div className='relative h-6'>
        <p
          className={`ml-2 text-left text-red-600/90 transition-all duration-300 ${
            error ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
          }`}
        >
          Add something, duh
        </p>
      </div>
    </form>
  );
}
