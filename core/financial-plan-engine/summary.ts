import type {
  FinancialCommitment,
} from "@/types/financial-plan";

export interface FinancialPlanSummary {
  totalNeeded: number;
  covered: number;
  pending: number;
  progress: number;
}

export function getFinancialPlanSummary(
  commitments: FinancialCommitment[]
): FinancialPlanSummary {
  const totalNeeded =
    commitments.reduce(
      (sum, item) =>
        sum + item.monthly_amount,
      0
    );

  return {
    totalNeeded,
    covered: 0,
    pending: totalNeeded,
    progress: 0,
  };
}