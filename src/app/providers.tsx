'use client';

import React from 'react';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { SnackbarProvider } from 'notistack';
import theme from '@/styles/theme';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';

/**
 * Client-side providers (MUI theme, notistack) plus the page chrome.
 * AppRouterCacheProvider injects emotion's critical CSS during SSR via
 * useServerInsertedHTML, so styles are present in the initial HTML — this
 * prevents the flash of unstyled content on first paint.
 */
export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AppRouterCacheProvider options={{ key: 'mui' }}>
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
    </AppRouterCacheProvider>
  );
}
