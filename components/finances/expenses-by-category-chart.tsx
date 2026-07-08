"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import { AnalyticsCard } from "@/components/ui/analytics-card";
import { useFinanceAnalytics } from "@/core/hooks/use-finance-analytics";

export function ExpensesByCategoryChart() {
  const {
    expensesByCategory,
    totalExpensesAmount,
  } = useFinanceAnalytics();

  return (
    <AnalyticsCard
      title="Gastos por categoría"
      subtitle="Distribución de tus gastos"
    >
      {expensesByCategory.length === 0 ? (
        <div className="flex h-full items-center justify-center text-muted-foreground">
          No hay gastos registrados.
        </div>
      ) : (
        <div className="flex h-full flex-col gap-6 lg:flex-row">

          {/* ---------------- DONA ---------------- */}

          <div className="relative flex h-72 flex-1 items-center justify-center">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <PieChart>

                <Pie
                  data={expensesByCategory}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={3}
                >
                  {expensesByCategory.map((category) => (
                    <Cell
                      key={category.id}
                      fill={category.color}
                    />
                  ))}
                </Pie>

              <Tooltip
  formatter={(value) => [
    `$${Number(value ?? 0).toLocaleString("es-CO")}`,
    "Valor",
  ]}
/>

              </PieChart>
            </ResponsiveContainer>

            <div className="absolute flex flex-col items-center">

              <span className="text-xl font-bold">
                $
                {totalExpensesAmount.toLocaleString(
                  "es-CO"
                )}
              </span>

              <span className="text-sm text-muted-foreground">
                Gastado
              </span>

            </div>

          </div>

          {/* ---------------- LISTA ---------------- */}

          <div className="flex flex-1 flex-col justify-center gap-5 overflow-y-auto pr-2">

            {expensesByCategory.map((category) => (
              <div key={category.id}>

                <div className="mb-2 flex items-center justify-between">

                  <div className="flex items-center gap-3">

                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-xl text-lg"
                      style={{
                        backgroundColor: `${category.color}20`,
                      }}
                    >
                      {category.icon}
                    </div>

                    <div>

                      <p className="font-medium">
                        {category.name}
                      </p>

                      <p className="text-xs text-muted-foreground">
                        $
                        {category.value.toLocaleString(
                          "es-CO"
                        )}
                      </p>

                    </div>

                  </div>

                  <span className="font-semibold">
                    {category.percentage}%
                  </span>

                </div>

                <div className="h-2 rounded-full bg-gray-200">

                  <div
                    className="h-2 rounded-full transition-all"
                    style={{
                      width: `${category.percentage}%`,
                      backgroundColor:
                        category.color,
                    }}
                  />

                </div>

              </div>
            ))}

          </div>

        </div>
      )}
    </AnalyticsCard>
  );
}