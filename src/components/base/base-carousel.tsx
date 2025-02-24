import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { useEffect, useRef, useState } from 'react';
import { ScrollArea } from '../ui/scroll-area';

interface BaseCarouselDisplayProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  className?: string;
}

export function BaseCarouselDisplay<T>({
  items,
  renderItem,
  className = '',
}: BaseCarouselDisplayProps<T>) {
  const [maxHeight, setMaxHeight] = useState<number>(0);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const calculateMaxHeight = () => {
      const heights = itemsRef.current
        .filter((ref): ref is HTMLDivElement => ref !== null)
        .map((ref) => ref.scrollHeight);
      const maxH = Math.max(...heights);
      if (maxH > 0) {
        setMaxHeight(maxH);
      }
    };

    calculateMaxHeight();
    window.addEventListener('resize', calculateMaxHeight);
    return () => window.removeEventListener('resize', calculateMaxHeight);
  }, [items]);

  return (
    <Carousel className={`mx-auto max-w-3xl ${className}`}>
      <ScrollArea
        className={`max-w-3xl ${maxHeight > 235 ? `h-[${maxHeight}px]` : 'h-full'}`}
      >
        <CarouselContent>
          {items.map((item, index) => (
            <CarouselItem key={index}>
              <div
                ref={(el) => {
                  itemsRef.current[index] = el;
                }}
                style={{ minHeight: maxHeight > 0 ? `${maxHeight}px` : 'auto' }}
                className='max-w-[22rem] rounded-lg bg-gray-800/50 px-6 py-12 lg:max-w-3xl'
              >
                {renderItem(item, index)}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </ScrollArea>
      <CarouselPrevious className='border-gray-700 bg-gray-800/50 text-platinum' />
      <CarouselNext className='border-gray-700 bg-gray-800/50 text-platinum' />
    </Carousel>
  );
}
