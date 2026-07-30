import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";

import type { Transaction } from "@/types/finance";

import {
  groupTransactionsByDate,
  type TransactionGroup,
} from "./group-transactions";

export interface TransactionMonthGroup {
  month: string;
  label: string;
  transactions: TransactionGroup[];
}

export function groupTransactionsByMonth(
  transactions: Transaction[]
): TransactionMonthGroup[] {
  const months = new Map<
    string,
    Transaction[]
  >();

  for (const transaction of transactions) {
    const monthKey =
      transaction.transaction_date.slice(
        0,
        7
      );

    if (!months.has(monthKey)) {
      months.set(monthKey, []);
    }

    months.get(monthKey)!.push(
      transaction
    );
  }

  return Array.from(
    months.entries()
  ).map(([month, items]) => ({
    month,
    label: format(
      parseISO(`${month}-01`),
      "MMMM yyyy",
      {
        locale: es,
      }
    ),
    transactions:
      groupTransactionsByDate(items),
  }));
}