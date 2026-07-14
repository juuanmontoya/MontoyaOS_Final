"use client";

import { useEffect } from "react";

import { useFinanceStore } from "@/store/finance-store";
import { useCalendarStore } from "@/store/calendar-store";
import { useTasksStore } from "@/store/tasks-store";

import { getDashboardSummary } from "@/core/dashboard-engine";

import { HeroWidget } from "./widgets/hero-widget";
import { FinanceWidget } from "./widgets/finance-widget";

import { CalendarWidget } from "@/components/calendar/calendar-widget";

import { QuickActions } from "./sections/quick-actions";
import { ActivityFeed } from "./sections/activity-feed";
import { OverviewGrid } from "./sections/overview-grid";
import { TasksWidget } from "./widgets/tasks-widget";


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


  const {
    tasks,
    loadTasks,
  } = useTasksStore();


  useEffect(() => {
    loadTransactions();
    loadCategories();
    loadEvents();
    loadTasks();
  }, [
    loadTransactions,
    loadCategories,
    loadEvents,
    loadTasks,
  ]);


  const dashboard =
    getDashboardSummary({
      finance: {
        transactions,
        categories,
      },

      calendar: {
        events,
      },

      tasks: {
        tasks,
      },
    });


  return (
    <div className="space-y-8">

      <HeroWidget
  brief={dashboard.brief}
  nextEvent={dashboard.calendar.nextEvent}
  tasks={dashboard.tasks}
/>


      <FinanceWidget
  summary={dashboard.finance}
/>

<TasksWidget
  tasks={tasks}
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