import type { Task } from "@/types/task";

import { groupTasks } from "./group-tasks";


export interface TasksSummary {
  total: number;
  pending: number;
  overdue: number;
  today: number;
}


export function getTasksSummary(
  tasks: Task[]
): TasksSummary {

  const groups =
    groupTasks(tasks);


  return {
    total: tasks.length,

    pending:
      tasks.filter(
        (task) =>
          task.status !== "completed"
      ).length,

    overdue:
      groups.overdue.length,

    today:
      groups.today.length,
  };
}