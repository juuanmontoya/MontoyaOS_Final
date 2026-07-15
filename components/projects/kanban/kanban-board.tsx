"use client";

import type { DragEndEvent } from "@dnd-kit/core";

import type { Task } from "@/types/task";

import { KanbanColumn } from "./kanban-column";
import { KanbanProvider } from "./kanban-provider";

interface KanbanBoardProps {
  tasks: Task[];
}

export function KanbanBoard({
  tasks,
}: KanbanBoardProps) {
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

  function handleDragEnd(
    event: DragEndEvent
  ) {
    console.log(
      "Drag End",
      event
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
          tasks={todoTasks}
        />

        <KanbanColumn
          title="🚀 En progreso"
          tasks={
            inProgressTasks
          }
        />

        <KanbanColumn
          title="✅ Completadas"
          tasks={
            completedTasks
          }
        />

        <KanbanColumn
          title="❌ Canceladas"
          tasks={
            cancelledTasks
          }
        />

      </div>
    </KanbanProvider>
  );
}