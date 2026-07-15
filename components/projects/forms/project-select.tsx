"use client";

import { useEffect } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useProjectsStore } from "@/store/project-store";

interface ProjectSelectProps {
  value: string | null;
  onChange: (
    value: string | null
  ) => void;
}

export function ProjectSelect({
  value,
  onChange,
}: ProjectSelectProps) {
  const {
    projects,
    loadProjects,
  } = useProjectsStore();

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  return (
    <Select
      value={value ?? "none"}
      onValueChange={(value) =>
        onChange(
          value === "none"
            ? null
            : value
        )
      }
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Proyecto" />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="none">
          Sin proyecto
        </SelectItem>

        {projects.map((project) => (
          <SelectItem
            key={project.id}
            value={project.id}
          >
            {project.icon} {project.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}