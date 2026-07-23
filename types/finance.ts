import type { Category } from "./category";

export type TransactionType =
  | "income"
  | "expense";

export type AccountType =
  | "cash"
  | "digital";

export interface Transaction {
  id: string;

  description: string;

  amount: number;

  type: TransactionType;

  category_id: string;

  account_type: AccountType;

  created_at: string;

  category?: Category;
}

export interface CreateTransactionInput {
  description: string;

  amount: number;

  type: TransactionType;

  category_id: string;

  account_type: AccountType;
}

export interface UpdateTransactionInput
  extends CreateTransactionInput {}