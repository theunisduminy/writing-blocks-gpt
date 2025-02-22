import { Glint } from './types';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

interface GlintDisplayProps {
  glint: Glint;
  onReset: () => void;
}

export function GlintDisplay({ glint, onReset }: GlintDisplayProps) {
  return (
    <div className='animate-fadeIn mx-auto max-w-3xl text-center text-white'>
      <p className='mb-6 text-2xl text-gray-300'>
        A different way to say{' '}
        <span className='text-engineeringOrange font-bold underline'>
          {glint.word[0]}
        </span>{' '}
        is
      </p>
      <Carousel className='mx-auto w-full max-w-2xl'>
        <CarouselContent>
          {glint.glint.map((glintWord, index) => (
            <CarouselItem key={index}>
              <div className='rounded-lg bg-gray-800/50 px-6 py-12'>
                <h2 className='from-engineeringOrange to-engineeringOrange/80 mb-10 bg-gradient-to-r bg-clip-text text-4xl font-bold tracking-tight text-transparent md:text-5xl/relaxed'>
                  {glintWord}
                </h2>
                <p className='mt-4 italic text-gray-300'>
                  {glint.sentence[index]}
                </p>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className='border-gray-700 bg-gray-800/50 text-white' />
        <CarouselNext className='border-gray-700 bg-gray-800/50 text-white' />
      </Carousel>
      <button
        onClick={onReset}
        className='mt-8 rounded-lg bg-gray-800 px-6 py-3 text-white transition-colors hover:bg-gray-700'
      >
        Try Another Word
      </button>
    </div>
  );
}
