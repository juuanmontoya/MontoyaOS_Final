"use client";

import { useState } from "react";

import {
  ChevronDown,
  ChevronRight,
  ArrowDownRight,
  ArrowUpRight,
} from "lucide-react";

import { useFinanceStore } from "@/store/finance-store";

import { groupTransactionsByMonth } from "@/core/finance-engine/group-transactions-by-month";

import { EditTransactionDialog } from "./edit-transaction-dialog";

export function TransactionList() {
  const transactions = useFinanceStore(
    (state) => state.transactions
  );

  const monthGroups =
    groupTransactionsByMonth(
      transactions
    );

  const [expandedMonths, setExpandedMonths] =
    useState<Record<string, boolean>>(() =>
      Object.fromEntries(
        monthGroups.map(
          (month, index) => [
            month.month,
            index === 0,
          ]
        )
      )
    );

  const [expandedTransactions, setExpandedTransactions] =
    useState<Record<string, boolean>>(
      {}
    );

  if (transactions.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed p-10 text-center text-muted-foreground">
        Aún no hay movimientos registrados.
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {monthGroups.map((month) => {
        const expanded =
          expandedMonths[
            month.month
          ];

        return (
          <section
            key={month.month}
            className="rounded-3xl border bg-white shadow-sm"
          >
            <button
              type="button"
              onClick={() =>
                setExpandedMonths(
                  (prev) => ({
                    ...prev,
                    [month.month]:
                      !prev[
                        month.month
                      ],
                  })
                )
              }
              className="flex w-full items-center justify-between p-5 text-left"
            >
              <div>
                <h2 className="text-xl font-bold capitalize">
                  {month.label}
                </h2>

                <p className="text-sm text-muted-foreground">
                  {
                    month.transactions
                      .length
                  }{" "}
                  día(s)
                </p>
              </div>

              {expanded ? (
                <ChevronDown className="h-5 w-5" />
              ) : (
                <ChevronRight className="h-5 w-5" />
              )}
            </button>

            {expanded && (
              <div className="space-y-8 border-t p-5">
                {month.transactions.map(
                  (group) => (
                    <section
                      key={
                        group.date
                      }
                      className="space-y-4"
                    >
                      <h3 className="sticky top-0 bg-white py-1 text-lg font-semibold text-muted-foreground">
                        {
                          group.label
                        }
                      </h3>

                      {group.transactions.map(
                        (
                          transaction
                        ) => {
                          const category =
                            transaction.category;

                          const isExpanded =
                            expandedTransactions[
                              transaction.id
                            ] ??
                            false;

                          return (
                            <div
                              key={
                                transaction.id
                              }
                              className="rounded-2xl border transition hover:border-primary/30"
                            >
                              <div
  role="button"
  tabIndex={0}
  onClick={() =>
    setExpandedTransactions((prev) => ({
      ...prev,
      [transaction.id]:
        !prev[transaction.id],
    }))
  }
  onKeyDown={(e) => {
    if (
      e.key === "Enter" ||
      e.key === " "
    ) {
      e.preventDefault();

      setExpandedTransactions((prev) => ({
        ...prev,
        [transaction.id]:
          !prev[transaction.id],
      }));
    }
  }}
  className="cursor-pointer p-4"
>
  <div className="flex items-start justify-between">
    <div className="flex items-center gap-4">
      <div
        className="flex h-12 w-12 items-center justify-center rounded-xl"
        style={{
          backgroundColor:
            category?.color ??
            "#F3F4F6",
        }}
      >
        <span className="text-xl">
          {category?.icon ??
            (transaction.type ===
            "income"
              ? "💰"
              : "💸")}
        </span>
      </div>

      <div>
        <h4 className="font-semibold">
          {transaction.description}
        </h4>

        <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
          <span>
            {category?.name ??
              "Sin categoría"}
          </span>

          <span>•</span>

          <span className="flex items-center gap-1">
            {transaction.type ===
            "income" ? (
              <ArrowDownRight className="h-4 w-4 text-green-600" />
            ) : (
              <ArrowUpRight className="h-4 w-4 text-red-600" />
            )}

            {transaction.account_type ===
            "cash"
              ? "Efectivo"
              : "Digital"}
          </span>
        </div>
      </div>
    </div>

    <div className="flex items-start gap-3">
      <div className="text-right">
        <p
          className={`text-lg font-bold ${
            transaction.type ===
            "income"
              ? "text-green-600"
              : "text-red-600"
          }`}
        >
          {transaction.type ===
          "income"
            ? "+"
            : "-"}
          $
          {transaction.amount.toLocaleString(
            "es-CO"
          )}
        </p>
      </div>

      <div
        onClick={(e) =>
          e.stopPropagation()
        }
      >
        <EditTransactionDialog
          transaction={transaction}
        />
      </div>

      {isExpanded ? (
        <ChevronDown className="h-5 w-5 text-muted-foreground" />
      ) : (
        <ChevronRight className="h-5 w-5 text-muted-foreground" />
      )}
    </div>
  </div>
</div>

                              {isExpanded &&
                                transaction.items &&
                                transaction.items
                                  .length >
                                  0 && (
                                  <div className="border-t bg-muted/20 px-6 py-4">
                                    <div className="space-y-2">
                                      {transaction.items.map(
                                        (
                                          item
                                        ) => (
                                          <div
                                            key={
                                              item.id
                                            }
                                            className="flex items-center justify-between text-sm"
                                          >
                                            <span>
                                              •{" "}
                                              {
                                                item.name
                                              }

                                              {item.quantity >
                                                1 &&
                                                ` x${item.quantity}`}
                                            </span>

                                            <span className="font-medium">
                                              $
                                              {item.total.toLocaleString(
                                                "es-CO"
                                              )}
                                            </span>
                                          </div>
                                        )
                                      )}
                                    </div>
                                  </div>
                                )}
                            </div>
                          );
                        }
                      )}
                    </section>
                  )
                )}
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
}