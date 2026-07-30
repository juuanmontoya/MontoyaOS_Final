import { create } from "zustand";

import type {
  FinancialCommitment,
  CreateFinancialCommitmentInput,
  UpdateFinancialCommitmentInput,
} from "@/types/financial-plan";

import {
  getBudgetItems,
  createBudgetItem,
  updateBudgetItem,
  deleteBudgetItem,
} from "@/services/budget-service";

interface BudgetStore {
  items: FinancialCommitment[];

  isLoading: boolean;

  loadBudget: () => Promise<void>;

  createBudget: (
    input: CreateFinancialCommitmentInput
  ) => Promise<void>;

  updateBudget: (
    id: string,
    input: UpdateFinancialCommitmentInput
  ) => Promise<void>;

  deleteBudget: (
    id: string
  ) => Promise<void>;

  markAsPaid: (
    id: string,
    transactionId?: string
  ) => Promise<void>;
}

export const useBudgetStore =
  create<BudgetStore>((set) => ({
    items: [],

    isLoading: false,

    loadBudget: async () => {
      set({
        isLoading: true,
      });

      try {
        const items =
          await getBudgetItems();

        set({
          items,
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

    createBudget: async (
      input
    ) => {
      const newItem =
        await createBudgetItem(
          input
        );

      set((state) => ({
        items: [
          ...state.items,
          newItem,
        ],
      }));
    },

    updateBudget: async (
      id,
      input
    ) => {
      const updatedItem =
        await updateBudgetItem(
          id,
          input
        );

      set((state) => ({
        items:
          state.items.map((item) =>
            item.id === id
              ? updatedItem
              : item
          ),
      }));
    },

    deleteBudget: async (
      id
    ) => {
      await deleteBudgetItem(id);

      set((state) => ({
        items:
          state.items.filter(
            (item) =>
              item.id !== id
          ),
      }));
    },

    markAsPaid: async (
      id,
      transactionId
    ) => {
      const updatedItem =
        await updateBudgetItem(
          id,
          {
            paid: true,
            paid_at:
              new Date().toISOString(),
            transaction_id:
              transactionId ??
              null,
          }
        );

      set((state) => ({
        items:
          state.items.map((item) =>
            item.id === id
              ? updatedItem
              : item
          ),
      }));
    },
  }));