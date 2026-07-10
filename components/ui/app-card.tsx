import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type AppCardProps = {
  children: ReactNode;
  className?: string;
};

export function AppCard({
  children,
  className,
}: AppCardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:shadow-lg",
        className
      )}
    >
      {children}
    </div>
  );
}