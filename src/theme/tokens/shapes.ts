export const shapes = {
  none: 0,
  xs: 2,
  sm: 8,
  md: 8,
  lg: 16,
  xl: 24,
  xxl: 32,
  full: 999,
  pill: 999,

  button: 8,
  input: 8,
  card: 8,
  dialog: 32,
  bottomSheet: 24,
} as const;

export type ShapesToken = typeof shapes;
