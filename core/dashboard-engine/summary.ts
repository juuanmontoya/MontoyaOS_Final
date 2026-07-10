import type { Category } from "@/types/category";
import type { Transaction } from "@/store/finance-store";
import type { CalendarEvent } from "@/types/calendar";

import { getFinanceSummary } from "@/core/finance-engine";
import { getNextEvent } from "@/core/calendar-engine";

import { generateDashboardBrief } from "./brief";


export interface DashboardContext {
  finance: {
    transactions: Transaction[];
    categories: Category[];
  };

  calendar?: {
    events: CalendarEvent[];
  };
}


export interface DashboardSummary {
  finance: ReturnType<typeof getFinanceSummary>;

  calendar: {
    nextEvent: CalendarEvent | null;
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


  return {
    finance,
    calendar,
    brief:
      generateDashboardBrief({
        finance,
        calendar,
      }),
  };
}