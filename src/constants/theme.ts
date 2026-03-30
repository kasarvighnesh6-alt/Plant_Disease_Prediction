import '@/global.css';
import { Platform } from 'react-native';

export const Colors = {
  primary: '#3b82f6',
  secondary: '#f97316',
  success: '#10b981',
  error: '#ef4444',
  warning: '#f59e0b',
  dark: {
    background: '#0f172a',
    card: 'rgba(255, 255, 255, 0.08)',
    text: '#f8fafc',
    textSecondary: '#94a3b8',
    border: 'rgba(255, 255, 255, 0.12)',
  },
  light: {
    background: '#f8fafc',
    card: '#ffffff',
    text: '#0f172a',
    textSecondary: '#64748b',
    border: '#e2e8f0',
  }
} as const;

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;
