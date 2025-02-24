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
    <html lang='en' className='h-[100dvh] overflow-x-hidden'>
      <body
        className={`${inter.className} flex h-[100dvh] flex-col overflow-hidden bg-gradient-to-br from-gray-900 from-60% to-prussianBlue`}
      >
        <header className='bg-gray-900'>
          <div className='mb-8 flex h-16 items-center border-none md:mb-16'>
            <MainNav />
          </div>
        </header>
        <main className='flex flex-1 items-start justify-center overflow-y-auto p-4'>
          {children}
        </main>
        <footer className='bg-transparent p-4 text-center text-sm text-gray-500'>
          {new Date().getFullYear()} © Vertiqal, all rights reserved.
        </footer>
      </body>
    </html>
  );
}
