import { supabase } from "@/core/services/supabase";

import type { BudgetCategory } from "@/types/budget-category";

const TABLE = "financial_plan_categories";

export const budgetCategoryService = {
  async getCategories(): Promise<
    BudgetCategory[]
  > {
    const { data, error } =
      await supabase
        .from(TABLE)
        .select("*")
        .order("sort_order");

    console.group(
      "📂 Financial Plan Categories"
    );

    console.log("table:", TABLE);
    console.log("data:", data);
    console.log("error:", error);

    console.groupEnd();

    if (error) {
      throw error;
    }

    return (data ??
      []) as BudgetCategory[];
  },
};