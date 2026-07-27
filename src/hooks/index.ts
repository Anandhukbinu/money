import { useMemo } from 'react';

import { useApp } from '@/context';
import {
  getCategoryBreakdown,
  getDailySummary,
  getNeedWantBreakdown,
  getTodayExpenses,
  getWeekExpenses,
  getWeeklySummary,
} from '@/utils';

export function useBudgetSummary(referenceDate?: Date) {
  const { settings, expenses } = useApp();
  const refTime = referenceDate ? referenceDate.getTime() : null;

  return useMemo(() => {
    const reference = referenceDate ?? new Date();
    const daily = getDailySummary(expenses, settings.dailyLimit, reference);
    const weekly = getWeeklySummary(expenses, settings.dailyLimit, reference);
    const todayExpenses = getTodayExpenses(expenses, reference);

    return {
      daily,
      weekly,
      todayExpenses,
      currency: settings.currency,
      dailyLimit: settings.dailyLimit,
    };
  }, [expenses, refTime, referenceDate, settings.currency, settings.dailyLimit]);
}

export function useWeeklyInsights(referenceDate?: Date) {
  const { expenses } = useApp();
  const refTime = referenceDate ? referenceDate.getTime() : null;

  return useMemo(() => {
    const reference = referenceDate ?? new Date();
    const weekExpenses = getWeekExpenses(expenses, reference);

    return {
      categories: getCategoryBreakdown(weekExpenses),
      needWant: getNeedWantBreakdown(weekExpenses),
      weekExpenses,
    };
  }, [expenses, refTime, referenceDate]);
}
