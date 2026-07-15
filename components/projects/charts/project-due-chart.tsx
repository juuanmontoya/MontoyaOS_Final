"use client";

import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import { Card } from "@/components/ui/card";

import type {
  ChartItem,
} from "@/core/projects-engine/project-charts";

interface ProjectDueChartProps {
  data: ChartItem[];
}

const COLORS = [
  "#3B82F6",
  "#10B981",
  "#F59E0B",
];

export function ProjectDueChart({
  data,
}: ProjectDueChartProps) {
  return (
    <Card className="p-6">

      <div className="mb-6">

        <h3 className="text-lg font-semibold">
          Fechas de vencimiento
        </h3>

        <p className="text-sm text-muted-foreground">
          Distribución de tareas según su fecha límite.
        </p>

      </div>

      <ResponsiveContainer
        width="100%"
        height={300}
      >

        <PieChart>

          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={100}
            label
          >

            {data.map(
              (_, index) => (
                <Cell
                  key={index}
                  fill={
                    COLORS[
                      index %
                        COLORS.length
                    ]
                  }
                />
              )
            )}

          </Pie>

          <Tooltip />

        </PieChart>

      </ResponsiveContainer>

    </Card>
  );
}