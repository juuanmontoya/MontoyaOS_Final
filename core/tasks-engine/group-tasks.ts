import type { Task } from "@/types/task";

import {
  diffInDays,
  parseLocalDate,
  startOfToday,
} from "./date-utils";

export interface TaskGroups {
  overdue: Task[];
  today: Task[];
  upcoming: Task[];
  noDate: Task[];
  completed: Task[];
}

export function groupTasks(
  tasks: Task[]
): TaskGroups {
  const today = startOfToday();

  const groups: TaskGroups = {
    overdue: [],
    today: [],
    upcoming: [],
    noDate: [],
    completed: [],
  };

  for (const task of tasks) {
    if (task.status === "completed") {
      groups.completed.push(task);
      continue;
    }

    if (!task.due_date) {
      groups.noDate.push(task);
      continue;
    }

    const dueDate = parseLocalDate(
      task.due_date
    );

    dueDate.setHours(0, 0, 0, 0);

    const diff = diffInDays(
      today,
      dueDate
    );

    if (diff < 0) {
      groups.overdue.push(task);
    } else if (diff === 0) {
      groups.today.push(task);
    } else {
      groups.upcoming.push(task);
    }
  }

  return groups;
}