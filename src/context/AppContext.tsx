import * as api from '@/api/api';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import {
  DEFAULT_CURRENCY,
  DEFAULT_DAILY_LIMIT,
  EXPENSE_CATEGORIES,
} from '@/constants';
import {
  getJson,
  getOnboardingComplete,
  setJson,
  setOnboardingComplete,
  STORAGE_KEYS,
} from '@/storage';
import { Expense, NewExpenseInput, UserSettings } from '@/types';
import { createExpenseId } from '@/utils';

interface AppContextValue {
  isReady: boolean;
  hasCompletedOnboarding: boolean;
  settings: UserSettings;
  expenses: Expense[];
  completeOnboarding: (dailyLimit: number, currency: string) => Promise<void>;
  updateSettings: (updates: Partial<UserSettings>) => Promise<void>;
  addExpense: (input: NewExpenseInput) => Promise<void>;
  deleteExpense: (id: string) => Promise<void>;
  addCategory: (category: string) => Promise<void>;
  removeCategory: (category: string) => Promise<void>;
}

const defaultSettings: UserSettings = {
  dailyLimit: DEFAULT_DAILY_LIMIT,
  currency: DEFAULT_CURRENCY,
  themeMode: 'system',
  categories: [...EXPENSE_CATEGORIES],
};

const AppContext = createContext<AppContextValue | undefined>(undefined);

interface AppProviderProps {
  children: React.ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  const [isReady, setIsReady] = useState(false);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const [settings, setSettings] = useState<UserSettings>(defaultSettings);
  const [expenses, setExpenses] = useState<Expense[]>([]);

  useEffect(() => {
    async function loadData() {
      const [onboardingComplete, storedSettings] = await Promise.all([
        getOnboardingComplete(),
        getJson<UserSettings>(STORAGE_KEYS.settings, defaultSettings),
      ]);

      const serverExpenses = await api.getExpenses();

      setHasCompletedOnboarding(onboardingComplete);
      setSettings({ ...defaultSettings, ...storedSettings });
      setExpenses(serverExpenses);
      setIsReady(true);
    }

    loadData();
  }, []);

  const completeOnboarding = useCallback(
    async (dailyLimit: number, currency: string) => {
      setSettings((prev) => {
        const next = { ...prev, dailyLimit, currency };
        setJson(STORAGE_KEYS.settings, next);
        return next;
      });

      await setOnboardingComplete(true);
      setHasCompletedOnboarding(true);
    },
    [],
  );

  const updateSettings = useCallback(async (updates: Partial<UserSettings>) => {
    setSettings((prev) => {
      const next = { ...prev, ...updates };
      setJson(STORAGE_KEYS.settings, next);
      return next;
    });
  }, []);

  const addExpense = useCallback(async (input: NewExpenseInput) => {
    const expense: Expense = {
      id: createExpenseId(),
      amount: input.amount,
      category: input.category,
      date: new Date().toISOString(),
      note: input.note?.trim() || undefined,
      countTowardLimit: input.countTowardLimit,
      expenseType: input.expenseType,
    };

    await api.addExpense(expense);

    const latest = await api.getExpenses();
    setExpenses(latest);
  }, []);

  const deleteExpense = useCallback(async (id: string) => {
    await api.deleteExpense(id);

    const latest = await api.getExpenses();
    setExpenses(latest);
  }, []);

  const addCategory = useCallback(async (category: string) => {
    const trimmed = category.trim();

    if (!trimmed) {
      return;
    }

    setSettings((prev) => {
      const exists = prev.categories.some(
        (c) => c.toLowerCase() === trimmed.toLowerCase(),
      );

      if (exists) {
        return prev;
      }

      const next = {
        ...prev,
        categories: [...prev.categories, trimmed],
      };

      setJson(STORAGE_KEYS.settings, next);

      return next;
    });
  }, []);

  const removeCategory = useCallback(async (category: string) => {
    setSettings((prev) => {
      if (prev.categories.length <= 1) {
        return prev;
      }

      const next = {
        ...prev,
        categories: prev.categories.filter((item) => item !== category),
      };

      setJson(STORAGE_KEYS.settings, next);

      return next;
    });
  }, []);

  const value = useMemo(
    () => ({
      isReady,
      hasCompletedOnboarding,
      settings,
      expenses,
      completeOnboarding,
      updateSettings,
      addExpense,
      deleteExpense,
      addCategory,
      removeCategory,
    }),
    [
      isReady,
      hasCompletedOnboarding,
      settings,
      expenses,
      completeOnboarding,
      updateSettings,
      addExpense,
      deleteExpense,
      addCategory,
      removeCategory,
    ],
  );

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp(): AppContextValue {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }

  return context;
}