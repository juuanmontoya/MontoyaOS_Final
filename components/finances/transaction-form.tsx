"use client";

import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import { useFinanceStore } from "@/store/finance-store";
import { CategorySelector } from "@/components/finances/category-selector";

export function TransactionForm() {
  const createTransaction = useFinanceStore(
    (state) => state.createTransaction
  );

  const categories = useFinanceStore(
    (state) => state.categories
  );

  const loadCategories = useFinanceStore(
    (state) => state.loadCategories
  );

  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState<"income" | "expense">("expense");
  const [category, setCategory] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  const filteredCategories = useMemo(() => {
    return categories.filter((category) => category.type === type);
  }, [categories, type]);

  useEffect(() => {
    if (filteredCategories.length > 0) {
      setCategory(filteredCategories[0].id);
    }
  }, [filteredCategories]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!description || !amount || !category) {
      toast.warning("Completa todos los campos.");
      return;
    }

    try {
      setIsSaving(true);

      await createTransaction({
        description,
        amount: Number(amount),
        type,
        category,
      });

      toast.success(
        `${type === "income" ? "Ingreso" : "Gasto"} registrado correctamente`
      );

      setDescription("");
      setAmount("");
      setType("expense");
    } catch {
      toast.error("No fue posible guardar el movimiento.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border bg-white p-6 shadow-sm space-y-5"
    >
      <h2 className="text-2xl font-bold">
        Registrar movimiento
      </h2>

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
        value={category}
        onChange={setCategory}
      />

      <input
        className="w-full rounded-xl border p-3"
        placeholder="Descripción"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        disabled={isSaving}
      />

      <input
        className="w-full rounded-xl border p-3"
        placeholder="Valor"
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        disabled={isSaving}
      />

      <button
        type="submit"
        disabled={isSaving}
        className="w-full rounded-xl bg-blue-600 p-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSaving ? "Guardando..." : "Guardar movimiento"}
      </button>
    </form>
  );
}