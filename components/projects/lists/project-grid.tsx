"use client";

import type { Project } from "@/types/project";
import type { Task } from "@/types/task";

import { ProjectCard } from "../cards/project-card";

interface ProjectGridProps {
  projects: Project[];
  tasks: Task[];
}

export function ProjectGrid({
  projects,
  tasks,
}: ProjectGridProps) {
  if (projects.length === 0) {
    return (
      <div className="flex min-h-[300px] items-center justify-center rounded-xl border border-dashed">
        <div className="space-y-2 text-center">
          <h3 className="text-lg font-semibold">
            No hay proyectos
          </h3>

          <p className="text-sm text-muted-foreground">
            Crea tu primer proyecto para comenzar.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          tasks={tasks}
        />
      ))}
    </div>
  );
}