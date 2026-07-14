"use client";

import { useEffect } from "react";

import { useRouter } from "next/navigation";

import { FolderKanban } from "lucide-react";

import { Button } from "@/components/ui/button";

import { ProjectGrid } from "@/components/projects/lists/project-grid";

import { useProjectsStore } from "@/store/project-store";
import { useTasksStore } from "@/store/tasks-store";

export default function ProjectsPage() {
  const router = useRouter();

  const {
    projects,
    loading,
    loadProjects,
  } = useProjectsStore();

  const {
    tasks,
    loadTasks,
  } = useTasksStore();

  useEffect(() => {
    loadProjects();
    loadTasks();
  }, [loadProjects, loadTasks]);

  return (
    <div className="space-y-8">
      <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <FolderKanban className="h-8 w-8" />

            <h1 className="text-3xl font-bold">
              Projects
            </h1>
          </div>

          <p className="mt-2 text-muted-foreground">
            Organiza tus tareas agrupándolas por proyectos.
          </p>
        </div>

        <Button
          onClick={() =>
            router.push("/projects/new")
          }
        >
          Nuevo Proyecto
        </Button>
      </header>

      {loading ? (
        <div className="flex justify-center py-16">
          <p className="text-muted-foreground">
            Cargando proyectos...
          </p>
        </div>
      ) : (
        <ProjectGrid
          projects={projects}
          tasks={tasks}
        />
      )}
    </div>
  );
}