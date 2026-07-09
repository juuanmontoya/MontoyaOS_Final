"use client";

import { useEffect } from "react";
import { Wallet } from "lucide-react";

import { useFinanceStore } from "@/store/finance-store";
import { getFinanceSummary } from "@/core/finance-engine";

export function FinanceWidget() {
  const {
    transactions,
    categories,
    loadTransactions,
    loadCategories,
  } = useFinanceStore();

  useEffect(() => {
    loadTransactions();
    loadCategories();
  }, [loadTransactions, loadCategories]);

  const summary = getFinanceSummary(
    transactions,
    categories
  );

  const formatter = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  });

  return (
    <div className="rounded-2xl border bg-card p-6 shadow-sm">
      <div className="mb-5 flex items-center gap-3">
        <div className="rounded-xl bg-emerald-100 p-3">
          <Wallet className="h-6 w-6 text-emerald-700" />
        </div>

        <div>
          <h3 className="font-semibold">
            Finanzas
          </h3>

          <p className="text-sm text-muted-foreground">
            Resumen financiero
          </p>
        </div>
      </div>

      <div className="space-y-5">
        <div>
          <p className="text-sm text-muted-foreground">
            Balance
          </p>

          <p className="mt-1 text-3xl font-bold">
            {formatter.format(summary.balance)}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-muted-foreground">
              Health Score
            </p>

            <p className="text-xl font-semibold">
              {summary.health.score}
            </p>
          </div>

          <div>
            <p className="text-xs text-muted-foreground">
              Estado
            </p>

            <p className="text-xl font-semibold">
              {summary.health.level}
            </p>
          </div>
        </div>

        <div>
          <p className="mb-2 text-sm font-medium">
            Última transacción
          </p>

          {summary.recentTransactions.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Sin movimientos.
            </p>
          ) : (
            <div className="rounded-xl bg-muted p-3">
              <p className="font-medium">
                {summary.recentTransactions[0].description}
              </p>

              <p className="text-sm text-muted-foreground">
                {formatter.format(
                  summary.recentTransactions[0].amount
                )}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}