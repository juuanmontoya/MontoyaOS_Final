import { create } from "zustand";
import type { Category } from "@/types/category";
import { categoryService } from "@/services/category-service";
import {
  getTransactions,
  addTransaction,
  updateTransaction,
} from "@/services/finance-service";

export type TransactionType = "income" | "expense";

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: TransactionType;

  category_id: string;

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

  editTransaction: (
    id: string,
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

  createTransaction: async (transaction) => {
    const newTransaction =
      await addTransaction(transaction);

    set((state) => ({
      transactions: [
        newTransaction,
        ...state.transactions,
      ],
    }));
  },

  editTransaction: async (id, transaction) => {
    const updatedTransaction =
      await updateTransaction(id, transaction);

    set((state) => ({
      transactions: state.transactions.map((item) =>
        item.id === id ? updatedTransaction : item
      ),
    }));
  },
}));