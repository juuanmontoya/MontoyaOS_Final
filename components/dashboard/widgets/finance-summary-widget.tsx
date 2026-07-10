"use client";

import { useEffect } from "react";
import {
  HeartPulse,
  TrendingDown,
  TrendingUp,
  Wallet,
} from "lucide-react";

import { KpiCard } from "../kpi/kpi-card";

import { useFinanceStore } from "@/store/finance-store";
import { getDashboardSummary } from "@/core/dashboard-engine";

export function FinanceSummaryWidget() {
  const {
    transactions,
    categories,
    loadTransactions,
    loadCategories,
  } = useFinanceStore();

  useEffect(() => {
    loadTransactions();
    loadCategories();
  }, [loadTransactions, loadCategories]);

  const dashboard = getDashboardSummary({
    finance: {
      transactions,
      categories,
    },
  });

  const summary = dashboard.finance;

  const money = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  });

  return (
    <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      <KpiCard
        title="Balance"
        value={money.format(summary.balance)}
        icon={Wallet}
      />

      <KpiCard
        title="Ingresos"
        value={money.format(summary.income)}
        icon={TrendingUp}
      />

      <KpiCard
        title="Gastos"
        value={money.format(summary.expenses)}
        icon={TrendingDown}
      />

      <KpiCard
        title="Health Score"
        value={summary.health.score.toString()}
        subtitle={summary.health.level}
        icon={HeartPulse}
      />
    </section>
  );
}