import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";

import type { Transaction } from "@/types/finance";

export interface TransactionGroup {
  date: string;
  label: string;
  transactions: Transaction[];
}

export function groupTransactionsByDate(
  transactions: Transaction[]
): TransactionGroup[] {
  const groups = new Map<
    string,
    Transaction[]
  >();

  for (const transaction of transactions) {
    const key =
      transaction.transaction_date;

    if (!groups.has(key)) {
      groups.set(key, []);
    }

    groups.get(key)!.push(
      transaction
    );
  }

  return Array.from(
    groups.entries()
  ).map(([date, items]) => ({
    date,
    label: format(
      parseISO(date),
      "d 'de' MMMM",
      {
        locale: es,
      }
    ),
    transactions: items.sort(
      (a, b) =>
        new Date(
          b.created_at
        ).getTime() -
        new Date(
          a.created_at
        ).getTime()
    ),
  }));
}