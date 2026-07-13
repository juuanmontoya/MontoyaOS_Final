import type { TaskPriority } from "@/types/task";

export interface TaskPriorityConfig {
  value: TaskPriority;
  label: string;
  emoji: string;
}

export const TASK_PRIORITIES: TaskPriorityConfig[] = [
  {
    value: "urgent",
    label: "Urgente",
    emoji: "🔴",
  },
  {
    value: "high",
    label: "Alta",
    emoji: "🟠",
  },
  {
    value: "medium",
    label: "Media",
    emoji: "🔵",
  },
  {
    value: "low",
    label: "Baja",
    emoji: "⚪",
  },
];

export function getTaskPriorityLabel(
  priority: TaskPriority
) {
  const config =
    TASK_PRIORITIES.find(
      (item) =>
        item.value === priority
    );

  if (!config) {
    return priority;
  }

  return `${config.emoji} ${config.label}`;
}