"use client";

interface Props {
  loading: boolean;
  label: string;
}

export function TransactionSubmitButton({
  loading,
  label,
}: Props) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="w-full rounded-xl bg-blue-600 p-3 font-semibold text-white"
    >
      {loading
        ? "Guardando..."
        : label}
    </button>
  );
}