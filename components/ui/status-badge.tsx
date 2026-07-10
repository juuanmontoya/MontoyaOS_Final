import { cn } from "@/lib/utils";

type StatusBadgeVariant =
  | "success"
  | "warning"
  | "error"
  | "info";

type StatusBadgeProps = {
  children: React.ReactNode;
  variant?: StatusBadgeVariant;
};

const variants = {
  success:
    "bg-emerald-100 text-emerald-700 border-emerald-200",

  warning:
    "bg-amber-100 text-amber-700 border-amber-200",

  error:
    "bg-red-100 text-red-700 border-red-200",

  info:
    "bg-blue-100 text-blue-700 border-blue-200",
};

export function StatusBadge({
  children,
  variant = "info",
}: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold",
        variants[variant]
      )}
    >
      {children}
    </span>
  );
}