import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Expense } from '@/types';
import { formatCurrency, formatTime } from '@/utils';
import { useTheme } from '@/theme';

interface ExpenseListItemProps {
  expense: Expense;
  currency: string;
  onDelete?: (id: string) => void;
}

export function ExpenseListItem({
  expense,
  currency,
  onDelete,
}: ExpenseListItemProps) {
  const { theme } = useTheme();

  return (
    <View
      style={[
        styles.row,
        {
          borderBottomColor: theme.colors.border,
        },
      ]}
    >
      <View style={styles.content}>
        <Text style={[theme.typography.bodyMedium, { color: theme.colors.text }]}>
          {expense.category}
        </Text>
        <Text style={[theme.typography.caption, { color: theme.colors.textSecondary }]}>
          {formatTime(expense.date)} · {expense.expenseType}
          {!expense.countTowardLimit ? ' · Not counted' : ''}
        </Text>
      </View>
      <View style={styles.trailing}>
        <Text style={[theme.typography.bodyMedium, { color: theme.colors.text }]}>
          {formatCurrency(expense.amount, currency)}
        </Text>
        {onDelete ? (
          <Pressable onPress={() => onDelete(expense.id)} hitSlop={8}>
            <Text
              style={[
                theme.typography.caption,
                { color: theme.colors.statusOverspent },
              ]}
            >
              Remove
            </Text>
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    gap: 12,
  },
  content: {
    flex: 1,
    gap: 4,
  },
  trailing: {
    alignItems: 'flex-end',
    gap: 4,
  },
});
