import type { Task } from "@/types/task";


export function getDashboardTasks(
  tasks: Task[],
  limit = 5
): Task[] {

  return [...tasks]
    .filter(
      (task) =>
        task.status !== "completed"
    )
    .sort((a, b) => {

      const aDate =
        a.due_date
          ? new Date(a.due_date).getTime()
          : Infinity;

      const bDate =
        b.due_date
          ? new Date(b.due_date).getTime()
          : Infinity;


      return aDate - bDate;

    })
    .slice(0, limit);
}