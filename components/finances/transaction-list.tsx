"use client";

import { ArrowDownRight, ArrowUpRight } from "lucide-react";

import { useFinanceStore } from "@/store/finance-store";
import { EditTransactionDialog } from "./edit-transaction-dialog";
import { formatRelativeDate } from "@/core/utils/format-relative-date";

export function TransactionList() {
  const transactions = useFinanceStore(
    (state) => state.transactions
  );

  if (transactions.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed p-10 text-center text-muted-foreground">
        Aún no hay movimientos registrados.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {transactions.map((transaction) => {
        const category = transaction.category;

        return (
          <div
            key={transaction.id}
            className="rounded-3xl border bg-white p-5 shadow-sm transition-all hover:shadow-md"
          >
            <div className="flex items-start justify-between">

              <div className="flex items-center gap-4">

                <div
                  className="flex h-14 w-14 items-center justify-center rounded-2xl"
                  style={{
                    backgroundColor:
                      category?.color ?? "#F3F4F6",
                  }}
                >
                  <span className="text-2xl">
                    {category?.icon ??
                      (transaction.type === "income"
                        ? "💰"
                        : "💸")}
                  </span>
                </div>

                <div>

                  <h3 className="text-lg font-semibold">
                    {transaction.description}
                  </h3>

                  <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">

                    <span>
                      {category?.name ?? "Sin categoría"}
                    </span>

                    <span>•</span>

                    <span>
                      {formatRelativeDate(
                        transaction.created_at
                      )}
                    </span>

                  </div>

                </div>

              </div>

              <div className="text-right">

                <p
                  className={`text-xl font-bold ${
                    transaction.type === "income"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {transaction.type === "income"
                    ? "+"
                    : "-"}
                  $
                  {transaction.amount.toLocaleString(
                    "es-CO"
                  )}
                </p>

                <div className="mt-3 flex justify-end">
                  <EditTransactionDialog
                    transaction={transaction}
                  />
                </div>

              </div>

            </div>
          </div>
        );
      })}
    </div>
  );
}