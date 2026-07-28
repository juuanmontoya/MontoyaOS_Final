"use client";

import { useEffect, useState } from "react";

import { useBudgetCategoryStore } from "@/store/budget-category-store";

import { BudgetOverview } from "./budget-overview";
import { BudgetCategoryGrid } from "./budget-category-grid";
import { BudgetCategoryList } from "./budget-category-list";

export function BudgetDashboard() {
  const categories =
    useBudgetCategoryStore(
      (state) => state.categories
    );

  const loadCategories =
    useBudgetCategoryStore(
      (state) => state.loadCategories
    );

  const [
    selectedCategoryId,
    setSelectedCategoryId,
  ] = useState("");

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  useEffect(() => {
    if (
      categories.length &&
      !selectedCategoryId
    ) {
      setSelectedCategoryId(
        categories[0].id
      );
    }
  }, [
    categories,
    selectedCategoryId,
  ]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">
          Plan Financiero
        </h1>

        <p className="mt-2 text-muted-foreground">
          Organiza los compromisos financieros
          que necesitas cubrir cada mes.
        </p>
      </div>

      <BudgetOverview />

      <BudgetCategoryGrid
        selectedCategoryId={
          selectedCategoryId
        }
        onSelect={
          setSelectedCategoryId
        }
      />

      {selectedCategoryId && (
        <BudgetCategoryList
          categoryId={
            selectedCategoryId
          }
        />
      )}
    </div>
  );
}