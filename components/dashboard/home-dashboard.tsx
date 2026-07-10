"use client";

import { useEffect } from "react";

import { useFinanceStore } from "@/store/finance-store";
import { getDashboardSummary } from "@/core/dashboard-engine";

import { HeroWidget } from "./widgets/hero-widget";
import { FinanceWidget } from "./widgets/finance-widget";

import { QuickActions } from "./sections/quick-actions";
import { ActivityFeed } from "./sections/activity-feed";
import { OverviewGrid } from "./sections/overview-grid";

export function HomeDashboard() {
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

  return (
    <div className="space-y-8">
      <HeroWidget brief={dashboard.brief} />

      <FinanceWidget summary={dashboard.finance} />

      <QuickActions />

      <ActivityFeed />

      <OverviewGrid />
    </div>
  );
}