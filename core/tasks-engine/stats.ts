import type { Task } from "@/types/task";

export function getCompletedTasks(tasks: Task[]): number {
  return tasks.filter((task) => task.status === "completed").length;
}

export function getPendingTasks(tasks: Task[]): number {
  return tasks.filter((task) => task.status !== "completed").length;
}

export function getOverdueTasks(tasks: Task[]): number {
  const now = Date.now();

  return tasks.filter((task) => {
    if (!task.due_date) return false;
    if (task.status === "completed") return false;

    return new Date(task.due_date).getTime() < now;
  }).length;
}

export function getCompletionRate(tasks: Task[]): number {
  if (tasks.length === 0) return 0;

  return Math.round(
    (getCompletedTasks(tasks) / tasks.length) * 100
  );
}