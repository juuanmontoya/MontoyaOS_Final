export type CategoryType =
  | "income"
  | "expense";

export interface Category {
  id: string;

  name: string;

  icon: string;

  color: string;

  type: CategoryType;

  active: boolean;

  supports_items: boolean;

  created_at: string;
}