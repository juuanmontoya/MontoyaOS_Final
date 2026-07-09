import type { Transaction } from "@/store/finance-store";
import type { Category } from "@/types/category";

import { calculateFinanceHealth } from "./health";
import { generateFinanceInsights } from "./insights";

export interface FinanceSummary {
  income: number;
  expenses: number;
  balance: number;

  health: ReturnType<typeof calculateFinanceHealth>;

  insights: ReturnType<typeof generateFinanceInsights>;

  recentTransactions: Transaction[];
}

export function getFinanceSummary(
  transactions: Transaction[],
  categories: Category[]
): FinanceSummary {
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const expenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  return {
    income,
    expenses,
    balance: income - expenses,

    health: calculateFinanceHealth(
      transactions,
      categories
    ),

    insights: generateFinanceInsights(
      transactions
    ),

    recentTransactions: transactions.slice(0, 5),
  };
}