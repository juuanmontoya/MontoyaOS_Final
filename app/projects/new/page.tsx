"use client";

import { ArrowLeft, FolderKanban } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

import { ProjectForm } from "@/components/projects/forms/project-form";

export default function NewProjectPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <header className="space-y-4">
        <Button
          asChild
          variant="ghost"
          className="w-fit"
        >
          <Link href="/projects">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a proyectos
          </Link>
        </Button>

        <div className="flex items-center gap-3">
          <FolderKanban className="h-8 w-8" />

          <div>
            <h1 className="text-3xl font-bold">
              Nuevo Proyecto
            </h1>

            <p className="text-muted-foreground">
              Crea un proyecto para organizar tus tareas.
            </p>
          </div>
        </div>
      </header>

      <ProjectForm />
    </div>
  );
}