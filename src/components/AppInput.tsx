import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { shapes, spacing, typography } from '../theme/tokens';
import { useTheme } from '../theme/ThemeContext';
import Icon from 'react-native-vector-icons/Feather';

interface AppInputProps extends TextInputProps {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode | string;
  rightIcon?: React.ReactNode | string;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
}

export const AppInput: React.FC<AppInputProps> = ({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  containerStyle,
  inputStyle,
  ...props
}) => {
  const { colors } = useTheme();

  const renderIcon = (icon?: React.ReactNode | string) => {
    if (!icon) return null;
    if (typeof icon === 'string') {
      return <Icon name={icon} size={18} color={colors.mutedForeground} />;
    }
    return icon;
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={[styles.label, { color: colors.foreground }]}>{label}</Text>}
      <View
        style={[
          styles.inputWrapper,
          { backgroundColor: colors.card },
          error ? { borderColor: colors.destructive } : { borderColor: colors.border },
          props.editable === false && { backgroundColor: colors.muted },
        ]}
      >
        {leftIcon && <View style={styles.leftIconContainer}>{renderIcon(leftIcon)}</View>}
        <TextInput
          style={[styles.input, { color: colors.foreground }, inputStyle]}
          placeholderTextColor={colors.mutedForeground}
          {...props}
        />
        {rightIcon && <View style={styles.rightIconContainer}>{renderIcon(rightIcon)}</View>}
      </View>
      {error ? (
        <Text style={[styles.errorText, { color: colors.destructive }]}>{error}</Text>
      ) : helperText ? (
        <Text style={[styles.helperText, { color: colors.mutedForeground }]}>{helperText}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: spacing.xs,
  },
  label: {
    fontFamily: typography.fontFamily.openSans,
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
    marginBottom: spacing.xs,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: shapes.input,
    paddingHorizontal: spacing.md,
    minHeight: spacing.minTouchTarget,
  },
  leftIconContainer: {
    marginRight: spacing.xs,
  },
  rightIconContainer: {
    marginLeft: spacing.xs,
  },
  input: {
    flex: 1,
    fontFamily: typography.fontFamily.openSans,
    fontSize: typography.fontSize.md,
    paddingVertical: spacing.sm,
  },
  errorText: {
    fontFamily: typography.fontFamily.openSans,
    fontSize: typography.fontSize.xs,
    marginTop: spacing.xxs,
  },
  helperText: {
    fontFamily: typography.fontFamily.openSans,
    fontSize: typography.fontSize.xs,
    marginTop: spacing.xxs,
  },
});
