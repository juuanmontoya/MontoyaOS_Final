import type { Task } from "@/types/task";

export function sortByDueDate(tasks: Task[]): Task[] {
  return [...tasks].sort((a, b) => {
    if (!a.due_date) return 1;
    if (!b.due_date) return -1;

    return (
      new Date(a.due_date).getTime() -
      new Date(b.due_date).getTime()
    );
  });
}

const priorityWeight = {
  urgent: 4,
  high: 3,
  medium: 2,
  low: 1,
};

export function sortByPriority(tasks: Task[]): Task[] {
  return [...tasks].sort(
    (a, b) =>
      priorityWeight[b.priority] - priorityWeight[a.priority]
  );
}

export function sortByCreatedDate(tasks: Task[]): Task[] {
  return [...tasks].sort(
    (a, b) =>
      new Date(b.created_at).getTime() -
      new Date(a.created_at).getTime()
  );
}