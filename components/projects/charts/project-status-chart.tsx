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

interface ProjectStatusChartProps {
  data: ChartItem[];
}

export function ProjectStatusChart({
  data,
}: ProjectStatusChartProps) {
  return (
    <Card className="p-6">

      <div className="mb-6">

        <h3 className="text-lg font-semibold">
          Estado de las tareas
        </h3>

        <p className="text-sm text-muted-foreground">
          Distribución actual del proyecto.
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

          <XAxis
            dataKey="name"
          />

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