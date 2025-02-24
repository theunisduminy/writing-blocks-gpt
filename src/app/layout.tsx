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
    <html lang='en' className='h-full overflow-hidden'>
      <body
        className={`${inter.className} flex min-h-screen flex-col bg-gradient-to-br from-gray-900 from-60% to-prussianBlue`}
      >
        <header className='bg-gray-900'>
          <div className='flex h-16 items-center border-none'>
            <MainNav />
          </div>
        </header>
        <main className='mt-24 flex flex-1 items-start justify-center p-4'>
          {children}
        </main>
        <footer className='p-4 text-center text-sm text-gray-500'>
          {new Date().getFullYear()} © Vertiqal, all rights reserved.
        </footer>
      </body>
    </html>
  );
}
