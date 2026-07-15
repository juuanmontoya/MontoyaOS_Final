"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Card } from "@/components/ui/card";

import type {
  ChartItem,
} from "@/core/projects-engine/project-charts";

interface ProjectPriorityChartProps {
  data: ChartItem[];
}

export function ProjectPriorityChart({
  data,
}: ProjectPriorityChartProps) {
  return (
    <Card className="p-6">

      <div className="mb-6">

        <h3 className="text-lg font-semibold">
          Prioridad de las tareas
        </h3>

        <p className="text-sm text-muted-foreground">
          Distribución por nivel de prioridad.
        </p>

      </div>

      <ResponsiveContainer
        width="100%"
        height={300}
      >

        <BarChart data={data}>

          <CartesianGrid
            strokeDasharray="3 3"
          />

          <XAxis dataKey="name" />

          <YAxis />

          <Tooltip />

          <Bar
            dataKey="value"
            radius={[8, 8, 0, 0]}
          />

        </BarChart>

      </ResponsiveContainer>

    </Card>
  );
}