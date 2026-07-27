import { StyleSheet, Text, View } from 'react-native';

import { STATUS_LABELS } from '@/constants';
import { SpendingStatus } from '@/types';
import { getSpendingStatusColor, useTheme } from '@/theme';

interface StatusBadgeProps {
  status: SpendingStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const { theme } = useTheme();
  const color = getSpendingStatusColor(theme, status);

  return (
    <View style={[styles.badge, { backgroundColor: `${color}20` }]}>
      <View style={[styles.dot, { backgroundColor: color }]} />
      <Text style={[theme.typography.label, { color }]}>
        {STATUS_LABELS[status]}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});
