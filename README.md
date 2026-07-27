# Spending Control

A minimal mobile app for controlling daily spending behavior.

## Setup

```bash
npm install
npx expo start
```

Add default Expo assets to `assets/` before building for production.

## Features

- **Onboarding** — set daily limit and currency (persisted locally)
- **Home** — remaining budget, spending status (safe / careful / overspent), weekly savings, today's expenses
- **Add Expense** — bottom sheet with amount, category, need/want, limit toggle
- **Insights** — weekly breakdown, need vs want, category totals
- **Settings** — daily limit, custom categories, light/dark/system theme

## Project Structure

```
src/
├── components/       # UI + AddExpenseSheet
├── constants/
├── context/          # AppProvider (settings + expenses)
├── hooks/            # useBudgetSummary, useWeeklyInsights
├── navigation/
├── screens/
├── storage/          # AsyncStorage helpers
├── theme/
├── types/
└── utils/            # Budget, currency, date helpers
```

## Budget Logic

- **Remaining today** = daily limit − limit-counted expenses for today
- **Weekly allowance** = daily limit × 7
- **Saved this week** = sum of unused daily budget (Mon–Sun)
- **Status** — green (safe), yellow (≤25% left), red (overspent)
