export interface BudgetItem {
  id: string;

  user_id: string;

  category_id: string;

  month: number;

  year: number;

  planned: number;

  created_at: string;
}

export interface CreateBudgetInput {
  category_id: string;

  month: number;

  year: number;

  planned: number;
}

export interface UpdateBudgetInput {
  planned: number;
}