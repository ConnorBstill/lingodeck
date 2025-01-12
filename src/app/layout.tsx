import '~/styles/globals.css';

import { ClerkProvider } from '@clerk/nextjs';
import { Toaster } from '~/components/ui/sonner';
import { NavMenu } from '~/components/ui/navigation-menu';

import { ThemeProvider } from './providers/theme-provider';
import { QueryProviders } from './providers/query-provider';

import { GeistSans } from 'geist/font/sans';
import { type Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Lingodeck',
  description: 'Generated by create-t3-app',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      className={`${GeistSans.variable} h-full`}
      lang="en"
      suppressHydrationWarning
    >
      <body className="h-full">
        <QueryProviders>
          <ClerkProvider>
            <ThemeProvider
              attribute="class"
              // defaultTheme="system"
              // enableSystem
              disableTransitionOnChange
            >
              <NavMenu />
              {children}
              <Toaster />
            </ThemeProvider>
          </ClerkProvider>
        </QueryProviders>
      </body>
    </html>
  );
}
