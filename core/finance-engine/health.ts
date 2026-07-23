import type { Transaction } from "@/types/finance";
import type { Category } from "@/types/category";

export interface FinanceHealth {
  score: number;
  level:
    | "Excelente"
    | "Buena"
    | "Regular"
    | "Crítica";
}

export function calculateFinanceHealth(
  transactions: Transaction[],
  categories: Category[]
): FinanceHealth {
  const income = transactions
    .filter(
      (transaction) =>
        transaction.type === "income"
    )
    .reduce(
      (sum, transaction) =>
        sum + transaction.amount,
      0
    );

  const expenses = transactions
    .filter(
      (transaction) =>
        transaction.type === "expense"
    )
    .reduce(
      (sum, transaction) =>
        sum + transaction.amount,
      0
    );

  let score = 100;

  if (income === 0) {
    score -= 50;
  }

  if (expenses > income) {
    score -= 30;
  }

  if (expenses > income * 0.8) {
    score -= 10;
  }

  const usedCategories = new Set(
    transactions
      .filter(
        (transaction) =>
          transaction.type ===
          "expense"
      )
      .map(
        (transaction) =>
          transaction.category_id
      )
  ).size;

  if (usedCategories <= 2) {
    score -= 5;
  }

  score = Math.max(
    0,
    Math.min(score, 100)
  );

  let level: FinanceHealth["level"];

  if (score >= 90) {
    level = "Excelente";
  } else if (score >= 75) {
    level = "Buena";
  } else if (score >= 60) {
    level = "Regular";
  } else {
    level = "Crítica";
  }

  return {
    score,
    level,
  };
}