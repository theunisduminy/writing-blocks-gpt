import { Glint } from './types';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { MessageCirclePlusIcon } from 'lucide-react';

interface GlintDisplayProps {
  glint: Glint;
  onReset: () => void;
}

export function GlintDisplay({ glint, onReset }: GlintDisplayProps) {
  return (
    <div className='animate-fadeIn text-platinum mx-auto text-left md:max-w-3xl'>
      <p className='mb-6 text-2xl text-gray-300 md:pl-14'>
        A {glint.mode === 'creative' ? 'creative' : 'different'} way to say{' '}
        <span className='text-engineeringOrange font-bold underline'>
          {glint.word}
        </span>{' '}
        is
      </p>
      <Carousel className='mx-auto w-full max-w-2xl'>
        <CarouselContent>
          {glint.glint.map((glintWord, index) => (
            <CarouselItem key={index}>
              <div className='rounded-lg bg-gray-800/50 px-6 py-12'>
                <h2 className='from-engineeringOrange to-butterscotch mb-4 bg-gradient-to-r bg-clip-text text-4xl font-bold tracking-tight text-transparent md:text-5xl/relaxed'>
                  {glintWord}
                </h2>
                <p className='mt-4 text-lg italic text-gray-300'>
                  {glint.sentence[index]}
                </p>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className='text-platinum border-gray-700 bg-gray-800/50' />
        <CarouselNext className='text-platinum border-gray-700 bg-gray-800/50' />
      </Carousel>
      <button
        onClick={onReset}
        className='text-platinum mt-4 flex items-center gap-2 rounded-lg bg-gray-800 px-6 py-3 transition-colors hover:bg-gray-700 md:ml-14'
      >
        <MessageCirclePlusIcon className='h-4 w-4' />
        Try another word
      </button>
    </div>
  );
}
