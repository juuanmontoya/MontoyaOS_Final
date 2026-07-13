"use client";

import { useEffect, useState } from "react";

interface TaskTitleProps {
  value: string;
  onSave: (value: string) => Promise<void>;
}

export function TaskTitle({
  value,
  onSave,
}: TaskTitleProps) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(value);

  useEffect(() => {
    setTitle(value);
  }, [value]);

  async function save() {
    const newValue = title.trim();

    if (!newValue) {
      setTitle(value);
      setEditing(false);
      return;
    }

    if (newValue !== value) {
      await onSave(newValue);
    }

    setEditing(false);
  }

  if (editing) {
    return (
      <input
        autoFocus
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onBlur={save}
        onKeyDown={async (e) => {
          if (e.key === "Enter") {
            await save();
          }

          if (e.key === "Escape") {
            setTitle(value);
            setEditing(false);
          }
        }}
        className="w-full rounded border bg-background px-2 py-1 text-sm font-medium outline-none ring-2 ring-primary"
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setEditing(true)}
      className="text-left font-medium hover:text-primary"
    >
      {value}
    </button>
  );
}