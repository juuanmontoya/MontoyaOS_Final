"use client";

import type { TaskPriority } from "@/types/task";

import { TaskPrioritySelect } from "@/components/tasks/task-priority-select";

interface ProjectTaskPriorityProps {
  value: TaskPriority;
  onChange: (
    value: TaskPriority
  ) => Promise<void>;
}

export function ProjectTaskPriority({
  value,
  onChange,
}: ProjectTaskPriorityProps) {
  return (
    <TaskPrioritySelect
      compact
      value={value}
      onChange={onChange}
    />
  );
}