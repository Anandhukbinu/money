import { Pressable, StyleSheet, Text, View } from 'react-native';

import { useTheme } from '@/theme';

interface SegmentedControlProps<T extends string> {
  options: Array<{ label: string; value: T }>;
  value: T;
  onChange: (value: T) => void;
}

export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
}: SegmentedControlProps<T>) {
  const { theme } = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.border,
        },
      ]}
    >
      {options.map((option) => {
        const selected = option.value === value;

        return (
          <Pressable
            key={option.value}
            onPress={() => onChange(option.value)}
            style={[
              styles.option,
              selected && {
                backgroundColor: theme.colors.surface,
              },
            ]}
          >
            <Text
              style={[
                theme.typography.label,
                {
                  color: selected
                    ? theme.colors.text
                    : theme.colors.textSecondary,
                },
              ]}
            >
              {option.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 12,
    padding: 4,
    gap: 4,
  },
  option: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 40,
    borderRadius: 10,
  },
});
