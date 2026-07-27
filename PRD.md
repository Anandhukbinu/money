# Personal Spending Control App

## Vision

A minimal mobile app focused on controlling daily spending behavior.

The app should answer:

"How much money can I safely spend today?"

The goal is not accounting. The goal is building better spending habits.

---

# Core Concepts

## Daily Limit

User defines a daily spending limit.

Example:

Daily Limit = ₹300

User spending:

Food ₹120
Transport ₹40

Remaining today:

₹140

---

# Weekly Saving System

Week:
Monday - Sunday

Formula:

Weekly Allowance =
Daily Limit × 7

Weekly Balance =
Weekly Allowance - limit counted expenses

Unused daily money carries into weekly savings.

Example:

Monday limit ₹300
Spent ₹200

Saved:
₹100

---

# Expense Properties

Each expense:

amount
category
date/time
note(optional)

countTowardLimit:
true/false

expenseType:
Need/Want

---

# Main Experience

Opening the app shows:

1. Today's remaining budget
2. Spending status

States:

GREEN:
Safe

YELLOW:
Careful

RED:
Overspent


3. Saved this week counter


Adding expense should take less than 5 seconds.

---

# MVP Screens

1. Onboarding

Set:
- Daily limit
- Currency

2. Home

Show:
- Remaining today
- Progress
- Weekly saved
- Today's expenses


3. Add Expense

Bottom sheet:

Amount
Category
Need/Want
Limit toggle


4. Insights

Weekly breakdown
Need vs Want
Categories


5. Settings

Change:
daily limit
categories
theme

---

# Future Features

Do NOT implement initially:

- Cloud sync
- Export
- AI analysis
- Recurring expenses
