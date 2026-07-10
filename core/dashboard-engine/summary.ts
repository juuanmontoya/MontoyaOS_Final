import type { Category } from "@/types/category";
import type { Transaction } from "@/store/finance-store";

import { getFinanceSummary } from "@/core/finance-engine";

export interface DashboardSummary {
  finance: ReturnType<typeof getFinanceSummary>;
}

interface DashboardSummaryInput {
  finance: {
    transactions: Transaction[];
    categories: Category[];
  };
}

export function getDashboardSummary({
  finance,
}: DashboardSummaryInput): DashboardSummary {
  return {
    finance: getFinanceSummary(
      finance.transactions,
      finance.categories
    ),
  };
}