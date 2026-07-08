import type { Transaction } from "@/store/finance-store";

export interface FinanceInsight {
  id: string;
  type: "success" | "warning" | "info";
  title: string;
  description: string;
}

export function generateFinanceInsights(
  transactions: Transaction[]
): FinanceInsight[] {
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const expenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const insights: FinanceInsight[] = [];

  // Balance
  if (income > expenses) {
    insights.push({
      id: "healthy-balance",
      type: "success",
      title: "Buen balance",
      description:
        "Tus ingresos son mayores que tus gastos.",
    });
  } else {
    insights.push({
      id: "negative-balance",
      type: "warning",
      title: "Atención",
      description:
        "Tus gastos son mayores que tus ingresos.",
    });
  }

  // Frecuencia
  if (transactions.length >= 15) {
    insights.push({
      id: "activity",
      type: "info",
      title: "Buen seguimiento",
      description: `Has registrado ${transactions.length} movimientos.`,
    });
  }

  // Ahorro
  if (income > 0) {
    const savingRate =
      ((income - expenses) / income) * 100;

    insights.push({
      id: "saving-rate",
      type: savingRate >= 20 ? "success" : "warning",
      title: "Capacidad de ahorro",
      description: `Actualmente estás ahorrando aproximadamente ${savingRate.toFixed(
        1
      )}% de tus ingresos.`,
    });
  }

  return insights;
}