import { supabase } from "@/core/services/supabase";

import type { Category, CategoryType } from "@/types/category";

export const categoryService = {
  async getCategories(type?: CategoryType): Promise<Category[]> {
    let query = supabase
      .from("categories")
      .select("*")
      .eq("active", true)
      .order("name");

    if (type) {
      query = query.eq("type", type);
    }

    const { data, error } = await query;

    console.group("📂 Categories");
    console.log("data:", data);
    console.log("error:", error);
    console.groupEnd();

    if (error) {
      throw error;
    }

    return data as Category[];
  },
};