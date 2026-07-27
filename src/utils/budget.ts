import { Expense, SpendingStatus } from '@/types';

import { getDaysInWeek, isSameDay, startOfDay } from './dates';

export interface DailySummary {
  spent: number;
  remaining: number;
  saved: number;
  status: SpendingStatus;
  progress: number;
}

export interface WeeklySummary {
  allowance: number;
  spent: number;
  balance: number;
  saved: number;
  dailyBreakdown: Array<{
    date: Date;
    label: string;
    spent: number;
    saved: number;
  }>;
}

export interface CategoryBreakdown {
  category: string;
  amount: number;
  percentage: number;
}

export interface NeedWantBreakdown {
  need: number;
  want: number;
  needPercentage: number;
  wantPercentage: number;
}

function getLimitCountedExpenses(expenses: Expense[]): Expense[] {
  return expenses.filter((expense) => expense.countTowardLimit);
}

export function getTodayExpenses(expenses: Expense[], reference = new Date()): Expense[] {
  return expenses.filter((expense) => isSameDay(new Date(expense.date), reference));
}

export function getWeekExpenses(expenses: Expense[], reference = new Date()): Expense[] {
  const weekStart = getDaysInWeek(reference)[0];
  const weekEnd = getDaysInWeek(reference)[6];

  return expenses.filter((expense) => {
    const date = startOfDay(new Date(expense.date));
    return date >= weekStart && date <= weekEnd;
  });
}

export function getSpentAmount(expenses: Expense[]): number {
  return getLimitCountedExpenses(expenses).reduce(
    (total, expense) => total + expense.amount,
    0,
  );
}

export function getSpendingStatus(
  remaining: number,
  dailyLimit: number,
): SpendingStatus {
  if (remaining < 0) {
    return 'overspent';
  }

  if (remaining <= dailyLimit * 0.25) {
    return 'careful';
  }

  return 'safe';
}

export function getDailySummary(
  expenses: Expense[],
  dailyLimit: number,
  reference = new Date(),
): DailySummary {
  const todayExpenses = getTodayExpenses(expenses, reference);
  const spent = getSpentAmount(todayExpenses);
  const remaining = dailyLimit - spent;
  const saved = Math.max(0, remaining);
  const progress = dailyLimit > 0 ? Math.min(spent / dailyLimit, 1) : 0;

  return {
    spent,
    remaining,
    saved,
    status: getSpendingStatus(remaining, dailyLimit),
    progress,
  };
}

export function getWeeklySummary(
  expenses: Expense[],
  dailyLimit: number,
  reference = new Date(),
): WeeklySummary {
  const weekExpenses = getWeekExpenses(expenses, reference);
  const spent = getSpentAmount(weekExpenses);
  const allowance = dailyLimit * 7;
  const balance = allowance - spent;

  const dailyBreakdown = getDaysInWeek(reference).map((date) => {
    const dayExpenses = expenses.filter((expense) =>
      isSameDay(new Date(expense.date), date),
    );
    const daySpent = getSpentAmount(dayExpenses);
    const daySaved = Math.max(0, dailyLimit - daySpent);

    return {
      date,
      label: date.toLocaleDateString(undefined, { weekday: 'short' }),
      spent: daySpent,
      saved: daySaved,
    };
  });

  const saved = dailyBreakdown.reduce((total, day) => total + day.saved, 0);

  return {
    allowance,
    spent,
    balance,
    saved,
    dailyBreakdown,
  };
}

export function getCategoryBreakdown(expenses: Expense[]): CategoryBreakdown[] {
  const weekExpenses = expenses;
  const totals = new Map<string, number>();

  weekExpenses.forEach((expense) => {
    totals.set(expense.category, (totals.get(expense.category) ?? 0) + expense.amount);
  });

  const grandTotal = Array.from(totals.values()).reduce(
    (total, amount) => total + amount,
    0,
  );

  return Array.from(totals.entries())
    .map(([category, amount]) => ({
      category,
      amount,
      percentage: grandTotal > 0 ? amount / grandTotal : 0,
    }))
    .sort((a, b) => b.amount - a.amount);
}

export function getNeedWantBreakdown(expenses: Expense[]): NeedWantBreakdown {
  const need = expenses
    .filter((expense) => expense.expenseType === 'need')
    .reduce((total, expense) => total + expense.amount, 0);
  const want = expenses
    .filter((expense) => expense.expenseType === 'want')
    .reduce((total, expense) => total + expense.amount, 0);
  const total = need + want;

  return {
    need,
    want,
    needPercentage: total > 0 ? need / total : 0,
    wantPercentage: total > 0 ? want / total : 0,
  };
}

export function createExpenseId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}
