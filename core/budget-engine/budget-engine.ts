import type { BudgetItem } from "@/types/budget";
import type { Category } from "@/types/category";
import type { Transaction } from "@/types/finance";

export interface BudgetRow {
  id: string;

  category: Category;

  planned: number;

  spent: number;

  remaining: number;

  progress: number;

  status: "safe" | "warning" | "danger";
}

export function getBudgetRows(
  budgets: BudgetItem[],
  categories: Category[],
  transactions: Transaction[]
): BudgetRow[] {
  return budgets
    .map((budget) => {
      const category =
        categories.find(
          (c) =>
            c.id === budget.category_id
        );

      if (!category) {
        return null;
      }

      const spent =
        transactions
          .filter(
            (transaction) =>
              transaction.type ===
                "expense" &&
              transaction.category_id ===
                budget.category_id
          )
          .reduce(
            (sum, transaction) =>
              sum +
              transaction.amount,
            0
          );

      const remaining =
        budget.planned - spent;

      const progress =
        budget.planned === 0
          ? 0
          : (spent /
              budget.planned) *
            100;

      let status: BudgetRow["status"] =
        "safe";

      if (progress >= 100) {
        status = "danger";
      } else if (
        progress >= 80
      ) {
        status = "warning";
      }

      return {
        id: budget.id,

        category,

        planned: budget.planned,

        spent,

        remaining,

        progress,

        status,
      };
    })
    .filter(
      (
        row
      ): row is BudgetRow =>
        row !== null
    );
}