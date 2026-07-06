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

  balance: number;

  income: number;

  expenses: number;

  addTransaction: (transaction: Transaction) => void;
}

export const useFinanceStore = create<FinanceState>((set) => ({
  transactions: [],

balance: 0,

income: 0,

expenses: 0,

addTransaction: (transaction) =>
  set((state) => {
    const transactions = [...state.transactions, transaction];

    const income = transactions
      .filter((t) => t.type === "income")
      .reduce((total, t) => total + t.amount, 0);

    const expenses = transactions
      .filter((t) => t.type === "expense")
      .reduce((total, t) => total + t.amount, 0);

    return {
      transactions,
      income,
      expenses,
      balance: income - expenses,
    };
  }),
}));