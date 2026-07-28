"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import { toast } from "sonner";

import { TransactionSubmitButton } from "@/components/finances/transaction-submit-button";

import { useFinanceStore } from "@/store/finance-store";

import type {
  CreateFinancialCommitmentInput,
} from "@/types/financial-plan";

interface Props {
  categoryId: string;

  submitLabel: string;

  onSubmit: (
    data: CreateFinancialCommitmentInput
  ) => Promise<void>;

  onSuccess?: () => void;
}

export function BudgetEditor({
  categoryId,
  submitLabel,
  onSubmit,
  onSuccess,
}: Props) {
  const financeCategories =
    useFinanceStore(
      (state) => state.categories
    );

  const loadFinanceCategories =
    useFinanceStore(
      (state) => state.loadCategories
    );

  const expenseCategories =
    useMemo(
      () =>
        financeCategories.filter(
          (category) =>
            category.type ===
            "expense"
        ),
      [financeCategories]
    );

  const [
    financeCategoryId,
    setFinanceCategoryId,
  ] = useState("");

  const [name, setName] =
    useState("");

  const [
    monthlyAmount,
    setMonthlyAmount,
  ] = useState("");

  const [day, setDay] =
  useState("1");

  const [isSaving, setIsSaving] =
    useState(false);

  useEffect(() => {
    loadFinanceCategories();
  }, [loadFinanceCategories]);

  const handleSubmit =
    useCallback(
      async (
        e: React.FormEvent<HTMLFormElement>
      ) => {
        e.preventDefault();

        const amount =
          Number(monthlyAmount);

        if (!name.trim()) {
          toast.warning(
            "Ingresa un nombre."
          );
          return;
        }

        if (
          Number.isNaN(amount) ||
          amount <= 0
        ) {
          toast.warning(
            "Ingresa un valor válido."
          );
          return;
        }

        try {
          setIsSaving(true);

          const today =
            new Date();

          await onSubmit({
            financial_plan_category_id:
              categoryId,

            finance_category_id:
              financeCategoryId ||
              null,

            name:
              name.trim(),

            monthly_amount:
  amount,

day:
  Number(day),

month:
  today.getMonth() + 1,

            year:
              today.getFullYear(),
          });

          toast.success(
            "Compromiso creado."
          );

          setName("");
          setMonthlyAmount("");
          setFinanceCategoryId("");
          setDay("1");

          onSuccess?.();
        } catch (error: any) {
  console.group(
    "💥 COMMITMENT ERROR"
  );

  console.dir(error);

  console.log("message:", error?.message);
  console.log("details:", error?.details);
  console.log("hint:", error?.hint);
  console.log("code:", error?.code);

  console.groupEnd();

  toast.error(
    "No fue posible guardar."
  );
}
      },
      [
  categoryId,
  financeCategoryId,
  monthlyAmount,
  day,
  name,
  onSubmit,
  onSuccess,
]
    );

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      <div>
        <label className="mb-2 block text-sm font-medium">
          Nombre del compromiso
        </label>

        <input
          className="w-full rounded-xl border p-3"
          placeholder="Ej. Arriendo"
          value={name}
          onChange={(e) =>
            setName(
              e.target.value
            )
          }
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">
          Valor mensual
        </label>

        <input
          type="number"
          min={1}
          className="w-full rounded-xl border p-3"
          placeholder="Ej. 2100000"
          value={monthlyAmount}
          onChange={(e) =>
            setMonthlyAmount(
              e.target.value
            )
          }
        />
      </div>

      <div>
  <label className="mb-2 block text-sm font-medium">
    Día de vencimiento
  </label>

  <select
    className="w-full rounded-xl border p-3"
    value={day}
    onChange={(e) =>
      setDay(e.target.value)
    }
  >
    {Array.from(
      { length: 31 },
      (_, index) => (
        <option
          key={index + 1}
          value={index + 1}
        >
          Día {index + 1}
        </option>
      )
    )}
  </select>
</div>

      <div>
        <label className="mb-2 block text-sm font-medium">
          Categoría de Finanzas
          (opcional)
        </label>

        <select
          className="w-full rounded-xl border p-3"
          value={
            financeCategoryId
          }
          onChange={(e) =>
            setFinanceCategoryId(
              e.target.value
            )
          }
        >
          <option value="">
            Sin relación
          </option>

          {expenseCategories.map(
            (category) => (
              <option
                key={category.id}
                value={category.id}
              >
                {category.icon}{" "}
                {category.name}
              </option>
            )
          )}
        </select>
      </div>

      <TransactionSubmitButton
        loading={isSaving}
        label={submitLabel}
      />
    </form>
  );
}