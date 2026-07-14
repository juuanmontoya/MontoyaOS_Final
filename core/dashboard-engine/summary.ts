import type { Category } from "@/types/category";
import type { Transaction } from "@/store/finance-store";
import type { CalendarEvent } from "@/types/calendar";
import type { Task } from "@/types/task";

import { getFinanceSummary } from "@/core/finance-engine";
import { getNextEvent } from "@/core/calendar-engine";
import {
  getCompletedTasks,
  getPendingTasks,
  getOverdueTasks,
} from "@/core/tasks-engine";

import { generateDashboardBrief } from "./brief";


export interface DashboardContext {
  finance: {
    transactions: Transaction[];
    categories: Category[];
  };

  calendar?: {
    events: CalendarEvent[];
  };

  tasks?: {
    tasks: Task[];
  };
}


export interface DashboardSummary {
  finance: ReturnType<typeof getFinanceSummary>;

  calendar: {
    nextEvent: CalendarEvent | null;
  };

  tasks: {
    total: number;
    pending: number;
    completed: number;
    overdue: number;
  };

  brief: ReturnType<typeof generateDashboardBrief>;
}


export function getDashboardSummary(
  context: DashboardContext
): DashboardSummary {

  const finance =
    getFinanceSummary(
      context.finance.transactions,
      context.finance.categories
    );


  const calendar = {
    nextEvent:
      getNextEvent(
        context.calendar?.events ?? []
      ),
  };


  const tasksList =
    context.tasks?.tasks ?? [];


  const tasks = {
    total: tasksList.length,

    pending:
      getPendingTasks(tasksList),

    completed:
      getCompletedTasks(tasksList),

    overdue:
      getOverdueTasks(tasksList),
  };


  return {
    finance,

    calendar,

    tasks,

    brief:
  generateDashboardBrief({
    finance,
    tasks,
  }),
  };
}