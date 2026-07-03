"use client";

import { useState } from "react";
import { useFinanceStore } from "@/store/finance-store";

export function TransactionForm() {
  const addTransaction = useFinanceStore((state) => state.addTransaction);

  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState<"income" | "expense">("expense");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!description || !amount) return;

    addTransaction({
      id: crypto.randomUUID(),
      description,
      amount: Number(amount),
      type,
      category: "General",
      date: new Date().toISOString(),
    });

    setDescription("");
    setAmount("");
    setType("expense");
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
        className="w-full rounded-xl bg-blue-600 p-3 font-semibold text-white hover:bg-blue-700 transition"
      >
        Guardar movimiento
      </button>
    </form>
  );
}