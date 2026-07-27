import { StyleSheet, View } from 'react-native';

import { useTheme } from '@/theme';

interface ProgressBarProps {
  progress: number;
  color: string;
}

export function ProgressBar({ progress, color }: ProgressBarProps) {
  const { theme } = useTheme();
  const clampedProgress = Math.min(Math.max(progress, 0), 1);

  return (
    <View
      style={[
        styles.track,
        { backgroundColor: theme.colors.border },
      ]}
    >
      <View
        style={[
          styles.fill,
          {
            width: `${clampedProgress * 100}%`,
            backgroundColor: color,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    height: 10,
    borderRadius: 999,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: 999,
  },
});
