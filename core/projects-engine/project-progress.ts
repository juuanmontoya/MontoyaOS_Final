import type { Task } from "@/types/task";

export interface ProjectProgress {
  total: number;
  completed: number;
  pending: number;
  percentage: number;
}

export function getProjectProgress(
  tasks: Task[]
): ProjectProgress {
  const total = tasks.length;

  const completed = tasks.filter(
    (task) => task.status === "completed"
  ).length;

  const pending = total - completed;

  const percentage =
    total === 0
      ? 0
      : Math.round(
          (completed / total) * 100
        );

  return {
    total,
    completed,
    pending,
    percentage,
  };
}