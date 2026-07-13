"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  TASK_CATEGORIES,
} from "@/core/tasks-engine/category-config";

interface TaskCategorySelectProps {
  value: string | null;
  onChange: (value: string | null) => void;
}

export function TaskCategorySelect({
  value,
  onChange,
}: TaskCategorySelectProps) {
  return (
    <Select
      value={value ?? ""}
      onValueChange={(selected) =>
        onChange(selected || null)
      }
    >
      <SelectTrigger className="w-[150px]">
        <SelectValue placeholder="Categoría" />
      </SelectTrigger>

      <SelectContent>
        {TASK_CATEGORIES.map((category) => (
          <SelectItem
            key={category.value}
            value={category.value}
          >
            {category.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}