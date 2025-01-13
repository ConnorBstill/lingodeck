import '~/styles/globals.css';

import { type Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Lingodeck',
  description: 'Generated by create-t3-app',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
};

export default function MainLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="h-[calc(100%-3rem)] flex justify-center items-start">
      {children}
    </main>
  );
}
