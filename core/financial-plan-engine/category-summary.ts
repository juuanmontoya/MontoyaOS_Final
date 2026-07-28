import type {
  FinancialCommitment,
} from "@/types/financial-plan";

import {
  calculatePending,
} from "./coverage";

import {
  calculateProgress,
} from "./progress";

export interface CategorySummary {
  commitments: FinancialCommitment[];

  totalNeeded: number;

  covered: number;

  pending: number;

  progress: number;
}

export function getCategorySummary(
  categoryId: string,
  commitments: FinancialCommitment[]
): CategorySummary {
  const categoryCommitments =
    commitments.filter(
      (item) =>
        item.financial_plan_category_id ===
        categoryId
    );

  const totalNeeded =
    categoryCommitments.reduce(
      (sum, item) =>
        sum +
        item.monthly_amount,
      0
    );

  const covered = 0;

  return {
    commitments:
      categoryCommitments,

    totalNeeded,

    covered,

    pending:
      calculatePending(
        totalNeeded,
        covered
      ),

    progress:
      calculateProgress(
        totalNeeded,
        covered
      ),
  };
}