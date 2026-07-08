"use client";

import { useFinanceStore } from "@/store/finance-store";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { EditTransactionDialog } from "./edit-transaction-dialog";

export function TransactionList() {
  const transactions = useFinanceStore((state) => state.transactions);

  if (transactions.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed p-10 text-center text-muted-foreground">
        Aún no hay movimientos registrados.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {transactions.map((transaction: any) => (
        <div
          key={transaction.id}
          className="rounded-2xl border bg-white p-5 shadow-sm"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                  transaction.type === "income"
                    ? "bg-green-100"
                    : "bg-red-100"
                }`}
              >
                {transaction.type === "income" ? (
                  <ArrowUpRight className="text-green-600" />
                ) : (
                  <ArrowDownRight className="text-red-600" />
                )}
              </div>

              <div>
                <h3 className="font-semibold">
                  {transaction.description}
                </h3>

                <p className="text-sm text-muted-foreground">
                  {transaction.category?.name}
                </p>
              </div>
            </div>

            <div className="text-right space-y-2">
              <p
                className={`text-lg font-bold ${
                  transaction.type === "income"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {transaction.type === "income" ? "+" : "-"}$
                {transaction.amount.toLocaleString("es-CO")}
              </p>

              <EditTransactionDialog transaction={transaction} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}