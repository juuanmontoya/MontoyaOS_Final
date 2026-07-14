"use client";

import { useRouter } from "next/navigation";

import { ArrowRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

import type { Project } from "@/types/project";
import type { Task } from "@/types/task";

import { getProjectStats } from "@/core/projects-engine/project-stats";

interface ProjectCardProps {
  project: Project;
  tasks: Task[];
}

export function ProjectCard({
  project,
  tasks,
}: ProjectCardProps) {
  const router = useRouter();

  const stats = getProjectStats(
    project,
    tasks
  );

  return (
    <Card
      className="cursor-pointer p-5 transition-all hover:-translate-y-1 hover:shadow-lg"
      onClick={() =>
        router.push(
          `/projects/${project.id}`
        )
      }
    >
      <div className="space-y-5">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div
              className="flex h-12 w-12 items-center justify-center rounded-xl text-2xl"
              style={{
                backgroundColor:
                  project.color,
              }}
            >
              {project.icon}
            </div>

            <div>
              <h3 className="text-lg font-semibold">
                {project.name}
              </h3>

              {project.description && (
                <p className="text-sm text-muted-foreground">
                  {project.description}
                </p>
              )}
            </div>
          </div>

          <Badge
            variant={
              project.status ===
              "active"
                ? "default"
                : "secondary"
            }
          >
            {project.status}
          </Badge>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progreso</span>

            <span className="font-medium">
              {stats.completionRate}%
            </span>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-primary transition-all"
              style={{
                width: `${stats.completionRate}%`,
              }}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-muted-foreground">
              Total
            </p>

            <p className="text-xl font-bold">
              {stats.totalTasks}
            </p>
          </div>

          <div>
            <p className="text-xs text-muted-foreground">
              Completadas
            </p>

            <p className="text-xl font-bold">
              {stats.completedTasks}
            </p>
          </div>

          <div>
            <p className="text-xs text-muted-foreground">
              Pendientes
            </p>

            <p className="text-xl font-bold">
              {stats.pendingTasks}
            </p>
          </div>

          <div>
            <p className="text-xs text-muted-foreground">
              Vencidas
            </p>

            <p className="text-xl font-bold text-destructive">
              {stats.overdueTasks}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between border-t pt-4 text-sm text-muted-foreground">
          <span>
            Abrir proyecto
          </span>

          <ArrowRight className="h-4 w-4" />
        </div>
      </div>
    </Card>
  );
}