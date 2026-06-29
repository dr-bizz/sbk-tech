'use client';

import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import { SnackbarProvider } from 'notistack';
import createEmotionCache from '@/utils/createEmotionCache';
import theme from '@/styles/theme';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';

const clientSideEmotionCache = createEmotionCache();

/**
 * Client-side providers (MUI theme/emotion cache, notistack) plus the page
 * chrome. Kept separate so the root layout can remain a server component and
 * use the Next.js Metadata API.
 */
export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CacheProvider value={clientSideEmotionCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SnackbarProvider maxSnack={3}>
          <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header />
            <main style={{ flex: 1 }}>{children}</main>
            <Footer />
          </div>
        </SnackbarProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}
