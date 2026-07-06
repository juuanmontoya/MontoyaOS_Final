import { supabase } from "@/core/services/supabase";

const TABLE = "transactions";

export async function getTransactions() {
  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data;
}

export async function addTransaction(transaction: {
  description: string;
  category: string;
  type: "income" | "expense";
  amount: number;
}) {
  const { data, error } = await supabase
    .from(TABLE)
    .insert(transaction)
    .select()
    .single();

  if (error) throw error;

  return data;
}