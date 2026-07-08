"use client";

import {
  Brain,
  AlertTriangle,
  CheckCircle2,
  Info,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

import { useFinanceStore } from "@/store/finance-store";
import { generateFinanceInsights } from "@/core/finance-engine";

export function FinanceInsights() {
  const transactions = useFinanceStore(
    (state) => state.transactions
  );

  const insights =
    generateFinanceInsights(transactions);

  const getIcon = (type: string) => {
    switch (type) {
      case "success":
        return CheckCircle2;

      case "warning":
        return AlertTriangle;

      default:
        return Info;
    }
  };

  const getColor = (type: string) => {
    switch (type) {
      case "success":
        return "bg-green-100 text-green-600";

      case "warning":
        return "bg-amber-100 text-amber-600";

      default:
        return "bg-blue-100 text-blue-600";
    }
  };

  return (
    <section className="space-y-5">

      <div className="flex items-center gap-3">

        <div className="rounded-2xl bg-slate-100 p-3">
          <Brain className="text-slate-700" />
        </div>

        <div>

          <h2 className="text-xl font-bold">
            Insights financieros
          </h2>

          <p className="text-sm text-muted-foreground">
            Análisis automático de tus movimientos.
          </p>

        </div>

      </div>

      <div className="grid gap-5">

        {insights.map((insight) => {
          const Icon = getIcon(insight.type);

          return (
            <Card
              key={insight.id}
              className="rounded-3xl border-0 shadow-sm"
            >
              <CardContent className="flex gap-4 p-5">

                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl ${getColor(
                    insight.type
                  )}`}
                >
                  <Icon size={22} />
                </div>

                <div>

                  <h3 className="font-semibold">
                    {insight.title}
                  </h3>

                  <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                    {insight.description}
                  </p>

                </div>

              </CardContent>
            </Card>
          );
        })}

      </div>

    </section>
  );
}