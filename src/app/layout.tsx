import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { MainNav } from '@/components/main-nav';

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
      <body
        className={`${inter.className} overflow-hidden bg-gradient-to-br from-gray-900 from-60% to-prussianBlue`}
      >
        <header className='bg-gray-900'>
          <div className='flex h-16 items-center border-none'>
            <MainNav />
          </div>
        </header>
        <main className='mt-24 flex min-h-screen items-start justify-center p-4'>
          {children}
        </main>
        <footer className='fixed bottom-0 left-0 right-0 p-4 text-center text-sm text-gray-500'>
          {new Date().getFullYear()} © Vertiqal, all rights reserved.
        </footer>
      </body>
    </html>
  );
}
