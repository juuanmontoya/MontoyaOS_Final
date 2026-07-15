"use client";

import type { Task } from "@/types/task";

import { KanbanTaskCard } from "./kanban-task-card";

interface KanbanColumnProps {
  title: string;
  tasks: Task[];
}

export function KanbanColumn({
  title,
  tasks,
}: KanbanColumnProps) {
  return (
    <div className="flex min-w-[320px] flex-col rounded-xl border bg-muted/30">

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

      <div className="flex flex-1 flex-col gap-3 p-4">

        {tasks.length === 0 ? (

          <div className="rounded-lg border border-dashed py-10 text-center text-sm text-muted-foreground">
            Sin tareas
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

    </div>
  );
}