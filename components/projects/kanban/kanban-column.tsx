"use client";

import {
  useDroppable,
} from "@dnd-kit/core";

import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import type {
  Task,
  TaskStatus,
} from "@/types/task";

import { KanbanTaskCard } from "./kanban-task-card";

interface KanbanColumnProps {
  title: string;
  status: TaskStatus;
  tasks: Task[];
}

export function KanbanColumn({
  title,
  status,
  tasks,
}: KanbanColumnProps) {
  const {
    setNodeRef,
    isOver,
  } = useDroppable({
    id: status,
  });

  return (
    <div
      ref={setNodeRef}
      className={`flex min-w-[320px] flex-col rounded-xl border transition-colors ${
        isOver
          ? "border-primary bg-primary/5"
          : "bg-muted/30"
      }`}
    >
      <div className="border-b p-4">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold">
            {title}
          </h2>

          <span className="rounded-full bg-background px-2 py-1 text-xs font-medium">
            {tasks.length}
          </span>
        </div>
      </div>

      <SortableContext
        items={tasks.map(
          (task) => task.id
        )}
        strategy={
          verticalListSortingStrategy
        }
      >
        <div className="flex flex-1 flex-col gap-3 p-4">
          {tasks.length === 0 ? (
            <div
              className={`rounded-lg border border-dashed py-10 text-center text-sm transition-colors ${
                isOver
                  ? "border-primary bg-primary/10"
                  : "text-muted-foreground"
              }`}
            >
              Suelta una tarea aquí
            </div>
          ) : (
            tasks.map((task) => (
              <KanbanTaskCard
                key={task.id}
                task={task}
              />
            ))
          )}
        </div>
      </SortableContext>
    </div>
  );
}