"use client";

import { ArrowDownRight, ArrowUpRight, Wallet } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useFinanceStore } from "@/store/finance-store";

export function FinanceSummary() {
      const balance = useFinanceStore((state) => state.balance);
  const income = useFinanceStore((state) => state.income);
  const expenses = useFinanceStore((state) => state.expenses);

  const formatCurrency = (value: number) =>
    value.toLocaleString("es-CO");
  return (
    <section className="grid gap-6 md:grid-cols-3">

      <Card className="rounded-3xl border-0 shadow-sm">
        <CardContent className="flex items-center justify-between p-6">

          <div>
            <p className="text-sm text-muted-foreground">
              Balance
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              ${formatCurrency(balance)}
            </h2>
          </div>

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100">
            <Wallet className="text-blue-600" size={28} />
          </div>

        </CardContent>
      </Card>

      <Card className="rounded-3xl border-0 shadow-sm">
        <CardContent className="flex items-center justify-between p-6">

          <div>
            <p className="text-sm text-muted-foreground">
              Ingresos
            </p>

            <h2 className="mt-2 text-3xl font-bold text-green-600">
              ${formatCurrency(income)}
            </h2>
          </div>

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100">
            <ArrowUpRight className="text-green-600" size={28} />
          </div>

        </CardContent>
      </Card>

      <Card className="rounded-3xl border-0 shadow-sm">
        <CardContent className="flex items-center justify-between p-6">

          <div>
            <p className="text-sm text-muted-foreground">
              Gastos
            </p>

            <h2 className="mt-2 text-3xl font-bold text-red-600">
              ${formatCurrency(expenses)}
            </h2>
          </div>

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-100">
            <ArrowDownRight className="text-red-600" size={28} />
          </div>

        </CardContent>
      </Card>

    </section>
  );
}