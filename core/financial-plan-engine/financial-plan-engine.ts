import type { BudgetCategory } from "@/types/budget-category";
import type {
  FinancialCommitment,
} from "@/types/financial-plan";

export interface FinancialCategoryGroup {
  category: BudgetCategory;

  commitments: FinancialCommitment[];

  totalNeeded: number;

  totalCovered: number;

  remaining: number;

  progress: number;
}

export function getFinancialCategoryGroups(
  categories: BudgetCategory[],
  commitments: FinancialCommitment[]
): FinancialCategoryGroup[] {
  return categories.map(
    (category) => {
      const categoryCommitments =
        commitments.filter(
          (commitment) =>
            commitment.financial_plan_category_id ===
            category.id
        );

      const totalNeeded =
        categoryCommitments.reduce(
          (sum, commitment) =>
            sum +
            commitment.monthly_amount,
          0
        );

      // En el próximo sprint
      // este valor vendrá del módulo Finanzas.
      const totalCovered = 0;

      const remaining =
        totalNeeded -
        totalCovered;

      const progress =
        totalNeeded === 0
          ? 0
          : Math.min(
              (totalCovered /
                totalNeeded) *
                100,
              100
            );

      return {
        category,

        commitments:
          categoryCommitments,

        totalNeeded,

        totalCovered,

        remaining,

        progress,
      };
    }
  );
}