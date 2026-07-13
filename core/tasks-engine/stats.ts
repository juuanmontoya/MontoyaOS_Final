import type { Task } from "@/types/task";

import {
  parseLocalDate,
  startOfToday,
} from "./date-utils";

export function getCompletedTasks(
  tasks: Task[]
): number {
  return tasks.filter(
    (task) => task.status === "completed"
  ).length;
}

export function getPendingTasks(
  tasks: Task[]
): number {
  return tasks.filter(
    (task) => task.status !== "completed"
  ).length;
}

export function getOverdueTasks(
  tasks: Task[]
): number {
  const today = startOfToday();

  return tasks.filter((task) => {
    if (!task.due_date) return false;

    if (task.status === "completed") {
      return false;
    }

    const dueDate = parseLocalDate(
      task.due_date
    );

    dueDate.setHours(0, 0, 0, 0);

    return dueDate < today;
  }).length;
}

export function getCompletionRate(
  tasks: Task[]
): number {
  if (tasks.length === 0) {
    return 0;
  }

  return Math.round(
    (getCompletedTasks(tasks) /
      tasks.length) *
      100
  );
}