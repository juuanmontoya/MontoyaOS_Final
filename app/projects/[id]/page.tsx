"use client";

import { useEffect, useState } from "react";

import { useParams } from "next/navigation";
import Link from "next/link";

import {
  ArrowLeft,
  FolderKanban,
  LayoutGrid,
  List,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import { TaskQuickAdd } from "@/components/tasks/task-quick-add";
import { ProjectTaskCard } from "@/components/projects/cards/project-task-card";
import { ProjectActions } from "@/components/projects/project-actions";
import { KanbanBoard } from "@/components/projects/kanban/kanban-board";
import { ProjectDashboard } from "@/components/projects/dashboard/project-dashboard";

import { useProjectsStore } from "@/store/project-store";
import { useTasksStore } from "@/store/tasks-store";

import { getProjectStats } from "@/core/projects-engine/project-stats";

export default function ProjectDetailPage() {
  const params = useParams();

  const projectId = params.id as string;

  const [showQuickAdd, setShowQuickAdd] =
    useState(false);

  const [view, setView] = useState<
    "list" | "kanban"
  >("list");

  const {
    projects,
    loadProjects,
  } = useProjectsStore();

  const {
    tasks,
    loadTasks,
    createTask,
    toggleTaskComplete,
  } = useTasksStore();

  useEffect(() => {
    loadProjects();
    loadTasks();
  }, [
    loadProjects,
    loadTasks,
  ]);

  const project = projects.find(
    (p) => p.id === projectId
  );

  if (!project) {
    return (
      <div className="py-20 text-center">
        Proyecto no encontrado.
      </div>
    );
  }

  const projectTasks = tasks.filter(
    (task) =>
      task.project_id === project.id
  );

  const stats = getProjectStats(
    project,
    tasks
  );

  async function handleCreateTask(data: {
    title: string;
    priority:
      | "low"
      | "medium"
      | "high"
      | "urgent";
    due_date: string | null;
    category: string | null;
    reminder_at: string | null;
    project_id: string | null;
  }) {
    await createTask(data);
    await loadTasks();
    setShowQuickAdd(false);
  }

  return (
    <div className="space-y-8">

      <Button
        asChild
        variant="ghost"
        className="w-fit"
      >
        <Link href="/projects">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver
        </Link>
      </Button>

      <div className="flex items-start justify-between">

        <div className="flex items-center gap-4">

          <div
            className="flex h-16 w-16 items-center justify-center rounded-2xl text-3xl"
            style={{
              backgroundColor:
                project.color,
            }}
          >
            {project.icon}
          </div>

          <div>

            <h1 className="text-4xl font-bold">
              {project.name}
            </h1>

            {project.description && (
              <p className="text-muted-foreground">
                {project.description}
              </p>
            )}

          </div>

        </div>

        <ProjectActions
          project={project}
        />

      </div>

      <Card className="space-y-6 p-6">

        <div>

          <div className="mb-2 flex justify-between">
            <span className="font-medium">
              Progreso
            </span>

            <span>
              {stats.completionRate}%
            </span>
          </div>

          <div className="h-3 overflow-hidden rounded-full bg-muted">

            <div
              className="h-full rounded-full bg-primary"
              style={{
                width: `${stats.completionRate}%`,
              }}
            />

          </div>

        </div>

        <div className="grid gap-4 md:grid-cols-4">

          <Card className="p-4">
            <p className="text-sm text-muted-foreground">
              Total
            </p>

            <p className="text-3xl font-bold">
              {stats.totalTasks}
            </p>
          </Card>

          <Card className="p-4">
            <p className="text-sm text-muted-foreground">
              Completadas
            </p>

            <p className="text-3xl font-bold">
              {stats.completedTasks}
            </p>
          </Card>

          <Card className="p-4">
            <p className="text-sm text-muted-foreground">
              Pendientes
            </p>

            <p className="text-3xl font-bold">
              {stats.pendingTasks}
            </p>
          </Card>

          <Card className="p-4">
            <p className="text-sm text-muted-foreground">
              Vencidas
            </p>

            <p className="text-3xl font-bold text-destructive">
              {stats.overdueTasks}
            </p>
          </Card>

        </div>

      </Card>

      <ProjectDashboard
        tasks={projectTasks}
      />

      <Card className="p-6">

        <div className="mb-6 flex items-center justify-between">

          <div className="flex items-center gap-2">

            <FolderKanban className="h-5 w-5" />

            <div>

              <h2 className="text-xl font-semibold">
                Tareas del proyecto
              </h2>

              <p className="text-sm text-muted-foreground">
                {projectTasks.length} tareas
              </p>

            </div>

          </div>

          <div className="flex items-center gap-2">

            <Button
              variant={
                view === "list"
                  ? "default"
                  : "outline"
              }
              size="icon"
              onClick={() =>
                setView("list")
              }
            >
              <List className="h-4 w-4" />
            </Button>

            <Button
              variant={
                view === "kanban"
                  ? "default"
                  : "outline"
              }
              size="icon"
              onClick={() =>
                setView("kanban")
              }
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>

            <Button
              onClick={() =>
                setShowQuickAdd(
                  !showQuickAdd
                )
              }
            >
              {showQuickAdd
                ? "Cancelar"
                : "Nueva tarea"}
            </Button>

          </div>

        </div>

        {showQuickAdd && (
          <div className="mb-6">

            <TaskQuickAdd
              defaultProjectId={
                project.id
              }
              onCreate={
                handleCreateTask
              }
            />

          </div>
        )}

        {view === "list" ? (
          projectTasks.length === 0 ? (
            <div className="rounded-xl border border-dashed py-16 text-center">
              <p className="text-lg font-semibold">
                Aún no hay tareas
              </p>

              <p className="mt-2 text-sm text-muted-foreground">
                Crea la primera tarea de este proyecto.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {projectTasks.map(
                (task) => (
                  <ProjectTaskCard
                    key={task.id}
                    task={task}
                    onToggleComplete={
                      toggleTaskComplete
                    }
                  />
                )
              )}
            </div>
          )
        ) : (
          <KanbanBoard
            tasks={projectTasks}
          />
        )}

      </Card>

    </div>
  );
}