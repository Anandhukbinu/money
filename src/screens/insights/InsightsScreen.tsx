import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { Card, ScreenContainer } from '@/components';
import { useApp } from '@/context';
import { useBudgetSummary, useWeeklyInsights } from '@/hooks';
import { useTheme } from '@/theme';
import { formatCurrency } from '@/utils';

function BarRow({
  label,
  amount,
  percentage,
  color,
  currency,
}: {
  label: string;
  amount: number;
  percentage: number;
  color: string;
  currency: string;
}) {
  const { theme } = useTheme();

  return (
    <View style={styles.barRow}>
      <View style={styles.barHeader}>
        <Text style={[theme.typography.bodyMedium, { color: theme.colors.text }]}>
          {label}
        </Text>
        <Text style={[theme.typography.caption, { color: theme.colors.textSecondary }]}>
          {formatCurrency(amount, currency)} · {Math.round(percentage * 100)}%
        </Text>
      </View>
      <View style={[styles.barTrack, { backgroundColor: theme.colors.border }]}>
        <View
          style={[
            styles.barFill,
            {
              width: `${Math.max(percentage * 100, 4)}%`,
              backgroundColor: color,
            },
          ]}
        />
      </View>
    </View>
  );
}

export function InsightsScreen() {
  const { theme } = useTheme();
  const { settings } = useApp();
  const { weekly } = useBudgetSummary();
  const { categories, needWant } = useWeeklyInsights();

  return (
    <ScreenContainer
      title="Insights"
      subtitle="Weekly breakdown, need vs want, and categories."
    >
      <ScrollView contentContainerStyle={styles.content}>
        <Card>
          <Text style={[theme.typography.label, { color: theme.colors.textSecondary }]}>
            Weekly breakdown
          </Text>
          <View style={styles.weekGrid}>
            {weekly.dailyBreakdown.map((day) => (
              <View key={day.date.toISOString()} style={styles.dayColumn}>
                <View
                  style={[
                    styles.dayBar,
                    {
                      height: Math.max(day.spent / settings.dailyLimit, 0.08) * 80,
                      backgroundColor: theme.colors.primary,
                    },
                  ]}
                />
                <Text
                  style={[
                    theme.typography.caption,
                    { color: theme.colors.textSecondary },
                  ]}
                >
                  {day.label}
                </Text>
                <Text style={[theme.typography.caption, { color: theme.colors.text }]}>
                  {formatCurrency(day.spent, settings.currency)}
                </Text>
              </View>
            ))}
          </View>
        </Card>

        <Card style={styles.section}>
          <Text style={[theme.typography.heading, { color: theme.colors.text }]}>
            Need vs Want
          </Text>
          <BarRow
            label="Need"
            amount={needWant.need}
            percentage={needWant.needPercentage}
            color={theme.colors.need}
            currency={settings.currency}
          />
          <BarRow
            label="Want"
            amount={needWant.want}
            percentage={needWant.wantPercentage}
            color={theme.colors.want}
            currency={settings.currency}
          />
        </Card>

        <Card style={styles.section}>
          <Text style={[theme.typography.heading, { color: theme.colors.text }]}>
            Categories
          </Text>
          {categories.length === 0 ? (
            <Text style={[theme.typography.body, { color: theme.colors.textSecondary }]}>
              No expenses recorded this week.
            </Text>
          ) : (
            categories.map((item) => (
              <BarRow
                key={item.category}
                label={item.category}
                amount={item.amount}
                percentage={item.percentage}
                color={theme.colors.primary}
                currency={settings.currency}
              />
            ))
          )}
        </Card>
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: 16,
    paddingBottom: 32,
  },
  section: {
    gap: 16,
  },
  weekGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: 16,
    gap: 8,
  },
  dayColumn: {
    flex: 1,
    alignItems: 'center',
    gap: 6,
  },
  dayBar: {
    width: '100%',
    minHeight: 8,
    borderRadius: 8,
  },
  barRow: {
    gap: 8,
  },
  barHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  barTrack: {
    height: 10,
    borderRadius: 999,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 999,
  },
});
