"use client";

import { getAccountBalances } from "@/core/finance-engine/account-balances";

import type { Transaction } from "@/types/finance";

interface Props {
  transactions: Transaction[];
}

const currency = new Intl.NumberFormat(
  "es-CO",
  {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }
);

export function AccountBalanceCards({
  transactions,
}: Props) {
  const balances =
    getAccountBalances(transactions);

  const cards = [
    {
      title: "Saldo Total",
      value: balances.total,
      icon: "💰",
    },
    {
      title: "Efectivo",
      value: balances.cash,
      icon: "💵",
    },
    {
      title: "Digital",
      value: balances.digital,
      icon: "💳",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {cards.map((card) => (
        <div
          key={card.title}
          className="rounded-2xl border bg-white p-5 shadow-sm"
        >
          <div className="mb-3 flex items-center gap-2 text-lg font-semibold">
            <span>{card.icon}</span>
            <span>{card.title}</span>
          </div>

          <p className="text-2xl font-bold">
            {currency.format(card.value)}
          </p>
        </div>
      ))}
    </div>
  );
}