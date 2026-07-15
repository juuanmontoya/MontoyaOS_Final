"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import type { TaskPriority } from "@/types/task";

interface TaskPrioritySelectProps {
  value: TaskPriority;
  onChange: (value: TaskPriority) => void;
  compact?: boolean;
}

const PRIORITIES: {
  value: TaskPriority;
  label: string;
}[] = [
  {
    value: "low",
    label: "⚪ Baja",
  },
  {
    value: "medium",
    label: "🔵 Media",
  },
  {
    value: "high",
    label: "🟠 Alta",
  },
  {
    value: "urgent",
    label: "🔴 Urgente",
  },
];

export function TaskPrioritySelect({
  value,
  onChange,
  compact = false,
}: TaskPrioritySelectProps) {
  return (
    <Select
      value={value}
      onValueChange={(value) =>
        onChange(value as TaskPriority)
      }
    >
      <SelectTrigger
        className={
          compact
            ? "h-8 w-[150px]"
            : "w-[150px]"
        }
      >
        <SelectValue />
      </SelectTrigger>

      <SelectContent>
        {PRIORITIES.map((priority) => (
          <SelectItem
            key={priority.value}
            value={priority.value}
          >
            {priority.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}