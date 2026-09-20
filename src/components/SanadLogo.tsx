import React from 'react';
import { View, Image, Text, StyleSheet, ViewStyle } from 'react-native';
import { typography, spacing } from '../theme/tokens';
import { useTheme } from '../theme/ThemeContext';

interface SanadLogoProps {
  size?: 'small' | 'medium' | 'large';
  showText?: boolean;
  style?: ViewStyle;
}

export const SanadLogo: React.FC<SanadLogoProps> = ({
  size = 'medium',
  showText = true,
  style,
}) => {
  const { colors } = useTheme();
  const iconSize = size === 'small' ? 32 : size === 'medium' ? 48 : 72;
  const textSize = size === 'small' ? 18 : size === 'medium' ? 24 : 32;

  return (
    <View style={[styles.container, style]}>
      <Image
        source={require('../assets/images/logo/sanad_icon.png')}
        style={{ width: iconSize, height: iconSize, borderRadius: iconSize / 4 }}
        resizeMode="contain"
      />
      {showText && (
        <View style={styles.textContainer}>
          <Text style={[styles.title, { fontSize: textSize, color: colors.primary }]}>Sanad</Text>
          <Text style={[styles.subtitle, { color: colors.mutedForeground }]}>سند — RespiraCare</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    marginLeft: spacing.sm,
  },
  title: {
    fontFamily: typography.fontFamily.urbanist,
    fontWeight: typography.fontWeight.bold,
  },
  subtitle: {
    fontFamily: typography.fontFamily.openSans,
    fontSize: typography.fontSize.xs,
    marginTop: -2,
  },
});
