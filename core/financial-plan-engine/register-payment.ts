import type {
  FinancialCommitment,
} from "@/types/financial-plan";

import {
  useBudgetStore,
} from "@/store/budget-store";

import {
  useFinanceStore,
} from "@/store/finance-store";

export async function registerCommitmentPayment(
  commitment: FinancialCommitment
) {
  const financeStore =
    useFinanceStore.getState();

  const budgetStore =
    useBudgetStore.getState();

  let transactionId:
    | string
    | undefined;

  if (
    commitment.finance_category_id
  ) {
    await financeStore.createTransaction(
      {
        type: "expense",

        description:
          commitment.name,

        amount:
          commitment.monthly_amount,

        category_id:
          commitment.finance_category_id,

        date: new Date().toISOString(),
      }
    );

    const transactions =
      useFinanceStore.getState()
        .transactions;

    transactionId =
      transactions.at(-1)?.id;
  }

  await budgetStore.markAsPaid(
    commitment.id,
    transactionId
  );

  await Promise.all([
    financeStore.loadTransactions(),
    budgetStore.loadBudget(),
  ]);
}