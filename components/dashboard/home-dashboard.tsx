"use client";

import { useEffect } from "react";

import { useFinanceStore } from "@/store/finance-store";
import { useCalendarStore } from "@/store/calendar-store";

import { getDashboardSummary } from "@/core/dashboard-engine";

import { HeroWidget } from "./widgets/hero-widget";
import { FinanceWidget } from "./widgets/finance-widget";

import { CalendarWidget } from "@/components/calendar/calendar-widget";

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


  const {
    events,
    loadEvents,
  } = useCalendarStore();


  useEffect(() => {
    loadTransactions();
    loadCategories();
    loadEvents();
  }, [
    loadTransactions,
    loadCategories,
    loadEvents,
  ]);


  const dashboard = getDashboardSummary({
    finance: {
      transactions,
      categories,
    },
  });


  return (
    <div className="space-y-8">

      <HeroWidget
        brief={dashboard.brief}
      />


      <FinanceWidget
        summary={dashboard.finance}
      />


      <CalendarWidget
        events={events}
      />


      <QuickActions />


      <ActivityFeed />


      <OverviewGrid />

    </div>
  );
}