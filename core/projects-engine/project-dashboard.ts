import type { Task } from "@/types/task";

export interface ProjectDashboard {
  totalTasks: number;

  completedTasks: number;

  inProgressTasks: number;

  todoTasks: number;

  cancelledTasks: number;

  overdueTasks: number;

  dueSoonTasks: number;

  completionRate: number;

  priority: {
    urgent: number;
    high: number;
    medium: number;
    low: number;
  };

  productivity: number;
}

export function getProjectDashboard(
  tasks: Task[]
): ProjectDashboard {
  const today = new Date();

  today.setHours(
    0,
    0,
    0,
    0
  );

  const inThreeDays =
    new Date(today);

  inThreeDays.setDate(
    inThreeDays.getDate() + 3
  );

  const totalTasks =
    tasks.length;

  const completedTasks =
    tasks.filter(
      (task) =>
        task.status ===
        "completed"
    ).length;

  const inProgressTasks =
    tasks.filter(
      (task) =>
        task.status ===
        "in_progress"
    ).length;

  const todoTasks =
    tasks.filter(
      (task) =>
        task.status === "todo"
    ).length;

  const cancelledTasks =
    tasks.filter(
      (task) =>
        task.status ===
        "cancelled"
    ).length;

  const overdueTasks =
    tasks.filter((task) => {
      if (
        task.status ===
          "completed" ||
        !task.due_date
      ) {
        return false;
      }

      return (
        new Date(
          task.due_date
        ) < today
      );
    }).length;

  const dueSoonTasks =
    tasks.filter((task) => {
      if (
        task.status ===
          "completed" ||
        !task.due_date
      ) {
        return false;
      }

      const due =
        new Date(
          task.due_date
        );

      return (
        due >= today &&
        due <= inThreeDays
      );
    }).length;

  const completionRate =
    totalTasks === 0
      ? 0
      : Math.round(
          (completedTasks /
            totalTasks) *
            100
        );

  const priority = {
    urgent: tasks.filter(
      (t) =>
        t.priority ===
        "urgent"
    ).length,

    high: tasks.filter(
      (t) =>
        t.priority ===
        "high"
    ).length,

    medium: tasks.filter(
      (t) =>
        t.priority ===
        "medium"
    ).length,

    low: tasks.filter(
      (t) =>
        t.priority ===
        "low"
    ).length,
  };

  const productivity =
    totalTasks === 0
      ? 0
      : Math.round(
          ((completedTasks +
            inProgressTasks *
              0.5) /
            totalTasks) *
            100
        );

  return {
    totalTasks,

    completedTasks,

    inProgressTasks,

    todoTasks,

    cancelledTasks,

    overdueTasks,

    dueSoonTasks,

    completionRate,

    priority,

    productivity,
  };
}