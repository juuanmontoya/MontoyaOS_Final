import type { Task } from "@/types/task";

export interface ChartItem {
  name: string;
  value: number;
}

export interface WeeklyItem {
  day: string;
  completed: number;
  created: number;
}

export interface ProjectCharts {
  status: ChartItem[];

  priority: ChartItem[];

  dueDates: ChartItem[];

  weekly: WeeklyItem[];
}

export function getProjectCharts(
  tasks: Task[]
): ProjectCharts {
  const today = new Date();

  today.setHours(
    0,
    0,
    0,
    0
  );

  const tomorrow =
    new Date(today);

  tomorrow.setDate(
    tomorrow.getDate() + 1
  );

  const nextWeek =
    new Date(today);

  nextWeek.setDate(
    nextWeek.getDate() + 7
  );

  const status: ChartItem[] = [
    {
      name: "Por hacer",
      value: tasks.filter(
        (t) =>
          t.status === "todo"
      ).length,
    },
    {
      name: "En progreso",
      value: tasks.filter(
        (t) =>
          t.status ===
          "in_progress"
      ).length,
    },
    {
      name: "Completadas",
      value: tasks.filter(
        (t) =>
          t.status ===
          "completed"
      ).length,
    },
    {
      name: "Canceladas",
      value: tasks.filter(
        (t) =>
          t.status ===
          "cancelled"
      ).length,
    },
  ];

  const priority: ChartItem[] = [
    {
      name: "Urgente",
      value: tasks.filter(
        (t) =>
          t.priority ===
          "urgent"
      ).length,
    },
    {
      name: "Alta",
      value: tasks.filter(
        (t) =>
          t.priority ===
          "high"
      ).length,
    },
    {
      name: "Media",
      value: tasks.filter(
        (t) =>
          t.priority ===
          "medium"
      ).length,
    },
    {
      name: "Baja",
      value: tasks.filter(
        (t) =>
          t.priority ===
          "low"
      ).length,
    },
  ];

  const dueDates: ChartItem[] = [
    {
      name: "Hoy",
      value: tasks.filter(
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
      ).length,
    },
    {
      name: "Próx. 7 días",
      value: tasks.filter(
        (task) => {
          if (!task.due_date)
            return false;

          const due =
            new Date(
              task.due_date
            );

          return (
            due > tomorrow &&
            due <= nextWeek
          );
        }
      ).length,
    },
    {
      name: "Sin fecha",
      value: tasks.filter(
        (t) =>
          !t.due_date
      ).length,
    },
  ];

  const weekly: WeeklyItem[] =
    Array.from({
      length: 7,
    }).map((_, index) => {
      const day =
        new Date();

      day.setDate(
        day.getDate() -
          (6 - index)
      );

      day.setHours(
        0,
        0,
        0,
        0
      );

      const next =
        new Date(day);

      next.setDate(
        next.getDate() + 1
      );

      return {
        day:
          day.toLocaleDateString(
            "es-CO",
            {
              weekday:
                "short",
            }
          ),

        created:
          tasks.filter(
            (task) => {
              const created =
                new Date(
                  task.created_at
                );

              return (
                created >= day &&
                created <
                  next
              );
            }
          ).length,

        completed:
          tasks.filter(
            (task) => {
              if (
                !task.completed_at
              )
                return false;

              const completed =
                new Date(
                  task.completed_at
                );

              return (
                completed >=
                  day &&
                completed <
                  next
              );
            }
          ).length,
      };
    });

  return {
    status,
    priority,
    dueDates,
    weekly,
  };
}