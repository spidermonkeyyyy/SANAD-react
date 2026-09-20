import React from 'react';
import { StatusBar } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import { restoreSession } from './src/features/authentication/hooks/use-auth';
import { ThemeProvider, useTheme } from './src/theme/ThemeContext';

function MainApp() {
  const { isDark, colors } = useTheme();

  React.useEffect(() => {
    restoreSession();
  }, []);

  return (
    <>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={colors.background}
      />
      <AppNavigator />
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <MainApp />
    </ThemeProvider>
  );
}
