"use client";

import { useEffect } from "react";

import { useBudgetCategoryStore } from "@/store/budget-category-store";
import { useBudgetStore } from "@/store/budget-store";

import { FinancialCommitmentDialog } from "./FinancialCommitmentDialog";
import { FinancialCommitmentRow } from "./financial-commitment-row";

import {
  getCategorySummary,
} from "@/core/financial-plan-engine";

interface Props {
  categoryId: string;
}

export function BudgetCategoryList({
  categoryId,
}: Props) {
  const categories =
    useBudgetCategoryStore(
      (state) => state.categories
    );

  const loadCategories =
    useBudgetCategoryStore(
      (state) => state.loadCategories
    );

  const commitments =
    useBudgetStore(
      (state) => state.items
    );

  const loadBudget =
    useBudgetStore(
      (state) => state.loadBudget
    );

  useEffect(() => {
    loadCategories();
    loadBudget();
  }, [
    loadCategories,
    loadBudget,
  ]);

  const category =
    categories.find(
      (item) =>
        item.id ===
        categoryId
    );

  if (!category) {
    return null;
  }

  const summary =
    getCategorySummary(
      category.id,
      commitments
    );

  return (
    <section className="rounded-2xl border bg-card p-6 shadow-sm">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-muted text-3xl">
            {category.icon}
          </div>

          <div>
            <h2 className="text-2xl font-semibold">
              {category.name}
            </h2>

            <p className="text-muted-foreground">
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
          </div>
        </div>

        <FinancialCommitmentDialog
          categoryId={
            category.id
          }
          trigger={
            <button className="rounded-xl border px-4 py-2 text-sm font-medium hover:bg-muted">
              + Agregar compromiso
            </button>
          }
        />
      </div>

      <div className="mt-8 space-y-3">
        {summary.commitments
          .length === 0 ? (
          <div className="rounded-xl border border-dashed p-10 text-center">
            <p className="font-medium">
              No hay compromisos
              todavía.
            </p>

            <p className="mt-2 text-sm text-muted-foreground">
              Agrega el primero
              para esta categoría.
            </p>
          </div>
        ) : (
          summary.commitments.map(
            (
              commitment
            ) => (
              <FinancialCommitmentRow
                key={
                  commitment.id
                }
                name={
                  commitment.name
                }
                amount={
                  commitment.monthly_amount
                }
              />
            )
          )
        )}
      </div>
    </section>
  );
}