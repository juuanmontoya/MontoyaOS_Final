"use client";

import { useMemo } from "react";
import { useFinanceStore } from "@/store/finance-store";

export function useFinanceAnalytics() {
  const transactions = useFinanceStore(
    (state) => state.transactions
  );

  return useMemo(() => {
    const incomeTransactions = transactions.filter(
      (t) => t.type === "income"
    );

    const expenseTransactions = transactions.filter(
      (t) => t.type === "expense"
    );

    const income = incomeTransactions.reduce(
      (sum, t) => sum + t.amount,
      0
    );

    const expenses = expenseTransactions.reduce(
      (sum, t) => sum + t.amount,
      0
    );

    const balance = income - expenses;

    const biggestExpense =
      expenseTransactions.length > 0
        ? expenseTransactions.reduce((prev, current) =>
            current.amount > prev.amount ? current : prev
          )
        : null;

    const expensesByCategory = expenseTransactions.reduce(
      (acc: Record<string, number>, transaction: any) => {
        const categoryName =
          transaction.category?.name ?? "Sin categoría";

        acc[categoryName] =
          (acc[categoryName] ?? 0) + transaction.amount;

        return acc;
      },
      {}
    );

    const topCategory =
      Object.entries(expensesByCategory)
        .sort((a, b) => b[1] - a[1])[0] ?? null;

    const averageExpense =
      expenseTransactions.length > 0
        ? expenses / expenseTransactions.length
        : 0;

    return {
      balance,
      income,
      expenses,

      totalTransactions: transactions.length,

      incomeTransactions: incomeTransactions.length,

      expenseTransactions: expenseTransactions.length,

      biggestExpense,

      averageExpense,

      topCategory,

      expensesByCategory,

      latestTransactions: transactions.slice(0, 5),
    };
  }, [transactions]);
}