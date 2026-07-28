"use client";

import { useMemo } from "react";

import { useBudgetCategoryStore } from "@/store/budget-category-store";
import { useBudgetStore } from "@/store/budget-store";

export function BudgetOverview() {
  const categories =
    useBudgetCategoryStore(
      (state) => state.categories
    );

  const commitments =
    useBudgetStore(
      (state) => state.items
    );

  const total =
    useMemo(
      () =>
        commitments.reduce(
          (sum, item) =>
            sum +
            item.monthly_amount,
          0
        ),
      [commitments]
    );

  return (
    <section className="rounded-3xl border bg-card p-8 shadow-sm">
      <div className="flex items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-4xl">
          💰
        </div>

        <div>
          <p className="text-sm text-muted-foreground">
            Total que necesitas cubrir
          </p>

          <h2 className="mt-1 text-4xl font-bold">
            $
            {total.toLocaleString(
              "es-CO"
            )}
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            {commitments.length} compromiso
            {commitments.length !==
            1
              ? "s"
              : ""}{" "}
            • {categories.length} categorías
          </p>
        </div>
      </div>
    </section>
  );
}