import type { Metadata } from 'next';
import '@/styles/reset.scss';

export const metadata: Metadata = {
  title: 'Lumistra',
  description: 'Lumistra',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" sizes="any" type="image/svg+xml" href={(process.env.basePath || '') + '/favicon.svg'} />
        <meta name="robots" content="noindex" />
      </head>
      <body>{children}</body>
    </html>
  );
}
