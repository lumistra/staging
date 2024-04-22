import type { Metadata } from 'next';
import '@/styles/reset.scss';

export const metadata: Metadata = {
  title: 'Lumistra',
  description: 'Lumistra',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
