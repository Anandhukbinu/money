import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';

import { useTheme } from '@/theme';

interface TextFieldProps extends TextInputProps {
  label?: string;
  error?: string;
}

export function TextField({ label, error, style, ...props }: TextFieldProps) {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      {label ? (
        <Text
          style={[
            theme.typography.label,
            styles.label,
            { color: theme.colors.text },
          ]}
        >
          {label}
        </Text>
      ) : null}
      <TextInput
        placeholderTextColor={theme.colors.textSecondary}
        style={[
          styles.input,
          theme.typography.body,
          {
            backgroundColor: theme.colors.surface,
            borderColor: error ? theme.colors.statusOverspent : theme.colors.border,
            color: theme.colors.text,
          },
          style,
        ]}
        {...props}
      />
      {error ? (
        <Text
          style={[
            theme.typography.caption,
            { color: theme.colors.statusOverspent },
          ]}
        >
          {error}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  label: {},
  input: {
    minHeight: 48,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
});
