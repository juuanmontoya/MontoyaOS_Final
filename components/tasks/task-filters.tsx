"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { useTasksStore } from "@/store/tasks-store";

import type { TaskFilter } from "@/core/tasks-engine/filters";

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
    getFilteredTasks,
  } = useTasksStore();

  const total = getFilteredTasks().length;

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
        {total} tareas
      </Badge>
    </div>
  );
}