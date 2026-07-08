"use client";

import { useEffect } from "react";

import { useFinanceStore } from "@/store/finance-store";

import { FinanceSummary } from "./finance-summary";
import { FinanceKPIs } from "./finance-kpis";
import { TransactionForm } from "./transaction-form";
import { TransactionList } from "./transaction-list";

export function FinanceDashboard() {
  const loadTransactions = useFinanceStore(
    (state) => state.loadTransactions
  );

  const loadCategories = useFinanceStore(
    (state) => state.loadCategories
  );

  useEffect(() => {
    async function loadData() {
      await Promise.all([
        loadTransactions(),
        loadCategories(),
      ]);
    }

    loadData();
  }, [loadTransactions, loadCategories]);

  return (
    <div className="space-y-8">

      <FinanceSummary />

      <FinanceKPIs />

      <section className="grid gap-8 xl:grid-cols-[420px_1fr]">

        <TransactionForm />

        <TransactionList />

      </section>

    </div>
  );
}