"use client";

import { ReactNode } from "react";

import {
  DndContext,
  PointerSensor,
  KeyboardSensor,
  closestCorners,
  useSensor,
  useSensors,
  DragOverlay,
  type DragEndEvent,
  type DragStartEvent,
  type DragCancelEvent,
} from "@dnd-kit/core";

import {
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";

interface KanbanProviderProps {
  children: ReactNode;

  onDragStart?: (
    event: DragStartEvent
  ) => void;

  onDragEnd: (
    event: DragEndEvent
  ) => void;

  onDragCancel?: (
    event: DragCancelEvent
  ) => void;

  overlay?: ReactNode;
}

export function KanbanProvider({
  children,
  onDragStart,
  onDragEnd,
  onDragCancel,
  overlay,
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
      onDragStart={
        onDragStart
      }
      onDragEnd={onDragEnd}
      onDragCancel={
        onDragCancel
      }
    >
      {children}

      <DragOverlay>
        {overlay}
      </DragOverlay>
    </DndContext>
  );
}