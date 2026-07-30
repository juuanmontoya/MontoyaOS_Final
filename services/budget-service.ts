import { supabase } from "@/core/services/supabase";

import type {
  FinancialCommitment,
  CreateFinancialCommitmentInput,
  UpdateFinancialCommitmentInput,
} from "@/types/financial-plan";

const TABLE =
  "financial_commitments";

export async function getBudgetItems() {
  const { data, error } =
    await supabase
      .from(TABLE)
      .select("*")
      .order("day", {
        ascending: true,
      });

  if (error) {
    console.group(
      "❌ GET FINANCIAL COMMITMENTS"
    );
    console.error(error);
    console.groupEnd();

    throw error;
  }

  return (
    data ?? []
  ) as FinancialCommitment[];
}

export async function createBudgetItem(
  item: CreateFinancialCommitmentInput
) {
  const { data, error } =
    await supabase
      .from(TABLE)
      .insert(item)
      .select()
      .single();

  if (error) {
    console.group(
      "❌ CREATE COMMITMENT"
    );

    console.dir(error);

    console.log(
      "message:",
      error.message
    );

    console.log(
      "details:",
      error.details
    );

    console.log(
      "hint:",
      error.hint
    );

    console.log(
      "code:",
      error.code
    );

    console.log(
      "Payload:"
    );

    console.dir(item);

    console.groupEnd();

    throw error;
  }

  return data as FinancialCommitment;
}

export async function updateBudgetItem(
  id: string,
  item: UpdateFinancialCommitmentInput
) {
  const { data, error } =
    await supabase
      .from(TABLE)
      .update(item)
      .eq("id", id)
      .select()
      .single();

  if (error) {
    console.group(
      "❌ UPDATE COMMITMENT"
    );

    console.error(error);

    console.groupEnd();

    throw error;
  }

  return data as FinancialCommitment;
}

export async function deleteBudgetItem(
  id: string
) {
  const { error } =
    await supabase
      .from(TABLE)
      .delete()
      .eq("id", id);

  if (error) {
    console.group(
      "❌ DELETE COMMITMENT"
    );

    console.error(error);

    console.groupEnd();

    throw error;
  }

  return true;
}