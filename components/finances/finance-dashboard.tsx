"use client";

import { useEffect } from "react";

import { useFinanceStore } from "@/store/finance-store";

import { AccountBalanceCards } from "./account-balance-cards";
import { FinanceSummary } from "./finance-summary";
import { FinanceKPIs } from "./finance-kpis";
import { FinanceInsights } from "./finance-insights";
import { FinanceHealthCard } from "./finance-health-card";
import { ExpensesByCategoryChart } from "./expenses-by-category-chart";
import { MonthlyTrendChart } from "./monthly-trend-chart";
import { TransactionForm } from "./transaction-form";
import { TransactionList } from "./transaction-list";

export function FinanceDashboard() {
  const transactions = useFinanceStore(
    (state) => state.transactions
  );

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

      <AccountBalanceCards
        transactions={transactions}
      />

      {/* Mobile: formulario primero */}
      <div className="xl:hidden">
        <TransactionForm />
      </div>

      <FinanceSummary />

      <FinanceKPIs />

      <section className="grid gap-8 lg:grid-cols-2">
        <ExpensesByCategoryChart />
        <MonthlyTrendChart />
      </section>

      <section className="grid gap-8 lg:grid-cols-[1fr_420px]">
        <FinanceInsights />
        <FinanceHealthCard />
      </section>

      {/* Desktop */}
      <section className="hidden gap-8 xl:grid xl:grid-cols-[420px_1fr]">
        <TransactionForm />
        <TransactionList />
      </section>

      {/* Mobile */}
      <div className="xl:hidden">
        <TransactionList />
      </div>

    </div>
  );
}