"use client";

import { useEffect } from "react";
import { useFinanceStore } from "@/store/finance-store";

import { FinanceSummary } from "./finance-summary";
import { TransactionForm } from "./transaction-form";
import { TransactionList } from "./transaction-list";

export function FinanceDashboard() {
  const loadTransactions = useFinanceStore(
    (state) => state.loadTransactions
  );

  useEffect(() => {
    loadTransactions();
  }, [loadTransactions]);

  return (
    <div className="space-y-8">
      <FinanceSummary />

      <section className="grid gap-8 xl:grid-cols-[420px_1fr]">
        <TransactionForm />

        <TransactionList />
      </section>
    </div>
  );
}