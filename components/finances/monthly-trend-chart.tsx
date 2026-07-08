"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import { AnalyticsCard } from "@/components/ui/analytics-card";
import { useFinanceTrends } from "@/core/hooks/use-finance-trends";

export function MonthlyTrendChart() {
  const data = useFinanceTrends();

  return (
    <AnalyticsCard
      title="Tendencia mensual"
      subtitle="Comparación entre ingresos y gastos"
    >
      {data.length === 0 ? (
        <div className="flex h-[320px] items-center justify-center text-muted-foreground">
          No hay información suficiente.
        </div>
      ) : (
        <div className="h-[320px] w-full">

          <ResponsiveContainer width="100%" height="100%">

            <LineChart
              data={data}
              margin={{
                top: 10,
                right: 20,
                left: 0,
                bottom: 0,
              }}
            >

              <CartesianGrid
                strokeDasharray="3 3"
                opacity={0.2}
              />

              <XAxis
                dataKey="month"
              />

              <YAxis
                tickFormatter={(value) =>
                  `$${(Number(value) / 1000000).toFixed(0)}M`
                }
              />

              <Tooltip
                formatter={(value) => [
                  `$${Number(value).toLocaleString("es-CO")}`,
                  "",
                ]}
              />

              <Line
                type="monotone"
                dataKey="income"
                name="Ingresos"
                stroke="#16A34A"
                strokeWidth={3}
                dot={{
                  r: 5,
                }}
                activeDot={{
                  r: 7,
                }}
              />

              <Line
                type="monotone"
                dataKey="expenses"
                name="Gastos"
                stroke="#DC2626"
                strokeWidth={3}
                dot={{
                  r: 5,
                }}
                activeDot={{
                  r: 7,
                }}
              />

            </LineChart>

          </ResponsiveContainer>

        </div>
      )}
    </AnalyticsCard>
  );
}