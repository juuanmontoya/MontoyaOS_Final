import { NextResponse } from "next/server";

import { supabase } from "@/core/services/supabase";

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("categories")
      .select(`
        id,
        name,
        icon,
        color,
        type
      `)
      .eq("type", "expense")
      .order("name", {
        ascending: true,
      });

    if (error) {
      console.error(
        "❌ SUPABASE ERROR - GET SHORTCUT CATEGORIES",
        error
      );

      return NextResponse.json(
        {
          success: false,
          error: error.message,
        },
        {
          status: 500,
        }
      );
    }

    const categoryMap = Object.fromEntries(
      (data ?? []).map((category) => [
        `${category.icon} ${category.name}`,
        category.id,
      ])
    );

    return NextResponse.json(
      categoryMap
    );
  } catch (error) {
    console.error(
      "❌ SHORTCUT CATEGORIES ERROR",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "No se pudieron obtener las categorías.",
      },
      {
        status: 500,
      }
    );
  }
}