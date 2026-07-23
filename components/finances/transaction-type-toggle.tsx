"use client";

interface Props {
  value: "income" | "expense";
  disabled?: boolean;
  onChange: (
    value: "income" | "expense"
  ) => void;
}

export function TransactionTypeToggle({
  value,
  disabled = false,
  onChange,
}: Props) {
  return (
    <div className="flex gap-3">
      <button
        type="button"
        disabled={disabled}
        onClick={() =>
          onChange("expense")
        }
        className={`flex-1 rounded-xl p-3 font-semibold transition ${
          value === "expense"
            ? "bg-red-500 text-white"
            : "bg-gray-100"
        }`}
      >
        Gasto
      </button>

      <button
        type="button"
        disabled={disabled}
        onClick={() =>
          onChange("income")
        }
        className={`flex-1 rounded-xl p-3 font-semibold transition ${
          value === "income"
            ? "bg-green-500 text-white"
            : "bg-gray-100"
        }`}
      >
        Ingreso
      </button>
    </div>
  );
}