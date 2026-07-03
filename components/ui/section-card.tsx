import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionCardProps {
  children: ReactNode;
  className?: string;
}

export function SectionCard({
  children,
  className,
}: SectionCardProps) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-zinc-200/70 bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-md",
        className
      )}
    >
      {children}
    </div>
  );
}