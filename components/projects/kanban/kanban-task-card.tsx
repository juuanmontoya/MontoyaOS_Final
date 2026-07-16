"use client";

import { CSS } from "@dnd-kit/utilities";

import {
  useSortable,
} from "@dnd-kit/sortable";

import type { Task } from "@/types/task";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import {
  getTaskPriorityLabel,
} from "@/core/tasks-engine/priority-config";

import {
  getTaskDateLabel,
} from "@/core/tasks-engine/date-label";

interface KanbanTaskCardProps {
  task: Task;
}

export function KanbanTaskCard({
  task,
}: KanbanTaskCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,

    data: {
      type: "task",
      task,
    },
  });

  const style = {
    transform:
      CSS.Transform.toString(
        transform
      ),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <Card
        className={`space-y-3 p-4 transition-all ${
          isDragging
            ? "cursor-grabbing opacity-60 shadow-2xl"
            : "cursor-grab hover:-translate-y-1 hover:shadow-md"
        }`}
      >
        <div>
          <h3 className="font-semibold leading-tight">
            {task.title}
          </h3>

          {task.description && (
            <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
              {task.description}
            </p>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary">
            {getTaskPriorityLabel(
              task.priority
            )}
          </Badge>

          {task.due_date && (
            <Badge variant="outline">
              {getTaskDateLabel(
                task.due_date
              )}
            </Badge>
          )}
        </div>
      </Card>
    </div>
  );
}