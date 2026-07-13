"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { TaskPrioritySelect } from "./task-priority-select";
import { TaskDateSelect } from "./task-date-select";
import { TaskCategorySelect } from "./task-category-select";

import type { TaskPriority } from "@/types/task";

interface TaskQuickAddProps {
  onCreate: (data: {
    title: string;
    priority: TaskPriority;
    due_date: string | null;
    category: string | null;
  }) => Promise<void>;
}

export function TaskQuickAdd({
  onCreate,
}: TaskQuickAddProps) {
  const [title, setTitle] = useState("");

  const [priority, setPriority] =
    useState<TaskPriority>("medium");

  const [dueDate, setDueDate] =
    useState<string | null>(null);

  const [category, setCategory] =
    useState<string | null>(null);

  async function handleSubmit() {
    const cleanTitle = title.trim();

    if (!cleanTitle) return;

    await onCreate({
      title: cleanTitle,
      priority,
      due_date: dueDate,
      category,
    });

    setTitle("");
    setPriority("medium");
    setDueDate(null);
    setCategory(null);
  }

  return (
    <div className="space-y-3 rounded-xl border bg-card p-4">
      <Input
        placeholder="Nueva tarea..."
        value={title}
        onChange={(e) =>
          setTitle(e.target.value)
        }
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSubmit();
          }
        }}
      />

      <div className="flex flex-wrap items-center gap-3">
        <TaskPrioritySelect
          value={priority}
          onChange={setPriority}
        />

        <TaskDateSelect
          value={dueDate}
          onChange={setDueDate}
        />

        <TaskCategorySelect
          value={category}
          onChange={setCategory}
        />

        <Button
          onClick={handleSubmit}
          disabled={!title.trim()}
        >
          Crear tarea
        </Button>
      </div>
    </div>
  );
}