export type ExpenseType = 'need' | 'want';

export interface Expense {
  id: string;
  amount: number;
  category: string;
  date: string;
  note?: string;
  countTowardLimit: boolean;
  expenseType: ExpenseType;
}

export interface UserSettings {
  dailyLimit: number;
  currency: string;
  themeMode: 'light' | 'dark' | 'system';
  categories: string[];
}

export type SpendingStatus = 'safe' | 'careful' | 'overspent';

export interface NewExpenseInput {
  amount: number;
  category: string;
  note?: string;
  countTowardLimit: boolean;
  expenseType: ExpenseType;
}
