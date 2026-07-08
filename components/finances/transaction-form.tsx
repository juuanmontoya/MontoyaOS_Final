"use client";

import { useFinanceStore } from "@/store/finance-store";
import { TransactionEditor } from "@/components/finances/transaction-editor";

export function TransactionForm() {
  const createTransaction = useFinanceStore(
    (state) => state.createTransaction
  );

  return (
    <div className="rounded-3xl border bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-2xl font-bold">
        Registrar movimiento
      </h2>

      <TransactionEditor
        submitLabel="Guardar movimiento"
        onSubmit={createTransaction}
      />
    </div>
  );
}