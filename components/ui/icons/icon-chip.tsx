import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Color =
  | "blue"
  | "green"
  | "amber"
  | "red"
  | "violet"
  | "cyan";

interface IconChipProps {
  children: ReactNode;
  color?: Color;
}

const colorVariants = {
  blue: "bg-blue-500/15 text-blue-300",
  green: "bg-green-500/15 text-green-300",
  amber: "bg-amber-500/15 text-amber-300",
  red: "bg-red-500/15 text-red-300",
  violet: "bg-violet-500/15 text-violet-300",
  cyan: "bg-cyan-500/15 text-cyan-300",
};

export function IconChip({
  children,
  color = "blue",
}: IconChipProps) {
  return (
    <div
      className={cn(
        "flex h-10 w-10 items-center justify-center rounded-xl",
        "backdrop-blur-sm",
        colorVariants[color]
      )}
    >
      {children}
    </div>
  );
}