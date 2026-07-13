"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  useTasksStore,
  type TaskFilter,
} from "@/store/tasks-store";

const FILTERS: {
  label: string;
  value: TaskFilter;
}[] = [
  {
    label: "Todas",
    value: "all",
  },
  {
    label: "Pendientes",
    value: "pending",
  },
  {
    label: "Hoy",
    value: "today",
  },
  {
    label: "Vencidas",
    value: "overdue",
  },
  {
    label: "Completadas",
    value: "completed",
  },
];

export function TaskFilters() {
  const {
    activeFilter,
    setFilter,
    tasks,
  } = useTasksStore();

  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div className="flex flex-wrap gap-2">
        {FILTERS.map((filter) => (
          <Button
            key={filter.value}
            variant={
              activeFilter === filter.value
                ? "default"
                : "outline"
            }
            size="sm"
            onClick={() =>
              setFilter(filter.value)
            }
          >
            {filter.label}
          </Button>
        ))}
      </div>

      <Badge variant="secondary">
        {tasks.length} tareas
      </Badge>
    </div>
  );
}