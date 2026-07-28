"use client";

import { useBudgetCategoryStore } from "@/store/budget-category-store";
import { useBudgetStore } from "@/store/budget-store";

import {
  getCategorySummary,
} from "@/core/financial-plan-engine";

interface Props {
  selectedCategoryId: string;

  onSelect: (
    categoryId: string
  ) => void;
}

export function BudgetCategoryGrid({
  selectedCategoryId,
  onSelect,
}: Props) {
  const categories =
    useBudgetCategoryStore(
      (state) => state.categories
    );

  const commitments =
    useBudgetStore(
      (state) => state.items
    );

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      {categories.map(
        (category) => {
          const summary =
            getCategorySummary(
              category.id,
              commitments
            );

          const selected =
            category.id ===
            selectedCategoryId;

          return (
            <button
              key={category.id}
              onClick={() =>
                onSelect(
                  category.id
                )
              }
              className={`rounded-2xl border bg-card p-5 text-left shadow-sm transition-all hover:-translate-y-1 hover:shadow-md ${
                selected
                  ? "border-primary ring-2 ring-primary/20"
                  : ""
              }`}
            >
              <div className="text-4xl">
                {category.icon}
              </div>

              <h3 className="mt-4 font-semibold">
                {category.name}
              </h3>

              <p className="mt-4 text-2xl font-bold">
                $
                {summary.totalNeeded.toLocaleString(
                  "es-CO"
                )}
              </p>

              <p className="mt-2 text-sm text-muted-foreground">
                {
                  summary.commitments
                    .length
                }{" "}
                compromiso
                {summary.commitments
                  .length !== 1
                  ? "s"
                  : ""}
              </p>
            </button>
          );
        }
      )}
    </div>
  );
}