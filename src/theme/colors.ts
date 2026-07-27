export type ThemeMode = 'light' | 'dark' | 'system';

export type SpendingStatus = 'safe' | 'careful' | 'overspent';

export interface ThemeColors {
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  border: string;
  primary: string;
  primaryText: string;
  tabBar: string;
  tabBarBorder: string;
  tabBarActive: string;
  tabBarInactive: string;
  statusSafe: string;
  statusCareful: string;
  statusOverspent: string;
  need: string;
  want: string;
}

import { spacing, Spacing } from './spacing';
import { typography, Typography } from './typography';

export interface Theme {
  mode: 'light' | 'dark';
  colors: ThemeColors;
  typography: Typography;
  spacing: Spacing;
}

const lightColors: ThemeColors = {
  background: '#F8F9FA',
  surface: '#FFFFFF',
  text: '#1A1A2E',
  textSecondary: '#6B7280',
  border: '#E5E7EB',
  primary: '#2563EB',
  primaryText: '#FFFFFF',
  tabBar: '#FFFFFF',
  tabBarBorder: '#E5E7EB',
  tabBarActive: '#2563EB',
  tabBarInactive: '#9CA3AF',
  statusSafe: '#16A34A',
  statusCareful: '#CA8A04',
  statusOverspent: '#DC2626',
  need: '#059669',
  want: '#D97706',
};

const darkColors: ThemeColors = {
  background: '#0F172A',
  surface: '#1E293B',
  text: '#F1F5F9',
  textSecondary: '#94A3B8',
  border: '#334155',
  primary: '#3B82F6',
  primaryText: '#FFFFFF',
  tabBar: '#1E293B',
  tabBarBorder: '#334155',
  tabBarActive: '#3B82F6',
  tabBarInactive: '#64748B',
  statusSafe: '#22C55E',
  statusCareful: '#EAB308',
  statusOverspent: '#EF4444',
  need: '#34D399',
  want: '#FBBF24',
};

export function createTheme(mode: 'light' | 'dark'): Theme {
  return {
    mode,
    colors: mode === 'light' ? lightColors : darkColors,
    typography,
    spacing,
  };
}

export function getSpendingStatusColor(
  theme: Theme,
  status: SpendingStatus,
): string {
  switch (status) {
    case 'safe':
      return theme.colors.statusSafe;
    case 'careful':
      return theme.colors.statusCareful;
    case 'overspent':
      return theme.colors.statusOverspent;
  }
}
