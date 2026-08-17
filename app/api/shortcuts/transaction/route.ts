import { NextResponse } from "next/server";

import { supabase } from "@/core/services/supabase";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const description =
      typeof body.description === "string"
        ? body.description.trim()
        : "";

    const amount = Number(body.amount);

    const type =
      typeof body.type === "string"
        ? body.type.trim().toLowerCase()
        : "";

    const category_id =
      typeof body.category_id === "string"
        ? body.category_id.trim()
        : "";

    const account_type =
      typeof body.account_type === "string"
        ? body.account_type.trim().toLowerCase()
        : "";

    const transaction_date =
      typeof body.transaction_date === "string"
        ? body.transaction_date.trim()
        : "";

    if (
      !description ||
      !Number.isFinite(amount) ||
      !type ||
      !category_id ||
      !account_type ||
      !transaction_date
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Faltan datos requeridos.",
          received: {
            description,
            amount: body.amount,
            type: body.type,
            category_id,
            account_type: body.account_type,
            transaction_date: body.transaction_date,
          },
        },
        { status: 400 }
      );
    }

    if (type !== "income" && type !== "expense") {
      return NextResponse.json(
        {
          success: false,
          error: `Tipo de transacción inválido: "${type}"`,
        },
        { status: 400 }
      );
    }

    if (
      account_type !== "cash" &&
      account_type !== "digital"
    ) {
      return NextResponse.json(
        {
          success: false,
          error: `Tipo de cuenta inválido: "${account_type}"`,
        },
        { status: 400 }
      );
    }

    const transaction = {
      description,
      amount,
      type,
      category_id,
      account_type,
      transaction_date,
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
        { status: 500 }
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
        error: "No se pudo crear la transacción.",
      },
      { status: 500 }
    );
  }
}