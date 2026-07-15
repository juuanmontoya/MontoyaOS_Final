"use client";

import { useEffect, useState } from "react";

import {
  CheckCircle2,
  Circle,
  Pencil,
} from "lucide-react";

import type {
  Task,
  TaskPriority,
  TaskStatus,
} from "@/types/task";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useTasksStore } from "@/store/tasks-store";

import { ProjectTaskPriority } from "./project-task-priority";
import { ProjectTaskStatus } from "./project-task-status";
import { ProjectTaskDate } from "./project-task-date";

interface ProjectTaskCardProps {
  task: Task;

  onToggleComplete: (
    id: string
  ) => Promise<void>;
}

export function ProjectTaskCard({
  task,
  onToggleComplete,
}: ProjectTaskCardProps) {
  const completed =
    task.status === "completed";

  const { updateTask } =
    useTasksStore();

  const [editing, setEditing] =
    useState(false);

  const [title, setTitle] =
    useState(task.title);

  useEffect(() => {
    setTitle(task.title);
  }, [task.title]);

  async function saveTitle() {
    const clean =
      title.trim();

    if (
      !clean ||
      clean === task.title
    ) {
      setTitle(task.title);
      setEditing(false);
      return;
    }

    await updateTask(task.id, {
      title: clean,
    });

    setEditing(false);
  }

  function cancelEdit() {
    setTitle(task.title);
    setEditing(false);
  }

  async function changePriority(
    priority: TaskPriority
  ) {
    await updateTask(task.id, {
      priority,
    });
  }

  async function changeStatus(
    status: TaskStatus
  ) {
    await updateTask(task.id, {
      status,
      completed_at:
        status === "completed"
          ? new Date().toISOString()
          : null,
    });
  }

  async function changeDate(
    due_date: string | null
  ) {
    await updateTask(task.id, {
      due_date,
    });
  }

  return (
    <div className="rounded-xl border p-4 transition-all hover:border-primary hover:shadow-md">

      <div className="flex items-start gap-4">

        <Button
          size="icon"
          variant="ghost"
          className="mt-0.5 h-8 w-8 rounded-full"
          onClick={() =>
            onToggleComplete(task.id)
          }
        >
          {completed ? (
            <CheckCircle2 className="h-5 w-5 text-green-600" />
          ) : (
            <Circle className="h-5 w-5" />
          )}
        </Button>

        <div className="flex-1">

          {editing ? (
            <Input
              autoFocus
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
              onBlur={saveTitle}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  saveTitle();
                }

                if (e.key === "Escape") {
                  cancelEdit();
                }
              }}
            />
          ) : (
            <div className="flex items-center gap-2">

              <p
                className={
                  completed
                    ? "font-semibold line-through text-muted-foreground"
                    : "font-semibold"
                }
              >
                {task.title}
              </p>

              <Button
                size="icon"
                variant="ghost"
                className="h-7 w-7"
                onClick={() =>
                  setEditing(true)
                }
              >
                <Pencil className="h-4 w-4" />
              </Button>

            </div>
          )}

          <div className="mt-3 flex flex-wrap items-center gap-2">

            <ProjectTaskPriority
              value={task.priority}
              onChange={changePriority}
            />

            <ProjectTaskStatus
              value={task.status}
              onChange={changeStatus}
            />

            <ProjectTaskDate
              value={task.due_date}
              onChange={changeDate}
            />

          </div>

        </div>

      </div>

    </div>
  );
}