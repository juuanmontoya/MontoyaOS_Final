"use client";

import type { DragEndEvent } from "@dnd-kit/core";

import type {
  Task,
  TaskStatus,
} from "@/types/task";

import { KanbanColumn } from "./kanban-column";
import { KanbanProvider } from "./kanban-provider";

import { useTasksStore } from "@/store/tasks-store";

interface KanbanBoardProps {
  tasks: Task[];
}

const VALID_STATUSES: TaskStatus[] = [
  "todo",
  "in_progress",
  "completed",
  "cancelled",
];

export function KanbanBoard({
  tasks,
}: KanbanBoardProps) {
  const { updateTask } =
    useTasksStore();

  const todoTasks = tasks.filter(
    (task) =>
      task.status === "todo"
  );

  const inProgressTasks =
    tasks.filter(
      (task) =>
        task.status ===
        "in_progress"
    );

  const completedTasks =
    tasks.filter(
      (task) =>
        task.status ===
        "completed"
    );

  const cancelledTasks =
    tasks.filter(
      (task) =>
        task.status ===
        "cancelled"
    );

  async function handleDragEnd(
    event: DragEndEvent
  ) {
    const {
      active,
      over,
    } = event;

    if (!over) return;

    const taskId =
      String(active.id);

    const overId =
      String(over.id);

    // Si no es una columna válida,
    // seguramente cayó sobre otra tarjeta.
    if (
      !VALID_STATUSES.includes(
        overId as TaskStatus
      )
    ) {
      return;
    }

    const newStatus =
      overId as TaskStatus;

    const task =
      tasks.find(
        (item) =>
          item.id === taskId
      );

    if (!task) return;

    if (
      task.status === newStatus
    ) {
      return;
    }

    await updateTask(
      task.id,
      {
        status: newStatus,
      }
    );
  }

  return (
    <KanbanProvider
      onDragEnd={
        handleDragEnd
      }
    >
      <div className="flex gap-6 overflow-x-auto pb-4">

        <KanbanColumn
          title="📝 Por hacer"
          status="todo"
          tasks={todoTasks}
        />

        <KanbanColumn
          title="🚀 En progreso"
          status="in_progress"
          tasks={
            inProgressTasks
          }
        />

        <KanbanColumn
          title="✅ Completadas"
          status="completed"
          tasks={
            completedTasks
          }
        />

        <KanbanColumn
          title="❌ Canceladas"
          status="cancelled"
          tasks={
            cancelledTasks
          }
        />

      </div>
    </KanbanProvider>
  );
}