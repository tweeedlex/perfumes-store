import {
  QueryProvider,
} from '@/app/_providers';
import {
  ClerkProvider,
} from '@clerk/nextjs'
import {dark} from '@clerk/themes';
import type {Metadata, Viewport} from 'next';
import {Inter} from 'next/font/google';
import {ReactNode} from 'react';
import './globals.css';
import clsx from 'clsx';
import Header from "../widgets/header"

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  variable: '--font-inter',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: 'Perfumes',
  description:
    'Best store to buy some perfumes online. We have a wide range of perfumes from different brands and at different prices.',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 0,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({children}: { children: ReactNode }) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}>
      <html lang="en" suppressHydrationWarning>
      <body className={clsx(inter.className, 'bg-white dark:bg-[#151315]')}>
      <QueryProvider>
        <>
          <Header/>
          <main className={"relative top-header"}>
            {children}
          </main>
        </>
      </QueryProvider>
      </body>
      </html>
    </ClerkProvider>
  );
}
