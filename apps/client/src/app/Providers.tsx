"use client";

import type { ThemeProviderProps } from "next-themes";

import { HeroUIProvider } from "@heroui/react";
import GlobalErrorBoundary from "@nimble/components/ErrorBoundary";
import store from "@nimble/store/store";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useRouter } from "next/navigation";
import { Provider } from "react-redux";

import AuthProvider from "./AuthProvider";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter();

  return (
    <HeroUIProvider>
      <Provider store={store}>
        <GlobalErrorBoundary>
          {/* <AuthProvider> */}
          {children}
          {/* </AuthProvider> */}
        </GlobalErrorBoundary>
      </Provider>
    </HeroUIProvider>
  );
}
