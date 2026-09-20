import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  View,
} from 'react-native';
import { shapes, spacing, typography } from '../theme/tokens';
import { useTheme } from '../theme/ThemeContext';

interface AppButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
  textStyle?: TextStyle;
}

export const AppButton: React.FC<AppButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  loading = false,
  disabled = false,
  fullWidth = false,
  icon,
  style,
  textStyle,
}) => {
  const { colors } = useTheme();

  const getContainerStyle = (): ViewStyle[] => {
    const list: ViewStyle[] = [styles.baseContainer];

    if (fullWidth) list.push(styles.fullWidthContainer);

    if (size === 'small') list.push(styles.smallContainer);
    else if (size === 'large') list.push(styles.largeContainer);
    else list.push(styles.mediumContainer);

    if (variant === 'primary') list.push({ backgroundColor: colors.primary });
    else if (variant === 'secondary') list.push({ backgroundColor: colors.secondary });
    else if (variant === 'outline') list.push({ backgroundColor: 'transparent', borderWidth: 1.5, borderColor: colors.primary });
    else if (variant === 'danger') list.push({ backgroundColor: colors.destructive });
    else if (variant === 'ghost') list.push({ backgroundColor: 'transparent' });

    if (disabled || loading) list.push(styles.disabledContainer);

    return list;
  };

  const getTextStyle = (): TextStyle[] => {
    const list: TextStyle[] = [styles.baseText];

    if (size === 'small') list.push(styles.smallText);
    else if (size === 'large') list.push(styles.largeText);

    if (variant === 'primary') list.push({ color: colors.primaryForeground });
    else if (variant === 'secondary') list.push({ color: colors.secondaryForeground });
    else if (variant === 'outline') list.push({ color: colors.primary });
    else if (variant === 'danger') list.push({ color: colors.destructiveForeground });
    else if (variant === 'ghost') list.push({ color: colors.primary });

    return list;
  };

  return (
    <TouchableOpacity
      style={[...getContainerStyle(), style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator
          color={
            variant === 'primary' || variant === 'danger'
              ? colors.primaryForeground
              : colors.primary
          }
        />
      ) : (
        <View style={styles.contentRow} pointerEvents="none">
          {icon && <View style={styles.iconContainer}>{icon}</View>}
          <Text style={[...getTextStyle(), textStyle]}>{title}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  baseContainer: {
    borderRadius: shapes.button,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: spacing.minTouchTarget,
  },
  fullWidthContainer: {
    width: '100%',
  },
  smallContainer: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    minHeight: 36,
  },
  mediumContainer: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    minHeight: spacing.minTouchTarget,
  },
  largeContainer: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    minHeight: 56,
  },
  disabledContainer: {
    opacity: 0.5,
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    marginRight: spacing.xs,
  },
  baseText: {
    fontFamily: typography.fontFamily.openSans,
    fontSize: typography.fontSize.bodyMedium,
    fontWeight: typography.fontWeight.semibold,
  },
  smallText: {
    fontSize: typography.fontSize.bodySmall,
  },
  largeText: {
    fontSize: typography.fontSize.bodyLarge,
  },
});
