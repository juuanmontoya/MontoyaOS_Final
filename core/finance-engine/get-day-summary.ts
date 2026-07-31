import type { Transaction } from "@/types/finance";

export interface DaySummary {
  income: number;
  expense: number;
  balance: number;
}

export function getDaySummary(
  transactions: Transaction[]
): DaySummary {
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

  return {
    income,
    expense,
    balance: income - expense,
  };
}