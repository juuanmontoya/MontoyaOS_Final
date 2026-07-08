import { supabase } from "@/core/services/supabase";

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
      )
    `)
    .order("created_at", { ascending: false });

  if (error) {
    console.group("❌ SUPABASE ERROR - GET");
    console.log(error);
    console.groupEnd();

    throw error;
  }

  return data ?? [];
}

export async function addTransaction(transaction: {
  description: string;
  category_id: string;
  type: "income" | "expense";
  amount: number;
}) {
  const { data, error } = await supabase
    .from(TABLE)
    .insert(transaction)
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
    console.group("❌ SUPABASE ERROR - INSERT");
    console.log(error);
    console.groupEnd();

    throw error;
  }

  return data;
}

export async function updateTransaction(
  id: string,
  transaction: {
    description: string;
    category_id: string;
    type: "income" | "expense";
    amount: number;
  }
) {
  const { data, error } = await supabase
    .from(TABLE)
    .update(transaction)
    .eq("id", id)
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
    console.group("❌ SUPABASE ERROR - UPDATE");
    console.log(error);
    console.groupEnd();

    throw error;
  }

  return data;
}