"use client";

interface TaskDateSelectProps {
  value: string | null;
  onChange: (value: string | null) => void;
}

export function TaskDateSelect({
  value,
  onChange,
}: TaskDateSelectProps) {
  return (
    <input
      type="date"
      value={value ?? ""}
      onChange={(e) =>
        onChange(
          e.target.value || null
        )
      }
      className="h-10 rounded-md border bg-background px-3 text-sm"
    />
  );
}