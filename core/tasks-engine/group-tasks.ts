import type { Task } from "@/types/task";

export interface TaskGroups {
  overdue: Task[];
  today: Task[];
  upcoming: Task[];
  noDate: Task[];
  completed: Task[];
}

function parseLocalDate(date: string) {
  const cleanDate = date.split("T")[0];

  const [year, month, day] =
    cleanDate.split("-");

  return new Date(
    Number(year),
    Number(month) - 1,
    Number(day)
  );
}

export function groupTasks(
  tasks: Task[]
): TaskGroups {
  const today = new Date();

  today.setHours(0, 0, 0, 0);

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

    const diff =
      (dueDate.getTime() - today.getTime()) /
      (1000 * 60 * 60 * 24);

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