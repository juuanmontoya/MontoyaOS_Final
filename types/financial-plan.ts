export interface FinancialCommitment {
  id: string;

  financial_plan_category_id: string;

  finance_category_id: string | null;

  name: string;

  monthly_amount: number;

  day: number;

  month: number;

  year: number;

  paid: boolean;

  paid_at: string | null;

  transaction_id: string | null;

  created_at: string;
}

export interface CreateFinancialCommitmentInput {
  financial_plan_category_id: string;

  finance_category_id: string | null;

  name: string;

  monthly_amount: number;

  day: number;

  month: number;

  year: number;
}

export interface UpdateFinancialCommitmentInput {
  financial_plan_category_id?: string;

  finance_category_id?: string | null;

  name?: string;

  monthly_amount?: number;

  day?: number;

  month?: number;

  year?: number;

  paid?: boolean;

  paid_at?: string | null;

  transaction_id?: string | null;
}