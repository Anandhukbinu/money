import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
} from 'react';
import { ActivityIndicator, useColorScheme, View } from 'react-native';

import { useApp } from '@/context';
import { createTheme, Theme, ThemeMode } from './colors';

interface ThemeContextValue {
  theme: Theme;
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const { isReady, settings, updateSettings } = useApp();
  const systemColorScheme = useColorScheme();
  const themeMode = settings.themeMode;

  const resolvedMode =
    themeMode === 'system'
      ? systemColorScheme === 'dark'
        ? 'dark'
        : 'light'
      : themeMode;

  const theme = useMemo(() => createTheme(resolvedMode), [resolvedMode]);

  const handleSetThemeMode = useCallback(
    (mode: ThemeMode) => {
      updateSettings({ themeMode: mode });
    },
    [updateSettings],
  );

  const value = useMemo(
    () => ({
      theme,
      themeMode,
      setThemeMode: handleSetThemeMode,
    }),
    [theme, themeMode, handleSetThemeMode],
  );

  if (!isReady) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
}
