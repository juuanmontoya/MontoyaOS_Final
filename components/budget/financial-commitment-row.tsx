"use client";

import {
  CheckCircle2,
  Pencil,
  Trash2,
} from "lucide-react";

import type {
  FinancialCommitment,
} from "@/types/financial-plan";

interface Props {
  commitment: FinancialCommitment;
}

export function FinancialCommitmentRow({
  commitment,
}: Props) {
  return (
    <div className="rounded-xl border p-4 transition hover:border-primary/40">
      <div className="flex items-start justify-between">
        <div>
          <h4 className="font-medium">
            {commitment.name}
          </h4>

          <p className="mt-1 text-sm text-muted-foreground">
            $
            {commitment.monthly_amount.toLocaleString(
              "es-CO"
            )}
          </p>

          <p className="mt-1 text-xs text-muted-foreground">
            Vence el día{" "}
            <span className="font-medium">
              {commitment.day}
            </span>
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button className="rounded-lg p-2 transition hover:bg-muted">
            <Pencil size={16} />
          </button>

          <button className="rounded-lg p-2 transition hover:bg-muted">
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between">
        <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-700 dark:bg-amber-900/30 dark:text-amber-300">
          Pendiente
        </span>

        <button className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90">
          <CheckCircle2 size={16} />
          Registrar pago
        </button>
      </div>
    </div>
  );
}