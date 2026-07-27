import BottomSheet from '@gorhom/bottom-sheet';
import { Ionicons } from '@expo/vector-icons';
import { useRef } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  AddExpenseSheet,
  Card,
  ExpenseListItem,
  ProgressBar,
  ScreenContainer,
  StatusBadge,
} from '@/components';
import { useApp } from '@/context';
import { useBudgetSummary } from '@/hooks';
import { getSpendingStatusColor, useTheme } from '@/theme';
import { formatCurrency } from '@/utils';

export function HomeScreen() {
  const { theme } = useTheme();
  const { deleteExpense } = useApp();
  const { daily, weekly, todayExpenses, currency, dailyLimit } =
    useBudgetSummary();
  const sheetRef = useRef<BottomSheet>(null);

  const statusColor = getSpendingStatusColor(theme, daily.status);

  return (
    <ScreenContainer
      title="Today"
      subtitle="How much can you safely spend today?"
    >
      <ScrollView contentContainerStyle={styles.content}>
        <Card style={styles.heroCard}>
          <StatusBadge status={daily.status} />
          <Text
            style={[
              theme.typography.caption,
              { color: theme.colors.textSecondary, marginTop: theme.spacing.sm },
            ]}
          >
            Remaining today
          </Text>
          <Text
            style={[
              theme.typography.hero,
              { color: statusColor, marginTop: theme.spacing.xs },
            ]}
          >
            {formatCurrency(daily.remaining, currency)}
          </Text>
          <Text
            style={[
              theme.typography.body,
              { color: theme.colors.textSecondary, marginTop: theme.spacing.xs },
            ]}
          >
            {formatCurrency(daily.spent, currency)} spent of{' '}
            {formatCurrency(dailyLimit, currency)}
          </Text>

          <View style={styles.progressSection}>
            <ProgressBar progress={daily.progress} color={statusColor} />
          </View>
        </Card>

        <Card>
          <Text style={[theme.typography.label, { color: theme.colors.textSecondary }]}>
            Saved this week
          </Text>
          <Text
            style={[
              theme.typography.heading,
              { color: theme.colors.statusSafe, marginTop: 4 },
            ]}
          >
            {formatCurrency(weekly.saved, currency)}
          </Text>
          <Text
            style={[
              theme.typography.caption,
              { color: theme.colors.textSecondary, marginTop: 4 },
            ]}
          >
            Weekly balance {formatCurrency(weekly.balance, currency)}
          </Text>
        </Card>

        <View style={styles.sectionHeader}>
          <Text style={[theme.typography.heading, { color: theme.colors.text }]}>
            Today&apos;s expenses
          </Text>
          <Text style={[theme.typography.caption, { color: theme.colors.textSecondary }]}>
            {todayExpenses.length} items
          </Text>
        </View>

        {todayExpenses.length === 0 ? (
          <Card>
            <Text style={[theme.typography.body, { color: theme.colors.textSecondary }]}>
              No expenses logged yet today.
            </Text>
          </Card>
        ) : (
          <Card style={styles.listCard}>
            {todayExpenses.map((expense) => (
              <ExpenseListItem
                key={expense.id}
                expense={expense}
                currency={currency}
                onDelete={deleteExpense}
              />
            ))}
          </Card>
        )}
      </ScrollView>

      <Pressable
        onPress={() => sheetRef.current?.expand()}
        style={({ pressed }) => [
          styles.fab,
          {
            backgroundColor: theme.colors.primary,
            opacity: pressed ? 0.85 : 1,
          },
        ]}
        accessibilityRole="button"
        accessibilityLabel="Add expense"
      >
        <Ionicons name="add" size={28} color={theme.colors.primaryText} />
      </Pressable>

      <AddExpenseSheet ref={sheetRef} />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: 16,
    paddingBottom: 96,
  },
  heroCard: {
    gap: 0,
  },
  progressSection: {
    marginTop: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  listCard: {
    paddingVertical: 4,
  },
  fab: {
    position: 'absolute',
    right: 24,
    bottom: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
