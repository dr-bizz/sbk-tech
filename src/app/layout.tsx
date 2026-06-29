import type { Metadata, Viewport } from 'next';
import Providers from './providers';
import { PAGES, SITE_URL, pageMetadata } from '@/lib/seo';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  // Homepage values double as the site-wide defaults; sub-pages override them.
  ...pageMetadata(PAGES.home, 'website'),
  robots: {
    'max-snippet': -1,
    'max-image-preview': 'large',
    'max-video-preview': -1,
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/images/logo.png',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
