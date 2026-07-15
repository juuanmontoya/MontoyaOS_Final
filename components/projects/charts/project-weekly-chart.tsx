"use client";

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Card } from "@/components/ui/card";

import type {
  WeeklyItem,
} from "@/core/projects-engine/project-charts";

interface ProjectWeeklyChartProps {
  data: WeeklyItem[];
}

export function ProjectWeeklyChart({
  data,
}: ProjectWeeklyChartProps) {
  return (
    <Card className="p-6">

      <div className="mb-6">

        <h3 className="text-lg font-semibold">
          Actividad semanal
        </h3>

        <p className="text-sm text-muted-foreground">
          Tareas creadas vs completadas.
        </p>

      </div>

      <ResponsiveContainer
        width="100%"
        height={300}
      >

        <LineChart data={data}>

          <CartesianGrid
            strokeDasharray="3 3"
          />

          <XAxis dataKey="day" />

          <YAxis />

          <Tooltip />

          <Legend />

          <Line
            type="monotone"
            dataKey="created"
            name="Creadas"
            strokeWidth={2}
          />

          <Line
            type="monotone"
            dataKey="completed"
            name="Completadas"
            strokeWidth={2}
          />

        </LineChart>

      </ResponsiveContainer>

    </Card>
  );
}