import type { Transaction } from "@/types/finance";

export interface BudgetItem {
  id: string;
  name: string;
  budget: number;
}

export interface BudgetRow extends BudgetItem {
  real: number;
  remaining: number;
  progress: number;
  status: "ok" | "warning" | "danger";
}

export interface BudgetSummary {
  rows: BudgetRow[];

  totalBudget: number;

  totalReal: number;

  remaining: number;

  progress: number;
}

export function getBudgetSummary(
  items: BudgetItem[],
  transactions: Transaction[]
): BudgetSummary {
  const rows = items.map((item) => {
    const real = transactions
      .filter(
        (t) =>
          t.type === "expense" &&
          t.category_id === item.id
      )
      .reduce(
        (sum, t) => sum + t.amount,
        0
      );

    const remaining =
      item.budget - real;

    const progress =
      item.budget === 0
        ? 0
        : (real / item.budget) * 100;

    let status: BudgetRow["status"] =
      "ok";

    if (progress >= 100) {
      status = "danger";
    } else if (progress >= 80) {
      status = "warning";
    }

    return {
      ...item,
      real,
      remaining,
      progress,
      status,
    };
  });

  const totalBudget = rows.reduce(
    (sum, row) => sum + row.budget,
    0
  );

  const totalReal = rows.reduce(
    (sum, row) => sum + row.real,
    0
  );

  return {
    rows,

    totalBudget,

    totalReal,

    remaining:
      totalBudget - totalReal,

    progress:
      totalBudget === 0
        ? 0
        : (totalReal / totalBudget) *
          100,
  };
}