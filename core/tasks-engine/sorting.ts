import type { Task } from "@/types/task";

import { parseLocalDate } from "./date-utils";
import { TASK_PRIORITY_WEIGHT } from "./priorities";

export function sortByDueDate(
  tasks: Task[]
): Task[] {
  return [...tasks].sort((a, b) => {
    if (!a.due_date) return 1;
    if (!b.due_date) return -1;

    return (
      parseLocalDate(a.due_date).getTime() -
      parseLocalDate(b.due_date).getTime()
    );
  });
}

export function sortByPriority(
  tasks: Task[]
): Task[] {
  return [...tasks].sort(
    (a, b) =>
      TASK_PRIORITY_WEIGHT[b.priority] -
      TASK_PRIORITY_WEIGHT[a.priority]
  );
}

export function sortByCreatedDate(
  tasks: Task[]
): Task[] {
  return [...tasks].sort(
    (a, b) =>
      new Date(b.created_at).getTime() -
      new Date(a.created_at).getTime()
  );
}