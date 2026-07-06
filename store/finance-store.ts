import { create } from "zustand";
import {
  addTransaction,
  getTransactions,
} from "@/core/services/finance-service";

export type TransactionType = "income" | "expense";

export interface Transaction {
  id: string;
  description: string;
  category: string;
  type: TransactionType;
  amount: number;
  created_at: string;
}

interface FinanceState {
  transactions: Transaction[];

  loadTransactions: () => Promise<void>;

  addTransaction: (
    transaction: Omit<Transaction, "id" | "created_at">
  ) => Promise<void>;
}

export const useFinanceStore = create<FinanceState>((set) => ({
  transactions: [],

  loadTransactions: async () => {
    const transactions = await getTransactions();

    set({
      transactions,
    });
  },

  addTransaction: async (transaction) => {
    const newTransaction = await addTransaction(transaction);

    set((state) => ({
      transactions: [newTransaction, ...state.transactions],
    }));
  },
}));