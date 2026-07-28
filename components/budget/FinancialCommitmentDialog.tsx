"use client";

import { useState } from "react";

import { toast } from "sonner";

import { BudgetEditor } from "./budget-editor";

import { useBudgetStore } from "@/store/budget-store";

import type {
  CreateFinancialCommitmentInput,
} from "@/types/financial-plan";

interface Props {
  categoryId: string;

  trigger: React.ReactNode;
}

export function FinancialCommitmentDialog({
  categoryId,
  trigger,
}: Props) {
  const [open, setOpen] =
    useState(false);

  const createBudget =
    useBudgetStore(
      (state) => state.createBudget
    );

  async function handleSubmit(
    data: CreateFinancialCommitmentInput
  ) {
    await createBudget(data);

    toast.success(
      "Compromiso creado correctamente."
    );

    setOpen(false);
  }

  return (
    <>
      <div
        onClick={() => setOpen(true)}
      >
        {trigger}
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">

          <div className="w-full max-w-lg rounded-3xl bg-background p-6 shadow-xl">

            <h2 className="mb-6 text-2xl font-bold">
              Nuevo compromiso
            </h2>

            <BudgetEditor
              categoryId={categoryId}
              submitLabel="Guardar compromiso"
              onSubmit={handleSubmit}
            />

            <button
              onClick={() =>
                setOpen(false)
              }
              className="mt-4 w-full rounded-xl border p-3 font-medium"
            >
              Cancelar
            </button>

          </div>

        </div>
      )}
    </>
  );
}