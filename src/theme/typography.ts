import { TextStyle } from 'react-native';

type TypographyScale = {
  fontSize: number;
  lineHeight: number;
  fontWeight: TextStyle['fontWeight'];
};

export const typography = {
  hero: {
    fontSize: 48,
    lineHeight: 56,
    fontWeight: '700',
  } satisfies TypographyScale,

  title: {
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '700',
  } satisfies TypographyScale,

  heading: {
    fontSize: 20,
    lineHeight: 26,
    fontWeight: '600',
  } satisfies TypographyScale,

  body: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '400',
  } satisfies TypographyScale,

  bodyMedium: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '500',
  } satisfies TypographyScale,

  caption: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '400',
  } satisfies TypographyScale,

  label: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '600',
  } satisfies TypographyScale,
} as const;

export type Typography = typeof typography;
