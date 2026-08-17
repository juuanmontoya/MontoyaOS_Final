import { NextResponse } from "next/server";

import { supabase } from "@/core/services/supabase";

import type {
  CreateTransactionInput,
} from "@/types/finance";

export async function POST(
  request: Request
) {
  try {
    const body =
      (await request.json()) as Partial<CreateTransactionInput>;

    if (
      !body.description ||
      body.amount === undefined ||
      !body.type ||
      !body.category_id ||
      !body.account_type ||
      !body.transaction_date
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Faltan datos requeridos.",
        },
        {
          status: 400,
        }
      );
    }

    const transaction = {
      description: body.description,
      amount: Number(body.amount),
      type: body.type,
      category_id: body.category_id,
      account_type: body.account_type,
      transaction_date:
        body.transaction_date,
    };

    const {
      data,
      error,
    } = await supabase
      .from("transactions")
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
      console.error(
        "❌ SHORTCUT TRANSACTION ERROR",
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

    return NextResponse.json({
      success: true,
      transaction: data,
    });
  } catch (error) {
    console.error(
      "❌ SHORTCUT API ERROR",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "No se pudo crear la transacción.",
      },
      {
        status: 500,
      }
    );
  }
}