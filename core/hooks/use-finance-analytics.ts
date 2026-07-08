"use client";

import { useMemo } from "react";

import { useFinanceStore } from "@/store/finance-store";
import { calculateFinanceHealth } from "@/core/finance-engine";

export function useFinanceAnalytics() {
  const transactions = useFinanceStore(
    (state) => state.transactions
  );

  const categories = useFinanceStore(
    (state) => state.categories
  );

  return useMemo(() => {
    const incomeTransactions = transactions.filter(
      (transaction) => transaction.type === "income"
    );

    const expenseTransactions = transactions.filter(
      (transaction) => transaction.type === "expense"
    );

    const income = incomeTransactions.reduce(
      (sum, transaction) => sum + transaction.amount,
      0
    );

    const expenses = expenseTransactions.reduce(
      (sum, transaction) => sum + transaction.amount,
      0
    );

    const balance = income - expenses;

    const biggestExpense =
      expenseTransactions.length > 0
        ? expenseTransactions.reduce((previous, current) =>
            current.amount > previous.amount
              ? current
              : previous
          )
        : null;

    const categoryMap = new Map<
      string,
      {
        id: string;
        name: string;
        icon: string;
        color: string;
        value: number;
      }
    >();

    expenseTransactions.forEach((transaction: any) => {
      const category = transaction.category;

      if (!category) return;

      const current = categoryMap.get(category.id);

      if (current) {
        current.value += transaction.amount;
      } else {
        categoryMap.set(category.id, {
          id: category.id,
          name: category.name,
          icon: category.icon,
          color: category.color,
          value: transaction.amount,
        });
      }
    });

    const expensesByCategory = Array.from(
      categoryMap.values()
    )
      .sort((a, b) => b.value - a.value)
      .map((category) => ({
        ...category,
        percentage:
          expenses === 0
            ? 0
            : Number(
                (
                  (category.value / expenses) *
                  100
                ).toFixed(1)
              ),
      }));

    const topCategory =
      expensesByCategory.length > 0
        ? expensesByCategory[0]
        : null;

    const averageExpense =
      expenseTransactions.length > 0
        ? expenses / expenseTransactions.length
        : 0;

    const financeHealth = calculateFinanceHealth(
      transactions,
      categories
    );

    return {
      balance,

      income,

      expenses,

      totalTransactions: transactions.length,

      incomeTransactions:
        incomeTransactions.length,

      expenseTransactions:
        expenseTransactions.length,

      biggestExpense,

      averageExpense,

      topCategory,

      expensesByCategory,

      latestTransactions:
        transactions.slice(0, 5),

      totalExpensesAmount: expenses,

      financeHealth,
    };
  }, [transactions, categories]);
}