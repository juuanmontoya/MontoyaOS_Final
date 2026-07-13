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
}

const PRIORITIES: {
  value: TaskPriority;
  label: string;
}[] = [
  {
    value: "low",
    label: "Baja",
  },
  {
    value: "medium",
    label: "Media",
  },
  {
    value: "high",
    label: "Alta",
  },
  {
    value: "urgent",
    label: "Urgente",
  },
];

export function TaskPrioritySelect({
  value,
  onChange,
}: TaskPrioritySelectProps) {
  return (
    <Select
      value={value}
      onValueChange={onChange}
    >
      <SelectTrigger className="w-[130px]">
        <SelectValue placeholder="Prioridad" />
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