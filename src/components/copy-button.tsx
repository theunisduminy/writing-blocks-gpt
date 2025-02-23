import { CheckIcon, Copy } from 'lucide-react';
import { useState } from 'react';

type Props = {
  text: string;
};

export const CopyButton = ({ text }: Props) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  return (
    <button
      onClick={handleCopy}
      className='hover:text-platinum flex items-center justify-center p-2 text-gray-300 transition-colors'
      title={isCopied ? 'Copied!' : 'Copy'}
    >
      {isCopied ? (
        <>
          <CheckIcon strokeWidth={1.5} size={16} />
        </>
      ) : (
        <>
          <Copy strokeWidth={1.5} size={16} />
        </>
      )}
    </button>
  );
};
