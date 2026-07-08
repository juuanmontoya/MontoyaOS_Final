export type TransactionType = "income" | "expense";

export interface Transaction {
  id: string;
  description: string;
  amount: number;

  type: TransactionType;

  category: string;

  category_id?: string | null;

  created_at: string;
}

export type NewTransaction = Omit<
  Transaction,
  "id" | "created_at"
>;