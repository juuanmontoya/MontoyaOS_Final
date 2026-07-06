import { supabase } from "@/core/services/supabase";

const TABLE = "transactions";

export async function getTransactions() {
  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.group("❌ SUPABASE ERROR - GET");
    console.log(error);
    console.groupEnd();

    throw new Error(
      JSON.stringify(
        {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code,
        },
        null,
        2
      )
    );
  }

  return data ?? [];
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

  if (error) {
    console.group("❌ SUPABASE ERROR - INSERT");
    console.log(error);
    console.groupEnd();

    throw new Error(
      JSON.stringify(
        {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code,
        },
        null,
        2
      )
    );
  }

  return data;
}