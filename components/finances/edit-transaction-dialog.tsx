"use client";

import { useState } from "react";

import { Pencil } from "lucide-react";
import { toast } from "sonner";

import { TransactionEditor } from "@/components/finances/transaction-editor";

import { useFinanceStore } from "@/store/finance-store";

import type { Transaction } from "@/types/finance";

interface Props {
  transaction: Transaction;
}

export function EditTransactionDialog({
  transaction,
}: Props) {
  const [open, setOpen] =
    useState(false);

  const editTransaction =
    useFinanceStore(
      (state) => state.editTransaction
    );

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700"
      >
        <Pencil size={16} />
        Editar
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-xl">
            <h2 className="mb-5 text-2xl font-bold">
              Editar movimiento
            </h2>

            <TransactionEditor
              initialValues={{
                description:
                  transaction.description,
                amount:
                  transaction.amount,
                type: transaction.type,
                category_id:
                  transaction.category_id,
                account_type:
                  transaction.account_type,
              }}
              submitLabel="Guardar cambios"
              onSubmit={async (data) => {
                await editTransaction(
                  transaction.id,
                  data
                );

                toast.success(
                  "Movimiento actualizado correctamente"
                );

                setOpen(false);
              }}
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