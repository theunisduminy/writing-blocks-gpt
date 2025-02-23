'use client';

import { useState } from 'react';
import { InputForm } from '@/components/input-form';
import { GlintDisplay } from '@/components/glint-display';
import { Glint } from './types';

export default function LexiconSwitchPage() {
  const [glint, setGlint] = useState<Glint | null>(null);

  const handleGlintFound = (newGlint: Glint) => {
    setGlint(newGlint);
  };

  const reset = () => setGlint(null);

  return (
    <main className='to-prussianBlue flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-900 from-60% p-4'>
      <div className='w-full text-center'>
        {!glint ? (
          <InputForm onGlintFound={handleGlintFound} />
        ) : (
          <GlintDisplay glint={glint} onReset={reset} />
        )}
      </div>
    </main>
  );
}
