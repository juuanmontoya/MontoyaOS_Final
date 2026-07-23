"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import { toast } from "sonner";

import { CategorySelector } from "@/components/finances/category-selector";
import { TransactionSubmitButton } from "@/components/finances/transaction-submit-button";
import { TransactionTypeToggle } from "@/components/finances/transaction-type-toggle";
import { AccountTypeToggle } from "@/components/finances/account-type-toggle";

import { useFinanceStore } from "@/store/finance-store";

import type {
  AccountType,
  CreateTransactionInput,
  TransactionType,
} from "@/types/finance";

interface Props {
  initialValues?: {
    description: string;
    amount: number;
    type: TransactionType;
    category_id: string;
    account_type: AccountType;
  };

  submitLabel: string;

  resetAfterSubmit?: boolean;

  onSubmit: (
    data: CreateTransactionInput
  ) => Promise<void>;

  onSuccess?: () => void;
}

export function TransactionEditor({
  initialValues,
  submitLabel,
  resetAfterSubmit = false,
  onSubmit,
  onSuccess,
}: Props) {
  const categories = useFinanceStore(
    (s) => s.categories
  );

  const loadCategories = useFinanceStore(
    (s) => s.loadCategories
  );

  const [description, setDescription] =
    useState(
      initialValues?.description ?? ""
    );

  const [amount, setAmount] = useState(
    initialValues?.amount?.toString() ?? ""
  );

  const [type, setType] =
    useState<TransactionType>(
      initialValues?.type ??
        "expense"
    );

  const [accountType, setAccountType] =
    useState<AccountType>(
      initialValues?.account_type ??
        "cash"
    );

  const [categoryId, setCategoryId] =
    useState(
      initialValues?.category_id ?? ""
    );

  const [isSaving, setIsSaving] =
    useState(false);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  const filteredCategories =
    useMemo(
      () =>
        categories.filter(
          (category) =>
            category.type === type
        ),
      [categories, type]
    );

  const expenseCategories =
    useMemo(
      () =>
        categories.filter(
          (category) =>
            category.type ===
            "expense"
        ),
      [categories]
    );

  useEffect(() => {
    if (
      filteredCategories.length >
        0 &&
      !filteredCategories.some(
        (category) =>
          category.id ===
          categoryId
      )
    ) {
      setCategoryId(
        filteredCategories[0].id
      );
    }
  }, [
    filteredCategories,
    categoryId,
  ]);

  const resetForm =
    useCallback(() => {
      setDescription("");
      setAmount("");
      setType("expense");
      setAccountType("cash");

      if (
        expenseCategories.length > 0
      ) {
        setCategoryId(
          expenseCategories[0].id
        );
      }
    }, [expenseCategories]);

  const handleSubmit =
    useCallback(
      async (
        e: React.FormEvent<HTMLFormElement>
      ) => {
        e.preventDefault();

        const trimmedDescription =
          description.trim();

        const parsedAmount =
          Number(amount);

        if (
          !trimmedDescription ||
          !categoryId
        ) {
          toast.warning(
            "Completa todos los campos."
          );
          return;
        }

        if (
          Number.isNaN(
            parsedAmount
          ) ||
          parsedAmount <= 0
        ) {
          toast.warning(
            "Ingresa un valor válido."
          );
          return;
        }

        try {
          setIsSaving(true);

          await onSubmit({
            description:
              trimmedDescription,
            amount: parsedAmount,
            type,
            category_id:
              categoryId,
            account_type:
              accountType,
          });

          toast.success(
            "Movimiento guardado correctamente."
          );

          if (
            resetAfterSubmit
          ) {
            resetForm();
          }

          onSuccess?.();
        } catch {
          toast.error(
            "No fue posible guardar el movimiento."
          );
        } finally {
          setIsSaving(false);
        }
      },
      [
        amount,
        accountType,
        categoryId,
        description,
        onSubmit,
        onSuccess,
        resetAfterSubmit,
        resetForm,
        type,
      ]
    );

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      <TransactionTypeToggle
        value={type}
        disabled={isSaving}
        onChange={setType}
      />

      <AccountTypeToggle
        value={accountType}
        disabled={isSaving}
        onChange={
          setAccountType
        }
      />

      <CategorySelector
        categories={
          filteredCategories
        }
        value={categoryId}
        onChange={
          setCategoryId
        }
      />

      <input
        autoFocus
        autoComplete="off"
        disabled={isSaving}
        className="w-full rounded-xl border p-3"
        placeholder="Descripción"
        value={description}
        onChange={(e) =>
          setDescription(
            e.target.value
          )
        }
      />

      <input
        type="number"
        min={1}
        inputMode="decimal"
        autoComplete="off"
        disabled={isSaving}
        className="w-full rounded-xl border p-3"
        placeholder="Valor"
        value={amount}
        onChange={(e) =>
          setAmount(
            e.target.value
          )
        }
      />

      <TransactionSubmitButton
        loading={isSaving}
        label={submitLabel}
      />
    </form>
  );
}