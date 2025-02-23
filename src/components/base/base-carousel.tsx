import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { useEffect, useRef, useState } from 'react';

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
    <Carousel className={`mx-auto w-full max-w-2xl ${className}`}>
      <CarouselContent>
        {items.map((item, index) => (
          <CarouselItem key={index}>
            <div
              ref={(el) => {
                itemsRef.current[index] = el;
              }}
              style={{ minHeight: maxHeight > 0 ? `${maxHeight}px` : 'auto' }}
              className='rounded-lg bg-gray-800/50 px-6 py-12'
            >
              {renderItem(item, index)}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className='text-platinum border-gray-700 bg-gray-800/50' />
      <CarouselNext className='text-platinum border-gray-700 bg-gray-800/50' />
    </Carousel>
  );
}
