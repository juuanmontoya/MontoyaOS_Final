"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import type { Project } from "@/types/project";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { useProjectsStore } from "@/store/project-store";

interface ProjectFormProps {
  project?: Project;
}

const DEFAULT_COLOR = "#3B82F6";
const DEFAULT_ICON = "📁";

export function ProjectForm({
  project,
}: ProjectFormProps) {
  const router = useRouter();

  const {
    createProject,
    updateProject,
  } = useProjectsStore();

  const [name, setName] = useState(
    project?.name ?? ""
  );

  const [description, setDescription] =
    useState(
      project?.description ?? ""
    );

  const [color, setColor] = useState(
    project?.color ?? DEFAULT_COLOR
  );

  const [icon, setIcon] = useState(
    project?.icon ?? DEFAULT_ICON
  );

  const [saving, setSaving] =
    useState(false);

  async function handleSubmit() {
    if (!name.trim()) return;

    setSaving(true);

    try {
      if (project) {
        await updateProject(
          project.id,
          {
            name,
            description:
              description.trim() || null,
            color,
            icon,
          }
        );
      } else {
        await createProject({
          name,
          description:
            description.trim(),
          color,
          icon,
        });
      }

      router.push("/projects");
    } finally {
      setSaving(false);
    }
  }

  return (
    <Card className="space-y-6 p-6">

      <div className="space-y-2">
        <label className="text-sm font-medium">
          Nombre
        </label>

        <Input
          placeholder="Ej. MontoyaOS"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">
          Descripción
        </label>

        <Textarea
          rows={4}
          placeholder="Describe este proyecto..."
          value={description}
          onChange={(e) =>
            setDescription(
              e.target.value
            )
          }
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">

        <div className="space-y-2">
          <label className="text-sm font-medium">
            Color
          </label>

          <Input
            type="color"
            value={color}
            onChange={(e) =>
              setColor(e.target.value)
            }
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">
            Icono
          </label>

          <Input
            maxLength={2}
            placeholder="📁"
            value={icon}
            onChange={(e) =>
              setIcon(e.target.value)
            }
          />
        </div>

      </div>

      <div className="flex justify-end">

        <Button
          onClick={handleSubmit}
          disabled={saving}
        >
          {saving
            ? "Guardando..."
            : project
            ? "Guardar cambios"
            : "Crear proyecto"}
        </Button>

      </div>

    </Card>
  );
}