"use client";

import { Bell, BellOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  isoToLocalDateTime,
  localDateTimeToISO,
} from "@/core/tasks-engine/reminder";

interface TaskReminderSelectProps {
  value: string | null;
  onChange: (value: string | null) => void;
}

export function TaskReminderSelect({
  value,
  onChange,
}: TaskReminderSelectProps) {
  function handleToggle() {
    if (value) {
      onChange(null);
      return;
    }

    onChange(new Date().toISOString());
  }

  return (
    <div className="flex items-center gap-2">
      <Button
        type="button"
        variant={
          value ? "default" : "outline"
        }
        size="icon"
        onClick={handleToggle}
      >
        {value ? (
          <Bell className="h-4 w-4" />
        ) : (
          <BellOff className="h-4 w-4" />
        )}
      </Button>

      {value && (
        <Input
          type="datetime-local"
          value={isoToLocalDateTime(
            value
          )}
          onChange={(e) =>
            onChange(
              localDateTimeToISO(
                e.target.value
              )
            )
          }
          className="w-[220px]"
        />
      )}
    </div>
  );
}