export const spacing = {
  none: 0,
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
  huge: 96,

  0: 0,
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  8: 32,
  10: 40,
  12: 48,

  screenPadding: 16,
  sectionGap: 32,
  cardPadding: 16,
  listGap: 8,
  minTouchTarget: 48,
  formGap: 16,
} as const;

export type SpacingToken = typeof spacing;
