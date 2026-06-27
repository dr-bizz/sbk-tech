'use client';

import type { Metadata } from 'next';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import createEmotionCache from '@/utils/createEmotionCache';
import theme from '@/styles/theme';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import { SnackbarProvider } from 'notistack';
import './globals.css';

const clientSideEmotionCache = createEmotionCache();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>
          Southbrook Technologies - Composite Manufacturing Consultancy
        </title>
        <meta
          name="description"
          content="Southbrook Technologies specializes in production and repair tooling and processes for the advanced composites industry."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <CacheProvider value={clientSideEmotionCache}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <SnackbarProvider maxSnack={3}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  minHeight: '100vh',
                }}
              >
                <Header />
                <main style={{ flex: 1 }}>{children}</main>
                <Footer />
              </div>
            </SnackbarProvider>
          </ThemeProvider>
        </CacheProvider>
      </body>
    </html>
  );
}
