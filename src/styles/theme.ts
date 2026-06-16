export const colors = {
  primary: '#2563eb',
  primaryHover: '#1d4ed8',
  primaryLight: '#dbeafe',
  danger: '#dc2626',
  dangerLight: '#fee2e2',
  background: '#f8fafc',
  surface: '#ffffff',
  surfaceHover: '#f1f5f9',
  textPrimary: '#0f172a',
  textSecondary: '#64748b',
  border: '#e2e8f0',
  white: '#ffffff',
} as const;

export const spacing = {
  xs: '0.25rem',
  sm: '0.375rem',
  md: '0.5rem',
  lg: '0.75rem',
  xl: '1rem',
  '2xl': '1.25rem',
  '3xl': '1.5rem',
  '4xl': '2rem',
  '5xl': '3rem',
} as const;

export const borderRadius = {
  sm: '0.5rem',
  md: '0.75rem',
} as const;

export const fontSizes = {
  xs: '0.75rem',
  sm: '0.8125rem',
  md: '0.875rem',
  base: '0.9375rem',
  lg: '1rem',
  xl: '1.25rem',
  '2xl': '1.5rem',
  '3xl': '1.75rem',
} as const;

export const fontWeights = {
  medium: 500,
  semibold: 600,
  bold: 700,
} as const;

export const breakpoints = {
  sm: '600px',
  md: '900px',
  lg: '1200px',
} as const;

export const shadows = {
  card: '0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.06)',
} as const;

export const fontFamily =
  "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif";

export const theme = {
  colors,
  spacing,
  borderRadius,
  fontSizes,
  fontWeights,
  breakpoints,
  shadows,
  fontFamily,
} as const;

export type Theme = typeof theme;
