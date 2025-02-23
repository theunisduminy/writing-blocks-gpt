import { CopyButton } from '../copy-button';
import { ScrollArea } from '../ui/scroll-area';

interface BaseContentDisplayProps {
  type: 'email' | 'essay';
  content: {
    subject?: string;
    body?: string;
    essay?: string;
  };
  className?: string;
}

export function BaseContentDisplay({
  type,
  content,
  className = '',
}: BaseContentDisplayProps) {
  const { subject, body, essay } = content;
  const displayText = type === 'email' ? body : essay;

  return (
    <div className={`mx-auto max-w-3xl space-y-6 ${className}`}>
      {type === 'email' && subject && (
        <div className='flex max-h-40 items-center justify-between'>
          <h2 className='bg-gradient-to-r from-engineeringOrange to-butterscotch bg-clip-text text-2xl font-bold tracking-tight text-transparent md:text-3xl/relaxed'>
            {subject}
          </h2>
          <CopyButton text={`${subject}\n\n${body}`} />
        </div>
      )}

      {type === 'essay' && (
        <div className='flex justify-end'>
          <CopyButton text={essay || ''} />
        </div>
      )}

      <ScrollArea className='h-80'>
        <div className='prose prose-invert whitespace-pre-line rounded-lg bg-gray-800/50 p-6 text-lg text-gray-300'>
          {displayText}
        </div>
      </ScrollArea>
    </div>
  );
}
