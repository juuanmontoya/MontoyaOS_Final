import type { Category } from "@/types/category";
import type { Transaction } from "@/store/finance-store";

import { getFinanceSummary } from "@/core/finance-engine";
import { generateDashboardBrief } from "./brief";

export interface DashboardContext {
  finance: {
    transactions: Transaction[];
    categories: Category[];
  };
}

export interface DashboardSummary {
  finance: ReturnType<typeof getFinanceSummary>;
  brief: ReturnType<typeof generateDashboardBrief>;
}

export function getDashboardSummary(
  context: DashboardContext
): DashboardSummary {
  const finance = getFinanceSummary(
    context.finance.transactions,
    context.finance.categories
  );

  return {
    finance,
    brief: generateDashboardBrief({
      finance,
    }),
  };
}