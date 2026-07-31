import type { Transaction } from "@/types/finance";

export interface MonthSummary {
  income: number;
  expense: number;
  balance: number;
  transactions: number;
  days: number;
}

export function getMonthSummary(
  transactions: Transaction[]
): MonthSummary {
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce(
      (sum, t) => sum + t.amount,
      0
    );

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce(
      (sum, t) => sum + t.amount,
      0
    );

  const days = new Set(
    transactions.map(
      (t) => t.transaction_date
    )
  ).size;

  return {
    income,
    expense,
    balance: income - expense,
    transactions: transactions.length,
    days,
  };
}