"use client";

import { useMemo } from "react";
import { useFinanceStore } from "@/store/finance-store";

export function useFinanceTrends() {
  const transactions = useFinanceStore(
    (state) => state.transactions
  );

  return useMemo(() => {
    const months = new Map<
      string,
      {
        month: string;
        income: number;
        expenses: number;
      }
    >();

    transactions.forEach((transaction) => {
      const date = new Date(transaction.created_at);

      const month = date.toLocaleDateString("es-CO", {
        month: "short",
        year: "2-digit",
      });

      if (!months.has(month)) {
        months.set(month, {
          month,
          income: 0,
          expenses: 0,
        });
      }

      const current = months.get(month)!;

      if (transaction.type === "income") {
        current.income += transaction.amount;
      } else {
        current.expenses += transaction.amount;
      }
    });

    return [...months.values()];
  }, [transactions]);
}