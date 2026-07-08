"use client";

import { HeartPulse } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { useFinanceAnalytics } from "@/core/hooks/use-finance-analytics";

export function FinanceHealthCard() {
  const { financeHealth } = useFinanceAnalytics();

  const color =
    financeHealth.score >= 90
      ? "bg-green-500"
      : financeHealth.score >= 75
      ? "bg-lime-500"
      : financeHealth.score >= 60
      ? "bg-yellow-500"
      : "bg-red-500";

  return (
    <Card className="rounded-3xl border-0 shadow-sm">
      <CardContent className="space-y-6 p-6">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-red-100 p-3">
            <HeartPulse className="text-red-500" />
          </div>

          <div>
            <h3 className="text-lg font-bold">
              Salud financiera
            </h3>

            <p className="text-sm text-muted-foreground">
              Indicador general
            </p>
          </div>
        </div>

        <div className="space-y-2">

          <div className="flex items-end gap-2">

            <span className="text-5xl font-bold">
              {financeHealth.score}
            </span>

            <span className="pb-1 text-lg text-muted-foreground">
              /100
            </span>

          </div>

          <p className="font-semibold">
            {financeHealth.level}
          </p>

        </div>

        <div className="h-3 overflow-hidden rounded-full bg-gray-200">

          <div
            className={`${color} h-3 rounded-full transition-all duration-700`}
            style={{
              width: `${financeHealth.score}%`,
            }}
          />

        </div>

      </CardContent>
    </Card>
  );
}