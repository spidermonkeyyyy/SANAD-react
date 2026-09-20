import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { shapes, spacing, typography } from '../theme/tokens';
import { useTheme } from '../theme/ThemeContext';

interface RespiBadgeProps {
  label: string;
  variant?: 'success' | 'warning' | 'danger' | 'info' | 'muted';
  style?: ViewStyle;
}

export const RespiBadge: React.FC<RespiBadgeProps> = ({
  label,
  variant = 'info',
  style,
}) => {
  const { colors, isDark } = useTheme();

  const getBadgeStyle = () => {
    switch (variant) {
      case 'success':
        return { bg: colors.secondary, text: colors.success };
      case 'warning':
        return { bg: colors.warningBackground, text: colors.warning };
      case 'danger':
        return { bg: colors.dangerBackground, text: colors.destructive };
      case 'muted':
        return { bg: colors.muted, text: colors.mutedForeground };
      case 'info':
      default:
        return { bg: colors.infoBackground, text: colors.info };
    }
  };

  const currentVariant = getBadgeStyle();

  return (
    <View style={[styles.badge, { backgroundColor: currentVariant.bg }, style]}>
      <Text style={[styles.label, { color: currentVariant.text }]}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xxs,
    borderRadius: shapes.pill,
    alignSelf: 'flex-start',
  },
  label: {
    fontFamily: typography.fontFamily.openSans,
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.semibold,
  },
});
