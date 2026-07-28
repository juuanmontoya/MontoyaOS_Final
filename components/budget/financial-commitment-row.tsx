"use client";

import { Pencil, Trash2 } from "lucide-react";

interface Props {
  name: string;
  amount: number;
  covered?: number;
}

export function FinancialCommitmentRow({
  name,
  amount,
  covered = 0,
}: Props) {
  const progress =
    amount === 0
      ? 0
      : Math.min(
          (covered / amount) * 100,
          100
        );

  return (
    <div className="rounded-xl border p-4 transition hover:border-primary/40">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="font-medium">
            {name}
          </h4>

          <p className="text-sm text-muted-foreground">
            Necesitas cubrir $
            {amount.toLocaleString(
              "es-CO"
            )}
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

      <div className="mt-4 h-2 overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-primary transition-all"
          style={{
            width: `${progress}%`,
          }}
        />
      </div>

      <div className="mt-2 flex justify-between text-xs text-muted-foreground">
        <span>
          Cubierto $
          {covered.toLocaleString(
            "es-CO"
          )}
        </span>

        <span>
          {progress.toFixed(0)}%
        </span>
      </div>
    </div>
  );
}