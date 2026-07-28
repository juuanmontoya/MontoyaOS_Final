export interface BudgetCategory {
  id: string;

  name: string;

  icon: string;

  color: string | null;

  sort_order: number;

  created_at: string;
}

export interface BudgetItem {
  id: string;

  budget_category_id: string;

  finance_category_id: string | null;

  name: string;

  planned: number;

  month: number;

  year: number;

  created_at: string;
}

export interface CreateBudgetItemInput {
  budget_category_id: string;

  finance_category_id?: string | null;

  name: string;

  planned: number;

  month: number;

  year: number;
}

export interface UpdateBudgetItemInput {
  budget_category_id?: string;

  finance_category_id?: string | null;

  name?: string;

  planned?: number;
}

export interface BudgetCategoryWithItems
  extends BudgetCategory {
  items: BudgetItem[];
}