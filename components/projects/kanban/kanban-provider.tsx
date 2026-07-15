"use client";

import {
  DndContext,
  PointerSensor,
  KeyboardSensor,
  closestCorners,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";

import {
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";

import { ReactNode } from "react";

interface KanbanProviderProps {
  children: ReactNode;

  onDragEnd: (
    event: DragEndEvent
  ) => void;
}

export function KanbanProvider({
  children,
  onDragEnd,
}: KanbanProviderProps) {
  const sensors = useSensors(
    useSensor(
      PointerSensor,
      {
        activationConstraint: {
          distance: 6,
        },
      }
    ),

    useSensor(
      KeyboardSensor,
      {
        coordinateGetter:
          sortableKeyboardCoordinates,
      }
    )
  );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={
        closestCorners
      }
      onDragEnd={onDragEnd}
    >
      {children}
    </DndContext>
  );
}