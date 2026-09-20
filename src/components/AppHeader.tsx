import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { spacing, typography } from '../theme/tokens';
import { useTheme } from '../theme/ThemeContext';

interface AppHeaderProps {
  title: string;
  subtitle?: string;
  showBack?: boolean;
  onBackPress?: () => void;
  rightAction?: React.ReactNode;
  style?: ViewStyle;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  title,
  subtitle,
  showBack = false,
  onBackPress,
  rightAction,
  style,
}) => {
  const { colors } = useTheme();

  return (
    <View style={[styles.headerContainer, { backgroundColor: colors.background, borderBottomColor: colors.border }, style]}>
      <View style={styles.leftRow}>
        {showBack && (
          <TouchableOpacity
            style={styles.backButton}
            onPress={onBackPress}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Icon name="arrow-left" size={24} color={colors.foreground} />
          </TouchableOpacity>
        )}
        <View style={styles.titleContainer}>
          <Text style={[styles.title, { color: colors.foreground }]} numberOfLines={1}>
            {title}
          </Text>
          {subtitle && (
            <Text style={[styles.subtitle, { color: colors.mutedForeground }]} numberOfLines={1}>
              {subtitle}
            </Text>
          )}
        </View>
      </View>
      {rightAction && <View style={styles.rightContainer}>{rightAction}</View>}
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.screenPadding,
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
  },
  leftRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  backButton: {
    marginRight: spacing.sm,
    padding: spacing.xxs,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontFamily: typography.fontFamily.urbanist,
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
  },
  subtitle: {
    fontFamily: typography.fontFamily.openSans,
    fontSize: typography.fontSize.xs,
    marginTop: 2,
  },
  rightContainer: {
    marginLeft: spacing.sm,
  },
});
