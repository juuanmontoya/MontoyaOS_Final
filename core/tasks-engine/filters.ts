import type {
  Task,
  TaskPriority,
  TaskStatus,
} from "@/types/task";

import { groupTasks } from "./group-tasks";

export type TaskFilter =
  | "all"
  | "pending"
  | "today"
  | "overdue"
  | "completed";

export function getTasksByStatus(
  tasks: Task[],
  status: TaskStatus
): Task[] {
  return tasks.filter(
    (task) => task.status === status
  );
}

export function getTasksByPriority(
  tasks: Task[],
  priority: TaskPriority
): Task[] {
  return tasks.filter(
    (task) => task.priority === priority
  );
}

export function getTasksByCategory(
  tasks: Task[],
  category: string
): Task[] {
  return tasks.filter(
    (task) => task.category === category
  );
}

export function getTasksByTag(
  tasks: Task[],
  tag: string
): Task[] {
  return tasks.filter((task) =>
    task.tags.includes(tag)
  );
}

export function getTasksByFilter(
  tasks: Task[],
  filter: TaskFilter
): Task[] {
  if (filter === "all") {
    return tasks;
  }

  const groups = groupTasks(tasks);

  switch (filter) {
    case "pending":
      return [
        ...groups.overdue,
        ...groups.today,
        ...groups.upcoming,
        ...groups.noDate,
      ];

    case "today":
      return groups.today;

    case "overdue":
      return groups.overdue;

    case "completed":
      return groups.completed;

    default:
      return tasks;
  }
}