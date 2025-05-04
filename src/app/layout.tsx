import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Suspense } from 'react';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Build Track',
  description: 'Build Track app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased `}
      >
        <Suspense fallback={<div>Loading...</div>}>
          <div className='h-full w-full bg-gradient-to-b from-blue-300 to-white'>
            <main className={`max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen`}>
              {children}
            </main>
          </div>
        </Suspense>
      </body>
    </html>
  );
}
