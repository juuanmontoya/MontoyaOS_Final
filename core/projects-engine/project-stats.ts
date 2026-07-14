import type { Project } from "@/types/project";
import type { Task } from "@/types/task";

import {
  getProjectProgress,
} from "./project-progress";

export interface ProjectStats {
  project: Project;

  totalTasks: number;
  completedTasks: number;
  pendingTasks: number;

  completionRate: number;

  overdueTasks: number;
  dueTodayTasks: number;
}

export function getProjectStats(
  project: Project,
  tasks: Task[]
): ProjectStats {
  const projectTasks =
    tasks.filter(
      (task) =>
        task.project_id === project.id
    );

  const progress =
    getProjectProgress(
      projectTasks
    );

  const today = new Date();

  today.setHours(
    0,
    0,
    0,
    0
  );

  const overdueTasks =
    projectTasks.filter(
      (task) => {
        if (
          task.status ===
          "completed"
        )
          return false;

        if (!task.due_date)
          return false;

        return (
          new Date(
            task.due_date
          ) < today
        );
      }
    ).length;

  const dueTodayTasks =
    projectTasks.filter(
      (task) => {
        if (!task.due_date)
          return false;

        const due =
          new Date(
            task.due_date
          );

        due.setHours(
          0,
          0,
          0,
          0
        );

        return (
          due.getTime() ===
          today.getTime()
        );
      }
    ).length;

  return {
    project,

    totalTasks:
      progress.total,

    completedTasks:
      progress.completed,

    pendingTasks:
      progress.pending,

    completionRate:
      progress.percentage,

    overdueTasks,

    dueTodayTasks,
  };
}