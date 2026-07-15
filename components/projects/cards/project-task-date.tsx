"use client";

import { Input } from "@/components/ui/input";

interface ProjectTaskDateProps {
  value: string | null;

  onChange: (
    value: string | null
  ) => Promise<void>;
}

export function ProjectTaskDate({
  value,
  onChange,
}: ProjectTaskDateProps) {
  return (
    <Input
      className="h-8 w-[170px]"
      type="date"
      value={value ?? ""}
      onChange={(e) =>
        onChange(
          e.target.value || null
        )
      }
    />
  );
}