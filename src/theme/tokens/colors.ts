export const lightTheme = {
  colors: {
    background: '#f8f5f0',
    foreground: '#3e2723',
    card: '#f8f5f0',
    cardForeground: '#3e2723',
    popover: '#f8f5f0',
    popoverForeground: '#3e2723',
    primary: '#2e7d32',
    primaryForeground: '#ffffff',
    secondary: '#e8f5e9',
    secondaryForeground: '#1b5e20',
    muted: '#f0e9e0',
    mutedForeground: '#6d4c41',
    accent: '#c8e6c9',
    accentForeground: '#1b5e20',
    destructive: '#c62828',
    destructiveForeground: '#ffffff',
    border: '#e0d6c9',
    input: '#e0d6c9',
    ring: '#2e7d32',

    sidebar: '#f0e9e0',
    sidebarForeground: '#3e2723',
    sidebarPrimary: '#2e7d32',
    sidebarPrimaryForeground: '#ffffff',
    sidebarAccent: '#c8e6c9',
    sidebarAccentForeground: '#1b5e20',
    sidebarBorder: '#e0d6c9',
    sidebarRing: '#2e7d32',

    chart1: '#4caf50',
    chart2: '#388e3c',
    chart3: '#2e7d32',
    chart4: '#1b5e20',
    chart5: '#0a1f0c',
  },

  fonts: {
    sans: 'Montserrat',
    serif: 'Merriweather',
    mono: 'Source Code Pro',
  },

  radius: 8,
};

export const darkTheme = {
  colors: {
    background: '#1c2a1f',
    foreground: '#f0ebe5',
    card: '#2d3a2e',
    cardForeground: '#f0ebe5',
    popover: '#2d3a2e',
    popoverForeground: '#f0ebe5',
    primary: '#4caf50',
    primaryForeground: '#0a1f0c',
    secondary: '#3e4a3d',
    secondaryForeground: '#d7e0d6',
    muted: '#252f26',
    mutedForeground: '#d7cfc4',
    accent: '#388e3c',
    accentForeground: '#f0ebe5',
    destructive: '#c62828',
    destructiveForeground: '#f0ebe5',
    border: '#3e4a3d',
    input: '#3e4a3d',
    ring: '#4caf50',

    sidebar: '#1c2a1f',
    sidebarForeground: '#f0ebe5',
    sidebarPrimary: '#4caf50',
    sidebarPrimaryForeground: '#0a1f0c',
    sidebarAccent: '#388e3c',
    sidebarAccentForeground: '#f0ebe5',
    sidebarBorder: '#3e4a3d',
    sidebarRing: '#4caf50',

    chart1: '#81c784',
    chart2: '#66bb6a',
    chart3: '#4caf50',
    chart4: '#43a047',
    chart5: '#388e3c',
  },

  fonts: {
    sans: 'Montserrat',
    serif: 'Merriweather',
    mono: 'Source Code Pro',
  },

  radius: 8,
};

export const themes = {
  light: lightTheme,
  dark: darkTheme,
};

// Helper function to build full color palette (including semantic roles & aliases) for a theme
export function getThemeColors(isDark: boolean) {
  const t = isDark ? darkTheme.colors : lightTheme.colors;
  return {
    ...t,
    // Dark/Light specific aliases for backward compatibility
    backgroundDark: darkTheme.colors.background,
    foregroundDark: darkTheme.colors.foreground,
    cardDark: darkTheme.colors.card,
    cardForegroundDark: darkTheme.colors.cardForeground,
    primaryForegroundDark: darkTheme.colors.primaryForeground,
    secondaryDark: darkTheme.colors.secondary,
    secondaryForegroundDark: darkTheme.colors.secondaryForeground,
    mutedDark: darkTheme.colors.muted,
    mutedForegroundDark: darkTheme.colors.mutedForeground,
    accentDark: darkTheme.colors.accent,
    accentForegroundDark: darkTheme.colors.accentForeground,
    destructiveDark: darkTheme.colors.destructive,
    destructiveForegroundDark: darkTheme.colors.destructiveForeground,
    borderDark: darkTheme.colors.border,
    inputDark: darkTheme.colors.input,
    ringDark: darkTheme.colors.ring,

    // Clinical Semantic Roles
    success: isDark ? '#81C784' : '#1B5E20',
    successForeground: isDark ? '#0A1F0C' : '#FFFFFF',
    warning: isDark ? '#FFB74D' : '#E65100',
    warningForeground: '#FFFFFF',
    warningBackground: isDark ? '#3E2A14' : '#FFF3E0',
    info: isDark ? '#64B5F6' : '#0D47A1',
    infoForeground: '#FFFFFF',
    infoBackground: isDark ? '#102A38' : '#E3F2FD',
    danger: t.destructive,
    dangerForeground: t.destructiveForeground,
    dangerBackground: isDark ? '#3E1C1C' : '#FFEBEE',

    // Surface & Text Aliases
    surface: t.background,
    surfaceVariant: t.muted,
    textPrimary: t.foreground,
    textSecondary: t.mutedForeground,
    textMuted: t.mutedForeground,
    accentStrong: t.primary,
    educationAccent: t.chart1,
  };
}

export const colors = getThemeColors(false);
export type ColorToken = typeof colors;
