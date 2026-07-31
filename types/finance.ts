import type { Category } from "./category";

export type TransactionType =
  | "income"
  | "expense";

export type AccountType =
  | "cash"
  | "digital";

export interface TransactionItem {
  id: string;

  transaction_id: string;

  name: string;

  quantity: number;

  unit_price: number;

  total: number;

  created_at: string;
}

export interface CreateTransactionItemInput {
  name: string;

  quantity: number;

  unit_price: number;

  total: number;
}

export interface Transaction {
  id: string;

  description: string;

  amount: number;

  type: TransactionType;

  category_id: string;

  account_type: AccountType;

  transaction_date: string;

  created_at: string;

  category?: Category;

  items?: TransactionItem[];
}

export interface CreateTransactionInput {
  description: string;

  amount: number;

  type: TransactionType;

  category_id: string;

  account_type: AccountType;

  transaction_date: string;

  items?: CreateTransactionItemInput[];
}

export interface UpdateTransactionInput
  extends CreateTransactionInput {}