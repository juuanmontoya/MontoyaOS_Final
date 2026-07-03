import { create } from "zustand";

export type TransactionType = "income" | "expense";

export interface Transaction {
  id: string;
  type: TransactionType;
  category: string;
  description: string;
  amount: number;
  date: string;
}

interface FinanceState {
  transactions: Transaction[];

  addTransaction: (transaction: Transaction) => void;
}

export const useFinanceStore = create<FinanceState>((set) => ({
  transactions: [],

  addTransaction: (transaction) =>
    set((state) => ({
      transactions: [...state.transactions, transaction],
    })),
}));