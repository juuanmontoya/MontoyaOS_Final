"use client";

import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import { useFinanceStore } from "@/store/finance-store";
import { CategorySelector } from "@/components/finances/category-selector";

interface Props {
  initialValues?: {
    description: string;
    amount: number;
    type: "income" | "expense";
    category_id: string;
  };

  submitLabel: string;

  resetAfterSubmit?: boolean;

  onSubmit: (data: {
    description: string;
    amount: number;
    type: "income" | "expense";
    category_id: string;
  }) => Promise<void>;

  onSuccess?: () => void;
}

export function TransactionEditor({
  initialValues,
  submitLabel,
  resetAfterSubmit = false,
  onSubmit,
  onSuccess,
}: Props) {
  const categories = useFinanceStore((s) => s.categories);
  const loadCategories = useFinanceStore((s) => s.loadCategories);

  const [description, setDescription] = useState(
    initialValues?.description ?? ""
  );

  const [amount, setAmount] = useState(
    initialValues?.amount?.toString() ?? ""
  );

  const [type, setType] = useState<"income" | "expense">(
    initialValues?.type ?? "expense"
  );

  const [categoryId, setCategoryId] = useState(
    initialValues?.category_id ?? ""
  );

  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  const filteredCategories = useMemo(() => {
    return categories.filter((c) => c.type === type);
  }, [categories, type]);

  useEffect(() => {
    if (
      filteredCategories.length > 0 &&
      !filteredCategories.some((c) => c.id === categoryId)
    ) {
      setCategoryId(filteredCategories[0].id);
    }
  }, [filteredCategories, categoryId]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!description || !amount || !categoryId) {
      toast.warning("Completa todos los campos.");
      return;
    }

    try {
      setIsSaving(true);

      await onSubmit({
        description,
        amount: Number(amount),
        type,
        category_id: categoryId,
      });

      toast.success("Movimiento guardado correctamente.");

      if (resetAfterSubmit) {
        setDescription("");
        setAmount("");
        setType("expense");

        const expenseCategories = categories.filter(
          (c) => c.type === "expense"
        );

        if (expenseCategories.length > 0) {
          setCategoryId(expenseCategories[0].id);
        }
      }

      onSuccess?.();
    } catch {
      toast.error("No fue posible guardar el movimiento.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="flex gap-3">
        <button
          type="button"
          disabled={isSaving}
          onClick={() => setType("expense")}
          className={`flex-1 rounded-xl p-3 font-semibold transition ${
            type === "expense"
              ? "bg-red-500 text-white"
              : "bg-gray-100"
          }`}
        >
          Gasto
        </button>

        <button
          type="button"
          disabled={isSaving}
          onClick={() => setType("income")}
          className={`flex-1 rounded-xl p-3 font-semibold transition ${
            type === "income"
              ? "bg-green-500 text-white"
              : "bg-gray-100"
          }`}
        >
          Ingreso
        </button>
      </div>

      <CategorySelector
        categories={filteredCategories}
        value={categoryId}
        onChange={setCategoryId}
      />

      <input
        className="w-full rounded-xl border p-3"
        placeholder="Descripción"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <input
        className="w-full rounded-xl border p-3"
        placeholder="Valor"
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <button
        type="submit"
        disabled={isSaving}
        className="w-full rounded-xl bg-blue-600 p-3 font-semibold text-white"
      >
        {isSaving ? "Guardando..." : submitLabel}
      </button>
    </form>
  );
}