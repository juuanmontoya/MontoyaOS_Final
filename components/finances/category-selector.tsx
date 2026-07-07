"use client";

import type { Category } from "@/types/category";

interface Props {
  categories: Category[];
  value: string;
  onChange: (value: string) => void;
}

export function CategorySelector({
  categories,
  value,
  onChange,
}: Props) {
  return (
    <div>
      <label className="mb-3 block text-sm font-semibold text-gray-700">
        Categoría
      </label>

      <div className="grid grid-cols-2 gap-3">
        {categories.map((category) => {
          const selected = value === category.id;

          return (
            <button
              key={category.id}
              type="button"
              onClick={() => onChange(category.id)}
              className={`
                flex items-center gap-3 rounded-2xl border p-3 text-left transition-all duration-200
                ${
                  selected
                    ? "border-blue-500 bg-blue-50 shadow-md scale-[1.02]"
                    : "border-gray-200 bg-white hover:bg-gray-50"
                }
              `}
            >
              <div
                className="flex h-10 w-10 items-center justify-center rounded-xl"
                style={{ backgroundColor: category.color }}
              >
                <span className="text-xl">{category.icon}</span>
              </div>

              <span className="font-medium">
                {category.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}