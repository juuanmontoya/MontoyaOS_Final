import { create } from "zustand";

import type { BudgetCategory } from "@/types/budget-category";

import { budgetCategoryService } from "@/services/budget-category-service";

interface BudgetCategoryStore {
  categories: BudgetCategory[];

  isLoading: boolean;

  loadCategories: () => Promise<void>;
}

export const useBudgetCategoryStore =
  create<BudgetCategoryStore>((set) => ({
    categories: [],

    isLoading: false,

    loadCategories: async () => {
      set({
        isLoading: true,
      });

      try {
        const categories =
          await budgetCategoryService.getCategories();

        set({
          categories,
          isLoading: false,
        });
      } catch (error) {
        console.error(error);

        set({
          isLoading: false,
        });

        throw error;
      }
    },
  }));