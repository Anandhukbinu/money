export const APP_NAME = 'Spending Control';

export const DEFAULT_CURRENCY = 'INR';

export const DEFAULT_DAILY_LIMIT = 300;

export const CURRENCY_OPTIONS = ['INR', 'USD', 'EUR', 'GBP'] as const;

export const EXPENSE_CATEGORIES = [
  'Food',
  'Transport',
  'Shopping',
  'Bills',
  'Entertainment',
  'Other',
] as const;

export type ExpenseCategory = (typeof EXPENSE_CATEGORIES)[number];

export const STATUS_LABELS = {
  safe: 'Safe',
  careful: 'Careful',
  overspent: 'Overspent',
} as const;
