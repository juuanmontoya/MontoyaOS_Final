"use client";

import { useEffect } from "react";

import Link from "next/link";
import { useParams } from "next/navigation";

import {
  ArrowLeft,
  Pencil,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import { ProjectForm } from "@/components/projects/forms/project-form";

import { useProjectsStore } from "@/store/project-store";

export default function EditProjectPage() {
  const params = useParams();

  const projectId =
    params.id as string;

  const {
    projects,
    loadProjects,
  } = useProjectsStore();

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  const project = projects.find(
    (project) =>
      project.id === projectId
  );

  if (!project) {
    return (
      <div className="py-20 text-center">
        Proyecto no encontrado.
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-8">

      <Button
        asChild
        variant="ghost"
        className="w-fit"
      >
        <Link
          href={`/projects/${project.id}`}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver al proyecto
        </Link>
      </Button>

      <div className="flex items-center gap-3">

        <Pencil className="h-8 w-8" />

        <div>

          <h1 className="text-3xl font-bold">
            Editar Proyecto
          </h1>

          <p className="text-muted-foreground">
            Actualiza la información
            del proyecto.
          </p>

        </div>

      </div>

      <ProjectForm
        project={project}
      />

    </div>
  );
}