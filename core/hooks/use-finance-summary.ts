import { useFinanceStore } from "@/store/finance-store";

export function useFinanceSummary() {
  const transactions = useFinanceStore((state) => state.transactions);

  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((total, t) => total + Number(t.amount), 0);

  const expenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((total, t) => total + Number(t.amount), 0);

  return {
    income,
    expenses,
    balance: income - expenses,
  };
}