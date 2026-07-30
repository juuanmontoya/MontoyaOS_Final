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

  /**
   * Fecha real en la que ocurrió la transacción.
   * Formato ISO: YYYY-MM-DD
   */
  transaction_date: string;

  /**
   * Fecha en la que fue registrada en la base de datos.
   * Solo para auditoría y orden secundario.
   */
  created_at: string;

  category?: Category;
}

export interface CreateTransactionInput {
  description: string;

  amount: number;

  type: TransactionType;

  category_id: string;

  account_type: AccountType;

  /**
   * Formato ISO: YYYY-MM-DD
   */
  transaction_date: string;
}

export interface UpdateTransactionInput
  extends CreateTransactionInput {}