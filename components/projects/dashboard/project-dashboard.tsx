"use client";

import type { Task } from "@/types/task";

import { getProjectDashboard } from "@/core/projects-engine/project-dashboard";
import { getProjectCharts } from "@/core/projects-engine/project-charts";

import { Card } from "@/components/ui/card";

import { ProjectStatusChart } from "../charts/project-status-chart";
import { ProjectPriorityChart } from "../charts/project-priority-chart";
import { ProjectWeeklyChart } from "../charts/project-weekly-chart";
import { ProjectDueChart } from "../charts/project-due-chart";

interface ProjectDashboardProps {
  tasks: Task[];
}

export function ProjectDashboard({
  tasks,
}: ProjectDashboardProps) {
  const dashboard =
    getProjectDashboard(tasks);

  const charts =
    getProjectCharts(tasks);

  return (
    <div className="space-y-6">

      <div className="grid gap-4 lg:grid-cols-3">

        <Card className="space-y-2 p-5">

          <p className="text-sm text-muted-foreground">
            📊 Productividad
          </p>

          <p className="text-4xl font-bold">
            {dashboard.productivity}%
          </p>

          <p className="text-sm text-muted-foreground">
            Basada en tareas completadas y en progreso.
          </p>

        </Card>

        <Card className="space-y-2 p-5">

          <p className="text-sm text-muted-foreground">
            📈 Avance del proyecto
          </p>

          <p className="text-4xl font-bold">
            {dashboard.completionRate}%
          </p>

          <div className="h-2 overflow-hidden rounded-full bg-muted">

            <div
              className="h-full rounded-full bg-primary"
              style={{
                width: `${dashboard.completionRate}%`,
              }}
            />

          </div>

        </Card>

        <Card className="space-y-4 p-5">

          <p className="text-sm text-muted-foreground">
            ⚠️ Estado de tareas
          </p>

          <div className="space-y-2 text-sm">

            <div className="flex justify-between">
              <span>Vencidas</span>
              <strong>
                {dashboard.overdueTasks}
              </strong>
            </div>

            <div className="flex justify-between">
              <span>Próximas (3 días)</span>
              <strong>
                {dashboard.dueSoonTasks}
              </strong>
            </div>

            <div className="flex justify-between">
              <span>En progreso</span>
              <strong>
                {dashboard.inProgressTasks}
              </strong>
            </div>

          </div>

        </Card>

      </div>

      <div className="grid gap-6 xl:grid-cols-2">

        <ProjectStatusChart
          data={charts.status}
        />

        <ProjectPriorityChart
          data={charts.priority}
        />

        <ProjectWeeklyChart
          data={charts.weekly}
        />

        <ProjectDueChart
          data={charts.dueDates}
        />

      </div>

    </div>
  );
}