"use client";

import { useState } from "react";
import { Check, Plus, X } from "lucide-react";

import { useFinanceStore } from "@/store/finance-store";

import type {
  AccountType,
  TransactionType,
} from "@/types/finance";

export function QuickTransaction() {
  const categories = useFinanceStore(
    (state) => state.categories
  );

  const createTransaction = useFinanceStore(
    (state) => state.createTransaction
  );

  const [open, setOpen] = useState(false);
  const [description, setDescription] =
    useState("");
  const [amount, setAmount] =
    useState("");
  const [type, setType] =
    useState<TransactionType>("expense");
  const [categoryId, setCategoryId] =
    useState("");
  const [accountType, setAccountType] =
    useState<AccountType>("digital");
  const [saving, setSaving] =
    useState(false);
  const [saved, setSaved] =
    useState(false);

  const expenseCategories =
    categories.filter(
      (category) =>
        category.type === "expense"
    );

  const incomeCategories =
    categories.filter(
      (category) =>
        category.type === "income"
    );

  const availableCategories =
    type === "expense"
      ? expenseCategories
      : incomeCategories;

  const handleTypeChange = (
    newType: TransactionType
  ) => {
    setType(newType);
    setCategoryId("");
  };

  const handleClose = () => {
    if (saving) return;

    setOpen(false);
    setSaved(false);
  };

  const handleSave = async () => {
    const numericAmount =
      Number(
        amount.replace(/\D/g, "")
      );

    if (
      !description.trim() ||
      numericAmount <= 0 ||
      !categoryId
    ) {
      return;
    }

    setSaving(true);

    try {
      await createTransaction({
        description:
          description.trim(),
        amount: numericAmount,
        type,
        category_id: categoryId,
        account_type: accountType,
        transaction_date:
          new Date()
            .toISOString()
            .split("T")[0],
      });

      setDescription("");
      setAmount("");
      setSaved(true);

      setTimeout(() => {
        setSaved(false);
      }, 1200);
    } catch (error) {
      console.error(
        "Error creando movimiento:",
        error
      );
    } finally {
      setSaving(false);
    }
  };

  const canSave =
    description.trim().length > 0 &&
    Number(amount.replace(/\D/g, "")) > 0 &&
    categoryId !== "";

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-4 text-base font-semibold text-primary-foreground shadow-sm transition active:scale-[0.98]"
      >
        <Plus className="h-5 w-5" />
        Agregar rápido
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-0 sm:items-center sm:p-4">
          <div className="w-full max-w-lg rounded-t-3xl bg-white p-5 shadow-2xl sm:rounded-3xl">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold">
                  Agregar movimiento
                </h2>

                <p className="text-sm text-muted-foreground">
                  Rápido y sin complicaciones
                </p>
              </div>

              <button
                type="button"
                onClick={handleClose}
                className="rounded-full p-2 text-muted-foreground hover:bg-muted"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() =>
                    handleTypeChange(
                      "expense"
                    )
                  }
                  className={`rounded-xl border px-4 py-3 font-semibold ${
                    type === "expense"
                      ? "border-red-200 bg-red-50 text-red-700"
                      : "bg-white text-muted-foreground"
                  }`}
                >
                  💸 Gasto
                </button>

                <button
                  type="button"
                  onClick={() =>
                    handleTypeChange(
                      "income"
                    )
                  }
                  className={`rounded-xl border px-4 py-3 font-semibold ${
                    type === "income"
                      ? "border-green-200 bg-green-50 text-green-700"
                      : "bg-white text-muted-foreground"
                  }`}
                >
                  💰 Ingreso
                </button>
              </div>

              <input
                type="text"
                value={description}
                onChange={(event) =>
                  setDescription(
                    event.target.value
                  )
                }
                placeholder="¿Qué fue?"
                autoFocus
                className="w-full rounded-2xl border px-4 py-4 text-base outline-none focus:border-primary"
              />

              <input
                type="text"
                inputMode="numeric"
                value={amount}
                onChange={(event) => {
                  const value =
                    event.target.value.replace(
                      /\D/g,
                      ""
                    );

                  setAmount(value);
                }}
                placeholder="$ 0"
                className="w-full rounded-2xl border px-4 py-4 text-xl font-semibold outline-none focus:border-primary"
              />

              <div className="grid grid-cols-2 gap-2">
                {availableCategories.map(
                  (category) => (
                    <button
                      key={category.id}
                      type="button"
                      onClick={() =>
                        setCategoryId(
                          category.id
                        )
                      }
                      className={`flex items-center gap-2 rounded-xl border px-3 py-3 text-left text-sm font-medium ${
                        categoryId ===
                        category.id
                          ? "border-primary bg-primary/5"
                          : "bg-white"
                      }`}
                    >
                      <span
                        className="flex h-8 w-8 items-center justify-center rounded-lg"
                        style={{
                          backgroundColor:
                            category.color ??
                            "#F3F4F6",
                        }}
                      >
                        {category.icon}
                      </span>

                      <span className="truncate">
                        {category.name}
                      </span>
                    </button>
                  )
                )}
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() =>
                    setAccountType(
                      "digital"
                    )
                  }
                  className={`rounded-xl border px-4 py-3 font-semibold ${
                    accountType ===
                    "digital"
                      ? "border-blue-200 bg-blue-50 text-blue-700"
                      : "text-muted-foreground"
                  }`}
                >
                  💳 Digital
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setAccountType(
                      "cash"
                    )
                  }
                  className={`rounded-xl border px-4 py-3 font-semibold ${
                    accountType === "cash"
                      ? "border-green-200 bg-green-50 text-green-700"
                      : "text-muted-foreground"
                  }`}
                >
                  💵 Efectivo
                </button>
              </div>

              <button
                type="button"
                disabled={
                  !canSave || saving
                }
                onClick={handleSave}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-4 text-base font-bold text-primary-foreground disabled:cursor-not-allowed disabled:opacity-40"
              >
                {saved ? (
                  <>
                    <Check className="h-5 w-5" />
                    Guardado
                  </>
                ) : saving ? (
                  "Guardando..."
                ) : (
                  "Guardar movimiento"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}