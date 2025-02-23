import { useState } from 'react';
import { SendIcon, Disc3Icon } from 'lucide-react';

interface BaseInputProps {
  onSubmit: (value: string) => Promise<void>;
  placeholder?: string;
  inputComponent?: 'input' | 'textarea';
  className?: string;
}

export function BaseInput({
  onSubmit,
  placeholder = 'Enter text',
  inputComponent = 'input',
  className = '',
}: BaseInputProps) {
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (value.trim() === '') {
      setError(true);
      return;
    }

    setLoading(true);
    try {
      await onSubmit(value);
      setValue('');
    } finally {
      setLoading(false);
    }
  };

  const InputComponent = inputComponent === 'textarea' ? 'textarea' : 'input';

  return (
    <form
      onSubmit={handleSubmit}
      className={`mx-auto space-y-4 ${className} ${inputComponent === 'textarea' ? 'max-w-3xl' : 'max-w-xl'}`}
    >
      <div
        className={`${inputComponent === 'textarea' ? 'relative' : 'flex items-center gap-x-2'}`}
      >
        <InputComponent
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          onClick={() => setError(false)}
          className={`w-full rounded-lg border border-gray-700 bg-gray-800/50 p-4 ${
            inputComponent === 'textarea' ? 'pr-16' : ''
          } text-platinum placeholder-gray-400 transition-all focus:outline-none focus:ring-2 focus:ring-butterscotch ${
            inputComponent === 'textarea' ? 'max-w-3xl' : 'max-w-lg'
          }`}
          disabled={loading}
          rows={inputComponent === 'textarea' ? 6 : undefined}
        />

        <button
          type='submit'
          className={`${
            inputComponent === 'textarea'
              ? 'absolute bottom-5 right-3'
              : 'h-fit'
          } rounded-lg bg-butterscotch/90 p-3 font-medium text-platinum transition-colors hover:bg-butterscotch/80 disabled:cursor-not-allowed disabled:opacity-50`}
          disabled={loading}
        >
          {loading ? <Disc3Icon className='animate-spin' /> : <SendIcon />}
        </button>
      </div>
      <div className='relative h-6'>
        <p
          className={`ml-2 text-left text-red-600/90 transition-all duration-300 ${
            error ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
          }`}
        >
          This field cannot be empty
        </p>
      </div>
    </form>
  );
}
