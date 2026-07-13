"use client";

import { useState } from "react";

import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

import { getTaskDateLabel } from "@/core/tasks-engine/date-label";

import { TaskTitle } from "./task-title";
import { TaskActions } from "./task-actions";

import type { Task } from "@/types/task";

import {
  getTaskPriorityLabel,
} from "@/core/tasks-engine/priority-config";

import {
  getTaskCategoryLabel,
} from "@/core/tasks-engine/category-config";

interface TaskCardProps {
  task: Task;
  onToggleComplete: (id: string) => void;

  onUpdate: (
    id: string,
    updates: {
      title?: string;
    }
  ) => Promise<void>;

  onDelete: (id: string) => Promise<void>;
}


export function TaskCard({
  task,
  onToggleComplete,
  onUpdate,
  onDelete,
}: TaskCardProps) {
  const [editing, setEditing] = useState(false);

  const dateLabel = getTaskDateLabel(task.due_date);

  return (
    <div className="group rounded-xl border bg-card p-4 transition-all hover:border-primary/30 hover:shadow-sm">
      <div className="flex items-start gap-4">
        <Checkbox
          checked={task.status === "completed"}
          onCheckedChange={() =>
            onToggleComplete(task.id)
          }
        />

        <div className="min-w-0 flex-1 space-y-3">
          <div className="flex items-start justify-between gap-4">
            <TaskTitle
              value={task.title}
              onSave={async (title) => {
                await onUpdate(task.id, {
                  title,
                });
              }}
            />

            <div className="flex items-center gap-2">
              <Badge variant="secondary">
  {getTaskPriorityLabel(task.priority)}
</Badge>

              <TaskActions
                onEdit={() => setEditing(true)}
                onDelete={() =>
                  onDelete(task.id)
                }
              />
            </div>
          </div>

          {task.description && (
            <p className="text-sm text-muted-foreground">
              {task.description}
            </p>
          )}

          <div className="flex flex-wrap gap-2">
            <Badge
  variant={
    task.status === "completed"
      ? "secondary"
      : "outline"
  }
>
  {task.status === "completed"
    ? "✅ Completada"
    : "⏳ Pendiente"}
</Badge>

            {task.category && (
  <Badge variant="outline">
    {getTaskCategoryLabel(task.category)}
  </Badge>
)}

            {dateLabel && (
              <Badge variant="outline">
                📅 {dateLabel}
              </Badge>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}