import React, { createContext, useContext, useState, useMemo } from 'react';
import { useColorScheme } from 'react-native';
import { lightTheme, darkTheme, getThemeColors } from './tokens/colors';

export type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeContextType {
  themeMode: ThemeMode;
  isDark: boolean;
  theme: typeof lightTheme;
  colors: ReturnType<typeof getThemeColors>;
  setThemeMode: (mode: ThemeMode) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [themeMode, setThemeModeState] = useState<ThemeMode>('system');

  const isDark = useMemo(() => {
    if (themeMode === 'system') {
      return systemColorScheme === 'dark';
    }
    return themeMode === 'dark';
  }, [themeMode, systemColorScheme]);

  const theme = isDark ? darkTheme : lightTheme;

  const colors = useMemo(() => getThemeColors(isDark), [isDark]);

  const toggleTheme = () => {
    setThemeModeState((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const setThemeMode = (mode: ThemeMode) => {
    setThemeModeState(mode);
  };

  return (
    <ThemeContext.Provider
      value={{
        themeMode,
        isDark,
        theme,
        colors,
        setThemeMode,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (!context) {
    // Return default light fallback if used outside Provider
    const isDark = false;
    return {
      themeMode: 'light',
      isDark: false,
      theme: lightTheme,
      colors: getThemeColors(false),
      setThemeMode: () => {},
      toggleTheme: () => {},
    };
  }
  return context;
}
