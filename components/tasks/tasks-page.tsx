"use client";

import { useEffect } from "react";

import { TaskFilters } from "@/components/tasks/task-filters";
import { TaskList } from "@/components/tasks/task-list";
import { TaskQuickAdd } from "@/components/tasks/task-quick-add";

import { useTasksStore } from "@/store/tasks-store";

export function TasksPage() {
  const {
    loading,
    loadTasks,
    createTask,
    toggleTaskComplete,
    updateTask,
    deleteTask,
    getFilteredTasks,
  } = useTasksStore();

  const filteredTasks = getFilteredTasks();

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  async function handleCreateTask(data: {
    title: string;
    priority: "low" | "medium" | "high" | "urgent";
    due_date: string | null;
    category: string | null;
    reminder_at: string | null;
  }) {
    await createTask(data);
  }

  async function handleUpdateTask(
    id: string,
    updates: {
      title?: string;
    }
  ) {
    await updateTask(id, updates);
  }

  async function handleDeleteTask(id: string) {
    const confirmed = window.confirm(
      "¿Eliminar esta tarea?"
    );

    if (!confirmed) return;

    await deleteTask(id);
  }

  return (
    <main className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Tasks
        </h1>

        <p className="mt-2 text-muted-foreground">
          Gestiona tu trabajo, proyectos y recordatorios.
        </p>
      </div>

      <TaskQuickAdd onCreate={handleCreateTask} />

      <TaskFilters />

      {loading ? (
        <div className="rounded-xl border bg-card p-8 text-center">
          Cargando tareas...
        </div>
      ) : (
        <TaskList
          tasks={filteredTasks}
          onToggleComplete={toggleTaskComplete}
          onUpdate={handleUpdateTask}
          onDelete={handleDeleteTask}
        />
      )}
    </main>
  );
}