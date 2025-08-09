'use client';

import { SessionProvider } from 'next-auth/react';
import React from 'react';
import {
  ThemeProvider as NextThemesProvider,
  ThemeProviderProps,
} from 'next-themes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { IsDarkModeProvider } from '@/contexts/is-dark-mode';

const queryClient = new QueryClient();

const Providers = ({ children, ...props }: ThemeProviderProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <NextThemesProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        {...props}
      >
        <IsDarkModeProvider>
          <SessionProvider>{children}</SessionProvider>
        </IsDarkModeProvider>
      </NextThemesProvider>
    </QueryClientProvider>
  );
};

export default Providers;
