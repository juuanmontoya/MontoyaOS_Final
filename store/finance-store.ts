import { create } from "zustand";

import type { Category } from "@/types/category";

import { categoryService } from "@/services/category-service";
import {
  getTransactions,
  addTransaction,
} from "@/services/finance-service";

export type TransactionType = "income" | "expense";

export interface Transaction {
  id: string;
  description: string;
  category: string;
  type: TransactionType;
  amount: number;
  created_at: string;
}

interface FinanceStore {
  transactions: Transaction[];
  categories: Category[];

  isLoading: boolean;

  loadTransactions: () => Promise<void>;
  loadCategories: () => Promise<void>;

  createTransaction: (
    transaction: Omit<Transaction, "id" | "created_at">
  ) => Promise<void>;
}

export const useFinanceStore = create<FinanceStore>((set) => ({
  transactions: [],
  categories: [],

  isLoading: false,

  loadTransactions: async () => {
    set({ isLoading: true });

    try {
      const transactions = await getTransactions();

      set({
        transactions,
        isLoading: false,
      });
    } catch (error: any) {
      console.group("❌ ERROR cargando transacciones");
      console.log(error);
      console.log("message:", error?.message);
      console.log("details:", error?.details);
      console.log("hint:", error?.hint);
      console.log("code:", error?.code);
      console.groupEnd();

      set({
        isLoading: false,
      });

      throw error;
    }
  },

  loadCategories: async () => {
    try {
      const categories = await categoryService.getCategories();

      set({
        categories,
      });
    } catch (error) {
      console.error("❌ Error cargando categorías:", error);
      throw error;
    }
  },

  createTransaction: async (transaction) => {
    try {
      const newTransaction = await addTransaction(transaction);

      set((state) => ({
        transactions: [newTransaction, ...state.transactions],
      }));
    } catch (error: any) {
      console.group("❌ ERROR creando transacción");
      console.log(error);
      console.log("message:", error?.message);
      console.log("details:", error?.details);
      console.log("hint:", error?.hint);
      console.log("code:", error?.code);
      console.groupEnd();

      throw error;
    }
  },
}));