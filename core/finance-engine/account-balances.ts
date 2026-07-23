import type { Transaction } from "@/types/finance";

export interface AccountBalances {
  total: number;
  cash: number;
  digital: number;
}

export function getAccountBalances(
  transactions: Transaction[]
): AccountBalances {
  return transactions.reduce<AccountBalances>(
    (balances, transaction) => {
      const value =
        transaction.type === "income"
          ? transaction.amount
          : -transaction.amount;

      balances.total += value;

      if (transaction.account_type === "cash") {
        balances.cash += value;
      } else {
        balances.digital += value;
      }

      return balances;
    },
    {
      total: 0,
      cash: 0,
      digital: 0,
    }
  );
}