"use client";

import { useState } from "react";

import type {
  DragEndEvent,
  DragStartEvent,
  DragCancelEvent,
} from "@dnd-kit/core";

import type {
  Task,
} from "@/types/task";

import { useTasksStore } from "@/store/tasks-store";

import { resolveKanbanMove } from "@/core/projects-engine/kanban-move";

import { KanbanColumn } from "./kanban-column";
import { KanbanProvider } from "./kanban-provider";
import { KanbanTaskCard } from "./kanban-task-card";

interface KanbanBoardProps {
  tasks: Task[];
}

export function KanbanBoard({
  tasks,
}: KanbanBoardProps) {
  const {
    updateTask,
  } = useTasksStore();

  const [
    activeTask,
    setActiveTask,
  ] = useState<Task | null>(
    null
  );

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

  function handleDragStart(
    event: DragStartEvent
  ) {
    const task = tasks.find(
      (item) =>
        item.id ===
        String(event.active.id)
    );

    setActiveTask(
      task ?? null
    );
  }

  function handleDragCancel(
    _: DragCancelEvent
  ) {
    setActiveTask(null);
  }

  async function handleDragEnd(
    event: DragEndEvent
  ) {
    setActiveTask(null);

    const move =
      resolveKanbanMove(
        event
      );

    if (!move) {
      return;
    }

    if (
      move.task.status ===
      move.status
    ) {
      return;
    }

    await updateTask(
      move.task.id,
      {
        status: move.status,
      }
    );
  }

  return (
    <KanbanProvider
      onDragStart={
        handleDragStart
      }
      onDragEnd={
        handleDragEnd
      }
      onDragCancel={
        handleDragCancel
      }
      overlay={
        activeTask ? (
          <div className="w-[300px] rotate-2 opacity-95">
            <KanbanTaskCard
              task={activeTask}
            />
          </div>
        ) : null
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