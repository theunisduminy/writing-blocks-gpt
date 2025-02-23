import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Writer Blocks',
  description: 'Elegant alternatives to everyday words.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        {children}
        <footer className='fixed bottom-0 left-0 right-0 p-4 text-center text-sm text-gray-600'>
          Built by the Vertiqal team
        </footer>
      </body>
    </html>
  );
}
