import { ReactNode } from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useTheme } from '@/theme';

interface ScreenContainerProps {
  children?: ReactNode;
  title?: string;
  subtitle?: string;
  style?: ViewStyle;
  edges?: ('top' | 'right' | 'bottom' | 'left')[];
}

export function ScreenContainer({
  children,
  title,
  subtitle,
  style,
  edges = ['top', 'left', 'right'],
}: ScreenContainerProps) {
  const { theme } = useTheme();

  return (
    <SafeAreaView
      edges={edges}
      style={[styles.container, { backgroundColor: theme.colors.background }, style]}
    >
      {(title || subtitle) && (
        <View style={[styles.header, { paddingHorizontal: theme.spacing.md }]}>
          {title ? (
            <Text
              style={[
                styles.title,
                theme.typography.title,
                { color: theme.colors.text },
              ]}
            >
              {title}
            </Text>
          ) : null}
          {subtitle ? (
            <Text
              style={[
                styles.subtitle,
                theme.typography.body,
                { color: theme.colors.textSecondary },
              ]}
            >
              {subtitle}
            </Text>
          ) : null}
        </View>
      )}
      <View style={[styles.content, { paddingHorizontal: theme.spacing.md }]}>
        {children}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 8,
    paddingBottom: 16,
    gap: 4,
  },
  title: {
    marginBottom: 4,
  },
  subtitle: {},
  content: {
    flex: 1,
  },
});
