import { useTheme } from '../theme/ThemeContext';
import { spacing, typography, shapes } from '../theme/tokens';

export const createButtonStyles = (colors: ReturnType<typeof useTheme>['colors']) => ({
  container: {
    backgroundColor: colors.primary,
    padding: spacing[4],
    borderRadius: shapes.sm,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  },
  text: {
    color: colors.primaryForeground,
    fontFamily: typography.fontFamily.openSans,
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.semibold,
  },
});

export const createCardStyles = (colors: ReturnType<typeof useTheme>['colors']) => ({
  container: {
    backgroundColor: colors.card,
    borderRadius: shapes.md,
    padding: spacing[4],
    borderWidth: 1,
    borderColor: colors.border,
  },
});

export const createFieldStyles = (colors: ReturnType<typeof useTheme>['colors']) => ({
  container: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: shapes.sm,
    padding: spacing[4],
    color: colors.foreground,
    fontFamily: typography.fontFamily.openSans,
    fontSize: typography.fontSize.md,
  },
});