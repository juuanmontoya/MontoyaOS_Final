"use client";

interface Props {
  value: "cash" | "digital";
  disabled?: boolean;
  onChange: (
    value: "cash" | "digital"
  ) => void;
}

export function AccountTypeToggle({
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
          onChange("cash")
        }
        className={`flex-1 rounded-xl p-3 font-semibold transition ${
          value === "cash"
            ? "bg-blue-500 text-white"
            : "bg-gray-100"
        }`}
      >
        💵 Efectivo
      </button>

      <button
        type="button"
        disabled={disabled}
        onClick={() =>
          onChange("digital")
        }
        className={`flex-1 rounded-xl p-3 font-semibold transition ${
          value === "digital"
            ? "bg-indigo-500 text-white"
            : "bg-gray-100"
        }`}
      >
        💳 Digital
      </button>
    </div>
  );
}