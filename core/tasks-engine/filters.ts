import type { Task, TaskPriority, TaskStatus } from "@/types/task";

export function getTasksByStatus(
  tasks: Task[],
  status: TaskStatus
): Task[] {
  return tasks.filter((task) => task.status === status);
}

export function getTasksByPriority(
  tasks: Task[],
  priority: TaskPriority
): Task[] {
  return tasks.filter((task) => task.priority === priority);
}

export function getTasksByCategory(
  tasks: Task[],
  category: string
): Task[] {
  return tasks.filter((task) => task.category === category);
}

export function getTasksByTag(
  tasks: Task[],
  tag: string
): Task[] {
  return tasks.filter((task) => task.tags.includes(tag));
}