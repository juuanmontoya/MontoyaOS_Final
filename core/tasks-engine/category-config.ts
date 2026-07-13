export interface TaskCategoryConfig {
  value: string;
  label: string;
}

export const TASK_CATEGORIES: TaskCategoryConfig[] = [
  {
    value: "work",
    label: "💼 Trabajo",
  },
  {
    value: "home",
    label: "🏠 Hogar",
  },
  {
    value: "family",
    label: "👨‍👩‍👧 Familia",
  },
  {
    value: "church",
    label: "🙏 Iglesia",
  },
  {
    value: "finance",
    label: "💰 Finanzas",
  },
];

export function getTaskCategoryLabel(
  value: string | null
) {
  if (!value) return null;

  return (
    TASK_CATEGORIES.find(
      (category) =>
        category.value === value
    )?.label ?? value
  );
}