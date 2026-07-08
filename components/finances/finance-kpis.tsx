"use client";

import {
  Receipt,
  TrendingDown,
  Trophy,
  WalletCards,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { useFinanceAnalytics } from "@/core/hooks/use-finance-analytics";

export function FinanceKPIs() {
  const {
    totalTransactions,
    biggestExpense,
    averageExpense,
    topCategory,
  } = useFinanceAnalytics();

  const formatCurrency = (value: number) =>
    value.toLocaleString("es-CO");

  return (
    <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">

      <Card className="rounded-3xl border-0 shadow-sm">
        <CardContent className="flex items-center gap-4 p-5">

          <div className="rounded-2xl bg-blue-100 p-3">
            <Receipt className="text-blue-600" />
          </div>

          <div>
            <p className="text-sm text-muted-foreground">
              Movimientos
            </p>

            <h3 className="text-2xl font-bold">
              {totalTransactions}
            </h3>
          </div>

        </CardContent>
      </Card>

      <Card className="rounded-3xl border-0 shadow-sm">
        <CardContent className="flex items-center gap-4 p-5">

          <div className="rounded-2xl bg-red-100 p-3">
            <TrendingDown className="text-red-600" />
          </div>

          <div>
            <p className="text-sm text-muted-foreground">
              Mayor gasto
            </p>

            <h3 className="font-bold">
              {biggestExpense?.description ?? "-"}
            </h3>

            <p className="text-sm text-red-600">
              {biggestExpense
                ? `$${formatCurrency(biggestExpense.amount)}`
                : "-"}
            </p>

          </div>

        </CardContent>
      </Card>

      <Card className="rounded-3xl border-0 shadow-sm">
        <CardContent className="flex items-center gap-4 p-5">

          <div className="rounded-2xl bg-amber-100 p-3">
            <Trophy className="text-amber-600" />
          </div>

          <div>
            <p className="text-sm text-muted-foreground">
              Categoría #1
            </p>

            <h3 className="font-bold">
              {topCategory?.[0] ?? "-"}
            </h3>

            <p className="text-sm text-muted-foreground">
              {topCategory
                ? `$${formatCurrency(topCategory[1])}`
                : "-"}
            </p>

          </div>

        </CardContent>
      </Card>

      <Card className="rounded-3xl border-0 shadow-sm">
        <CardContent className="flex items-center gap-4 p-5">

          <div className="rounded-2xl bg-green-100 p-3">
            <WalletCards className="text-green-600" />
          </div>

          <div>
            <p className="text-sm text-muted-foreground">
              Gasto promedio
            </p>

            <h3 className="text-xl font-bold">
              ${formatCurrency(averageExpense)}
            </h3>
          </div>

        </CardContent>
      </Card>

    </section>
  );
}