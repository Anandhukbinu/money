import { Pressable, StyleSheet, Text, TextStyle, ViewStyle } from 'react-native';

import { useTheme } from '@/theme';

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  disabled?: boolean;
  style?: ViewStyle;
}

export function Button({
  label,
  onPress,
  variant = 'primary',
  disabled = false,
  style,
}: ButtonProps) {
  const { theme } = useTheme();

  const backgroundColor =
    variant === 'primary'
      ? theme.colors.primary
      : variant === 'secondary'
        ? theme.colors.surface
        : 'transparent';

  const textColor =
    variant === 'primary'
      ? theme.colors.primaryText
      : theme.colors.text;

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor,
          borderColor: theme.colors.border,
          opacity: disabled ? 0.5 : pressed ? 0.85 : 1,
        },
        variant === 'secondary' && styles.secondary,
        style,
      ]}
    >
      <Text style={[theme.typography.bodyMedium, { color: textColor }]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  secondary: {
    borderWidth: 1,
  },
});
