"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  Archive,
  FolderOpen,
  MoreVertical,
  Pencil,
  Trash2,
} from "lucide-react";

import type { Project } from "@/types/project";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useProjectsStore } from "@/store/project-store";

interface ProjectActionsProps {
  project: Project;
}

export function ProjectActions({
  project,
}: ProjectActionsProps) {
  const router = useRouter();

  const {
    updateProject,
    deleteProject,
  } = useProjectsStore();

  async function handleToggleStatus() {
    const archived =
      project.status === "archived";

    const confirmed =
      window.confirm(
        archived
          ? "¿Reactivar este proyecto?"
          : "¿Archivar este proyecto?"
      );

    if (!confirmed) return;

    await updateProject(
      project.id,
      {
        status: archived
          ? "active"
          : "archived",
      }
    );

    router.refresh();
  }

  async function handleDelete() {
    const confirmed =
      window.confirm(
        "Esta acción eliminará el proyecto permanentemente. ¿Continuar?"
      );

    if (!confirmed) return;

    await deleteProject(project.id);

    router.push("/projects");
  }

  return (
    <DropdownMenu>

      <DropdownMenuTrigger
        asChild
      >
        <Button
          size="icon"
          variant="outline"
        >
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">

        <DropdownMenuItem
          asChild
        >
          <Link
            href={`/projects/${project.id}/edit`}
          >
            <Pencil className="mr-2 h-4 w-4" />
            Editar
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={
            handleToggleStatus
          }
        >
          {project.status ===
          "active" ? (
            <>
              <Archive className="mr-2 h-4 w-4" />
              Archivar
            </>
          ) : (
            <>
              <FolderOpen className="mr-2 h-4 w-4" />
              Reactivar
            </>
          )}
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="text-destructive"
          onClick={handleDelete}
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Eliminar
        </DropdownMenuItem>

      </DropdownMenuContent>

    </DropdownMenu>
  );
}