import { supabase } from "@/core/services/supabase";

import type {
  CreateTransactionInput,
} from "@/types/finance";

const TABLE = "transactions";

export async function getTransactions() {
  const { data, error } = await supabase
    .from(TABLE)
    .select(`
      *,
      category:categories (
        id,
        name,
        icon,
        color,
        type
      ),
      items:transaction_items (
        id,
        transaction_id,
        name,
        quantity,
        unit_price,
        total,
        created_at
      )
    `)
    .order("transaction_date", {
      ascending: false,
    })
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    console.group(
      "❌ SUPABASE ERROR - GET"
    );
    console.log(error);
    console.groupEnd();

    throw error;
  }

  return data ?? [];
}

export async function addTransaction(
  transaction: CreateTransactionInput
) {
  const {
    items = [],
    ...transactionData
  } = transaction;

  const {
    data: createdTransaction,
    error,
  } = await supabase
    .from(TABLE)
    .insert(transactionData)
    .select(`
      *,
      category:categories (
        id,
        name,
        icon,
        color,
        type
      )
    `)
    .single();

  if (error) {
    console.group(
      "❌ SUPABASE ERROR - INSERT"
    );
    console.log(error);
    console.groupEnd();

    throw error;
  }

  if (items.length > 0) {
    const { error: itemsError } =
      await supabase
        .from("transaction_items")
        .insert(
          items.map((item) => ({
            transaction_id:
              createdTransaction.id,
            ...item,
          }))
        );

    if (itemsError) {
      throw itemsError;
    }
  }

  const {
    data: completeTransaction,
    error: fetchError,
  } = await supabase
    .from(TABLE)
    .select(`
      *,
      category:categories (
        id,
        name,
        icon,
        color,
        type
      ),
      items:transaction_items (
        id,
        transaction_id,
        name,
        quantity,
        unit_price,
        total,
        created_at
      )
    `)
    .eq(
      "id",
      createdTransaction.id
    )
    .single();

  if (fetchError) {
    throw fetchError;
  }

  return completeTransaction;
}

export async function updateTransaction(
  id: string,
  transaction: CreateTransactionInput
) {
  const {
    items = [],
    ...transactionData
  } = transaction;

  const { error } =
    await supabase
      .from(TABLE)
      .update(transactionData)
      .eq("id", id);

  if (error) {
    console.group(
      "❌ SUPABASE ERROR - UPDATE"
    );
    console.log(error);
    console.groupEnd();

    throw error;
  }

  await supabase
    .from("transaction_items")
    .delete()
    .eq("transaction_id", id);

  if (items.length > 0) {
    const { error: itemsError } =
      await supabase
        .from("transaction_items")
        .insert(
          items.map((item) => ({
            transaction_id: id,
            ...item,
          }))
        );

    if (itemsError) {
      throw itemsError;
    }
  }

  const {
    data,
    error: fetchError,
  } = await supabase
    .from(TABLE)
    .select(`
      *,
      category:categories (
        id,
        name,
        icon,
        color,
        type
      ),
      items:transaction_items (
        id,
        transaction_id,
        name,
        quantity,
        unit_price,
        total,
        created_at
      )
    `)
    .eq("id", id)
    .single();

  if (fetchError) {
    throw fetchError;
  }

  return data;
}