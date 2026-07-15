"use client";

import type { TaskStatus } from "@/types/task";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ProjectTaskStatusProps {
  value: TaskStatus;

  onChange: (
    value: TaskStatus
  ) => Promise<void>;
}

const STATUS = [
  {
    value: "todo",
    label: "📋 Pendiente",
  },
  {
    value: "in_progress",
    label: "🚀 En progreso",
  },
  {
    value: "completed",
    label: "✅ Completada",
  },
  {
    value: "cancelled",
    label: "❌ Cancelada",
  },
] satisfies {
  value: TaskStatus;
  label: string;
}[];

export function ProjectTaskStatus({
  value,
  onChange,
}: ProjectTaskStatusProps) {
  return (
    <Select
      value={value}
      onValueChange={(value) =>
        onChange(value as TaskStatus)
      }
    >
      <SelectTrigger className="h-8 w-[170px]">
        <SelectValue />
      </SelectTrigger>

      <SelectContent>
        {STATUS.map((status) => (
          <SelectItem
            key={status.value}
            value={status.value}
          >
            {status.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}