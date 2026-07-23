import { create } from "zustand";

import type { Category } from "@/types/category";
import type {
  CreateTransactionInput,
  Transaction,
} from "@/types/finance";

import { categoryService } from "@/services/category-service";

import {
  addTransaction,
  getTransactions,
  updateTransaction,
} from "@/services/finance-service";

interface FinanceStore {
  transactions: Transaction[];

  categories: Category[];

  isLoading: boolean;

  loadTransactions: () => Promise<void>;

  loadCategories: () => Promise<void>;

  createTransaction: (
    transaction: CreateTransactionInput
  ) => Promise<void>;

  editTransaction: (
    id: string,
    transaction: CreateTransactionInput
  ) => Promise<void>;
}

export const useFinanceStore =
  create<FinanceStore>((set) => ({
    transactions: [],

    categories: [],

    isLoading: false,

    loadTransactions: async () => {
      set({
        isLoading: true,
      });

      try {
        const transactions =
          await getTransactions();

        set({
          transactions,
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

    loadCategories: async () => {
      try {
        const categories =
          await categoryService.getCategories();

        set({
          categories,
        });
      } catch (error) {
        console.error(error);
      }
    },

    createTransaction: async (
      transaction
    ) => {
      const newTransaction =
        await addTransaction({
          ...transaction,
          account_type: "cash",
        });

      set((state) => ({
        transactions: [
          newTransaction,
          ...state.transactions,
        ],
      }));
    },

    editTransaction: async (
      id,
      transaction
    ) => {
      const updatedTransaction =
        await updateTransaction(
          id,
          {
            ...transaction,
            account_type: "cash",
          }
        );

      set((state) => ({
        transactions:
          state.transactions.map((item) =>
            item.id === id
              ? updatedTransaction
              : item
          ),
      }));
    },
  }));