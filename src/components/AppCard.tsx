import React from 'react';
import { View, StyleSheet, ViewStyle, TouchableOpacity } from 'react-native';
import { shapes, spacing } from '../theme/tokens';
import { useTheme } from '../theme/ThemeContext';

interface AppCardProps {
  children: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
  onPress?: () => void;
  variant?: 'elevated' | 'outlined' | 'flat';
}

export const AppCard: React.FC<AppCardProps> = ({
  children,
  style,
  onPress,
  variant = 'outlined',
}) => {
  const { colors } = useTheme();

  const cardStyle = [
    styles.card,
    { backgroundColor: variant === 'flat' ? colors.muted : colors.card },
    variant === 'outlined' && { borderWidth: 1, borderColor: colors.border },
    variant === 'elevated' && styles.elevated,
    style,
  ];

  if (onPress) {
    return (
      <TouchableOpacity style={cardStyle} onPress={onPress} activeOpacity={0.7}>
        {children}
      </TouchableOpacity>
    );
  }

  return <View style={cardStyle}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    borderRadius: shapes.card,
    padding: spacing.cardPadding,
    marginVertical: spacing.xs,
  },
  elevated: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
});
